<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline">
            <div style="display: flex; justify-content: flex-start; align-items: baseline">
                <unicon name="arrow-left" fill="white" @click="handleBack" width="50" height="50"/>
                <h1 class="page-title">Задача #{{ this.currentTask.id }}</h1>
            </div>
            <div class="task-status">
                <span :style="{background: getStatusColor(this.currentTask.status)}"></span>
                <b-form-select class="bg-dark text-white" v-model="selected" :options="options"
                               @change="handleChangeStatus"></b-form-select>
            </div>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: flex-start">
            <div class="task-content-column">
                <div class="task-content-section">
                    <h3>Название задачи:</h3>
                    <p>{{ this.currentTask.name }}</p>
                </div>
                <div class="task-content-section">
                    <h3>Исполняющий задачу:</h3>
                    <router-link :to="'/employees/' + this.currentTask.employeeId">{{ assigned }}</router-link>
                </div>
            </div>
            <div class="task-content-column">
                <div class="task-content-section">
                    <h3>Описание задачи:</h3>
                    <p>{{ description }}</p>
                </div>
                <div class="task-content-section">
                    <h3>Дата создания:</h3>
                    <p>{{ creationDate }}</p>
                </div>
            </div>
        </div>
        <button class="delete-item" type="button" @click="handleRemoveTask">Удалить задачу</button>
        <div class="preview">
            <h3>История</h3>
            <b-row class="mt-2">
                <b-col sm="10">
                    <b-form-textarea
                        id="textarea-default"
                        class="bg-dark text-white"
                        placeholder="Добавить комментарий"
                        rows="1"
                        v-model="form.body.message"
                        style="border: none;"
                        max-rows="8"></b-form-textarea>
                    <div v-if="form.body.message !== null && form.body.message.length > 0"
                         style="display: flex; justify-content: space-between; width: 16rem">
                        <button type="submit" class="submit-new-item"
                                style="width: fit-content; font-size: 1.1rem; margin-top: 2rem; padding: 8px 16px"
                                @click="handleSaveComment">Сохранить</button>
                        <button type="submit" class="cancel"
                                style="width: fit-content; font-size: 1.1rem; margin-top: 2rem; padding: 8px 16px"
                                @click="form.body.message = null">Отмена</button>
                    </div>
                </b-col>
            </b-row>
            <div class="history">
                <template v-for="(item, index) in comments" style="display: flex; justify-content: flex-end">
                    <HistoryItem :item="item" :key="index"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import taskStatuses from "@/store/enums/taskStatuses";
import colors from "@/store/enums/colors";
import HistoryItem from "@/components/HistoryItem";

export default {
    name: "TaskPage",
    props: {
        id: String
    },
    data() {
        return {
            selected: null,
            options: Object.entries(taskStatuses).map(([value, text]) => ({value, text})),
            comment: null,
            comments: null,
            form: {
                body: {
                    message: null,
                    author: null,
                },
                id: null
            },
            assigned: null
        }
    },
    computed: {
        ...mapGetters(['profile']),
        ...mapGetters('employees', ['allUsers']),
        ...mapGetters('tasks', ['currentTask']),
        ...mapGetters('comments', ['currentComments']),
        creationDate() {
            return this.moment(this.currentTask.createdAt).format("DD/MM/YYYY")
        },
        description() {
            if (this.currentTask.description !== null) {
                return this.currentTask.description
            } else {
                return 'Нет описания'
            }
        },
    },
    methods: {
        ...mapActions('employees', ['getAllUsers']),
        ...mapActions('comments', ['saveComment', 'getCommentsForTask']),
        ...mapActions('tasks', ['getSingleTask', 'updateTask', 'removeTask']),
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
        async handleRemoveTask() {
            if (await this.removeTask(this.id)) {
                this.$toasted.show('Задача была удалена', {
                    duration: 5000
                })
                this.handleBack()
            } else {
                this.$toasted.show('Задача не была удалена', {
                    duration: 5000
                })
                this.handleBack()
            }
        },
        async handleSaveComment() {
            await this.saveComment(this.form).then(async () => {
                await this.getSingleTask(this.id)
                this.form.body.message = null
                this.comments = this.currentTask.comments.sort((a, b) => {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                })
            })
        },
        handleBack() {
            this.$router.go(-1)
        }
    },
    async mounted() {
        await this.getAllUsers()
        await this.getSingleTask(this.id)
        this.selected = this.currentTask.status
        this.assigned = this.allUsers.filter(item => item.id === this.currentTask.employeeId)[0].name

        this.form.body.author = this.profile.id
        this.form.id = this.id
        this.comments = this.currentTask.comments.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        })
    },
    components: {
        HistoryItem
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/views/TaskPage";
</style>