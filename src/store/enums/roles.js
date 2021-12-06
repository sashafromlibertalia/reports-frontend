const roles = Object.freeze({
    LEAD: 'LEAD',
    MANAGER: 'MANAGER',
    WORKER: 'WORKER'
})

const roleParser = Object.freeze({
    LEAD: 'Тимлид',
    MANAGER: 'Руководитель',
    WORKER: 'Сотрудник'
})

export default { roles, roleParser}