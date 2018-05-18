<template>
  <div class="container">
    <img src="bg.png">
    <h3 class="about-text">Find out more about your favorite movies.</h3>
    <p>The purpose of this website is to let you explore new and old movies. Make use of the filter and search features to find specific movies. Why not use IMDb you say? You should use IMDb. This is a school project created by one student in a short amount of time. There is not much competetion. If you have feedback, just send them to this email: <strong>diarkourehpaz@gmail.com</strong></p>
  </div>
</template>

<script>

</script>

<style scoped>
  .container {
    max-width: 1100px;
    margin-top: 1em;
    text-align: center;
  }

  .container img {
    max-width: 900px;
  }

  .about-text {
    font-size: calc(0.2em + 1.8vw);
    color: yellow;
  }

  @media (max-width: 991px) {
    .container img {
      display: none;
    }
  }
</style>
