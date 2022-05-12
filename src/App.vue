<template>
  <div>
    <el-menu :default-active="state.activeIndex" class="center" mode="horizontal" :router="true"  @select="handleSelect">
     
      <el-menu-item index="/" v-if="logged" >홈</el-menu-item>
    
      <el-menu-item index="/memberjoin" v-if="logged === false">회원가입</el-menu-item>

      <el-menu-item index="/login" v-if="logged === false" >로그인</el-menu-item>

      <el-menu-item index="/board">자유게시판</el-menu-item>
      
      <el-menu-item index="/mypage" v-if="logged === true">마이페이지</el-menu-item>

      <el-menu-item index="/logout" v-if="logged === true">로그아웃</el-menu-item>

    </el-menu>
    <!-- <router-link to="/">Home</router-link> |
    <router-link v-if="logged" to="/challenge">챌린지</router-link> |
    <router-link v-if="logged === false" to="/memberjoin">회원가입</router-link> |
    <router-link v-if="logged === false" to="/login">로그인</router-link> |
    <router-link v-if="logged === true" to="/mypage">마이페이지</router-link> |
    <router-link v-if="logged === true" to="/logout">로그아웃</router-link> |
    <router-link v-if="logged" to="/board">자유게시판</router-link> |
    <hr />
    <div v-if="logged === true">{{memail}}, {{mname}}님 로그인</div> -->

    <router-view></router-view>

  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue';
import {useStore} from 'vuex';
export default {
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