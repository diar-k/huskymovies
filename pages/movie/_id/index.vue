<template>
  <div class="wrapper">
    <section class="banner">
      <img class="backdrop d-md-none d-lg-none d-xl-none" :src="`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`">
      <img class="backdrop d-none d-md-block" :src="`https://image.tmdb.org/t/p/w1400_and_h450_bestv2${movie.backdrop_path}`">
      <div class="backdrop-overlay"></div>
      <img class="poster" :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`">
      <article class="description">
        <h5>{{ release_year }}</h5>
        <h3 class="title">{{ movie.title }}</h3>
        <h6 class="text-grey">{{ runtime }}</h6>
        <h6 class="text-grey">{{ genres }}</h6>
        <a class="text-light-blue" :href="`http://www.imdb.com/title/${movie.imdb_id}`" target="_blank" rel="noopener">IMDB</a>
        <p class="text-grey mt-2 mb-1 d-none d-md-block">{{ movie.overview }}</p>
      </article>
    </section>
    <aside class="aside">
      <h5 class="text-blue-grey d-md-none d-lg-none d-xl-none">Overview</h5>
      <p class="text-grey mb-3 d-md-none d-lg-none d-xl-none">{{ movie.overview }}</p>
      <h5 class="text-blue-grey">Facts</h5>
      <h6 class="text-grey">Release date</h6>
      <p>{{ movie.release_date }}</p>
      <h6 class="text-grey">Homepage</h6>
      <p class="homepage"><a class="text-light-blue" :href="movie.homepage" target="_blank" rel="noopener">{{ homepage_link }}</a></p>
      <CollectionPoster class="d-none d-md-block" v-if="movie.belongs_to_collection" :collection="movie.belongs_to_collection" />
    </aside>
    <main class="content">
      <b-embed v-if="trailer"
               type="iframe"
               aspect="16by9"
               :src="`https://www.youtube.com/embed/${trailer}`"
               allowfullscreen
      ></b-embed>
    </main>
    <section class="ad"></section>
    <section class="recommended-movies mt-3">
      <h5 v-if="recommended_movies.length > 0">You may also like</h5>
      <Poster v-for="(movie, i) in recommended_movies" :movie="movie" :key="i" />
    </section>
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
        return this.movie.homepage !== null ? this.movie.homepage : '-'
      },
      trailer () {
        const trailer = this.movie.videos.results.find(x => x.type === 'Trailer')
        return trailer !== undefined ? trailer.key : ''
      },
      recommended_movies () {
        return this.movie.recommendations.results.slice(0, 7)
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
      background: linear-gradient(180deg,transparent 0, rgb(12, 21, 30));
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
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      a {
        display: inline-block;
      }
    }
  }

  .content {
    grid-column: 6 / span 13;
    display: flex;
    align-content: stretch;
  }

  .ad {
    grid-column: 19 / span 5;
    height: 250px;
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

  a:hover {
    color: #78a6b8;
  }

  @media only screen and (max-width: 767px) {
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

      h3, h5, h6, a, p {
        margin-bottom: 0.3em;
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
    }

    .recommended-movies {
      h5 {
        font-size: calc(0.4em + 2.5vw);
      }
    }

    h3 {
      font-size: calc(0.4em + 2.5vw);
    }

    h5 {
      font-size: calc(0.2em + 2.5vw);
    }

    h6, a, p {
      font-size: calc(0.1em + 2.5vw);
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .banner {
      h3, h5, h6, a, p {
        margin-bottom: 0.25em;
      }
    }

    .recommended-movies {
      h5 {
        font-size: 2.5vw;
      }
    }

    h3 {
      font-size: 2.2vw;
    }

    h5 {
      font-size: 1.8vw;
    }

    h6, a, p {
      font-size: 1.4vw;
    }
  }

</style>
