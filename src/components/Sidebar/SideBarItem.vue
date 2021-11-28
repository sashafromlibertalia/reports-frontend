<template>
    <router-link :to="{path: this.link}" class="sidebar-item">
            <span :style="{backgroundImage: path}">
            </span>
        <h3>{{ this.name }}</h3>
    </router-link>
</template>

<script>
export default {
    name: "SideBarItem",
    props: {
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            isClicked: false,
            path: `url(${require(`/src/assets/icons/${this.icon}`)})`
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/SideBarItem";
</style>