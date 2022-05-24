<template>
  <div class="fonts">

    <Navi></Navi>

    <router-view></router-view>

    <Footer></Footer>

  </div>
</template>

<script>

import Footer from './components/Footer.vue';
import Navi from './components/Navi.vue';

export default {

  components : {
    Footer, Navi
  },

  setup () {
    
    
    return {}
  }
}
</script>

<style lang="css" scoped>
.fonts {
    font-family: 'Do Hyeon', sans-serif;
}
</style>