import { useReducer } from "react"
import { SignIn } from "./signIn"
import { SignUp } from "./signUp"
import { Wrapper } from "../components/layouts/Wrapper"

export const AuthWrap = () => {

    const [isLogin, toggleIsLogin ] = useReducer(prev => !prev, false)

    return (
        <Wrapper>
            <h2>Добро пожаловать:</h2>
            <button onClick={toggleIsLogin}>{isLogin ? "Регистрация" :"Авторизация" }</button>
            {isLogin ? <SignIn /> : <SignUp toggleIsLogin={toggleIsLogin} />}
        </Wrapper>
    )
}