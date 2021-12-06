import api from '@/middlewares/api'

const state = {
    allUsers: null,
    currentUser: null,
}

const mutations = {
    SET_ALL_EMPLOYEES(state, payload) {
        state.allUsers = payload
    },
    SET_CURRENT_USER(state, payload) {
        state.currentUser = payload
    }
}

const actions = {
    async getAllUsers({commit}) {
        try {
            const {data} = await api.get('employees')
            commit('SET_ALL_EMPLOYEES', data)
        } catch (e) {
            console.log(e)
        }
    },
    async getCurrentUser({commit}, payload) {
        try {
            const {data} = await api.get(`employees/${payload}`)
            commit('SET_CURRENT_USER', data)
        } catch (e) {
            console.log(e)
        }
    },
    async createUser(_, payload) {
        try {
            const {data} = await api.post('employees', payload)
            return data
        } catch (e) {
            console.log(e)
        }
    },
    async removeUser(_, payload) {
        try {
            const {data} = await api.post(`employees/remove/${payload}`)
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

const getters = {
    allUsers: state => state.allUsers,
    currentUser: state => state.currentUser
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}