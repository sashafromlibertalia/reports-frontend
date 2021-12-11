<template>
    <div>
        <h1 class="page-title">Задачи</h1>
        <div class="task-board-wrapper" :style="{flexDirection: this.sprintTasks.length > 0 ? 'row' : 'column', alignItems: this.sprintTasks.length > 0 ? null : 'center'}">
            <template v-if="this.sprintTasks.length > 0">
                <TasksBoard :status="statuses.WAITING" @change="openForm"/>
                <TasksBoard :status="statuses.IN_PROGRESS" @change="openForm"/>
                <TasksBoard :status="statuses.DONE" @change="openForm"/>
            </template>
            <template style="align-items: center" v-else>
                <EmptyData/>
                <section style="margin-top: 10rem; width: 30%">
                    <button type="submit" class="submit-new-item" @click="openForm(statuses.WAITING)">Добавить задачу</button>
                </section>
            </template>
        </div>
        <div class="mask" v-if="isCreatingTask"></div>
        <div class='drawer' :class='{ active: isCreatingTask }'>
            <div class='wrapper'>
                <span class="close-form" @click="isCreatingTask = false">
                      <unicon name="times-circle" fill="white"/>
                </span>
                <section>
                    <div class="creation-item">
                        <h3>Название таски</h3>
                        <input placeholder="Поставить мне 100 баллов" required v-model="form.name">
                    </div>
                    <div class="creation-item">
                        <h3>Описание</h3>
                        <input placeholder="В обязательном порядке" v-model="form.description">
                    </div>
                    <div class="creation-item">
                        <h3>Исполнитель</h3>
                        <b-form-select style="width: 100%; padding: 8px 16px; border: none" class="bg-dark text-white" :options="options" v-model="form.employeeId"></b-form-select>
                    </div>
                </section>
                <section>
                    <button type="submit" class="submit-new-item" @click="handleCreateNewTask">Добавить</button>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import TasksBoard from "@/components/taskboard/TasksBoard";
import taskStatuses from "@/store/enums/taskStatuses";
import EmptyData from "@/views/EmptyData";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "Tasks",
    data() {
        return {
            statuses: taskStatuses,
            isCreatingTask: false,
            taskType: null,
            options: null,
            form: {
                name: null,
                description: null,
                employeeId: null,
                status: null,
                sprint: null
            }
        }
    },
    computed: {
        ...mapGetters(['profile']),
        ...mapGetters('sprints', ['currentSprint']),
        ...mapGetters('tasks', ['sprintTasks']),
        ...mapGetters('employees', ['allUsers', 'currentUser']),
    },
    methods: {
        ...mapActions('sprints', ['getCurrentSprint']),
        ...mapActions('tasks', ['getSprintTasks', 'createTask']),
        ...mapActions('employees', ['getAllUsers', 'setCurrentUser']),
        getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
        },
        openForm(e) {
            if (this.currentSprint === null) {
                alert('Сначала нужно создать спринт')
            } else {
                this.isCreatingTask = true
                if (Object.values(taskStatuses).includes(e)) {
                    this.taskType = e
                    this.form.status = this.getKeyByValue(taskStatuses, e)
                    this.form.sprint = this.currentSprint.id
                }
            }
        },
        async handleCreateNewTask() {
            await this.createTask(this.form).then(async () => {
                this.isCreatingTask = false
                await this.$toasted.show('Задача добавлена', {
                    duration : 5000
                })
                await this.getSprintTasks(this.currentSprint.id)
            })
        },
    },
    async mounted() {
        await this.getCurrentSprint()
        await this.getSprintTasks(this.currentSprint.id)
        await this.getAllUsers()
        await this.setCurrentUser(this.profile.id)
        this.options = this.allUsers.map(item => {
            return {
                text: item.name,
                value: item.id
            }
        })
    },
    components: {
        TasksBoard,
        EmptyData,
    }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/views/Tasks";
</style>