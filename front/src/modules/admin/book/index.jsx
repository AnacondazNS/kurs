import useSWR, { mutate } from "swr"
import { Wrapper } from "../../../components/layouts/Wrapper"
import { bookService } from "../../../services/book"
import { useState } from "react"
import '../../genre/Card/style.css'
import { Preview } from "../../genre/Card/component/Preview"
import { isOk } from "../../../utils"
import { useNavigate } from "react-router-dom"
import './styles.css'

export const AdminBooks = () => {

    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const limit = 20

    const {data, isLoading} = useSWR({page}, () => bookService.list({page, limit, ignorePublishStatus: true}))

    const onRemove = async (id) => {
        const status = await bookService.removeBook(id)
        if(isOk(status)){
            mutate({page})
        }
    }

    return (
        <Wrapper className={'book-page'} enableHeader>
            {isLoading ? <></> :
                <>  
                    <button onClick={() => navigate(`/admin/book/create`)} className="btn">Создать книгу</button>
                    <div className="container">
                        {data?.rows?.map(item =>
                            <div className="GenreBookCard" key={item.id}>
                                <Preview id={item.id} />
                                <h2>{item.name}</h2>
                                <button onClick={() => navigate(`/admin/book/${item.id}`)} className="btn">Редактировать</button>
                                <button onClick={() => onRemove(item.id)} className="btn">Удалить</button>
                            </div>
                        )}
                    </div>

                    <button disabled={!(page > 1)} className="btn" onClick={() => setPage(page -1)}>Пред.</button>
                    Кол-во записей: {data.count}
                    <button className="btn" onClick={() => setPage(page + 1)}>Далее</button>
                </>
            }

        </Wrapper>
    )
}