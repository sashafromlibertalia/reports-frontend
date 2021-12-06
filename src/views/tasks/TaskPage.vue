<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline">
            <div style="display: flex; justify-content: flex-start; align-items: baseline">
                <unicon name="arrow-left" fill="white" @click="handleBack" width="50" height="50"/>
                <h1 class="page-title">Задача #{{ this.currentTask.id }}</h1>
            </div>
            <div class="task-status">
                <span :style="{background: getStatusColor(this.currentTask.status)}"></span>
                <b-form-select class="bg-dark text-white" v-model="selected" :options="options" @change="handleChangeStatus"></b-form-select>
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
    data() {
        return {
            selected: null,
            options: Object.entries(taskStatuses).map(([value, text]) => ({value, text}))
        }
    },
    computed: {
        ...mapGetters('tasks', ['currentTask']),
    },
    methods: {
        ...mapActions('tasks', ['getSingleTask', 'updateTask']),
        getStatusColor(status) {
            switch (taskStatuses[status]) {
                case taskStatuses.WAITING:
                    return colors.WAITING
                case taskStatuses.IN_PROGRESS:
                    return colors.IN_PROGRESS
                case taskStatuses.DONE:
                    return colors.DONE
            }
        },
        async handleChangeStatus(e) {
            await this.updateTask({
                id: this.id,
                status: e
            }).then(() => {
                this.$router.go(-1)
            })
        },
        handleBack() {
            this.$router.go(-1)
        }
    },
    async mounted() {
        await this.getSingleTask(this.id)
        this.selected = this.currentTask.status
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/views/TaskPage";
</style>