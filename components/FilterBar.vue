<template>
  <div class="filter sticky-top mt-md-3">
<!--    <b-form-checkbox-group buttons v-model="selected" name="buttons1" :options="options">
    </b-form-checkbox-group>-->
    <b-form-select v-model="sort_by" :options="sort_by_options" size="sm" class="sort-by-select">
    </b-form-select>
<!--    <b-form-select v-model="year_selected" :options="year_options" size="sm" class="year-select">
    </b-form-select>-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sort_by_options: [
          { value: 'popularity.desc', text: 'Popularity Descending' },
          { value: 'popularity.asc', text: 'Popularity Ascending' },
          { value: 'release_date.desc', text: 'Release Date Descending' },
          { value: 'release_date.asc', text: 'Release Date Ascending' }
        ]
      }
    },
    computed: {
      sort_by: {
        get () {
          return this.$store.state.filter.sort_by
        },
        set (value) {
          this.$store.commit('updateSortBy', value)
        }
      }
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
  }

  .custom-select option {
    background-color: rgba(24,37,49,.98);
  }
</style>

<style scoped>
  .filter {
    height: 45px;
    background-color: rgba(24,37,49,.98);
    box-shadow: 0 5px 30px rgba(0,0,0,.5);
    padding-top: 7px;
    padding-left: 10%;
  }

  .sort-by-select {
    width: 210px;
    margin-right: 1em;
  }

  .year-select {
    width: 75px;
  }
</style>
