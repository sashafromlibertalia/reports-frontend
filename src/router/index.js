import Vue from 'vue'
import VueRouter from 'vue-router'

import Tasks from "@/views/Tasks";
import SidebarActions from "@/store/enums/sidebarActions";
import Sprints from "@/views/Sprints";


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
    }]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router