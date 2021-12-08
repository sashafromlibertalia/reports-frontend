<template>
    <div id="app">
        <template v-if="this.isAuthenticated">
            <TheSideBar/>
            <div class='main-content'>
                <router-view></router-view>
            </div>
        </template>
        <router-view v-else></router-view>
    </div>
</template>

<script>
import TheSideBar from "@/components/TheSideBar";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'App',
    computed: {
        ...mapGetters(['isAuthenticated'])
    },
    methods: {
        ...mapActions(['refreshAuth']),
    },
    mounted() {
        this.refreshAuth()
    },
    components: {
        TheSideBar
    }
}
</script>

<style lang="scss">
@import "./assets/styles/main";
</style>
