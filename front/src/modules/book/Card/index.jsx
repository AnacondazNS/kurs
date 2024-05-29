import { useNavigate, useParams } from "react-router-dom"
import { Wrapper } from "../../../components/layouts/Wrapper"
import { useEffect, useState } from "react"
import { bookService } from "../../../services/book"
import './style.css'
import { reviewService } from "../../../services/review"
import { IS_SENDED } from "../consts"
import { Reviews } from "./components/Reviews"

export const BookCard = () => {

    const navigate = useNavigate()
    const {id} = useParams()

    const [updateKey, toggleUpdateKey] = useState((prev) => prev++, 0)
    const [img, setImg] = useState(null)

    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [, setError] = useState(null)

    const [reviewStars, setReviewStars] = useState(0)
    const [isLoadingReview, setIsLoadingReview] = useState(false)
    const [reviewInput, setReviewInput] = useState('') 

    const onSendReview = async () => {
        if(!reviewInput.length) return 
        setIsLoadingReview(true)
        const result = await reviewService.send(id, reviewInput, reviewStars)
        if(result && result.message === IS_SENDED){
            alert('Отзыв оставлен. Спасибо!')
            setReviewInput('')
            setReviewStars(0)
        }
        toggleUpdateKey()
        setIsLoadingReview(false)
    }

    useEffect(() => {
        if(id){
            bookService.getById(id).then(setData).catch(setError).finally(() => setIsLoading(false))
            bookService.getPreviewById(id).then((res) => {
                const blob = new Blob([res.data], { type: res.headers['content-type'] });
                const reader = new FileReader();
                
                reader.onload = () => {
                  setImg(reader.result);
                };
                
                reader.readAsDataURL(blob);
            })
        }
    }, [id, updateKey])

    return (
        <Wrapper enableHeader>
            {isLoading ? <h2>Загрузка</h2> : 
                <>
                    <div className="book-section">
                        <div className="left-side">
                            <div className="photo">
                                <img src={img} alt="none" />
                            </div>
                        </div>
                        <div className="right-side">
                            <div>
                                <div className="rate">
                                    <div className={`star ${data?.avg_rate >= 1 && 'active'}`}></div>
                                    <div className={`star ${data?.avg_rate >= 2 && 'active'}`}></div>
                                    <div className={`star ${data?.avg_rate >= 3 && 'active'}`}></div>
                                    <div className={`star ${data?.avg_rate >= 4 && 'active'}`}></div>
                                    <div className={`star ${data?.avg_rate === 5 && 'active'}`}></div>
                                </div>
                                <span>({ data?.avg_rate && parseFloat(data?.avg_rate.toFixed(1))})</span>
                            </div>

                            <h2>{data.name}</h2>
                            <button className="btn" onClick={() => navigate(`/book-reader/${data?.id}`)}>Читать</button>

                            <div className="review-field">
                                <label>Оставить отзыв</label>
                                <div className="rate">
                                    <div onClick={() => setReviewStars(prev => prev === 1 ? 0 : 1)} className={`star ${reviewStars >= 1 && "active"}`}></div>
                                    <div onClick={() => setReviewStars(prev => prev === 2 ? 0 : 2)} className={`star ${reviewStars >= 2 && "active"}`}></div>
                                    <div onClick={() => setReviewStars(prev => prev === 3 ? 0 : 3)} className={`star ${reviewStars >= 3 && "active"}`}></div>
                                    <div onClick={() => setReviewStars(prev => prev === 4 ? 0 : 4)} className={`star ${reviewStars >= 4 && "active"}`}></div>
                                    <div onClick={() => setReviewStars(prev => prev === 5 ? 0 : 5)} className={`star ${reviewStars >= 5 && "active"}`}></div>
                                </div>
                                <textarea disabled={isLoadingReview} value={reviewInput} onChange={(e) => setReviewInput(e.target.value)}></textarea>
                                {reviewInput.length > 0 && reviewStars > 0 && !isLoadingReview && <button onClick={onSendReview}>Отправить</button>}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2>Описание</h2>
                        <span>{data?.desc}</span>
                    </div>
                    <div>
                        <h2>Характеристики</h2>
                        <p>Автор: {data?.author}</p>
                        <p>Издательство: {data?.publishingHouse}</p>
                        <p>Серия: {data?.seria}</p>
                        <p>Жанр: <span className="link" onClick={() => navigate(`/genre/${data?.Genre?.id}`)}>{data?.Genre?.name}</span></p>
                    </div>

                    <Reviews />
                </>
            }

        </Wrapper>
    )
}