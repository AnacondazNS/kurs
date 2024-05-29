import { useNavigate } from "react-router-dom"
import { Wrapper } from "../../components/layouts/Wrapper"
import { userService } from "../../services/user"
import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

export const Profile = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [ , setError] = useState(null)

    useEffect(() => {
        userService.getMe().then(setData).catch(setError).finally(() => setIsLoading(false))
    }, [])

    const {role} = jwtDecode(localStorage.getItem('token'))

    return (
        <Wrapper enableHeader>
            {isLoading ? 
                <h2>Загрузка...</h2>
            :
                <>
                    <h2>Профиль</h2>

                    <p>Имя: {data?.name}</p>
                    <p>Почта: {data?.email}</p>
                    <p>Дата создания аккаунта: {data?.createdAt}</p>
                    <button onClick={() => {
                        localStorage.removeItem('token')
                        navigate('/sign-in')
                        window.location.reload()
                    }}>Выйти из аккаунта</button>

                    {role === "ADMIN" && <button onClick={() => navigate('/admin')}>Админ-панель</button>}
                </>    
            }
 
        </Wrapper>
    )
}