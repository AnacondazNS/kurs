import { useState } from "react"
import { Wrapper } from "../components/layouts/Wrapper"
import { userService } from "../services/user"

export const SignUp = ({toggleIsLogin}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onPress = async () => {
        try{
            await userService.signUp(name, email, password)
            toggleIsLogin()
        }catch(err){
            alert(err)
        }
    }

    return (
        <Wrapper>
            <br />
            <h1>Регистрация:</h1>
            <label>Имя:</label>
            <input value={name} onChange={e => setName(e.target.value)} type="text" />
            <label>Почта:</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
            <label>Пароль:</label>
            <input  value={password} onChange={e => setPassword(e.target.value)} type='password' />
            <button disabled={!name || !email || !password} onClick={onPress}>sign in!</button>
        </Wrapper>
    )
}