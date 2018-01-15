<template>
  <div class="wrapper">
    <section class="banner">
      <img class="backdrop" :src="`https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path}`">
      <div class="backdrop-overlay"></div>
      <img class="poster" :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`">
      <article class="description">
        <h5>{{ release_year }}</h5>
        <h3 class="title">{{ movie.title }}</h3>
        <h6>{{ runtime }}</h6>
        <h6>{{ genres }}</h6>
        <a :href="`http://www.imdb.com/title/${movie.imdb_id}`" target="_blank">IMDB</a>
      </article>
    </section>
    <aside class="aside">
      <h6>Homepage</h6>
      <p><a class="homepage" :href="movie.homepage" target="_blank">{{ movie.homepage }}</a></p>
      <h6>Release date</h6>
      <p>{{ movie.release_date }}</p>
    </aside>
    <section class="overview">
      <h5 class="left-border">Overview</h5>
      <p>{{ movie.overview }}</p>
    </section>
    <section class="recommended-movies">
      <h5 class="overview-header">You may also like</h5>
      <Poster v-for="(movie, i) in recommended_movies" :movie="movie" :key="i" />
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import Poster from '~/components/Poster.vue'

  export default {
    validate ({ params }) {
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params }) {
      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=441ac5f375693fc6cf2d7c5a00560aa2&append_to_response=recommendations,videos`)
      return {
        movie: data
      }
    },
    computed: {
      genres () {
        return this.movie.genres.map(x => x.name).join(', ')
      },
      release_year () {
        return this.movie.release_date.substr(0, 4)
      },
      runtime () {
        return Math.trunc(this.movie.runtime / 60) + 'h ' + (this.movie.runtime % 60) + 'm'
      },
      trailer_id () {
        return this.movie.videos.results[0].key
      },
      recommended_movies () {
        return this.movie.recommendations.results.slice(0, 6)
      }
    },
    components: {
      Poster
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 1em;

    .banner {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(16, 1fr);
      grid-column-gap: 1em;
      align-items: end;

      & > * {
        grid-row: 1;
      }

      .backdrop {
        grid-column: 1 / -1;
        width: 100%;
        filter: opacity(0.75);
        z-index: -10;
      }

      .backdrop-overlay {
        grid-column: 1 / -1;
        height: 80px;
        background: linear-gradient(180deg,transparent 0, rgb(12, 25, 33));
        z-index: -9;
      }

      .poster {
        grid-column: 3 / span 3;
        width: 100%;
        filter: drop-shadow(0px 4px 12px black);
      }

      .description {
        grid-column: 6 / span 8;
      }

      .title {
        font-weight: 700;
      }
    }

    .aside {
      grid-column: 2 / span 3;
    }

    .overview {
      grid-column: 5 / span 7;

    }

    .overview-header {
      padding-left: 6px;
      color: #546e7a;
      border-left: 4px solid yellow;
    }

    .recommended-movies {
      grid-column: 1 / -1;
      display: grid;
      grid-template-columns: repeat(auto-fit, 163px);
      grid-gap: 1em;
      justify-content: center;
      margin: 2em 0;

      h5 {
        grid-column: 1 / -1;
      }
    }

    a {
      color: #78a6b8;
    }
  }
</style>
