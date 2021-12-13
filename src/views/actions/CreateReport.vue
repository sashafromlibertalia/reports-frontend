<template>
    <div class="create-employee-container" v-if="this.userTasks !== null">
        <h1 class="page-title">Создать отчет</h1>
        <div class="preview">
            <h3>Список задач</h3>
            <div style="margin-top: 1rem">
                <h5>Краткая сводка</h5>
                <b-progress class="mt-2"
                            :max="this.userTasks.filter(item => item.sprint === this.currentSprint.id).length"
                            show-value>
                    <b-progress-bar
                        :value="this.userTasks.filter(item => status[item.status] === status.WAITING).length"
                        variant="secondary"></b-progress-bar>
                    <b-progress-bar
                        :value="this.userTasks.filter(item => status[item.status] === status.IN_PROGRESS).length"
                        variant="warning"></b-progress-bar>
                    <b-progress-bar :value="this.userTasks.filter(item => status[item.status] === status.DONE).length"
                                    variant="success"></b-progress-bar>
                </b-progress>
            </div>
            <div class="employees-container" style="margin-top: 2rem">
                <template v-for="(task, index) in this.userTasks.filter(item => item.sprint === this.currentSprint.id)">
                    <TaskItem :key="index" :item="task"/>
                </template>
            </div>
        </div>
        <div class="preview">
            <h3>Описание отчета</h3>
            <b-form-textarea id="textarea-default"
                             v-model="form.description"
                             class="bg-dark text-white" placeholder="Я так старался сделать репорты, что лишился сна..."
                             rows="2" style="border: none;" max-rows="10"></b-form-textarea>
        </div>
        <div class="preview" v-if="this.profile.role !== role.WORKER">
            <h3>Отчеты сотрудников</h3>
            <div class="employees-container">
                <template v-for="(item, index) in staffReports">
                    <ReportCard :item="item" :key="index"/>
                </template>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; width: 30rem">
            <button type="submit" class="submit-new-item"
                    style="width: fit-content; font-size: 1.1rem; margin-top: 2rem; padding: 8px 16px"
                    @click="handleDraft">Добавить черновик
            </button>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TaskItem from "@/components/taskboard/TaskItem";
import taskStatuses from "@/store/enums/taskStatuses";
import reports from "@/store/enums/reports";
import roles from "@/store/enums/roles";
import ReportCard from "@/components/ReportCard";

export default {
    name: "CreateReport",
    data() {
        return {
            status: taskStatuses,
            role: roles.roles,
            staffReports: [],
            form: {
                author: null,
                sprint: null,
                description: null,
                status: null,
                tasks: [],
                staffReports: [],
            }
        }
    },
    computed: {
        ...mapGetters(['profile']),
        ...mapGetters('sprints', ['currentSprint']),
        ...mapGetters('tasks', ['sprintTasks', 'userTasks']),
        ...mapGetters('employees', ['staffWithReports']),
        ...mapGetters('reports', ['sprintReports'])
    },
    methods: {
        ...mapActions('sprints', ['getCurrentSprint']),
        ...mapActions('tasks', ['getUserTasks', 'getSprintTasks']),
        ...mapActions('reports', ['saveReport', 'getSprintReports']),
        ...mapActions('employees', ['getStaffOfUser', 'getStaffWithReports']),
        async handleDraft() {
            if (this.currentSprint === null) {
                alert('Сначала нужно создать спринт')
            } else {
                await this.saveReport(this.form).then(async () => {
                    await this.$toasted.show('Черновик репорта был сохранен', {
                        duration: 5000
                    })
                    this.form = {
                        author: null,
                        sprint: null,
                        description: null,
                        status: null,
                        tasks: [],
                        newStaffReports: []
                    }
                    this.$router.go(-1)
                })
            }
        },
    },
    async mounted() {
        await this.getCurrentSprint()
        await this.getSprintReports()
        if (this.profile !== null) {
            await this.getUserTasks(this.profile.id)
            await this.getStaffWithReports(this.profile.id)
            if (this.staffWithReports.length > 0) {
                for (let user of this.staffWithReports) {
                    this.staffReports.push(this.sprintReports.filter(item => item.author === user.id)[0])
                }
            }

            this.form = {
                author: this.profile.id,
                sprint: this.currentSprint.id,
                status: reports.reports.DRAFT,
                tasks: this.userTasks,
                newStaffReports: this.staffReports
            }
        }
    },
    components: {
        ReportCard,
        TaskItem
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/views/CreateReport";
</style>