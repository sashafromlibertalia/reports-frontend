<template>
    <div class="input">
        <div class="header">
            <h3> {{ this.type }} </h3>
        </div>
        <input v-model="value" type="text" :placeholder="placeholder" @input="$emit('input', $event.target.value)">
    </div>
</template>

<script>
import inputs from "@/store/enums/inputs";

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
            value: null
        }
    },
    computed: {
        placeholder() {
            switch (this.type) {
                case inputs.NAME:
                    return 'Александр Мирошниченко'
                case inputs.AGE:
                    return '100 баллов ООП'
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