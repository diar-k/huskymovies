<template>
  <div class="wrapper">
    <section class="banner">
      <img class="backdrop d-lg-none d-xl-none" :src="`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`">
      <img class="backdrop d-none d-md-block" :src="`https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path}`">
      <div class="backdrop-overlay"></div>
      <img class="poster" :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`">
      <article class="description">
        <h5>{{ release_year }}</h5>
        <h3 class="title">{{ movie.title }}</h3>
        <h6 class="text-grey">{{ runtime }}</h6>
        <h6 class="text-grey">{{ genres }}</h6>
        <a class="text-light-blue" :href="`http://www.imdb.com/title/${movie.imdb_id}`" target="_blank" rel="noopener">IMDB</a>
        <p class="text-grey mt-3 mb-1 d-none d-md-block">{{ movie.overview }}</p>
      </article>
    </section>
    <aside class="aside">
      <h5 class="text-blue-grey d-lg-none d-xl-none">Overview</h5>
      <p class="text-grey mb-3 d-lg-none d-xl-none">{{ movie.overview }}</p>
      <h5 class="text-blue-grey">Facts</h5>
      <h6 class="text-grey">Release date</h6>
      <p>{{ movie.release_date }}</p>
      <h6 class="text-grey">Homepage</h6>
      <a class="text-light-blue" :href="movie.homepage" target="_blank" rel="noopener">{{ homepage_link }}</a>
    </aside>
    <main class="content">
      <collection-poster v-if="movie.belongs_to_collection" class="mt-4" :collection="movie.belongs_to_collection" ></collection-poster>
      <b-embed v-if="trailer"
               type="iframe"
               aspect="16by9"
               :src="`https://www.youtube.com/embed/${trailer}`"
               allowfullscreen
      ></b-embed>
    </main>
    <section class="ad"></section>
  </div>
</template>

<script>
  import axios from 'axios'
  import Poster from '~/components/Poster'
  import CollectionPoster from '~/components/CollectionPoster'
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
      homepage_link () {
        return this.movie.homepage.length > 0 ? this.movie.homepage : '-'
      },
      trailer () {
        const trailer = this.movie.videos.results.find(x => x.type === 'Trailer')
        return trailer !== undefined ? trailer.key : ''
      }
    },
    components: {
      Poster,
      CollectionPoster,
      Adsense
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(24, 1fr);
    grid-gap: 1em;
    margin-bottom: 1em;
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
  }

  .content {
    grid-column: 6 / span 13;
    display: grid;
  }

  .ad {
    grid-column: 19 / span 5;
    height: 250px;
    background-color: black;
  }

  @media (max-width: 767px) {
    .wrapper {
      grid-template-columns: repeat(12, 1fr);
    }

    .banner {
      .poster {
        grid-column: 3 / span 5;
      }

      .description {
        grid-column: 8 / span 7;
      }
    }

    .aside {
      grid-column: 2 / span 10;
    }

    .content {
      grid-column: 1 / -1;
    }

    .ad {
      grid-column: 2 / span 10;
      grid-row: 3;
    }

    h3, h5, h6, a, p {
      margin-bottom: 0.25em;
    }

    h3 {
      font-size: 16px;
    }

    h5 {
      font-size: 14px;
    }

    h6, a, p {
      font-size: 12px;
    }


  }

  @media (max-width: 991px) {

  }

</style>
