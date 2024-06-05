import { useNavigate, useParams } from "react-router-dom"
import useSWR from "swr"
import { bookService } from "../../../../services/book"
import { Wrapper } from "../../../../components/layouts/Wrapper"
import { BookFormData } from "./Formdata"
import { IS_CREATE } from "../../utils"

export const Card = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const ISCREATE = IS_CREATE(id)

    const {data, isLoading} = useSWR(id, () => !ISCREATE && bookService.getById(id))

    const onSave = async (values) => {
        if(ISCREATE){
            const keys = Object.keys(values)

            const formData = new FormData()
            for(const key of keys){
                if(key === 'genre'){
                    formData.append('genreId', values.genre.value)
                    continue
                }
                formData.append(key, values[key])
            }


            const result = await bookService.create(formData)
            if(result.id){
                navigate(`/admin/book/${result.id}`)
                return
            }
        }else{
            const keys = Object.keys(values)
            const formData = new FormData()
            for(const key of keys){
                if(key === 'genre'){
                    formData.append('genreId', values.genre.value)
                    continue
                }
                formData.append(key, values[key])
            }

            const result = await bookService.update(id, formData)
            if(result.id){
                navigate(0)
                return
            }
        }
    }

    return (
        <Wrapper enableHeader>
            {isLoading ? <h2>Загрузка</h2> : <BookFormData onSave={onSave} formData={data} onCancel={() => navigate(`/admin/book`)} isCreate={ISCREATE} />}
        </Wrapper>
    )
}