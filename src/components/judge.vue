<template>
    <div class="judge__wrapper">
        <router-link to="/">← К ТЭБ</router-link>
    </div>
</template>

<script>
export default {
  name: 'judge'
}
</script>

<style lang="scss" scoped>
    .judge__wrapper {
        height: 100%;
        width: 100%;
        padding-top: 15px;
        a {
            color: #000;
            padding: 5px;
            border-radius: 4px;
            border: 1px black solid;
            margin: 0 0 15px 10px;
        }
    }
</style>
