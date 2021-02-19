<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: PingFangSC-Regular;
  src: url("./assets/PingFangSCRegular.ttf");
}

* {
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Regular;
}
a,
li,
ul {
  text-decoration: none;
  list-style: none;
}
</style>
