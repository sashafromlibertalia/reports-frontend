
const routes = Object.freeze({
    TASKS: {
        name: "Задачи",
        icon: "tasks.svg",
        link: "/tasks",
        isAll: true
    },
    MY_EMPLOYEES: {
        name: "Мои сотрудники",
        icon: "employees.svg",
        link: "/employees",
        isAll: false
    },
    SPRINTS: {
        name: "Спринты",
        icon: "sprints.svg",
        link: "/sprints",
        isAll: true
    },
    NEW_EMPLOYEE: {
        name: "Новый сотрудник",
        icon: "new-employee.svg",
        link: "/create/employee",
        isAll: false
    },
    NEW_REPORT: {
        name: "Новый отчет",
        icon: "new-report.svg",
        link: "/create/report",
        isAll: true
    }
})

export default routes