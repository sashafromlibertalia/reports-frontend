<template>
    <div class="history-item">
        <div class="history-item-container">
            <div class="wrapper">
                <h4>Событие</h4>
                <span class="history-item-date">{{ eventDate }}</span>
            </div>
            <p class="history-item-data">
                Задача создана
            </p>
        </div>
    </div>
</template>

<script>
import moment from "moment";
export default {
    name: "HistoryItem",
    props: {
        time: String,
    },
    data() {
        return {
            eventDate: null
        }
    },
    mounted() {
        this.eventDate = moment(this.time).format("D MMMM YYYY, HH:mm")
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/HistoryItem";
</style>