<template>
    <div>
        <h1 class="page-title">Задача #{{this.currentTask.id}}</h1>
        <div style="display: flex; flex-direction: column; justify-content: flex-start">
            <div class="task-content-section">
                <h3>Название задачи:</h3>
                <p>{{this.currentTask.name}}</p>
            </div>
            <div class="task-content-section">
                <h3>Описание задачи:</h3>
                <p>{{this.currentTask.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "TaskPage",
    props: {
        id: String
    },
    computed: {
        ...mapGetters('tasks', ['currentTask'])
    },
    methods: {
        ...mapActions('tasks', ['getSingleTask'])
    },
    async mounted() {
        await this.getSingleTask(this.id)
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/views/TaskPage";
</style>