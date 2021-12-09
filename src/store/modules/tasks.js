import api from '@/middlewares/api'

const state = {
    allTasks: [],
    currentTask: null,
    userTasks: null,
}

const mutations = {
    SET_ALL_TASKS(state, payload) {
        state.allTasks = payload
    },
    SET_CURRENT_TASK(state, payload) {
        state.currentTask = payload
    },
    SET_TASKS_BY_USER(state, payload) {
        state.userTasks = payload
    }
}

const actions = {
    async getAllTasks({commit}) {
        try {
            const {data} = await api.get('tasks')
            commit('SET_ALL_TASKS', data)
        } catch (e) {
            console.log(e)
        }
    },
    async getSingleTask({commit}, payload) {
        try {
            const {data} = await api.get(`tasks/${payload}`)
            commit('SET_CURRENT_TASK', data)
        } catch (e) {
            console.log(e)
        }
    },
    async getUserTasks({commit}, payload) {
        try {
            const {data} = await api.get(`tasks/by/${payload}`)
            commit('SET_TASKS_BY_USER', data)
        } catch (e) {
            console.log(e)
        }
    },
    async createTask(_, payload) {
        try {
            await api.post('tasks', payload)
        } catch (e) {
            console.log(e)
        }
    },
    async updateTask(_, payload) {
        try {
            await api.patch(`tasks/edit/${payload.id}`, {}, {
                params: {
                    status: payload.status
                }
            })
        } catch (e) {
            console.log(e)
        }
    },
    async removeTask(_, payload) {
        try {
            const {data} = await api.post(`tasks/remove/${payload}`)
            return data
        } catch (e) {
            console.log(e)
        }
    }
}

const getters = {
    allTasks: state => state.allTasks,
    currentTask: state => state.currentTask,
    userTasks: state => state.userTasks,
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}