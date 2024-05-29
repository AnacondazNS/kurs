import { useEffect, useState } from "react"
import { bookService } from "../../../../services/book";

export const Preview = ({id}) => {

    const [img, setImg] = useState(null)

    useEffect(() => {
        if(id){
            bookService.getPreviewById(id).then((res) => {
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
            <img src={img} alt="photo" />
        </div>
    )
}