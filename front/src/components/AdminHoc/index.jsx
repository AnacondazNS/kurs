import { jwtDecode } from "jwt-decode"

export const AdminHOC = (Component) => {
    const {role} = jwtDecode(localStorage.getItem('token'))
    if(role !== "ADMIN"){
        return null
    }
    
    return <Component />
}