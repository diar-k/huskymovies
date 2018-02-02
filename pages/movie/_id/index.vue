<template>
  <div class="wrapper">
    <section class="banner">
      <img class="backdrop" :src="`https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path}`">
      <div class="backdrop-overlay"></div>
      <img class="poster" :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`">
      <article class="description">
        <h5>{{ release_year }}</h5>
        <h3 class="title">{{ movie.title }}</h3>
        <h6 class="text-grey">{{ runtime }}</h6>
        <h6 class="text-grey">{{ genres }}</h6>
        <a class="text-light-blue" :href="`http://www.imdb.com/title/${movie.imdb_id}`" target="_blank" rel="noopener">IMDB</a>
        <p class="text-grey mt-3 mb-1">{{ movie.overview }}</p>
      </article>
    </section>
    <aside class="aside">
      <h6 class="text-grey">Release date</h6>
      <p>{{ movie.release_date }}</p>
      <h6 class="text-grey">Homepage</h6>
      <p class="homepage text-light-blue"><a class="text-light-blue" :href="movie.homepage" target="_blank" rel="noopener">{{ homepage }}</a></p>
    </aside>
    <main class="content">
      <b-embed type="iframe"
               aspect="16by9"
               :src="`https://www.youtube.com/embed/${trailer_id}`"
               allowfullscreen
      ></b-embed>
    </main>
    <section class="ad"></section>
    <section class="ad2"></section>
    <section class="recommended-movies">
      <h5 class="text-light-blue">You may also like</h5>
      <Poster v-for="(movie, i) in recommended_movies" :movie="movie" :key="i" />
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  import Poster from '~/components/Poster'
  import Adsense from '~/components/Adsense'

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
      homepage () {
        return this.movie.homepage.length > 0 ? this.movie.homepage : '-'
      },
      trailer_id () {
        return this.movie.videos.results[0].key
      },
      recommended_movies () {
        return this.movie.recommendations.results.slice(0, 7)
      }
    },
    components: {
      Poster,
      Adsense
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-column-gap: 1em;
    grid-row-gap: 2em;
  }

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
      filter: opacity(0.4);
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
      grid-column: 6 / span 9;
    }

    .title {
      font-weight: 700;
    }
  }

  .aside {
    grid-column: 2 / span 4;

    .homepage {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .content {
    grid-column: 6 / span 12;
  }

  .ad {
    grid-column: 19 / span 4;
    width: 300px;
    height: 250px;
    background-color: black;
  }

  .ad2 {
    grid-column: 4 / span 10;
    width: 970px;
    height: 90px;
    background-color: black;
  }

  .recommended-movies {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: repeat(auto-fit, 163px);
    grid-gap: 1em;
    justify-content: center;
    margin-bottom: 2em;

    h5 {
      grid-column: 1 / -1;
    }
  }
</style>
