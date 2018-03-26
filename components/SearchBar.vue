<template>
  <b-nav-form @submit.prevent="search">
    <b-form-input v-model="search_text" size="sm" class="mr-sm-2" type="text" placeholder="Search for movies..." />
  </b-nav-form>
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
        this.$router.push({ path: '/search', query: { movie: this.search_text } })
      }
    }
  }
</script>

<style scoped>
input {
  border: none;
}

  @media only screen and (max-width: 575px) {
    input {
      border-radius: 0;
    }
  }
</style>
