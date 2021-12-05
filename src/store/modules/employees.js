import api from '@/middlewares/api'

const state = {
    allUsers: null,
    currentUser: null,
}

const mutations = {
    SET_ALL_EMPLOYEES(state, payload) {
        state.allUsers = payload
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
    async createUser(_, payload) {
        try {
            await api.post('employees', payload)
        } catch (e) {
            console.log(e)
        }
    }
}

const getters = {
    allUsers: state => state.allUsers
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}