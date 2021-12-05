<template>
    <div class="task-board">
        <section class="task-board-type">
            <div class="task-type-wrapper">
                <h3>{{ this.status }}: {{ this.tasks.length }}</h3>
                <unicon name="plus-circle" :fill="getFill(this.status)" @click="addTask(status)"/>
            </div>
            <span class="underline" :style="{background: getFill(status)}"/>
        </section>
        <div class="task-board-content">
            <template v-for="(item, index) in tasks">
                <TaskItem :key="index" :item="item"/>
            </template>
        </div>
    </div>
</template>

<script>
import TaskItem from "@/components/taskboard/TaskItem";
import colors from "@/store/enums/colors";
import taskStatuses from "@/store/enums/taskStatuses";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "TasksBoard",
    props: {
        status: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            colors: colors,
            statuses: taskStatuses
        }
    },
    computed: {
        ...mapGetters('tasks', ['allTasks']),
        tasks() {
            switch (this.status) {
                case taskStatuses.WAITING:
                    return this.allTasks.filter(item => taskStatuses[item.status] === taskStatuses.WAITING)
                case taskStatuses.IN_PROGRESS:
                    return this.allTasks.filter(item => taskStatuses[item.status] === taskStatuses.IN_PROGRESS)
                case taskStatuses.DONE:
                    return this.allTasks.filter(item => taskStatuses[item.status] === taskStatuses.DONE)
                default:
                    return []
            }
        }
    },
    methods: {
        ...mapActions('tasks', ['getAllTasks', 'getUserTasks']),
        getFill(status) {
            switch (status) {
                case taskStatuses.WAITING:
                    return colors.WAITING
                case taskStatuses.IN_PROGRESS:
                    return colors.IN_PROGRESS
                case taskStatuses.DONE:
                    return colors.DONE
            }
        },
        addTask(e) {
            this.$emit('change', e)
        },
    },
    components: {
        TaskItem,
    }
}
</script>
<style lang="scss">
@import "../../assets/styles/views/Tasks";
</style>
