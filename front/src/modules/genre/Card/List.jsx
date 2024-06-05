import { useEffect } from "react"
import useSWR from "swr"
import { genreService } from "../../../services/genre"
import { useNavigate } from "react-router-dom"
import './style.css'
import { Preview } from "./component/Preview"


export const List = ({data}) => {
    const navigate = useNavigate()
    const {data: listData, isLoading: listIsLoading, error: listError} = useSWR(data,() => genreService.getBooksByGenreId(data.id))

    useEffect(() => {
        if(!listIsLoading && listError){
            console.error(listError)
        }
    }, [listIsLoading, listError])

    if(listIsLoading){
        return null
    }

    return (
        <div className="genre-books-container">
            {listData?.rows?.map(item => 
                <div className="GenreBookCard" key={item.id}>
                    <Preview id={item.id} />
                    <h3>{item.name}</h3>
                    <button className="btn" onClick={() => navigate(`/book/${item.id}`)}>Перейти</button>
                </div>
            )}
        </div>
    )
    
}