<template>
    <router-link :to="'tasks/' + this.item.id">
        <div class="task-item">
            <div class="task-item-body">
                <h3>{{ this.item.name }}</h3>
                <p>{{ this.item.description }}</p>
                <span></span>
            </div>
            <div class="task-item-footer">
                2 комментария
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    name: "TaskItem",
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/TaskItem";
</style>