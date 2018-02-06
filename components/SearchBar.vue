<template>
  <b-form-input v-model="search_text" @submit="search" size="sm" class="mr-sm-2" type="text" placeholder="star wars y:1979" />
</template>

<script>
  export default {
    data () {
      return {
        search_text: ''
      }
    },
    methods: {
      search () {
        console.log(this.search_text)
      }
    }
  }
</script>

<style scoped>

</style>
