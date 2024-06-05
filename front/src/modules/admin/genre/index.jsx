import { useNavigate } from "react-router-dom"
import { genreService } from "../../../services/genre"
import { useState } from "react"
import { Wrapper } from "../../../components/layouts/Wrapper"
import useSWR, { mutate } from "swr"
import { PreviewGenre } from "../../genre/components/PreviewGenre"

export const AdminGenres = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const limit = 20

    const {data, isLoading} = useSWR({page}, () => genreService.list(page, limit))

    const onRemove = async (id) => {
        try{
            await genreService.remove(id)
            mutate({page})
        }catch(err){
            console.error(err)
        }
    }

    return(
        <Wrapper enableHeader className={'books'}>
             {isLoading ? <></> :
                <>  
                    <button onClick={() => navigate(`/admin/genre/create`)} className="btn">Создать жанр</button>
                    <div className="container">
                        {data?.rows?.map(item =>
                            <div className="GenreBookCard" key={item.id}>
                                <PreviewGenre id={item.id} />
                                <h2>{item.name}</h2>
                                <button className="btn" onClick={() => onRemove(item.id)}>Удалить</button>
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