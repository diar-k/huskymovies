<template>
  <div>
    <b-jumbotron fluid bg-variant="info">
      <template slot="header">
        Bootstrap Vue
      </template>
      <template slot="lead">
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </template>
      <hr class="my-4">
      <p>
        It uses utility classes for typography and spacing to space content
        out within the larger container.
      </p>
      <b-btn variant="primary" href="#">Do Something</b-btn>
      <b-btn variant="success" href="#">Do Something Else</b-btn>
    </b-jumbotron>
    <FilterBar />
    <div class="container">
      <div class="wrapper">
        <Poster v-for="(movie, i) in movies" :movie="movie" :key="i" />
        <infinite-loading @infinite="infiniteHandler" :distance="500">
          <span slot="no-more"> </span>
          <span slot="spinner"> </span>
        </infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import InfiniteLoading from 'vue-infinite-loading'
  import Poster from '~/components/Poster'
  import FilterBar from '~/components/FilterBar'

  const apiKey = '441ac5f375693fc6cf2d7c5a00560aa2'

  export default {
    data () {
      return {
        movies: []
      }
    },
    methods: {
      async infiniteHandler ($state) {
        const { data } = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&sort_by=' + this.$store.state.filter.sort_by + '&page=', {
          params: {
            page: this.movies.length / 20 + 1
          }
        })
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
      Poster,
      FilterBar
    }
  }
</script>

<style scoped>
  .container {
    max-width: 1200px;
    margin-top: 2em;
  }
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, 163px);
    grid-gap: 1em;
    justify-content: center;
  }
</style>
