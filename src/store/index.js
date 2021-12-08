import Vue from 'vue'
import Vuex from 'vuex'
import helpers from "@/middlewares/helpers";

import tasks from './modules/tasks'
import employees from "@/store/modules/employees";

import router from '@/router/index'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        profile: null
    },
    mutations: {
        AUTH_SUCCESS(state, payload) {
            state.profile = payload.id
            state.isAuthenticated = true
        },
        LOGOUT(state) {
            state.profile = null
            state.isAuthenticated = false
        },
        REFRESH_AUTH(state, payload) {
            state.isAuthenticated = payload.token !== null
            state.profile = payload.token
        },
    },
    actions: {
        async signIn({commit, dispatch}, payload) {
            try {
                helpers.handleUser(payload)
                dispatch('employees/getCurrentUser', payload)
                commit('AUTH_SUCCESS', this.getters["employees/currentUser"])
                await router.push('/tasks')
            } catch (e) {
                console.log(e)
            }
        },
        async refreshAuth({ commit }) {
            const token = helpers.getUser()
            commit('REFRESH_AUTH', { token })
        },
        async signOut({commit}) {
            try {
                helpers.removeUser()
                commit('LOGOUT')
                await router.push('/')
            } catch (e) {
                console.log(e)
            }
        }
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        profile: state => state.profile
    },
    modules: {
        tasks,
        employees
    }
})