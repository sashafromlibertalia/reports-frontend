import Vue from 'vue'
import Vuex from 'vuex'
import helpers from "@/middlewares/helpers";

import tasks from './modules/tasks'
import employees from "@/store/modules/employees";

import api from "@/middlewares/api";
import router from '@/router/index'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        isAuthenticated: false,
        profile: null
    },
    mutations: {
        AUTH_SUCCESS(state, payload) {
            state.profile = payload
            state.isAuthenticated = true
        },
        LOGOUT(state) {
            state.profile = null
            state.isAuthenticated = false
        },
        REFRESH_AUTH(state, payload) {
            state.isAuthenticated = payload !== null
            state.profile = payload
        },
    },
    actions: {
        async signIn({commit}, payload) {
            try {
                await helpers.handleUser(payload)
                await api.get(`employees/${payload}`).then(({data}) => {
                    commit('AUTH_SUCCESS', data)
                })
                await router.push('/tasks')
            } catch (e) {
                console.log(e)
            }
        },
        async refreshAuth({commit}) {
            const token = helpers.getUser()
            await api.get(`employees/${token}`).then(({data}) => {
                commit('REFRESH_AUTH', data)
            }).catch(async () => {
                await helpers.removeUser()
                await commit('LOGOUT')
                await router.push('/')
            })
        },
        async signOut({commit}) {
            try {
                await helpers.removeUser()
                await commit('LOGOUT')
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