<template>
    <div>
        <h1 class="page-title">Задачи</h1>
        <div class="task-board-wrapper">
            <TasksBoard :status="statuses.WAITING"/>
            <TasksBoard :status="statuses.IN_PROGRESS"/>
            <TasksBoard :status="statuses.DONE"/>
        </div>
    </div>
</template>

<script>
import TasksBoard from "@/components/TasksBoard/TasksBoard";
import taskStatuses from "@/store/enums/taskStatuses";

export default {
    name: "Tasks",
    data() {
        return {
            statuses: taskStatuses
        }
    },
    components: {
        TasksBoard
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/Tasks";
</style>