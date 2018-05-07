<template>
  <b-navbar toggleable="md" type="dark">
    <b-container>
<!--       <b-navbar-brand to="/">Huskymovies</b-navbar-brand> -->
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/" exact>Discover</b-nav-item>
          <b-nav-item to="/favorites">Favorites</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <SearchBar />
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
  import SearchBar from '~/components/SearchBar'

  export default {
    components: {
      SearchBar
    }
  }
</script>

<style>
  .navbar-dark .navbar-toggler {
    border: 0;
  }
</style>

<style scoped>
  .navbar {
    padding: 0;
    background-color: rgba(21, 32, 42, 0.98);
  }

  .nav-link {
    padding: 0.75em 1em !important;
    color: #cbd2d0 !important;
  }

  .nav-link:hover {
    background-color: rgba(26, 45, 59, 0.98);
  }

  .nav-link.active {
    background-color: rgba(26, 45, 59, 0.98);
    color: #cbd2d0 !important;
  }
</style>
