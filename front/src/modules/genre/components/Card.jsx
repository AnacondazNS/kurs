import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { genreService } from "../../../services/genre"

export const GenreCard = ({id,name}) => {

    const navigate = useNavigate()
    const [img, setImg] = useState(null)

    useEffect(() => {
        if(id){
            genreService.getPreviewById(id).then(res => {
                const blob = new Blob([res.data], { type: res.headers['content-type'] });
                const reader = new FileReader();
                
                reader.onload = () => {
                  setImg(reader.result);
                };
                
                reader.readAsDataURL(blob);
            })
        }
    }, [id])

    return (
        <div className="card" key={id}>
            <div className="photo">
                <img src={img} alt="123" />
            </div>
            <p>{name}</p>
            <button className="btn" onClick={() => navigate('/genre/' + id)}>Перейти</button>
        </div>
    )
}