<template>
    <div class="sidebar" style="display: flex; flex-direction: column; justify-content: space-between">
        <div>
            <div class="sidebar-wrapper">
                <div class="sidebar-section">
                    <h4>ПРОСМОТР</h4>
                    <template v-for="(item, index) in explore">
                        <SideBarItem v-if="isDisplaying(item)"  :name="item.name" :icon="item.icon" :link="item.link" :key="index"/>
                    </template>
                </div>
                <div class="sidebar-section">
                    <h4>ДЕЙСТВИЯ</h4>
                    <template v-for="(item, index) in create">
                        <SideBarItem v-if="isDisplaying(item)" :name="item.name" :icon="item.icon" :link="item.link" :key="index"/>
                    </template>
                </div>
            </div>
            <div class="log-out" @click="changeUser">
                <span>Выйти из системы</span>
            </div>
        </div>
        <div class="sidebar-section">
           <span class="cur-user">{{this.profile.name}} 😍</span>
        </div>
    </div>
</template>

<script>
import SideBarItem from "@/components/sidebar/SideBarItem";
import sidebarActions from "@/store/enums/sidebarActions"
import {mapActions, mapGetters} from "vuex";
import roles from "@/store/enums/roles";

export default {
    name: "TheSideBar",
    data() {
        return {
            routes: sidebarActions,
            roles: roles.roles
        }
    },
    computed: {
        ...mapGetters(['profile']),
        explore() {
            return [this.routes.TASKS, this.routes.SPRINTS, this.routes.ALL_EMPLOYEES, this.routes.MY_EMPLOYEES, this.routes.ALL_REPORTS]
        },
        create() {
            return [this.routes.NEW_EMPLOYEE, this.routes.NEW_REPORT]
        }
    },
    methods: {
        ...mapActions(['signOut']),
        async changeUser() {
            await this.signOut()
        },
        isDisplaying(item) {
            if (this.profile.role === this.roles.LEAD && item.name === this.routes.NEW_REPORT.name)
                return false

            if ([this.roles.MANAGER, this.roles.LEAD].includes(this.profile.role))
                return true
            else
                return item.isAll
        }
    },
    components: {
        SideBarItem
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/SideBar";
</style>