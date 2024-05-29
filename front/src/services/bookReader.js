import { $http } from "../config/http"

const BASE_PATH = '/api/book'

const getById = async (id) => {
    const {data} = await $http.get(`${BASE_PATH}/reader-book/${id}`, {responseType :'blob'})
    return data
}


const getBookmark = async (id) => {
    const {data} = await $http.get(`${BASE_PATH}/bookmark/${id}`)
    return data
}

const setBookmark = async (id, page) => {
    const {data} = await $http.post(`${BASE_PATH}/bookmark/${id}`, {page})
    return data
}


export const bookReaderService = { getById, setBookmark, getBookmark }