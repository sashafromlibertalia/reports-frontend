<template>
    <div class="sidebar">
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
        <div class="sidebar-section">
           <span class="cur-user">{{this.currentUser.name}} 😍</span>
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
        ...mapGetters('employees', ['currentUser']),
        explore() {
            return [this.routes.TASKS, this.routes.SPRINTS, this.routes.MY_EMPLOYEES]
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
            if ([this.roles.MANAGER, this.roles.LEAD].includes(this.currentUser.role))
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