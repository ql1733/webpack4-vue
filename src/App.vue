<template>
    <div>
        {{msg}}
        123456
        <router-link to="/">home</router-link>
        <router-link to="/list">list</router-link>
        <router-link to="/detail">detail</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data (){
        return {
            msg:'hello hhhhhgj'
        }
    }
}
</script>
<style>
div{
    color:red;
}
</style>
