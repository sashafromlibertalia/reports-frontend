<template>
    <div>
        <h1 class="page-title">Задачи</h1>
        <div class="task-board-wrapper">
            <template v-if="this.allTasks.length > 0">
                <TasksBoard :status="statuses.WAITING" @change="openForm"/>
                <TasksBoard :status="statuses.IN_PROGRESS" @change="openForm"/>
                <TasksBoard :status="statuses.DONE" @change="openForm"/>
            </template>
            <EmptyData v-else/>
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
                        <input placeholder="Поставить мне 100 баллов" required>
                    </div>
                    <div class="creation-item">
                        <h3>Описание</h3>
                        <input placeholder="В обязательном порядке">
                    </div>
                    <div class="creation-item">
                        <h3>Исполнитель</h3>
                        <b-form-select></b-form-select>
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
        }
    },
    computed: {
        ...mapGetters('tasks', ['allTasks'])
    },
    methods: {
        ...mapActions('tasks', ['getAllTasks']),
        openForm(e) {
            this.isCreatingTask = true
            if (Object.values(taskStatuses).includes(e)) {
                this.taskType = e
            }
        },
        handleCreateNewTask() {
            this.isCreatingTask = false
        },
    },
    async mounted() {
        await this.getAllTasks()
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