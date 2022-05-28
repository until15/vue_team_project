<template>
    <div>
        <!-- 로그인 -->
        <div style="margin-right:70px">
            
            <!-- 로고 -->
            <div style="margin-left:65px;">
                <img 
                class="logo_black"
                :src="logo_black" />
            </div>
            
            <h3 class="center" style="margin-top:-30px;">헬린지 로그인</h3>

            <!-- 정보 입력 -->
            <div style="margin-top:50px;">
                <el-form class="center" :inline="true">
                    <el-form-item>
                        <el-input class="input-size" size="medium" ref="memail" v-model="state.memail" placeholder="이메일을 입력해주세요." @keypress="handleEmail"/>
                    </el-form-item>
                </el-form>
                    
                <el-form style="margin-top:-12px;" class="center" :inline="true">
                    <el-form-item>
                        <el-input class="input-size" size="medium" ref="mpw" v-model="state.mpw" type="password" placeholder="비밀번호를 입력해주세요." @keydown.prevent.enter="handleLogin"/>
                    </el-form-item>
                </el-form>            
            </div>

            <!-- 아이디/비밀번호 찾기 -->
            <div class="center" style="margin-top:-10px;">
                <el-link @click="dialogmemail = true">아이디 찾기</el-link>/
                <el-link style="" @click="dialogmpw = true">비밀번호 찾기</el-link>
            </div>

            <!-- 로그인 -->
            <div class="center">
                <button class="button-blk" style="margin-top:10px;" plain @click="handleLogin">로그인</button> 
            </div>
            
            <!-- 카카오 로그인 -->
            <div class="center">
                <!-- <a id="custom-login-btn" @click="kakao">
                    <img
                        src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                        width="222"
                        alt="카카오 로그인 버튼"
                    />
                </a> -->
                <button class="button-kakao" style="margin-top:10px;" plain id="custom-login-btn" @click="kakao">카카오 로그인</button>
            </div>

            <!-- 회원가입 -->
            <div class="center" style="margin-top:10px;margin-bottom:60px">회원이 아니신가요? 
                <el-link style="margin-left:10px" @click="handleJoin">이곳을 클릭해주세요.</el-link>
            </div>

        </div>


        <!-- 아이디 찾기 다이얼로그 -->
        <el-dialog v-model="dialogmemail" width="30%" :before-close="handleClose">
            <div v-if="state.item">
               당신의 아이디는 {{state.item.memail}} 입니다.
            </div>
            <br />        
            <div>

                <h3 class="center-log">이메일(아이디) 찾기</h3>

                <!-- 아이디 입력 -->
                <el-form style="margin-top:25px" class="center-log" :inline="true"  >
                    <el-form-item>
                        <el-input class="input-size" size="medium" ref="mname" v-model="state.mname" placeholder="이름을 입력해주세요." />
                    </el-form-item>
                </el-form>

                <!-- 생년월일 입력 -->
                <el-form class="center-log" :inline="true" style="margin-top:-20px" >
                    <el-form-item>
                        <el-input class="input-size" size="medium" ref="mbirth" v-model="state.mbirth" placeholder="생년월일(YYYY-MM-DD)을 입력해주세요."  />
                    </el-form-item>
                </el-form>

            </div>

            <!-- 찾기 버튼 -->
            <div class="center-log">
                <button class="button-blk" style="margin-top:10px;" plain @click="handleMemail">아이디 찾기</button> 
            </div>
            
        </el-dialog>


        <!-- 암호 찾기 다이얼로그 -->
        <el-dialog v-model="dialogmpw" width="30%" :before-close="handleClose">
            <div v-if="state.newmpw" style="margin-top:-20px;margin-left:20px">
               임시 암호는 {{state.newmpw}}입니다.
            </div>       
            <div style="margin-right:60px;margin-top:10px">

                <h3 class="center">비밀번호 찾기</h3>

                <!-- 이메일 입력 -->
                <el-form style="margin-top:25px" class="center" :inline="true"  >
                    <el-form-item>
                        <el-input class="input-size" size="medium" ref="memail" v-model="state.memail" placeholder="이메일(아이디)를 입력해주세요." />
                    </el-form-item>
                </el-form>

            </div>

            <!-- 찾기 버튼 -->
            <div class="center-log">
                <button class="button-blk" style="margin-top:10px;" plain @click="handleMpw">비밀번호 찾기</button> 
            </div>
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
import {useRoute} from 'vue-router';
import axios from 'axios';
import {useStore} from 'vuex';
export default {
    // 로고 require
    data () {
            return {
                logo_black : require("@/assets/img/헬린지_블랙_로고.gif")
            }
    },
    setup () {

        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const state = reactive({
            memail1 : route.query.memail1,
            memail : '',
            mpw : '',
            mname : '',
            mbirth : '',
            newpw : '',
        });

        const memail = ref(null);
        const mname = ref(null);
        const mpw = ref(null);
        const mbirth = ref(null);

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

            // 이름 유효성 검사
            if (state.mname === '') {
                alert('이름을 입력하세요.');
                mname.value.focus();
                return false;
            }

            // 생일 유효성 검사
            if (state.mbirth === '') {
                alert('생년월일을 입력하세요.');
                mbirth.value.focus();
                return false;
            }

            const url = `/ROOT/api/member/findmemail?mname=${state.mname}&mbirth=${state.mbirth}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
            }
            else{
                alert('찾을 수 없는 사용자입니다.');
                state.mname = '';
                state.mbirth = '';
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

        const handleEmail = () => {
            
        }

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

        return {state, dialogmemail,  handleEmail, mname, mbirth, dialogmpw, handleMpw, kakao, handleClose, memail, mpw, handleLogin, handleJoin, KakaoLogin, handleMemail}
    }
}
</script>

<style lang="css" scoped>

.button-blk {
    background-color: #212529;
    border: none;
    color: rgb(255, 255, 255);
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
    width: 300px;
}

.button-kakao {
    background-color: #f9e000;
    border: none;
    color: #212529;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
    width: 300px;
}

.input-size {
    width: 300px;
}

.logo_black {
    display: block; margin: 0px auto;
    width: 200px;

}

.center{
    margin-left: 65px;
    text-align: center;
}

.center-log{
    text-align: center;
}
</style>