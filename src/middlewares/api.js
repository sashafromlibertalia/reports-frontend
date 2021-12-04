import Vue from 'vue'
import axios from 'axios'

const baseURL = 'http://localhost:5000/api/'

const api = axios.create({
    baseURL: baseURL,
})

Vue.prototype.$api = api
export default api