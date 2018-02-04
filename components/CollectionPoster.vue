<template>
  <div class="poster">
    <img :src="`https://image.tmdb.org/t/p/w185${collection.poster_path}`">
    <nuxt-link :to="`/collection/${collection.id}`">
      <button class="button">View collection</button>
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
  }

  .poster img {
    filter: opacity(0.5);
  }

  .button {
    position: absolute;
    bottom: 80px;
    left: 35px;
    padding: 0.75em;
    background-color: rgba(139, 0, 0, 0.7);
    color: white;
    border-radius: 3em;
    border: 0;
    font-size: 12px;
    font-weight: bold;
  }

  .button:hover {
    background-color: black;
  }

  .button:active {
    outline: none;
  }
</style>
