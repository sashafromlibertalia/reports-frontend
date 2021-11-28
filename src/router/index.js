import Vue from 'vue'
import VueRouter from 'vue-router'

import Tasks from "@/views/Tasks";
import SidebarActions from "@/store/enums/sidebarActions";
import Sprints from "@/views/Sprints";
import MyEmployees from "@/views/MyEmployees";
import CreateEmployee from "@/views/actions/CreateEmployee";

Vue.use(VueRouter)
const routes = [
    {
        path: SidebarActions.TASKS.link,
        name: 'Tasks',
        component: Tasks
    },
    {
        path: SidebarActions.SPRINTS.link,
        name: 'Sprints',
        component: Sprints
    },
    {
        path: SidebarActions.MY_EMPLOYEES.link,
        name: 'MyEmployees',
        component: MyEmployees
    },
    {
        path: SidebarActions.NEW_EMPLOYEE.link,
        name: 'CreateEmployee',
        component: CreateEmployee
    }]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router