<template>
    <div>
        <h1 class="page-title">Задачи</h1>
        <div class="task-board-wrapper">
            <template v-if="tasks.length > 0">
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
import TasksBoard from "@/components/TasksBoard/TasksBoard";
import taskStatuses from "@/store/enums/taskStatuses";
import EmptyData from "@/views/EmptyData";

export default {
    name: "Tasks",
    data() {
        return {
            statuses: taskStatuses,
            isCreatingTask: false,
            taskType: null,
            tasks: [
                {
                    status: taskStatuses.WAITING
                }
            ]
        }
    },
    methods: {
        openForm(e) {
            this.isCreatingTask = true
            if (Object.values(taskStatuses).includes(e)) {
                this.taskType = e
            }
        },
        handleCreateNewTask() {
            alert(this.taskType)
            this.isCreatingTask = false
        },
    },
    components: {
        TasksBoard,
        EmptyData
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/Tasks";
</style>