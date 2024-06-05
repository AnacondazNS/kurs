import { $http } from "../config/http"

const BASE_PATH = '/api/book'

const list = async ({page, limit=20, ignorePublishStatus}) => {
    const {data} = await $http.get(`${BASE_PATH}?page=${page}&limit=${limit}${ignorePublishStatus ? `&ignorePublishStatus=true` : ''}`)
    return data
}

const getById = async (id) => {
    const {data} = await $http.get(`${BASE_PATH}/one/${id}`)
    return {...data, genre: {value: data.Genre.id, label: data.Genre.name}}
}

const create = async (formData) => {
    const {data} = await $http.post(`${BASE_PATH}/one/`, formData)
    return data
}

const update = async (id, formData) => {
    const {data} = await $http.put(`${BASE_PATH}/one/${id}`, formData)
    return data
}

const getPreviewById = async (id) => {
    const response = await $http.get(`${BASE_PATH}/preview/${id}`, {
        responseType: 'arraybuffer',
    });
    return response
}

const popularList = async (page=1, limit=20) => {
    const {data} = await $http.get(`${BASE_PATH}/popular?page=${page}&limit=${limit}`)
    return data
}

const removeBook = async(id) => {
    const {status} = await $http.delete(`${BASE_PATH}/one/${id}`)
    return status
}

const search = async(name) => {
    const {data} = await $http.get(`${BASE_PATH}/search/?name=${name}`)
    return data
}

const unpublishList = async({page, limit=20}) => {
    const {data} = await $http.get(`${BASE_PATH}/unpublish?page=${page}&limit=${limit}&unpublished`)
    return data
}



export const bookService = { list, getById, getPreviewById, popularList, removeBook, create, search, update, unpublishList}