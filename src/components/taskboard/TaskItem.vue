<template>
    <router-link :to="{name: 'TaskPage', params: {id: this.item.id}}">
        <div class="task-item">
            <div class="task-item-body">
                <h3>{{ this.item.name }}</h3>
                <p>{{ description }}</p>
            </div>
            <div class="task-item-footer">
                {{commentAmount}}
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
        },
        commentAmount() {
            return this.getCommentValue(this.item.comments.length)
        }
    },
    methods: {
        getCommentValue(number) {
            const words = ['комментарий', 'комментария', 'комментариев']
            return number + ' ' + words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/TaskItem";
</style>