<template>
    <div class="employee-card">
        <router-link :to="'/employees/' + this.data.id">
            <div class="employee-card-wrapper">
                <h3>{{ this.data.name }}</h3>
                <div class="info">
                    <ul class="info-list">
                        <li class="info-row" v-for="(item, index) in info" :key="index">
                            <div>
                                <span :style="{backgroundImage: item.path}"></span>
                                {{ item.data }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
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
            info: this.getInfo(),
        }
    },
    methods: {
        getInfo() {
            const filteredData = Object.keys(this.data)
                .filter(key => !['id', 'createdAt', 'name'].includes(key))
                .reduce((res, key) => {
                    res[key] = Object.assign(this.data)[key]
                    return res
                }, {})
            let info = []
            for (let item in filteredData) {
                info.push({
                    data: filteredData[item],
                    path: `url(${require(`/src/assets/icons/${item}.svg`)})`
                })
            }
            return info
        }
    },
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/components/EmployeeCard";
</style>