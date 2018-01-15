<template>
  <b-navbar toggleable="md" type="dark">
    <b-container>
      <b-navbar-brand to="/"></b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/" exact>Discover</b-nav-item>
          <b-nav-item to="/favorites">Favorites</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<style scoped>
  nav {
    background-color:  #0b1520;
  }
</style>
