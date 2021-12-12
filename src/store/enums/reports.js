const reports = Object.freeze({
    DRAFT: "DRAFT",
    SUBMITTED: "SUBMITTED",
    APPROVED: "APPROVED"
})

const reportsParser = Object.freeze({
    DRAFT: "Черновик",
    SUBMITTED: "Сохранено",
    APPROVED: "Одобрено"
})

export default { reports, reportsParser}