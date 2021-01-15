<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
        vm.$router.replace({
            path:from.fullPath
        })
    })
},
}

</script>

<style scoped>

</style>
