<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center">
            <h1 class="page-title">Отчеты</h1>
            <button class="submit-new-item" style="width: 30%" v-if="this.profile.role === roles.LEAD && this.currentSprint.approvedReports.length === 0 && this.sprintReports.length > 0" @click="handleApprove">Создать общий отчет</button>
        </div>
        <div class="preview">
            <h4>Мой отчет</h4>
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
        ...mapGetters('sprints', ['currentSprint']),
        ...mapGetters('employees', ['staffWithoutReports', 'staffWithReports']),
        ...mapGetters('reports', ['sprintReports'])
    },
    methods: {
        ...mapActions('sprints', ['getCurrentSprint']),
        ...mapActions('employees', ['getStaffWithReports', 'getStaffWithoutReports']),
        ...mapActions('reports', ['getSprintReports', 'approveReports']),
        async handleApprove() {
            if (this.staffWithoutReports.length > 0) {
                alert('Некоторые сотрудники не заполнили отчеты')
            } else {
                await this.approveReports(this.profile.id).then(() => {
                    this.$toasted.show('Все отчеты были одобрены 🎉', {
                        duration : 5000
                    })
                    this.$router.go(-1);
                })
            }
        }
    },
    async mounted() {
        await this.getCurrentSprint()
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