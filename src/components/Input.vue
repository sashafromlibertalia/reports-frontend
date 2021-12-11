<template>
    <div class="input">
        <div class="header">
            <h3> {{ this.type }} </h3>
        </div>
        <input v-if="this.type !== roles.ROLE" v-model="value" type="text" :placeholder="placeholder" @input="$emit('input', $event.target.value)">
        <b-form-select v-else style="border: none; padding: 8px 12px" size="lg" class="bg-dark text-white" v-model="value"  @input="$emit('input', value)" :options="options"></b-form-select>
    </div>
</template>

<script>
import inputs from "@/store/enums/inputs";
import roles from "@/store/enums/roles";

export default {
    name: "Input",
    props: {
        type: {
            type: String,
            required: true,
            validator(value) {
                return Object.values(inputs).includes(value)
            }
        }
    },
    data() {
        return {
            value: null,
            roles: inputs,
            options: [{
                text: roles.roleParser.WORKER,
                value: roles.roles.WORKER
            }, {
                text: roles.roleParser.MANAGER,
                value: roles.roles.MANAGER
            }]
        }
    },
    computed: {
        placeholder() {
            switch (this.type) {
                case inputs.NAME:
                    return 'Александр Мирошниченко из М3201'
                case inputs.AGE:
                    return 'Хочет 100 баллов по ООП'
                default:
                    return 'Введите значение...'
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/Input";
</style>