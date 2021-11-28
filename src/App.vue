<template>
    <div id="app">
        <TheSideBar/>
        <div class='main-content'>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import TheSideBar from "@/components/TheSideBar";

export default {
    name: 'App',
    components: {
        TheSideBar
    }
}
</script>

<style lang="scss">
@import "./assets/styles/main";
</style>
