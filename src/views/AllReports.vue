<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center">
            <h1 class="page-title">Отчеты</h1>
            <button class="submit-new-item" style="width: 30%" v-if="this.profile.role === roles.LEAD">Создать общий отчет</button>
        </div>
        <div class="preview">
            <h4>Мои отчеты</h4>
            <div class="employees-container">
                <template v-for="(item, index) in myReports">
                    <ReportCard :item="item" :key="index"/>
                </template>
            </div>
        </div>
        <div class="preview" v-if="this.profile.role !== roles.WORKER">
            <h4>Отчеты моих сотрудников</h4>
            <div class="employees-container">
                <template v-for="(item, index) in staffReports">
                    <ReportCard :item="item" :key="index"/>
                </template>
            </div>
        </div>
        <div class="preview" v-if="this.profile.role !== roles.WORKER">
            <h4>Сотрудники, кто не писал отчет</h4>
            <div class="employees-container">
                <template v-for="(user, index) in this.staffWithoutReports">
                    <EmployeeCard :data="user" :key="index"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import roles from "@/store/enums/roles";
import EmployeeCard from "@/components/EmployeeCard";
import ReportCard from "@/components/ReportCard";

export default {
    name: "AllReports",
    data() {
        return {
            roles: roles.roles,
            myReports: null,
            staffReports: [],
        }
    },
    computed: {
        ...mapGetters(['profile']),
        ...mapGetters('employees', ['staffWithoutReports', 'staffWithReports']),
        ...mapGetters('reports', ['sprintReports'])
    },
    methods: {
        ...mapActions('employees', ['getStaffWithReports', 'getStaffWithoutReports']),
        ...mapActions('reports', ['getSprintReports'])
    },
    async mounted() {
        await this.getSprintReports()
        if (this.profile !==  null) {
            await this.getStaffWithReports(this.profile.id)
            await this.getStaffWithoutReports(this.profile.id)

            this.myReports = this.sprintReports.filter(item => item.author === this.profile.id)
            if (this.staffWithReports.length > 0) {
                for (let user of this.staffWithReports) {
                    this.staffReports.push(this.sprintReports.filter(item => item.author === user.id)[0])
                }
            }
        }
    },
    components: {
        ReportCard,
        EmployeeCard
    }
}
</script>