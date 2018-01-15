<template>
  <div class="poster fadein">
    <span class="fa-stack" @click="favorite(movie.id)">
      <i class="fas fa-circle fa-stack-2x"></i>
      <i class="fas fa-heart fa-stack-1x" :class="favorited"></i>
    </span>
    <nuxt-link :to="`/movie/${movie.id}`">
        <img :src="`https://image.tmdb.org/t/p/w300${movie.poster_path}`">
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: {
      movie: {
        type: Object,
        required: true
      }
    },
    computed: {
      favorited () {
        return [this.$store.getters.isFavorited(this.movie.id) ? 'fa-heart--active' : '']
      }
    },
    methods: {
      favorite (id) {
        this.$store.dispatch('favorite', id)
      }
    }
  }
</script>

<style scoped>
  :root {
    --fa-circle-color: rgba(255, 255, 255, 0.7);
    --fa-heart-color: rgba(56, 56, 56, 0.8);
    --fa-heart-hover-color: rgba(0,0,0,0.9);
    --fa-heart-active-color: #d50000;
  }

  .poster {
    position: relative;
    border: 2px solid rgba(25,37,50,.4);
  }

  .poster img {
    width: 163px;
    height: 243px;
  }

  .fa-stack {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .fa-stack-2x {
    font-size: 1.7em;
  }

  .fa-stack-1x {
    line-height: 1.87em;
  }

  .fa-circle {
    color: var(--fa-circle-color);
  }

  .fa-heart {
    color: var(--fa-heart-color);
    z-index: 1;
    cursor: pointer;
  }

  .fa-heart:hover {
    color: var(--fa-heart-hover-color);
  }

  .fa-heart--active, .fa-heart--active:hover {
    color: var(--fa-heart-active-color);
    text-shadow: none;
  }
</style>
