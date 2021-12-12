<template>
    <div v-if="this.item !== null" class="report-item">
        <router-link :key="this.item.id" :to="{path: `/reports/${this.item.id}`, params: {id: this.item.id}}">
            <div class="report-item-wrapper">
                <span>{{this.item.status}}</span>
                <div class="info">
                    <ul class="info-list">
                        <li class="info-row">
                            <div>
                                <span :style="{backgroundImage:  `url(${require(`/src/assets/icons/role.svg`)})`}"></span>
                                Автор: {{ author }}
                            </div>
                        </li>
                        <li class="info-row">
                            <div>
                                <span
                                    :style="{backgroundImage:  `url(${require(`/src/assets/icons/todo.svg`)})`}"></span>
                                Задач: {{ this.item.tasks.length }}
                            </div>
                        </li>
                        <li class="info-row">
                            <div>
                                <span
                                    :style="{backgroundImage:  `url(${require(`/src/assets/icons/calendar.svg`)})`}"></span>
                                Создан: {{ createdAt }}
                            </div>
                        </li>
                        <li class="info-row">
                            <div>
                                <span
                                    :style="{backgroundImage:  `url(${require(`/src/assets/icons/age.svg`)})`}"></span>
                                Обновлен: {{ editedAt }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import moment from "moment";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "ReportCard",
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            author: null
        }
    },
    computed: {
        ...mapGetters('employees', ['allUsers']),
        createdAt() {
            return moment(this.item.createdAt).format("DD/MM/YYYY, HH:mm:ss")
        },
        editedAt() {
            return moment(this.item.editedAt).format("DD/MM/YYYY, HH:mm:ss")
        }
    },
    methods: {
        ...mapActions('employees', ['getAllUsers']),
    },
    async mounted() {
        await this.getAllUsers()
        this.author = this.allUsers.filter(item => item.id === this.item.author)[0] === undefined ? ''
            : this.allUsers.filter(item => item.id === this.item.author)[0].name
    }
}
</script>

<style scoped lang="scss">
@import "../assets/styles/components/ReportCard";
</style>