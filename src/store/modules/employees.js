import api from '@/middlewares/api'
import staffQuery from "@/store/enums/employees/staffQuery";

const state = {
    allUsers: null,
    currentUser: null,
    staff: null,
    staffWithReports: null,
    staffWithoutReports: null
}

const mutations = {
    SET_ALL_EMPLOYEES(state, payload) {
        state.allUsers = payload
    },
    SET_CURRENT_USER(state, payload) {
        state.currentUser = payload
    },
    RESET_CURRENT_USER(state) {
        state.currentUser = null
    },
    SET_STAFF_MEMBERS(state, payload) {
        state.staff = payload
    },
    SET_STAFF_WITH_REPORTS(state, payload) {
        state.staffWithReports = payload
    },
    SET_STAFF_WITHOUT_REPORTS(state, payload) {
        state.staffWithoutReports = payload
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
    async setCurrentUser({commit}, payload) {
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
    },
    async getStaffOfUser({commit}, payload) {
        try {
            const {data} = await api.get(`employees/staff/${payload}`, {}, {
                params: {
                    type: staffQuery.ALL
                }
            })
            commit('SET_STAFF_MEMBERS', data)
        } catch (e) {
            console.log(e)
        }
    },
    async getStaffWithReports({commit}, payload) {
        try {
            const {data} = await api.get(`employees/staff/${payload}`, {}, {
                params: {
                    type: staffQuery.WITH_REPORTS
                }
            })
            commit('SET_STAFF_WITH_REPORTS', data)
        }
        catch(e) {
            console.log(e)
        }
    },
    async getStaffWithoutReports({commit}, payload) {
        try {
            const {data} = await api.get(`employees/staff/${payload}`,{
                params: {
                    type: staffQuery.WITHOUT_REPORTS
                }
            })
            commit('SET_STAFF_WITHOUT_REPORTS', data)
        }
        catch(e) {
            console.log(e)
        }
    },
}

const getters = {
    allUsers: state => state.allUsers,
    currentUser: state => state.currentUser,
    staff: state => state.staff,
    staffWithReports: state => state.staffWithReports,
    staffWithoutReports: state => state.staffWithoutReports
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}