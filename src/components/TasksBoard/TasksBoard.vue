<template>
    <div class="task-board">
        <section class="task-board-type">
            <div class="task-type-wrapper">
                <h3>{{this.status}}</h3>
                <unicon name="plus-circle" :fill="getFill(this.status)" />
            </div>
            <span class="underline" :style="{background: getFill(status)}"/>
        </section>
        <div>
            <TaskItem/>
            <TaskItem/>
            <TaskItem/>
            <TaskItem/>
            <TaskItem/>
            <TaskItem/>
        </div>
    </div>
</template>

<script>
import TaskItem from "@/components/TasksBoard/TaskItem";
import colors from "@/store/enums/colors";
import taskStatuses from "@/store/enums/taskStatuses";

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
    methods: {
        getFill(status) {
            switch (status) {
                case taskStatuses.WAITING:
                    return colors.WAITING
                case taskStatuses.IN_PROGRESS:
                    return colors.IN_PROGRESS
                case taskStatuses.DONE:
                    return colors.DONE
            }
        }
    },
    components: {
        TaskItem
    }
}
</script>
<style lang="scss">
@import "src/assets/styles/components/Tasks";
</style>
