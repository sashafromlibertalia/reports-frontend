import Vue from 'vue'
import axios from 'axios'

const baseURL = 'https://localhost:5001/api/'

const api = axios.create({
    baseURL: baseURL,
})

Vue.prototype.$api = api
export default api