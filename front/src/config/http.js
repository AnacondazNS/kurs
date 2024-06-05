import axios from "axios";

export const baseUrl = "http://localhost:3000"

export const $http = axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

export const $unauthhttp = axios.create({
    baseURL: baseUrl,
})