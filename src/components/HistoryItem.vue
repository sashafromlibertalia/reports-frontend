<template>
    <div class="history-item">
        <div class="history-item-container">
            <div class="wrapper">
                <h4>{{ author }}</h4>
                <span class="history-item-date">{{ eventDate }}</span>
            </div>
            <p class="history-item-data">
                {{ this.item.message }}
            </p>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import {mapGetters} from "vuex";

export default {
    name: "HistoryItem",
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        ...mapGetters('employees', ['allUsers'])
    },
    data() {
        return {
            eventDate: null,
            author: null
        }
    },
    mounted() {
        this.eventDate = moment(this.item.createdAt).format("D MMMM YYYY, HH:mm:ss")
        this.author = this.allUsers.filter(item => item.id === this.item.author)[0].name
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/HistoryItem";
</style>