import { useNavigate, useParams } from "react-router-dom"
import useSWR from "swr"
import { IS_CREATE } from "../../utils"
import { genreService } from "../../../../services/genre"
import { Wrapper } from "../../../../components/layouts/Wrapper"
import { FormData as CardData } from "./components/FormData"

export const GenreCard = () => {

    const {id} = useParams()
    const navigate = useNavigate()

    const ISCREATE = IS_CREATE(id)

    const {data, isLoading} = useSWR({id}, () => !ISCREATE && genreService.getGenreById(id))

    const onSave = async (values) => {
        if(ISCREATE){
            const keys = Object.keys(values)

            const formDat = new FormData()
            for(const key of keys){
                formDat.append(key, values[key])
            }

            const result = await genreService.create(formDat)
            if(result.id){
                navigate(`/admin/genre/${result.id}`)
                return
            }
        }
        console.log(values)
    }

    return (
        <Wrapper enableHeader>
            {isLoading ? <h2>Загрузка...</h2> : <CardData formData={data} isCreate={ISCREATE} onSave={onSave} onCancel={() => navigate(`/admin/genre`)} />} 
        </Wrapper>
    )
}