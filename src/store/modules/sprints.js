import api from '@/middlewares/api'

const state = {
    allSprints: null,
    currentSprint: null
}

const mutations = {
    SET_ALL_SPRINTS(state, payload) {
        state.allSprints = payload
    },
    SET_CURRENT_SPRINT(state, payload) {
        state.currentSprint = payload
    }
}

const actions = {
    async getAllSprints({commit}) {
        try {
            const {data} = await api.get('sprints')
            commit('SET_ALL_SPRINTS', data)
        } catch (e) {
            console.log(e)
        }
    },
    async getSprint({commit}, payload) {
        try {
            const {data} = await api.get(`sprints/${payload}`)
            commit('SET_CURRENT_SPRINT', data)
        } catch (e) {
            console.log(e)
        }
    },
    async getCurrentSprint({commit}) {
        try {
            const {data} = await api.get(`sprints/current`)
            commit('SET_CURRENT_SPRINT', data)
        } catch (e) {
            console.log(e)
        }
    },
    async saveSprint(_, payload) {
        try {
            await api.post('sprints', payload)
        } catch (e) {
            console.log(e)
        }
    }
}

const getters = {
    allSprints: state => state.allSprints,
    currentSprint: state => state.currentSprint
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}