<template>
    <div class="login">
        <h1 class="page-title" style="text-align: center">Выбери, за кого нужно авторизоваться 😘</h1>
        <div class="login-select">
            <b-form-select size="lg" class="bg-dark text-white" v-model="selected" :options="options"></b-form-select>
        </div>
        <div class="login-wrapper">
            <button type="submit" style="width: 30%;" class="submit-new-item" @click="handleSignIn">Войти</button>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import roles from "@/store/enums/roles";

export default {
    name: "Login",
    data() {
        return {
            options: null,
            selected: null,
        }
    },
    computed: {
        ...mapGetters('employees', ['allUsers', 'currentUser'])
    },
    methods: {
        ...mapActions(['signIn']),
        ...mapActions('employees', ['getAllUsers', 'setCurrentUser']),
        async handleSignIn() {
            if (this.selected)
                await this.signIn(this.selected)
            else
                this.$toasted.show('Пожалуйста, выбери пользователя', {
                    duration: 5000
                })
        }
    },
    async mounted() {
        await this.getAllUsers()
        this.options = await this.allUsers.map(item => {
            return {
                text: `(${roles.roleParser[item.role]}) ${item.name}`,
                value: item.id
            }
        })
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/views/Login";
</style>