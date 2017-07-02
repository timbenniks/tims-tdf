<template>
<h1>{{title}}</h1>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'test header 2'
    }
  },
  props: {},
  components: {}
}
</script>

<style lang="scss" scoped>
  h1 {
    color: #000;
  }
</style>
