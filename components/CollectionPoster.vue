<template>
  <div class="poster">
    <img :src="`https://image.tmdb.org/t/p/w185${collection.poster_path}`">
    <nuxt-link :to="`/collection/${collection.id}`">
      <p class="center-button">
        <button class="button">View collection</button>
      </p>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: {
      collection: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>
  .poster {
    position: relative;
    max-width: 185px;
  }

  .poster img {
    width: 100%;
    filter: opacity(0.5);
  }

  .center-button {
    left: 0;
    position:absolute;
    text-align:center;
    bottom: 20%;
    width: 100%
  }

  .button {
    padding: 0.75em;
    background-color: rgba(139, 0, 0, 0.7);
    color: white;
    border-radius: 3em;
    border: 0;
    font-size: 1.2vw;
    font-weight: bold;
  }

  .button:hover {
    background-color: black;
  }

  .button:active {
    outline: none;
  }
</style>
