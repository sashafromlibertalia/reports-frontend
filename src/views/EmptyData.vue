<template>
    <h1>
        Нет данных :(
    </h1>
</template>

<script>
export default {
    name: "EmptyData"
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/helpers/variables";
@import "src/assets/styles/helpers/typography";

h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    height: 100%;
    @include textHeader;
    font-size: 10vh;
    color: #3A3939;
}
</style>