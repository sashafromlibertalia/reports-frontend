import Vue from 'vue'
import Vuex from 'vuex'

import tasks from './modules/tasks'
import employees from "@/store/modules/employees";

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        tasks,
        employees
    }
})