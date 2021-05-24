<template>
  <div id="app">
    <nav class="header">
      <a href="/">
        <img  class="header-logo" src="./assets/logo.png"/>
      </a>
<!--      <ul class="header-list">-->
<!--        <li>Developer Hub</li>-->
<!--        <li>Documention</li>-->
<!--        <li>One Pagers</li>-->
<!--        <li>Token metric</li>-->
<!--      </ul>-->
      <a class="header-btn" href="https://t.me/PolkaFoundryANN" target="_blank">Let's chat now</a>
    </nav>
    <router-view></router-view>
    <footer>© Polkasmith 2021</footer>
    <notifications :duration=5000 position="bottom right" />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      scroll: 0
    }
  },
  async created() {
    document.addEventListener('scroll', () => {
      const navbar = document.querySelector('nav.header');
      navbar.classList.add('border');
      this.scroll++;
      setTimeout(() => {
        this.scroll --;
        setTimeout(() => {
          if(document.documentElement.scrollTop === 0) navbar.classList.remove('border');
        }, 500);
      }, 500);
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import "style/font.css";
#app {
  font-family: 'Graphik', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #0f133e;
  color: #fff;
  overflow-x: hidden;
}

@import "style/style.css";
@import "style/mobile.css";
</style>
