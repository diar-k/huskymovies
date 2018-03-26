<template>
  <div>
    <div class="container">
  	  <h3 class="about-text">Connecting movie fans with their favorite movies</h3>
    </div>
    <div class="filter sticky-top mt-md-3">
      <b-form-select v-model="sort_by_selected" @change="changeFilter" :options="sort_by_options" size="sm" class="sort-by-select">
      </b-form-select>
      <b-form-select v-model="release_year_selected" @change="changeFilter" :options="years" size="sm" class="release-year-select">
      </b-form-select>
      <b-form-select v-model="genre_selected" @change="changeFilter" :options="genres" size="sm" class="genre-select">
      </b-form-select>
    </div>
    <div class="container">
      <p class="text-grey mb-1">{{ total_movies }} movies</p>
      <div class="wrapper">
        <Poster v-for="(movie, i) in movies" :movie="movie" :key="i" />
        <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" :distance="500">
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

  const apiKey = '441ac5f375693fc6cf2d7c5a00560aa2'

  export default {
    data () {
      return {
        movies: [],
        total_movies: 0,
        sort_by_options: [
          { value: 'popularity.desc', text: 'Popularity Descending' },
          { value: 'popularity.asc', text: 'Popularity Ascending' },
          { value: 'release_date.desc', text: 'Release Date Descending' },
          { value: 'release_date.asc', text: 'Release Date Ascending' }
        ],
        genres: [
          { value: '', text: 'All' },
          { value: 28, text: 'Action' },
          { value: 12, text: 'Adventure' },
          { value: 16, text: 'Animation' },
          { value: 35, text: 'Comedy' },
          { value: 80, text: 'Crime' },
          { value: 99, text: 'Documentary' },
          { value: 18, text: 'Drama' },
          { value: 14, text: 'Fantasy' },
          { value: 10751, text: 'Family' },
          { value: 36, text: 'History' },
          { value: 27, text: 'Horror' },
          { value: 10749, text: 'Romance' },
          { value: 878, text: 'Science Fiction' },
          { value: 53, text: 'Thriller' },
          { value: 10752, text: 'War' }
        ]
      }
    },
    computed: {
      sort_by_selected: {
        get () {
          return this.$store.state.filter.sort_by
        },
        set (value) {
          this.$store.commit('updateSortBy', value)
        }
      },
      release_year_selected: {
        get () {
          return this.$store.state.filter.release_year
        },
        set (value) {
          this.$store.commit('updateReleaseYear', value)
        }
      },
      years () {
        let years = []
        years.push('All')
        for (let i = 2018; i >= 1900; i--) {
          years.push(i)
        }
        return years
      },
      genre_selected: {
        get () {
          return this.$store.state.filter.genre
        },
        set (value) {
          this.$store.commit('updateGenre', value)
        }
      }
    },
    methods: {
      async infiniteHandler ($state) {
        const { data } = await axios.get('https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&language=en-US&sort_by=' + this.$store.state.filter.sort_by + '&primary_release_year=' + this.$store.state.filter.release_year + '&with_genres=' + this.$store.state.filter.genre + '&page=', {
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
      },
      changeFilter () {
        this.movies = []
        this.$nextTick(() => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        })
      }
    },
    components: {
      InfiniteLoading,
      Poster
    }
  }
</script>

<style>
  .custom-select, .custom-select:focus {
    background-color: transparent;
    color: hsla(0,0%,100%,.7);
    border: 1px solid hsla(0,0%,100%,.7);
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 6px;
    border-radius: 3px;
  }

  .custom-select option {
    background-color: rgba(24,37,49,.98);
  }
</style>

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

  .filter {
    height: 45px;
    background-color: rgba(24,37,49,.98);
    box-shadow: 0 5px 30px rgba(0,0,0,.5);
    padding-top: 7px;
    padding-left: 10%;
  }

  .sort-by-select {
    width: 205px;
    margin-right: 1em;
  }

  .release-year-select {
    width: 75px;
    margin-right: 1em;
  }

  .genre-select {
    width: 100px;
  }

  .about-text {
    font-size: calc(0.6em + 2.2vw);
  }

  @media only screen and (max-width: 575px) {
    .sort-by-select {
      width: 35%;
      margin-right: 1em;
    }

    .release-year-select {
      width: 20%;
      margin-right: 1em;
    }

    .genre-select {
      width: 25%;
    }
  }
</style>
