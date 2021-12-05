<template>
    <div class="create-employee-container">
        <h1 class="page-title">Создать сотрудника</h1>
        <div class="form-container">
            <Input :type="types.NAME" v-model="form.Name"/>
            <Input :type="types.AGE" v-model="form.Age"/>
        </div>
        <section>
            <button type="submit" class="submit-new-item" @click="handleCreateNewEmployee">Добавить</button>
        </section>
    </div>
</template>

<script>
import Input from "@/components/Input";
import inputs from "@/store/enums/inputs";
import roles from "@/store/enums/roles";
import {mapActions} from "vuex";

export default {
    name: "CreateEmployee",
    data() {
        return {
            types: inputs,
            form: {
                Name: null,
                Age: null,
                Role: roles.WORKER
            }
        }
    },
    methods: {
        ...mapActions('employees', ['createUser']),
        async handleCreateNewEmployee() {
            if (this.form.Name !== null && this.form.Age !== null && Number.isInteger(parseInt(this.form.Age, 10))) {
                this.form.Age = +this.form.Age
                await this.createUser(this.form)
            }
            else
                alert('Кажется, что некоторые данные введены неправильно ☺️')
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