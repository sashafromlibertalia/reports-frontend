<template>
    <div class="sidebar">
        <div class="sidebar-wrapper">
            <div class="sidebar-section">
                <h4>ПРОСМОТР</h4>
                <template v-for="(item, index) in explore">
                    <SideBarItem :name="item.name" :icon="item.icon" :link="item.link" :key="index"/>
                </template>
            </div>
            <div class="sidebar-section">
                <h4>ДЕЙСТВИЯ</h4>
                <template v-for="(item, index) in create">
                    <SideBarItem :name="item.name" :icon="item.icon" :link="item.link" :key="index"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import SideBarItem from "@/components/sidebar/SideBarItem";
import sidebarActions from "@/store/enums/sidebarActions"

export default {
    name: "TheSideBar",
    data() {
        return {
            routes: sidebarActions
        }
    },
    computed: {
        explore() {
            return [this.routes.TASKS, this.routes.SPRINTS, this.routes.MY_EMPLOYEES]
        },
        create() {
            return [this.routes.NEW_EMPLOYEE, this.routes.NEW_REPORT]
        },
    },
    components: {
        SideBarItem
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/SideBar";
</style>