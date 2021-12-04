<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center">
            <h1 class="page-title">Задача #{{ this.currentTask.id }}</h1>
            <div class="task-status">
                <span :style="{background: getStatusColor(this.currentTask.status)}"></span>
                <p>{{ status }}</p>
            </div>
        </div>
        <div style="display: flex; flex-direction: column; justify-content: flex-start">
            <div class="task-content-section">
                <h3>Название задачи:</h3>
                <p>{{ this.currentTask.name }}</p>
            </div>
            <div class="task-content-section">
                <h3>Описание задачи:</h3>
                <p>{{ this.currentTask.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import taskStatuses from "@/store/enums/taskStatuses";
import colors from "@/store/enums/colors";

export default {
    name: "TaskPage",
    props: {
        id: String
    },
    computed: {
        ...mapGetters('tasks', ['currentTask']),
        status() {
            return taskStatuses[this.currentTask.status]
        }
    },
    methods: {
        ...mapActions('tasks', ['getSingleTask']),
        getStatusColor(status) {
            switch (taskStatuses[status]) {
                case taskStatuses.WAITING:
                    return colors.WAITING
                case taskStatuses.IN_PROGRESS:
                    return colors.IN_PROGRESS
                case taskStatuses.DONE:
                    return colors.DONE
            }
        }
    },
    async mounted() {
        await this.getSingleTask(this.id)
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/views/TaskPage";
</style>