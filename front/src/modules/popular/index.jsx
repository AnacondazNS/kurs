import { useEffect, useState } from "react"
import { bookService } from "../../services/book"
import { Preview } from "../genre/Card/component/Preview"
import '../genre/style.css'
import { useNavigate } from "react-router-dom"

export const PopularBooks = () => {

    const navigate = useNavigate()

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [, setError] = useState(null)

    useEffect(() => {
        bookService.popularList().then(setData).catch(setError).finally(() => setIsLoading(false))
    }, [])

    return (
        isLoading ? <h2>Загрузка...</h2> :
        <>
            <h1>Популярные книги:</h1>
            <div className="genre-books-container">
                {data.rows.map(item => 
                    <div className="GenreBookCard" key={item.id}>
                        <Preview id={item.id} />
                        <h3>{item.name}</h3>
                        <button className="btn" onClick={() => navigate(`/book/${item.id}`)}>Перейти</button>
                    </div>
                )}
            </div>
        </>
    )
}