import Vue from 'vue'
import axios from 'axios'
import helpers from "@/middlewares/helpers";

const baseURL = 'https://webapp-211214093022.azurewebsites.net/api/'

const api = axios.create({
    baseURL: baseURL,
})

api.interceptors.request.use((request) => {
        const token = helpers.getUser()
        if (token) {
            request.headers.Authorization = `Employee ${token}`
        }
        return request
    },
    (err) => {
        return Promise.reject(err)
    },
)

Vue.prototype.$api = api
export default api