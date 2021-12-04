<template>
    <router-link :to="'tasks/' + this.item.id">
        <div class="task-item">
            <div class="task-item-body">
                <h3>{{ this.item.name }}</h3>
                <p>{{ description }}</p>
                <span></span>
            </div>
            <div class="task-item-footer">
                2 комментария
            </div>
        </div>
    </router-link>
</template>

<script>
const MaximumDescriptionLength = 40
export default {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    name: "TaskItem",
    computed: {
        description() {
            if (this.item.description.length > 0) {
                if (this.item.description.length > MaximumDescriptionLength)
                    return this.item.description.slice(0, MaximumDescriptionLength) + '...'
                else
                    return this.item.description
            } else {
                return 'Нет описания'
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/TaskItem";
</style>