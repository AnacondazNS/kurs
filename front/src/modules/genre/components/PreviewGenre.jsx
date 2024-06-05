import { useEffect, useState } from "react";
import { genreService } from "../../../services/genre";

export const PreviewGenre = ({id}) => {
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
        <div className="photo">
            <img src={img} alt="123" />
        </div>
    )
}