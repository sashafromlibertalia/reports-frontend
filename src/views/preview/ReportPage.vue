<template>
    <div v-if="this.currentReport !== null">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-direction: column">
            <div style="display: flex; justify-content: flex-start; align-items: baseline">
                <unicon name="arrow-left" fill="white" @click="handleBack" width="50" height="50"/>
                <h1 class="page-title">Отчет #{{ this.id }}</h1>
            </div>
            <div v-if="this.currentReport.status === status.DRAFT && this.currentReport.author === this.profile.id" style="display: flex; justify-content: space-between; align-items: center; width: 20%; margin-bottom: 2rem">
                <button type="submit" class="submit-new-item" style="width: 8rem; font-size: 1rem; padding: 12px 16px;" @click="handleSave">Сохранить</button>
                <button class="delete-item" type="button" style="margin: 0; width: 8rem" @click="handleDelete">Удалить</button>
            </div>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: flex-start">
            <div class="task-content-column">
                <div class="task-content-section">
                    <h3>Автор:</h3>
                    <p>
                        <router-link :to="{name: 'EmployeePage', params: {id: this.currentReport.author}}">{{ author }}</router-link>
                    </p>
                </div>
                <div class="task-content-section">
                    <h3>Задач:</h3>
                    <p>{{ this.currentReport.tasks.length }}</p>
                </div>
            </div>
            <div class="task-content-column">
                <div class="task-content-section">
                    <h3>Отчет был создан:</h3>
                    <p>{{ createdAt }}</p>
                </div>
                <div class="task-content-section">
                    <h3>Отчет был обновлен:</h3>
                    <p>{{ editedAt }}</p>
                </div>
            </div>
        </div>
        <div class="task-content-section">
            <h3>Описание отчета:</h3>
            <p>{{ this.currentReport.description }}</p>
        </div>
        <div class="preview">
            <h3>Задачи, прикрепленные к отчету</h3>
            <div class="employees-container">
                <template v-for="(task, index) in addedTasks">
                    <TaskItem :item="task" :key="index"/>
                </template>
            </div>
        </div>
        <div class="preview" v-if="this.currentReport.status === status.DRAFT && this.currentReport.author === this.profile.id">
            <h3>Новые задачи для отчета</h3>
            <div class="employees-container">
                <template v-for="(task, index) in newTasks">
                    <TaskItem :item="task" :key="index"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import moment from "moment";
import TaskItem from "@/components/taskboard/TaskItem";
import reports from "@/store/enums/reports";

export default {
    name: "ReportPage",
    components: {TaskItem},
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            author: null,
            addedTasks: [],
            newTasks: [],
            status: reports.reports,
            form: {
                id: null,
                body: {
                    author: null,
                    sprint: null,
                    description: null,
                    status: null,
                    tasks: [],
                    staffReports: []
                }
            }
        }
    },
    computed: {
        ...mapGetters(['profile']),
        ...mapGetters('sprints', ['currentSprint']),
        ...mapGetters('reports', ['currentReport']),
        ...mapGetters('tasks', ['sprintTasks']),
        ...mapGetters('employees', ['allUsers']),
        createdAt() {
            return moment(this.currentReport.createdAt).format("DD/MM/YYYY, HH:mm:ss")
        },
        editedAt() {
            return moment(this.currentReport.editedAt).format("DD/MM/YYYY, HH:mm:ss")
        }
    },
    methods: {
        ...mapActions('sprints', ['getCurrentSprint']),
        ...mapActions('reports', ['getReport', 'deleteReport', 'updateReport']),
        ...mapActions('tasks', ['getSprintTasks']),
        ...mapActions('employees', ['setCurrentUser', 'removeUser', 'getAllUsers']),
        handleBack() {
            this.$router.go(-1)
        },
        async handleSave() {
            this.form = {
                id: this.currentReport.id,
                body: {
                    author: this.currentReport.author,
                    sprint: this.currentSprint.id,
                    description: null,
                    status: reports.reports.SUBMITTED,
                    tasks: [],
                    staffReports: []
                }
            }
            await this.updateReport(this.form).then(() => {
                this.$toasted.show('Отчет был обновлен', {
                    duration: 5000
                })
                this.handleBack()
            })
        },
        async handleDelete() {
            await this.deleteReport(this.currentReport.id).then(() => {
                this.$toasted.show('Отчет был удален', {
                    duration: 5000
                })
                this.handleBack()
            })
        }
    },
    async mounted() {
        await this.getCurrentSprint()
        await this.getReport(this.id)
        await this.getAllUsers()
        await this.getSprintTasks(this.currentSprint.id)

        if (this.currentReport !== null) {
            if (this.allUsers !== null)
                this.author = this.allUsers.filter(item => item.id === this.currentReport.author)[0] === undefined ? ''
                    : this.allUsers.filter(item => item.id === this.currentReport.author)[0].name

            for (let added of this.currentReport.tasks) {
                this.addedTasks.push(this.sprintTasks.filter(item => item.employeeId === this.currentReport.author && added.taskId === item.id)[0])
            }

            this.newTasks = this.sprintTasks.filter(item => item.employeeId === this.currentReport.author).filter(item => moment(item.createdAt).isAfter(moment(this.currentReport.createdAt)) && !this.addedTasks.includes(item))
        }
    }
}
</script>