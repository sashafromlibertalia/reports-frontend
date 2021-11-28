<template>
    <router-link :to="{path: this.link}" class="sidebar-item">
            <span>
                <img :src='path' alt="icon">
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
            path: require(`/src/assets/icons/${this.icon}`),
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/SideBarItem";
</style>