<template>
    <div class="center">
        <el-card style="height:600px">
            <h3>로그인</h3>
            <el-form :inline="true">
                    <el-form-item  label="이메일" label-width="80px">
                        <el-input  size="medium" ref="memail" v-model="state.memail" placeholder="이메일"/>
                    </el-form-item>
            </el-form>
            
            <el-form :inline="true"  >
                <el-form-item label="암호" label-width="80px" style="margin-top:-20px" >
                    <el-input  size="medium" ref="mpw" v-model="state.mpw" type="password" placeholder="암호" @keydown.prevent.enter="handleLogin"/>
                </el-form-item>
            </el-form>
        <el-button type="info" style="margin-left:30px" size="small" plain @click="handleLogin">로그인</el-button> 
        <el-button type="info" size="small" plain @click="handleJoin">회원가입</el-button> <br /><br />
        
        <a id="custom-login-btn" @click="KakaoLogin"  style="margin-left:65px">
            <img
                src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                width="222"
                alt="카카오 로그인 버튼"
            />
        </a>
        </el-card>
        


        <!-- 이메일 : <input type="text" v-model="state.memail" placeholder="이메일" /><br />
        암호 : <input type="password" v-model="state.mpw" placeholder="암호" /><br />
        <button @click="handleLogin">로그인</button> -->

    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
import {useStore} from 'vuex';


export default {
    setup () {

        const store = useStore();
        const router = useRouter();
        const state = reactive({
            memail : '',
            mpw : ''
        });

        const memail = ref(null);
        const mpw = ref(null);

        const handleLogin = async() => {

            // 아이디 유효성 검사
            if (state.memail === '') {
                alert('아이디를 입력하세요.');
                memail.value.focus();
                return false;
            }

            // 암호 유효성 검사
            if (state.mpw === '') {
                alert('암호를 입력하세요.');
                mpw.value.focus();
                return false;
            }

            const url = `/ROOT/api/member/login`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                memail : state.memail,
                mpw : state.mpw
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('로그인 되었습니다');
                sessionStorage.setItem("TOKEN", response.data.token);
         
                store.commit('setLogged', true);
                store.commit('setMemail', state.memail);
                router.push({name : "Home"});
                console.log(state.memail);
            }
            else{
                alert('아이디 또는 암호가 일치하지 않습니다!');
            } 
        }

        const handleJoin = () => {
            router.push({name : "MemberJoin"});
        }

        // const params = {
        //     redirectUri:'http://localhost:8080/login',
        // }

        // 카카오 로그인
        const KakaoLogin = ()=> {
            console.log("로그인 버튼 클릭 ");

            window.Kakao.Auth.authorize({
                redirectUri: '${http://127.0.0.1:8080/ROOT/}'
            });

            // window.Kakao.Auth.login({
            //     success: function(authObj) {
            //         alert(JSON.stringify(authObj))
            //     },
            //     fail: function(err) {
            //         alert(JSON.stringify(err))
            //     },
            // })
        }

        onMounted(()=> {
            // window.Kakao.init('8842fbb8e601a53493654c0aa37fdb9b');
            // console.log(window.Kakao.isInitialized());
        })
        

        return {state, memail, mpw, handleLogin, handleJoin, KakaoLogin}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>