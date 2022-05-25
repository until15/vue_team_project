<template>
    <div class="center">
        <!-- 로그인 -->
        <el-card style="height:600px">
            <div style="margin-right:70px">
                    <h3 style="margin-left:60px">로그인</h3>
                    <el-form :inline="true">
                            <el-form-item  label="이메일" label-width="80px">
                                <el-input  size="medium" ref="memail" v-model="state.memail" placeholder="이메일" />
                            </el-form-item>
                    </el-form>
                    
                    <el-form :inline="true"  >
                        <el-form-item label="암호" label-width="80px" style="margin-top:-20px" >
                            <el-input  size="medium" ref="mpw" v-model="state.mpw" type="password" placeholder="암호" @keydown.prevent.enter="handleLogin"/>
                        </el-form-item>
                    </el-form>
                    <div style="margin-top:-20px;margin-left:65px">
                        <el-link @click="dialogmemail = true">아이디찾기</el-link>
                        <el-link style="margin-left:30px" @click="dialogmpw = true">암호찾기</el-link>
                    </div>
                    
                <el-button type="info" style="margin-left:60px;margin-top:10px" size="small" plain @click="handleLogin">로그인</el-button> 
                <el-button type="info" size="small" plain @click="handleJoin">회원가입</el-button> <br /><br />
                
                <a id="custom-login-btn" @click="kakao" style="margin-left:65px">
                    <img
                        src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                        width="222"
                        alt="카카오 로그인 버튼"
                    />
                </a>
            </div>
        </el-card>
        <!-- 아이디 찾기 다이얼로그 -->
        <el-dialog v-model="dialogmemail" width="30%" title="이메일(아이디)찾기" :before-close="handleClose">
            <div v-if="state.item">
               당신의 아이디는 {{state.item.memail}} 입니다.
            </div>
            <br />        
            <div style="margin-right:40px">
                <el-form :inline="true"  >
                    <el-form-item label="이름" label-width="80px">
                        <el-input  size="medium" v-model="state.mname" placeholder="이름" />
                    </el-form-item>
                </el-form>
                <el-form :inline="true" style="margin-top:-20px" >
                    <el-form-item label="생일" label-width="80px">
                        <el-input  size="medium" v-model="state.mbirth" placeholder="yyyy-mm-dd" />
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="info" style="margin-top:-20px" size="small" plain @click="handleMemail">찾기</el-button>
        </el-dialog>
        <!-- 암호 찾기 다이얼로그 -->
        <el-dialog v-model="dialogmpw" width="30%" title="암호찾기" :before-close="handleClose">
            <div v-if="state.newmpw" style="margin-top:-20px;margin-left:20px">
               임시 암호는 {{state.newmpw}}입니다.
            </div>       
            <div style="margin-right:60px;margin-top:10px">
                <el-form :inline="true"  >
                    <el-form-item label="이메일(아이디)" label-width="100px">
                        <el-input  size="medium" ref="memail" v-model="state.memail" placeholder="이메일" />
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="info" style="margin-top:-20px;margin-left:30px" size="small" plain @click="handleMpw">찾기</el-button>
        </el-dialog>

        <!-- 옛날꺼 -->
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
            mpw : '',
            mname : '',
            mbirth : '',
            newpw : '',
        });

        const memail = ref(null);
        const mpw = ref(null);

        const dialogmemail = ref(false);
        const dialogmpw = ref(false);

        // 로그인
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
                sessionStorage.setItem("MEMAIL", state.memail);
                store.commit('setLogged', true);
                store.commit('setMemail', state.memail);
                console.log(state.memail);
                router.push({name:"Login1"});
            }
            else{
                alert('아이디 또는 암호가 일치하지 않습니다!');
            }
        }

        // 아이디 찾기
        const handleMemail = async() => {
            const url = `/ROOT/api/member/findmemail?mname=${state.mname}&mbirth=${state.mbirth}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
               
            }

        };

        // 암호 찾기
        const handleMpw = async() => {
            if(state.memail === ''){
                alert('이메일(아이디)을 입력해주세요.');
                memail.value.focus();
                return false;
            }

            const url = `/ROOT/api/member/updatepw3?memail=${state.memail}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.put(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.newmpw = response.data.result;
                console.log(state.newmpw);
            }
            else if(response.data.status === 1){
                alert('존재하지 않는 이메일(아이디)입니다.');
            }
        };

        // 다이얼로그 닫을때 새로고침
        const handleClose = () => {
            router.push({name : "Login2"});
        }
        
        // 회원가입으로 가기
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

        // 카카오 로그인1
       const kakao = async() => {
            window.Kakao.Auth.login({
                scope : 'account_email, profile_nickname, gender',
                success : function(response){
                    console.log(response);
                    window.Kakao.API.request({
                        url: '/v2/user/me',
                        success : res => {
                            const kakao_account = res.kakao_account;
                            console.log(kakao_account);
                            state.memail = kakao_account.email;
                        }
                    });
                },
                fail : function(error) {
                    console.log(error);
                }
            });

            if(state.memail){
                const url = `/ROOT/api/member/login`;
                const headers = {"Content-Type":"application/json"};
                const body = {
                    memail : state.memail,
                    mpw : state.mpw
                }
                const response = await axios.post(url, body, {headers});
                console.log(response.data);
            }

        }


        // Logout = () => {
        //     window.kakao.Auth.logout(res => {
        //         if(Ires) return LogoutFailure();
        //         social_logout();
        //     })
        // }

        onMounted(()=> {
            // window.Kakao.init('8842fbb8e601a53493654c0aa37fdb9b');
            // console.log(window.Kakao.isInitialized());
        }) 

        return {state, dialogmemail, dialogmpw, handleMpw, kakao, handleClose, memail, mpw, handleLogin, handleJoin, KakaoLogin, handleMemail}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}
</style>