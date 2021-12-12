<template>
    <div>
        <h1 class="page-title">Спринты</h1>
        <template v-if="this.allSprints !== null && this.allSprints.length > 0">
            <b-tabs content-class="mt-3 text-white">
                <b-tab title="Текущий" active>
                    <SprintTable :is-active="true" :sprints="this.allSprints.filter(item => item.isActive)"/>
                </b-tab>
                <b-tab title="Завершенные">
                    <SprintTable :is-active="false" :sprints="this.allSprints.filter(item => !item.isActive)"/>
                </b-tab>
            </b-tabs>
        </template>
        <div style="display:flex; align-items: center; flex-direction: column" v-else>
            <EmptyData/>
            <section style="margin-top: 10rem; width: 30%">
                <button type="submit" class="submit-new-item" @click="createSprint">Создать спринт</button>
            </section>
        </div>
    </div>
</template>

<script>
import SprintTable from "@/components/sprints/SprintTable";
import {mapActions, mapGetters} from "vuex";
import EmptyData from "@/views/EmptyData";

export default {
    name: "Sprints",
    data() {
        return {
            week: [],
            form: {
                startDate: null,
                endDate: null
            }
        }
    },
    computed: {
        ...mapGetters(['profile']),
        ...mapGetters('sprints', ['allSprints']),
    },
    methods: {
        ...mapActions('sprints', ['getAllSprints', 'saveSprint']),
        getWeek() {
            let curr = new Date
            let week = []
            for (let i = 1; i <= 7; i++) {
                let first = curr.getDate() - curr.getDay() + i
                let day = new Date(curr.setDate(first)).toISOString()
                week.push(day)
            }

            return week
        },
        async createSprint() {
            this.form.startDate = this.week[0]
            this.form.endDate = this.week.slice(-1)[0]
            await this.saveSprint(this.form).then(async () => {
                await this.getAllSprints()
                await this.$toasted.show('Спринт был создан', {
                    duration: 5000
                })
            })
        }
    },
    async mounted() {
        await this.getAllSprints()
        this.week = this.getWeek()
    },
    components: {EmptyData, SprintTable}
}
</script>