import api from '@/middlewares/api'

const state = {
    allReports: null,
    currentReport: null,
    sprintReports: null,
}

const mutations = {
    SET_ALL_REPORTS(state, payload) {
        state.allReports = payload
    },
    SET_CURRENT_REPORT(state, payload) {
        state.currentReport = payload
    },
    SET_SPRINT_REPORTS(state, payload) {
        state.sprintReports = payload
    }
}

const actions = {
    async getAllReports({commit}) {
        try {
            const {data} = await api.get('reports')
            commit('SET_ALL_REPORTS', data)
        } catch (e) {
            console.log(e)
        }
    },
    async getSprintReports({commit}) {
        try {
            const {data} = await api.get('reports')
            commit('SET_SPRINT_REPORTS', data)
        } catch (e) {
            console.log(e)
        }
    },
    async getReport({commit}, payload) {
        try {
            const {data} = await api.get(`reports/${payload}`)
            commit('SET_CURRENT_REPORT', data)
        } catch (e) {
            console.log(e)
        }
    },
    async saveReport(_, payload) {
        try {
            await api.post('reports', payload)
        } catch (e) {
            console.log(e)
        }
    },
    async deleteReport(_, payload) {
        try {
            await api.post(`reports/delete/${payload}`)
        } catch (e) {
            console.log(e)
        }
    },
    async updateReport(_, payload) {
        try {
            await api.patch(`reports/update/${payload.id}`, payload.body)
        } catch (e) {
            console.log(e)
        }
    },
    async approveReports(_, payload) {
        try {
            await api.patch('reports/approve',{
                leadId: payload
            })
        } catch (e) {
            console.log(e)
        }
    }
}

const getters = {
    allReports: state => state.allReports,
    currentReport: state => state.currentReport,
    sprintReports: state => state.sprintReports
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}