import { $http } from "../config/http"

const BASE_PATH = '/api/genre'
const ALT_PATH = 'api/book/' 

const list = async (page=1, limit=20) => {
    const {data} = await $http.get(`${BASE_PATH}?page=${page}&limit=${limit}`)
    return data
}

const listSelect = async(page, limit) => {
    const {data} = await $http.get(`${BASE_PATH}?page=${page}&limit=${limit}`)
    return data
}

const getBooksByGenreId = async (id) => {
    console.log('id', id)
    const {data} = await $http.get(`${ALT_PATH}/genre/${id}`)
    return data
}

const getGenreById = async (id) => {
    const {data} = await $http.get(`${BASE_PATH}/${id}`)
    return data
}

const getPreviewById = async (id) => {
    const response = await $http.get(`${BASE_PATH}/preview/${id}`,  {
        responseType: 'arraybuffer',
    })
    return response
}

const remove = async (id) => {
    const {data} = await $http.delete(`${BASE_PATH}/${id}`)
    return data
}

const create = async (formData) => {
    const {data} = await $http.post(`${BASE_PATH}`, formData)
    return data
}


export const genreService = {list, getBooksByGenreId, getGenreById, getPreviewById, listSelect, remove, create}