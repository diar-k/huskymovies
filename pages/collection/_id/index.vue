<template>
    <div>
      {{ collection.name }}
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    validate ({ params }) {
      return /^\d+$/.test(params.id)
    },
    async asyncData ({ params }) {
      const { data } = await axios.get(`https://api.themoviedb.org/3/collection/${params.id}?api_key=441ac5f375693fc6cf2d7c5a00560aa2`)
      return {
        collection: data
      }
    }
  }
</script>

<style scoped>

</style>
