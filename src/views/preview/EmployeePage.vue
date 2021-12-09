<template>
    <div>
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
            </div>
            <div class="task-content-column">
                <div class="task-content-section">
                    <h3>Роль:</h3>
                    <p>{{ roles[this.currentUser.role] }}</p>
                </div>
                <div class="task-content-section">
                    <h3>Число задач:</h3>
                    <p>{{ this.currentUser.tasks }}</p>
                </div>
            </div>
        </div>
        <button class="delete-item" type="button" @click="handleRemoveEmployee">Удалить сотрудника</button>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import roles from "@/store/enums/roles"


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
            roles: roles.roleParser
        }
    },
    computed: {
        ...mapGetters('employees', ['currentUser'])
    },
    methods: {
        ...mapActions('employees', ['setCurrentUser', 'removeUser']),
        async handleRemoveEmployee() {
            if (await this.removeUser(this.id)) {
                this.$toasted.show('Сотрудник был удален', {
                    duration : 5000
                })
                this.handleBack()
            } else {
                this.$toasted.show('Сотрудник не был удален', {
                    duration : 5000
                })
                this.handleBack()
            }
        },
        handleBack() {
            this.$router.go(-1)
        }
    },
    async mounted() {
        await this.setCurrentUser(this.id)
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/views/EmployeePage";
</style>