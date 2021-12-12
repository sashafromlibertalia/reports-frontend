<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: baseline">
            <div style="display: flex; justify-content: flex-start; align-items: baseline">
                <unicon name="arrow-left" fill="white" @click="handleBack" width="50" height="50"/>
                <h1 class="page-title">Отчет #{{ this.id }}</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ReportPage",
    props: {
        id: {
            type: String,
            required: true
        }
    },
    computed: {

    },
    methods: {
        handleBack() {
            this.$router.go(-1)
        }
    },
    async mounted() {

    }
}
</script>

<style scoped>

</style>