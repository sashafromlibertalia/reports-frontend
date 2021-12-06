import Vue from 'vue'
import VueRouter from 'vue-router'

import Tasks from "@/views/Tasks";
import SidebarActions from "@/store/enums/sidebarActions";
import Sprints from "@/views/Sprints";
import MyEmployees from "@/views/MyEmployees";
import CreateEmployee from "@/views/actions/CreateEmployee";
import TaskPage from "@/views/tasks/TaskPage";
import NotFound from "@/views/NotFound"
import EmployeePage from "@/views/employees/EmployeePage";

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
    },
    {
        path: "/tasks/:id",
        name: "TaskPage",
        component: TaskPage,
        props: true
    },
    {
        path: "/employees/:id",
        name: "EmployeePage",
        component: EmployeePage,
        props: true
    },
    {
        path: '/404',
        name: '404',
        component: NotFound
    },
    {
        path: '*',
        redirect: '/404'
    }]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    if (!to.matched.length) {
        next('/404');
    } else {
        next();
    }
})

export default router