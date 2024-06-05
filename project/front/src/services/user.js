import { $http, $unauthhttp } from "../config/http"

const BASE_PATH = '/api/user'

const getMe = async () => {
    const {data} = await $http.get(`${BASE_PATH}/me`)
    return data
}

const auth = async () => {
    const {data} = await $http.get(`${BASE_PATH}/auth`)
    return data
}

const signIn = async (email, password) => {
    const {data} = await $unauthhttp.post(`${BASE_PATH}/login`, {email, password})
    return data
}

const signUp = async (name, email, password) => {
    const {data} = await $unauthhttp.post(`${BASE_PATH}/register`, {name, email, password})
    return data
}


export const userService = {getMe, auth, signIn, signUp}