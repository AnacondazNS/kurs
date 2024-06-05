import { useNavigate, useParams } from "react-router-dom"
import { Wrapper } from "../../components/layouts/Wrapper"
import { useEffect, useReducer, useState } from "react"
import { bookReaderService } from "../../services/bookReader"
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


export const BookReader = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [, setError] = useState(null)
    
    const [updateKey, toggleUpdateKey] = useReducer((prev) => prev++, 0)
    const [bookMarkData, setBookMarkData] = useState(null)
    const [isLoadingBookMark, setIsLoadingBookMark] = useState(true)
    const [, setBookMarkError] = useState(null)

    const [isClickedOk, setIsClickedOk] = useState(false)


    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
  
    const handlePageChange = newPageNumber => {
      setPageNumber(newPageNumber);
    };


    useEffect(() => {
        if(id){
            setIsLoading(true)
            bookReaderService.getById(id).then(setData).catch(setError).finally(() => setIsLoading(false))
        }
    }, [id])

    useEffect(() => {
        bookReaderService.getBookmark(id).then(setBookMarkData).catch(setBookMarkError).finally(() => setIsLoadingBookMark(false))
    }, [id, updateKey])

    useEffect(() => {
        if(!isLoadingBookMark && bookMarkData && !isClickedOk){
            const isOk = confirm('Открыть закладку?')
            setIsClickedOk(true)
            if(isOk){
                const {page} = bookMarkData
                handlePageChange(page)
            }
        }
    }, [bookMarkData, isClickedOk, isLoadingBookMark])

    const setMark = async () => {
        try{
            const {message} = await bookReaderService.setBookmark(id,pageNumber)
            if(message === "REMOVED"){
                toggleUpdateKey()
                setBookMarkData(null)
                alert('Закладка удалена!')
                return 
            }
            toggleUpdateKey()
            setBookMarkData(prev => ({...prev, page: pageNumber}))
            alert('Закладка обновлена!')
        }catch(err){
            console.error('err', err)
        }
    }

    useEffect(() => {
        const listener = (e) => {
            const {code} = e
            if(code === "ArrowRight" && pageNumber < numPages){
                handlePageChange(pageNumber + 1)
            }
            if(code === 'ArrowLeft' && pageNumber > 1){
                handlePageChange(pageNumber  - 1)

            }
        }

        window.addEventListener('keydown', listener)
        return () => {
            window.removeEventListener('keydown', listener)
        }
    }, [numPages, pageNumber])

    return (
        <Wrapper className={'book-reader-container'}>
            <button className="btn" onClick={() => navigate(`/book/${id}`)}>Вернуться к книге</button>

            {isLoading || isLoadingBookMark ? 
                <h2>Загрузка...</h2>
            :
                <>
                   {data && (
                        <Document
                            className={'reader'}
                            file={data}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page className={'reader-page'} pageNumber={pageNumber} />
                        </Document>
                    )}
                    <div>
                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                        <button className="btn" disabled={pageNumber <= 1} onClick={() => handlePageChange(pageNumber - 1)}>
                            Предыдущая
                        </button>
                        <button className="btn" disabled={pageNumber >= numPages} onClick={() => handlePageChange(pageNumber + 1)}>
                            Следующая
                        </button>
                        <button className="btn" onClick={setMark}>{bookMarkData?.page === pageNumber ? "Убрать закладку" : "Закладка"}</button>
                        {bookMarkData && bookMarkData?.page !== pageNumber &&  <button className="btn" onClick={() => handlePageChange(bookMarkData?.page)}>Перейти к вкладке</button>}
                    </div>
                </>
            }

        </Wrapper>
    )
}