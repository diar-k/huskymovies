<template>
  <div class="container">
    <p class="text-grey mb-1">{{ total_movies }} movies</p>
    <div class="wrapper">
      <Poster v-for="(movie, i) in movies" :movie="movie" :key="i" />
      <infinite-loading @infinite="infiniteHandler" :distance="500">
        <span slot="no-more"> </span>
        <span slot="spinner"> </span>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import InfiniteLoading from 'vue-infinite-loading'
  import Poster from '~/components/Poster'

  export default {
    data () {
      return {
        movies: [],
        total_movies: 0
      }
    },
    methods: {
      async infiniteHandler ($state) {
        const {data} = await axios.get('https://api.themoviedb.org/3/search/movie?api_key=441ac5f375693fc6cf2d7c5a00560aa2&query=' + this.$route.query.movie + '&page=', {
          params: {
            page: this.movies.length / 20 + 1
          }
        })
        if (this.total_movies !== data.total_results) {
          this.total_movies = data.total_results
        }
        if (data.results.length) {
          this.movies = [...this.movies, ...data.results]
          $state.loaded()
          if (this.movies.length / 20 === data.total_pages) {
            $state.complete()
          }
        } else {
          $state.complete()
        }
      }
    },
    components: {
      InfiniteLoading,
      Poster
    }
  }
</script>

<style scoped>
  .container {
    max-width: 1200px;
    margin-top: 1em;
    margin-bottom: 1em;
    text-align: center;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, 163px);
    grid-gap: 1em;
    justify-content: center;
  }
</style>
