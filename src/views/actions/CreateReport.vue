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

export default {
    name: "CreateReport",
    data() {
        return {
            status: taskStatuses,
            form: {
                author: null,
                sprint: null,
                description: null,
                status: null,
                tasks: []
            }
        }
    },
    computed: {
        ...mapGetters(['profile']),
        ...mapGetters('sprints', ['currentSprint']),
        ...mapGetters('tasks', ['sprintTasks', 'userTasks']),
        ...mapGetters('employees', ['staff'])
    },
    methods: {
        ...mapActions('sprints', ['getCurrentSprint']),
        ...mapActions('tasks', ['getUserTasks', 'getSprintTasks']),
        ...mapActions('reports', ['saveReport']),
        ...mapActions('employees', ['getStaffOfUser']),
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
                        tasks: []
                    }
                })
            }
        },
    },
    async mounted() {
        await this.getCurrentSprint()
        if (this.profile !== null) {
            await this.getStaffOfUser(this.profile.id)
            await this.getUserTasks(this.profile.id)
            this.form = {
                author: this.profile.id,
                sprint: this.currentSprint.id,
                status: reports.DRAFT,
                tasks: this.userTasks.map(item => {
                    return {
                        taskId: item.id
                    }
                })
            }
        }
    },
    components: {
        TaskItem
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/views/CreateReport";
@import "src/assets/styles/views/MyEmployees";
</style>