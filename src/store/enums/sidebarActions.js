const routes = Object.freeze({
    TASKS: {
        name: "Задачи",
        icon: "tasks.svg",
        link: "/tasks",
        isAll: true
    },
    ALL_EMPLOYEES: {
        name: "Все сотрудники",
        icon: "all-employees.svg",
        link: "/employees",
        isAll: true
    },
    ALL_REPORTS: {
        name: "Отчеты",
        icon: "reports.svg",
        link: "/reports",
        isAll: true
    },
    MY_EMPLOYEES: {
        name: "Мои сотрудники",
        icon: "employees.svg",
        link: "/my-employees",
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
        link: "/reports/create",
        isAll: true
    }
})

export default routes