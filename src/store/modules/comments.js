import api from '@/middlewares/api'

const state = {
    allComments: null,
    currentComments: null
}

const mutations = {
    SET_ALL_COMMENTS(state, payload) {
        state.allComments = payload
    },
    SET_CURRENT_COMMENTS(state, payload) {
        state.currentComments = payload
    }
}

const actions = {
    async getAllComments({commit}) {
        try {
            const {data} = await api.get('comments')
            commit('SET_ALL_COMMENTS', data)
        } catch (e) {
            console.log(e)
        }
    },
    async getCommentsForTask({commit}, payload) {
        try {
            const {data} = await api.get(`comments/${payload}`)
            commit('SET_CURRENT_COMMENTS', data)
        } catch (e) {
            console.log(e)
        }
    },
    async saveComment(_, payload) {
        try {
            const {data} = await api.post('comments', payload.body, {
                params: {
                    task: payload.id
                }
            })
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

const getters = {
    allComments: state => state.allComments,
    currentComments: state => state.currentComments
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}