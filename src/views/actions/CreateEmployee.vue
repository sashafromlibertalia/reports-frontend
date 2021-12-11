<template>
    <div class="create-employee-container">
        <h1 class="page-title">Создать сотрудника</h1>
        <div class="form-container">
            <Input :type="types.NAME" v-model="form.name"/>
            <Input :type="types.AGE" v-model="form.age"/>
        </div>
        <section>
            <button type="submit" class="submit-new-item" @click="handleCreateNewEmployee">Добавить</button>
        </section>
    </div>
</template>

<script>
import Input from "@/components/Input";
import inputs from "@/store/enums/inputs";
import {mapActions, mapGetters} from "vuex";
import roles from "@/store/enums/roles";

export default {
    name: "CreateEmployee",
    data() {
        return {
            types: inputs,
            form: {
                name: null,
                age: null,
                role: null,
                boss: null
            }
        }
    },
    computed: {
        ...mapGetters(['profile'])
    },
    methods: {
        ...mapActions('employees', ['createUser']),
        async handleCreateNewEmployee() {
            if (this.form.name !== null && this.form.age !== null && Number.isInteger(parseInt(this.form.age, 10))) {
                this.form.age = +this.form.age
                this.form.boss = this.profile.id
                this.form.role = this.profile.role === roles.roles.LEAD ? roles.roles.MANAGER : this.profile.role === roles.roles.MANAGER ? roles.roles.WORKER : null
                if (await this.createUser(this.form))
                    this.$toasted.show('Сотрудник добавлен', {
                        duration : 5000
                    })
                else
                    this.$toasted.show('Сотрудник не был добавлен', {
                        duration : 5000
                    })

                this.form = null
            }
            else
                alert('Кажется, что некоторые данные введены неправильно 👉👈️')
        }
    },
    components: {
        Input
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/views/CreateEmployee";
</style>