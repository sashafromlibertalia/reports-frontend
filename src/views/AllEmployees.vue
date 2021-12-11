<template>
    <div>
        <h1 class="page-title">Все сотрудники</h1>
        <div class="all-employees-container" v-if="this.allUsers.length > 0">
            <div class="type-employee-wrapper">
                <h2>{{header.LEAD}}</h2>
                <template v-for="(user, index) in this.allUsers.filter(item => item.role === role.LEAD)">
                    <EmployeeCard :data="user" :key="index"/>
                </template>
            </div>
            <div class="type-employee-wrapper">
                <h2>{{header.MANAGER}}</h2>
                <template v-for="(user, index) in this.allUsers.filter(item => item.role === role.MANAGER)">
                    <EmployeeCard :data="user" :key="index"/>
                </template>
            </div>
            <div class="type-employee-wrapper">
                <h2>{{header.WORKER}}</h2>
                <template v-for="(user, index) in this.allUsers.filter(item => item.role === role.WORKER)">
                    <EmployeeCard :data="user" :key="index"/>
                </template>
            </div>
        </div>
        <EmptyData v-else/>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import EmptyData from "@/views/EmptyData";
import EmployeeCard from "@/components/EmployeeCard";
import roles from "@/store/enums/roles";

export default {
    name: "AllEmployees",
    data() {
        return {
            role: roles.roles,
            header: roles.roleParser
        }
    },
    computed: {
        ...mapGetters('employees', ['allUsers']),
    },
    methods: {
        ...mapActions('employees', ['getAllUsers'])
    },
    async mounted() {
        await this.getAllUsers()
    },
    components: {
        EmployeeCard,
        EmptyData
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/views/MyEmployees";
</style>