<template>
    <div>
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container px-4 px-lg-5">
                <div>
                    <a href="http://localhost:8080/?#/">
                        <img class="logo_black" 
                        :src="logo_black" /> 
                    </a>
                </div>
                <!-- <router-link to="/" class="navbar-brand fonts" style="font-size:2.5rem" >헬린지</router-link> -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
                        
                        <li class="nav-item"><router-link to="/challenge" class="nav-link">첼린지</router-link></li>
                        <li class="nav-item"><router-link to="/confirmlist" class="nav-link">인증</router-link></li>
                        <li class="nav-item"><router-link to="/board" class="nav-link">커뮤니티</router-link></li>
                        <li class="nav-item"><router-link to="/pose" class="nav-link">자세</router-link></li>
                        <div v-if="state.item">
                            <div v-if="state.item.mrole === 'admin'">
                            <li class="nav-item"><router-link to="/admin" class="nav-link">관리자 페이지</router-link></li>
                            </div>
                        </div>
                    </ul>

                    <!-- 회원가입/로그인 -->
                    <div class="nav-item navbar-nav" v-if="logged === false">
                        <router-link to="/memberjoin" class="nav-link">회원가입</router-link>  
                        <router-link to="/login" class="nav-link">로그인</router-link>
                    </div>


                    <!-- 로그인한 사용자의 이메일 -->
                    <div v-if="state.item" style="margin-right:10px">
                        <div class="d-flex" v-if="logged === true">{{state.item.mid}}</div>
                    </div>

                    <!-- 내리는 메뉴 -->
                    <!-- class="nav-link dropdown-toggle" -->
                    <div class="d-flex" v-if="logged === true">
                        <li class="nav-item dropdown d-flex">

                            <!-- 프로필 이미지 -->
                            <a  id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <div style="border-radius: 70%; width:50px; height:50px;overflow: hidden; border: 2px solid #e2e2e2;">
                                    <img :src="state.image" style="width:100%; height:100% object-fit: cover;margin-top:0px" />
                                </div>
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <router-link to="/myactivity" class="dropdown-item">내 활동</router-link>
                                    <hr class="dropdown-divider" />
                                </li>
                                <li>
                                    <router-link to="/logout" class="dropdown-item">로그아웃</router-link>
                                    <hr class="dropdown-divider" />
                                </li>
                                <li><a class="dropdown-item" href="#/menu1">정보수정</a></li>
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
//import {useRouter} from 'vue-router';
import axios from 'axios';

export default {
    data () {
        return {
            logo_black : require("@/assets/img/헬린지_블랙_폰트와로고.gif")
        }
    },

    setup () {
        const store = useStore();
        //const router = useRouter();

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
        token : sessionStorage.getItem("TOKEN"),
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

.logo_black {
    width: 100px;
}

.fonts {
    font-family: 'Do Hyeon', sans-serif;
}

</style>