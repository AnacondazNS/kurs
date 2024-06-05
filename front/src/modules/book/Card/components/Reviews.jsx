import { useEffect, useMemo, useReducer, useState } from "react"
import { ObserverComponent } from "../../../../components/Observer"
import { useParams } from "react-router-dom"
import { reviewService } from "../../../../services/review"
import { getAdminInfo, isOk } from "../../../../utils"

export const Reviews = () => {

    const {id} = useParams()

    const [isVisible, toggleIsVisible] = useReducer((prev) => !prev, false)

    const isAdmin = useMemo(() => getAdminInfo(), [])

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const [count, setCount] = useState(0)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [, setError] = useState(null)

    useEffect(() => {
        if(id && isVisible){
            setIsLoading(true)
            reviewService.list(id,page, limit).then((res) => {
                setData(prev => [...prev, ...res.rows])
                setCount(res.count)
            }).finally(() => setIsLoading(false))
        }
    }, [isVisible, id, page, limit])

    const onRemove = (id) => {
        reviewService.deleteById(id).then(status => {
            if(isOk(status)){
                setData(prev => prev.filter(item => item.id !== id))
                alert("Отзыв удалён")
            }
        })
    } 

    return (
        <>
            <ObserverComponent onVisible={!isVisible ? toggleIsVisible : () => {}} />
            {isVisible && <h2>Отзывы {count > 0 && `(${count})`}:</h2>}
            <div className="reviews">
                {
                    isVisible && 
                        <>
                            {data?.map(item => 
                                <div className="review" key={item.id}>
                                    {isAdmin && <button className="btn" onClick={() => onRemove(item.id)}>Удалить отзыв</button>}
                                    <p>{item?.user?.name}</p>
                                    <h2>{item?.desc}</h2>
                                    <span>Звёзд: {item?.stars}</span>
                                </div>
                            )}
                            {count > 0 && isVisible && count > data.length && !isLoading && <button className="btn" onClick={() => setPage(page + 1)}>Ещё</button>}
                        </>
                }
            </div>
        </>
    )
}