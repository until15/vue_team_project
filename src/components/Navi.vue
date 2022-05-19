<template>
    <div>
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <router-link to="/" class="navbar-brand">헬린지</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        <li class="nav-item"><router-link to="/" class="nav-link active" aria-current="page">Home</router-link></li>
                        <li class="nav-item" v-if="logged === false"><router-link to="/memberjoin" class="nav-link">회원가입</router-link></li>
                        <li class="nav-item" v-if="logged === false"><router-link to="/login" class="nav-link">로그인</router-link></li>
                        <li class="nav-item"><router-link to="/board" class="nav-link">자유게시판</router-link></li>
                        <li class="nav-item"><router-link to="/pose" class="nav-link">자세</router-link></li>
                        <li class="nav-item" v-if="logged === true"><router-link to="/menu1" class="nav-link">마이페이지</router-link></li>
                        <li class="nav-item" v-if="logged === true"><router-link to="/logout" class="nav-link">로그아웃</router-link></li>

                    </ul>
                    <div v-if="state.item" style="margin-right:10px">
                        <div class="d-flex" v-if="logged === true">{{state.item.mid}}</div>
                    </div>

                    <!-- 내리는 메뉴 -->
                    <!-- class="nav-link dropdown-toggle" -->
                    <div class="d-flex" v-if="logged === true">
                        <li class="nav-item dropdown d-flex">
                            <a  id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img :src="state.image" style="width:50px;"/></a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#/menu1">정보수정</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#/menu3">1:1 문의</a></li>
                                <li><a class="dropdown-item" href="#/menu2">회원탈퇴</a></li>
                            </ul>
                        </li>
                    </div>
                    <!-- <form class="d-flex">
                        <button class="btn btn-outline-dark" type="submit">
                            <i class="bi-cart-fill me-1"></i>
                            첼린지찜
                            <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
                        </button>
                    </form> -->
                </div>
            </div>
        </nav>
    </div>
</template>

<script>

import { onMounted, computed, reactive } from 'vue';
import {useStore} from 'vuex';
import axios from 'axios';

export default {
    setup () {
        const store = useStore();

        onMounted(() =>{
        if(sessionStorage.getItem("TOKEN") !== null){
            store.commit('setLogged', true);
            handleData();
        }
        else {
            store.commit('setLogged', false);
        }
        });

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
        activeIndex : menu,
        token : sessionStorage.getItem("TOKEN")
        });

        const handleData = async() => {
            const url = `/ROOT/api/member/selectmemberone`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.image = response.data.imgurl;
                state.item = response.data.result;
            }
        }


        return {logged, state, mrole, mname, memail}
    }
}
</script>

<style lang="css" scoped>


</style>