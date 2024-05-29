import { jwtDecode } from "jwt-decode"

export const getAdminInfo = () => {
    const token = localStorage.getItem('token')
    const {role} = jwtDecode(token)
    return role === "ADMIN"
}

export const isOk = (status) => status === 200