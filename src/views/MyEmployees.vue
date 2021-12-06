<template>
    <div>
        <h1 class="page-title">Мои сотрудники</h1>
        <div class="employees-container" v-if="this.allUsers.length >0">
            <template v-for="(user, index) in this.allUsers">
                <EmployeeCard :data="user" :key="index"/>
            </template>
        </div>
        <EmptyData v-else/>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import EmptyData from "@/views/EmptyData";
import EmployeeCard from "@/components/EmployeeCard";

export default {
    name: "MyEmployees",
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