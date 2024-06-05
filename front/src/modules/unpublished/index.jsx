import useSWR from "swr"
import { bookService } from "../../services/book"
import '../genre/style.css'
import { Preview } from "../genre/Card/component/Preview"
import { useState } from "react"

export const UnpublishedList = () => {

    const [page, setPage] = useState(1)
    const {data,isLoading, error} = useSWR(`unpublish-${page}`, () => bookService.unpublishList({page, limit: 20}))

    return (
        <>  
            {data?.rows?.length > 0 && <h2>Скоро выйдет:</h2>}
            {isLoading ? 
                <h2>Загрузка</h2> :
                <div className="genre-books-container">
                    {data?.rows?.map(item => 
                        <div className="GenreBookCard" key={item.id}>
                            <Preview id={item.id} />
                            <h3>{item.name}</h3>
                        </div>
                    )}
                </div>
            }  
        </>
    )
}