<template>
  <div>
    {{ msg }}
    12345
    <router-link to="/">
      home
    </router-link>
    <router-link to="/list">
      list
    </router-link>
    <router-link to="/detail">
      detail
    </router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'hello hhhhhgj'
    }
  }
}
</script>
<style>
div{
    color:blue;
}
</style>
