<template>
  <div>
    <router-link to="/">Home</router-link> |
    <router-link v-if="logged === false"  to="/challenge">게시판</router-link> |
    <router-link v-if="logged === false" to="/memberjoin">회원가입</router-link> |
    <router-link v-if="logged === false" to="/login">로그인</router-link> |
    <router-link v-if="logged === true" to="/mypage">마이페이지</router-link> |
    <router-link v-if="logged === true" to="/logout">로그아웃</router-link> |
    <router-link v-if="logged" to="/board">자유게시판</router-link> |

    <router-view></router-view>

  </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import {useStore} from 'vuex';
export default {
  setup () {
    const store = useStore();

    const logged = computed(() => store.getters.getLogged )

    onMounted(() =>{
      if(sessionStorage.getItem("TOKEN") !== null){
        store.commit('setLogged', true);
      }
      else {
        store.commit('setLogged', false);
      }
    });
    

    return {logged}
  }
}
</script>

<style lang="scss" scoped>

</style>