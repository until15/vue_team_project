<template>
  <div>

    <Navi></Navi>

    <Header></Header>

    <router-view></router-view>

    <Footer></Footer>

  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue';
import {useStore} from 'vuex';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Navi from './components/Navi.vue';

export default {

  components : {
    Header, Footer, Navi
  },

  setup () {
    const store = useStore();

    onMounted(() =>{
      if(sessionStorage.getItem("TOKEN") !== null){
        store.commit('setLogged', true);
      }
      else {
        store.commit('setLogged', false);
      }
    });

    const handleSelect = (idx) => {
      //console.log(idx);
      store.commit("setMenu", idx);
    }

    const menu = computed(() => {
      return store.getters.getMenu
    });

    // store 의 logged값 실시간으로 확인
    // 로그인상태(로그인 T, 로그아웃 F)
    const logged = computed(() => {
      return store.getters.getLogged
    });

    // 아이디 정보(로그인 정보추가, 로그아웃 정보제거)
    const memail = computed(() => {
      return store.getters.getMemail
    });
    // 아이디 정보(로그인 정보추가, 로그아웃 정보제거)
    const mname = computed(() => {
      return store.getters.getMname
    });
    // 아이디 정보(로그인 정보추가, 로그아웃 정보제거)
    // SELLER, CUSTOMER
    const mrole = computed(() => {
      return store.getters.getMrole
    });
    // store에서 읽은 메뉴값으로 초기값으로 세팅
    const state = reactive({
      activeIndex : menu
    });

    
    return {logged, handleSelect, state, mrole, mname, memail}
  }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}
</style>