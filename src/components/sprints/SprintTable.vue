<template>
    <div>
        <template v-if="!isActive">
            <EmptyData v-if="sprints.length === 0"/>
        </template>
        <template v-else>
            <div style="display: flex; flex-direction: row; justify-content: flex-start">
                <div class="task-content-column">
                    <div class="task-content-section">
                        <h3>Идентификатор спринта:</h3>
                        <p v-if="this.currentSprint !== null">{{this.currentSprint.id}}</p>
                    </div>
                    <div class="task-content-section">
                        <h3>Число задач</h3>
                        <p>{{tasksToDo}}</p>
                    </div>
                </div>
                <div class="task-content-column">
                    <div class="task-content-section">
                        <h3>Интервал спринта</h3>
                        <p v-if="this.currentSprint !== null">{{interval}}</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import EmptyData from "@/views/EmptyData";
import moment from "moment";
import {mapActions, mapGetters} from "vuex";
export default {
    name: "SprintTable",
    props: {
        sprints: {
            type: Array,
            required: true
        },
        isActive: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters('tasks', ['sprintTasks']),
        ...mapGetters('sprints', ['currentSprint']),
        interval() {
            return `${moment(this.currentSprint.startDate).format("DD/MM/YYYY")} - ${moment(this.currentSprint.endDate).format("DD/MM/YYYY")}`
        },
        tasksToDo() {
            return this.sprintTasks.length
        }
    },
    methods: {
        ...mapActions('sprints', ['getCurrentSprint']),
        ...mapActions('tasks', ['getSprintTasks']),
    },
    async mounted() {
        await this.getCurrentSprint()
        if (this.currentSprint !== null)
            await this.getSprintTasks(this.currentSprint.id)
    },
    components: {
        EmptyData
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/SprintTable";
</style>