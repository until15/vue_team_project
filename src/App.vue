<template>
  <div>

    <Navi></Navi>

    <Header></Header>

    <router-view></router-view>

    <Footer></Footer>

  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Navi from './components/Navi.vue';

export default {

  components : {
    Header, Footer, Navi
  },

  setup () {
    
    
    return {}
  }
}
</script>

<style lang="css" scoped>

</style>