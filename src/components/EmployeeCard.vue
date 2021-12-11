<template>
    <div class="employee-card">
        <router-link :to="'/employees/' + this.data.id">
            <div class="employee-card-wrapper">
                <h3>{{ this.data.name }}</h3>
                <div class="info">
                    <ul class="info-list">
                        <li class="info-row">
                            <div>
                                <span :style="{backgroundImage:  `url(${require(`/src/assets/icons/age.svg`)})`}"></span>
                                Возраст: {{ this.data.age }}
                            </div>
                        </li>
                        <li class="info-row">
                            <div>
                                <span :style="{backgroundImage:  `url(${require(`/src/assets/icons/role.svg`)})`}"></span>
                                Роль: {{ roles[this.data.role] }}
                            </div>
                        </li>
                        <li class="info-row">
                            <div>
                                <span :style="{backgroundImage:  `url(${require(`/src/assets/icons/todo.svg`)})`}"></span>
                                Число задач: {{ this.data.tasks.length }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
import roles from "@/store/enums/roles";

export default {
    name: "EmployeeCard",
    props: {
        data: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            roles: roles.roleParser
        }
    }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/EmployeeCard";
</style>