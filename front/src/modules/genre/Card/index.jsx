import { useParams } from "react-router-dom"
import { genreService } from "../../../services/genre"
import { useEffect, useState } from "react"
import { Wrapper } from "../../../components/layouts/Wrapper"
import { List } from "./List"

export const GenreCard = () => {

    const {id} = useParams()

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(id){
            genreService.getGenreById(id).then(setData).catch(setError).finally(() => setIsLoading(false))
        }
    }, [id])

    useEffect(() => {
        if(!isLoading && error){
            console.error(error)
        }
    }, [isLoading, error])

    return (
        <Wrapper enableHeader>
            {isLoading ? <h2>Загрузка...</h2> : 
                <>
                    <h2>Поджанр: {data?.name}</h2>
                    <span>{data?.desc}</span>

                    {data.id && <List data={data} />}
                </>
            }
        </Wrapper>
    )
}