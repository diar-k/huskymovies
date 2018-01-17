<template>
  <div>
    <div class="filter sticky-top mt-md-3"></div>
    <div class="wrapper mt-3 mx-xl-5 px-xl-5">
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

  const apiKey = '441ac5f375693fc6cf2d7c5a00560aa2'

  export default {
    async asyncData () {
      const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=' + apiKey + '&page=1')
      return {
        now_playing: data.results.splice(0, 10)
      }
    },
    data () {
      return {
        movies: []
      }
    },
    methods: {
      async infiniteHandler ($state) {
        const { data } = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&sort_by=popularity.desc&page=', {
          params: {
            page: this.movies.length / 20 + 1
          }
        })
        if (data.results.length) {
          this.movies = [...this.movies, ...data.results]
          $state.loaded()
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
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, 163px);
    grid-gap: 1em;
    justify-content: center;
  }

  .filter {
    height: 45px;
    background-color: rgba(24,37,49,.98);
    box-shadow: 0 5px 30px rgba(0,0,0,.5);
  }
</style>
