import { useState } from "react"
import { Wrapper } from "../components/layouts/Wrapper"
import { userService } from "../services/user"

export const SignIn = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onPress = async () => {
        try{
            const data = await userService.signIn(email, password)
            console.log(data)
            if(data && data.token){
                localStorage.setItem('token', data.token)
                window.location.pathname = '/'
                return
            }
        }catch(err){
            alert(err)
        }
    }

    return (
        <Wrapper>
            <br />
            <h1>Авторизация:</h1>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
            <input  value={password} onChange={e => setPassword(e.target.value)} type='password' />
            <button disabled={!email || !password} onClick={onPress}>sign in!</button>
        </Wrapper>
    )
}