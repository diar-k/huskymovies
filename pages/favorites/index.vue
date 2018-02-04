<template>
  <div class="container">
    <div class="wrapper">
      <Poster v-for="(movie, i) in favorites" :movie="movie" :key="i" />
    </div>
  </div>
</template>

<script>
  import Poster from '~/components/Poster'

  export default {
    data () {
      return {
        favorites: this.$store.state.favorites
      }
    },
    components: {
      Poster
    }
  }
</script>

<style scoped>
  .container {
    max-width: 1200px;
    margin-top: 1em;
    text-align: center;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, 163px);
    grid-gap: 1em;
    justify-content: center;
  }
</style>
