import { $http } from "../config/http"

const BASE_PATH = '/api/review'

const send = async (id, desc,stars) => {
    const {data} = await $http.post(`${BASE_PATH}/book/${id}`, {desc, stars})
    return data
} 

const list = async (id,page=1,limit=20) => {
    const {data} = await $http.get(`${BASE_PATH}/book/${id}?page=${page}&limit=${limit}`,)
    return data
}

const deleteById = async (id) => {
    const {status} = await $http.delete(`${BASE_PATH}/book/${id}`,)
    return status
}

export const reviewService = {send, list, deleteById}