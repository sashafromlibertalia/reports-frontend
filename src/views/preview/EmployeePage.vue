<template>
    <div v-if="this.currentUser !== null && this.userTasks !== null">
        <div style="display: flex; justify-content: space-between; align-items: baseline">
            <div style="display: flex; justify-content: flex-start; align-items: baseline">
                <unicon name="arrow-left" fill="white" @click="handleBack" width="50" height="50"/>
                <h1 class="page-title">Сотрудник #{{ this.currentUser.id }}</h1>
            </div>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: flex-start">
            <div class="task-content-column">
                <div class="task-content-section">
                    <h3>Имя:</h3>
                    <p>{{ this.currentUser.name }}</p>
                </div>
                <div class="task-content-section">
                    <h3>Возраст:</h3>
                    <p>{{ this.currentUser.age }}</p>
                </div>
                <div class="task-content-section" v-if="this.currentUser.role !== roleEnum.LEAD">
                    <h3>Босс:</h3>
                    <router-link :key="this.currentUser.boss" @click.native="updateData" :to="{name: 'EmployeePage', params: {id: this.currentUser.boss}}">{{ boss }}</router-link>
                </div>
            </div>
            <div class="task-content-column">
                <div class="task-content-section">
                    <h3>Роль:</h3>
                    <p>{{ roles[this.currentUser.role] }}</p>
                </div>
                <div class="task-content-section">
                    <h3>Число задач:</h3>
                    <p>{{ this.userTasks.length }}</p>
                </div>
            </div>
        </div>
        <button class="delete-item" type="button" @click="handleRemoveEmployee"
                v-if="this.currentUser.boss === this.profile.id">Удалить сотрудника
        </button>
        <div class="preview" v-if="[roleEnum.MANAGER, roleEnum.LEAD].includes(this.currentUser.role)">
            <h3>Подчиненные</h3>
            <div class="employees-container">
                <template v-for="(user, index) in this.staff">
                    <EmployeeCard @click.native="updateData" :data="user" :key="index"/>
                </template>
            </div>
        </div>
        <div class="preview">
            <h3>Список задач</h3>
            <div class="employees-container">
                <template v-for="(task, index) in this.userTasks">
                    <TaskItem :key="index" :item="task"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import roles from "@/store/enums/roles"
import TaskItem from "@/components/taskboard/TaskItem";
import EmployeeCard from "@/components/EmployeeCard";

export default {
    name: "EmployeePage",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            roleEnum: roles.roles,
            roles: roles.roleParser,
            boss: null
        }
    },
    computed: {
        ...mapGetters(['profile']),
        ...mapGetters('tasks', ['userTasks']),
        ...mapGetters('employees', ['currentUser', 'staff', 'allUsers'])
    },
    methods: {
        ...mapActions('tasks', ['getUserTasks']),
        ...mapActions('employees', ['setCurrentUser', 'removeUser', 'getStaffOfUser', 'getAllUsers']),
        async handleRemoveEmployee() {
            if (await this.removeUser(this.id)) {
                this.$toasted.show('Сотрудник был удален', {
                    duration: 5000
                })
                this.handleBack()
            } else {
                this.$toasted.show('Сотрудник не был удален', {
                    duration: 5000
                })
                this.handleBack()
            }
        },
        handleBack() {
            this.$router.go(-1)
        },
        async updateData() {
            await this.setCurrentUser(this.id)
            await this.getStaffOfUser(this.id)
            if (this.allUsers !== null && this.currentUser !== null)
                this.boss = this.allUsers.filter(item => item.id === this.currentUser.boss)[0] === undefined ? ''
                    : this.allUsers.filter(item => item.id === this.currentUser.boss)[0].name
        }
    },
    async mounted() {
        await this.getAllUsers()
        await this.setCurrentUser(this.id)
        await this.getStaffOfUser(this.id)
        await this.getUserTasks(this.id)

        if (this.allUsers !== null && this.currentUser !== null)
            this.boss = this.allUsers.filter(item => item.id === this.currentUser.boss)[0] === undefined ? ''
                : this.allUsers.filter(item => item.id === this.currentUser.boss)[0].name
    },
    components: {
        EmployeeCard,
        TaskItem
    },
}
</script>