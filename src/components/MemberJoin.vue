@@ -1,95 +0,0 @@
<template>
    <div >

        <div>

            <div class="center">
                <h3 style="margin-top:100px;">헬린지 회원가입</h3>
            </div>

            <div class="center">
                <p>
                    헬린지의 회원이 되어 <br />
                    다양한 챌린지에 도전하세요.
                </p>
            </div>
            
            <div style="margin-top:50px;">

                <!-- 이메일 입력 -->
                <el-form class="center" :inline="true">
                    <el-form-item style="margin-left:145px;">
                        <el-input v-model="state.memail" size="medium" ref="memail" placeholder="이메일" @keyup="handleChk" />
                    </el-form-item>

                    <el-form-item>@</el-form-item>

                    <el-form-item>
                            <el-select style="width:154px;  " v-model="state.memail1" size="medium" ref="memail1" placeholder="선택">
                                <el-option  v-for="tmp in state.emailoption" :key="tmp" :label="tmp" :value="tmp" >
                                </el-option>
                            </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button class="button-blk1" type="info" size="small" plain @click="emailCheck">중복확인</el-button>{{state.usermailcheck}}
                    </el-form-item>
                </el-form>

                <!-- 비밀번호 -->
                <el-form class="center" :inline="true">
                    <el-form-item style="margin-top:-10px;" >
                        <el-input class="input-size" size="medium" ref="mpw" v-model="state.mpw" type="password" placeholder="비밀번호를 입력해주세요."/>
                    </el-form-item>
                </el-form>

                <!-- 비밀번호 확인 -->
                <el-form class="center" :inline="true">
                    <el-form-item style="margin-top:-10px;">
                        <el-input class="input-size" size="medium" ref="mpw1" v-model="state.mpw1" type="password" placeholder="비밀번호를 다시 입력해주세요."/>
                    </el-form-item>
                </el-form>

                <!-- 이름 -->
                <el-form class="center" :inline="true">
                    <el-form-item style="margin-top:-10px;">
                        <el-input class="input-size" size="medium" ref="mname"  v-model="state.mname" placeholder="이름을 입력해주세요." />
                    </el-form-item>
                </el-form>

                <!-- 닉네임 -->
                <el-form class="center" :inline="true">
                    <el-form-item style="margin-top:-10px;margin-left:148px;">
                        <el-input class="input-size" size="medium" ref="mid"  v-model="state.mid" placeholder="닉네임을 입력해주세요." @keyup="handleMidChk" />
                    </el-form-item>

                    <el-form-item style="margin-top:-10px;">
                        <el-button class="button-blk1" type="info" size="small" plain @click="checkMid">중복확인</el-button> {{state.usermidcheck}}
                    </el-form-item>
                </el-form>


                <el-form class="center" :inline="true">
                    <!-- 성별 -->
                    <el-form-item style="margin-top:-10px;">
                        <el-select style="width:152px;" ref="mgender" v-model="state.mgender" size="medium" placeholder="성별을 선택해주세요.">
                            <el-option value="1" label="남자">남자</el-option>
                            <el-option value="2" label="여자">여자</el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 생년월일 -->
                    <el-form-item style="margin-top:-10px;">
                        <el-date-picker style="width:188px;" ref="mbirth" v-model="state.mbirth" size="medium" type="date" placeholder="생년월일을 입력해주세요." 
                        format="YYYY-MM-DD" value-format="YYYY-MM-DD" :disabled-date="disabledDate" />
                    </el-form-item>
                </el-form>

            
                <el-form class="center" :inline="true">
                    <!-- 키 -->
                    <el-form-item style="margin-top:-10px;margin-left:20px;">
                        <el-select style="width:159px;" ref="mrole" v-model="state.mheight" size="medium" placeholder="키를 입력해주세요.">
                            <el-option v-for="no in 250" :key="no" :label="no" :value="no">
                                {{no}}
                            </el-option>
                        </el-select>
                        cm
                    </el-form-item>

                    <!-- 몸무게 -->
                    <el-form-item style="margin-top:-10px;">
                        <el-select style="width:159px;" ref="mrole" v-model="state.mweight" size="medium" placeholder="몸무게를 입력해주세요.">
                            <el-option v-for="no in 250" :key="no" :label="no" :value="no">
                                {{no}}
                            </el-option>
                        </el-select>
                        kg
                    </el-form-item>
                </el-form>


                <!-- 연락처 -->
                <el-form class="center" :inline="true">
                    <el-form-item style="margin-top:-10px;">
                        <el-input class="input-size" size="medium" ref="mphone" v-model="state.mphone" type="text" placeholder="연락처 예) 000-0000-0000"/>
                    </el-form-item>
                </el-form>

                <!-- 권한 -->
                <el-form class="center" :inline="true">
                    <el-form-item style="margin-top:-10px;">
                        <el-select class="input-size" ref="mrole" v-model="state.mrole" size="medium" placeholder="권한을 선택해주세요. ">
                            <el-option value="admin" label="관리자"></el-option>
                            <el-option value="member" label="회원"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                
                <!-- 프로필 사진 -->
                <a class="center" style="margin-top:10px;">
                    <div style="border-radius: 70%; width:250px; height:250px;overflow: hidden; border: 3px solid #e2e2e2;">
                        <img :src="state.imageUrl" style="width:100%; height:100% object-fit: cover;margin-top:0px" />
                    </div>
                </a>

                <!-- 프로필 사진 업로드 -->
                <div class="center">
                    <!-- 버튼 -->
                    <label style="margin-left:-5px;margin-top:20px;" class="button-blk" for="file">프로필 사진 업로드</label> 

                    <!-- 숨김 -->
                    <input class="hide" type="file" id="file" @change="handleImage($event)" />
                </div>
                
                <!-- 회원가입 버튼 -->
                <div class="center" style="margin-left:-5px;">
                    <el-button class="button-blk" type="info" style="margin-top:10px;" plain @click="handleData">회원가입</el-button>
                </div>

                <!-- 로그인 링크 -->
                <div class="center" style="margin-top:10px;margin-bottom:60px">이미 가입하셨나요?
                    <el-link style="margin-left:10px" @click="handleLogin">이곳을 클릭해주세요.</el-link>
                </div>
            </div>

        </div>
        
    </div>

</template>

<script>
import axios from 'axios';
import {reactive, ref } from 'vue'
import {useRouter} from 'vue-router';
export default {
    setup () {

        const router = useRouter();
        // state 목록
        const state = reactive({
            memail : '',
            memail1 : '',
            mpw : '',
            mpw1 : '',
            mname : '',
            mid : '',
            mgender : '',
            mbirth : '',
            mheight : 140,
            mweight : 30,
            mphone : '',
            mrole : '',
            mimage : null,
            imageUrl : require('../assets/img/default_member.jpg'),
            usermailcheck : '"중복확인"',
            usermidcheck : '"중복확인"',
            emailoption : ['naver.com','gmail.com','daum.net'],
            usermail : ''
        });

        const memail = ref(null);
        const memail1 = ref(null);
        const usermailcheck = ref(null);
        const usermidcheck = ref(null);
        const mpw = ref(null);
        const mpw1 = ref(null);
        const mname = ref(null);
        const mid = ref(null);
        const mgender = ref(null);
        const mbirth = ref(null);
        const mheight = ref(null);
        const mweight = ref(null);
        const mphone = ref(null);
        const mrole = ref(null);

        // 회원가입
        const handleData = async() => {
            if(state.memail === ''){
                alert('이메일을 입력해주세요');
                memail.value.focus();
                return false;
            }

            if(state.memail1 === ''){
                alert('이메일을 입력해주세요');
                memail1.value.focus();
                return false;
            }

            if(state.usermailcheck === '"중복확인"'){
                alert('이메일 중복체크를 해주세요');
                return false;
            }
            else if(state.usermailcheck === '"사용불가"'){
                alert('사용 할 수 없는 이메일입니다.');
                return false;
            }

            if(state.mpw === ''){
                alert('암호을 입력해주세요');
                mpw.value.focus();
                return false;
            } 

            if(state.mpw1 === ''){
                alert('암호확인을 입력해주세요');
                mpw1.value.focus();
                return false;
            }

            if(state.mpw1 !== state.mpw){
                alert('암호가 일치하지 않습니다!');
                mpw1.value.focus();
                return false;
            }
          
            if(state.mname === ''){
                alert('이름을 입력해주세요');
                mname.value.focus();
                return false;
            }

            if(state.mname .length <= 1){
                alert('이름의 길이가 너무 짧습니다!');
                mname.value.focus();
                return false;
            }

            if(state.mid === ''){
                alert('닉네임을 입력해주세요');
                mid.value.focus();
                return false;
            }

            if(state.mid.length <= 1){
                alert('닉네임의 길이가 너무 짧습니다!');
                mid.value.focus();
                return false;
            }

            if(state.usermidcheck === '"중복확인"'){
                alert('닉네임 중복체크를 해주세요');
                return false;
            }
            else if(state.usermidcheck === '"사용불가"'){
                alert('사용 할 수 없는 닉네임입니다.');
                return false;
            }

            if(state.mgender === ''){
                alert('성별을 선택해주세요');
                mgender.value.focus();
                return false;
            }

            if(state.mbirth === ''){
                alert('생일을 입력해주세요');
                mbirth.value.focus();
                return false;
            }

            if(state.mheight === ''){
                alert('키를 입력해주세요');
                mheight.value.focus();
                return false;
            }

            if(state.mweight === ''){
                alert('몸무게 입력해주세요');
                mweight.value.focus();
                return false;
            }

            if(state.mphone === ''){
                alert('연락처를 입력해주세요');
                mphone.value.focus();
                return false;
            }

            if(state.mrole === ''){
                alert('권한을 선택해주세요');
                mrole.value.focus();
                return false;
            }

            if(validname(state.mname)){
                if(validPhone(state.mphone)){
                    const mphone = state.mphone;
                    const newmphone = mphone.replace(/-/g, '');
                    const url = `/ROOT/api/member/join`;
                    const headers = {"Content-Type":"multipart/form-data"};
                    const body = new FormData();
                    body.append("memail", state.memail + "@" + state.memail1);
                    body.append("mpw", state.mpw);
                    body.append("mname", state.mname);
                    body.append("mid", state.mid);
                    body.append("mgender", state.mgender);
                    body.append("mbirth", state.mbirth);
                    body.append("mheight", state.mheight);
                    body.append("mweight", state.mweight);
                    body.append("mphone", state.mphone = newmphone);
                    body.append("mrole", state.mrole);
                    body.append("mimage", state.mimage);

                    const response = await axios.post(url, body, {headers});
                    console.log(response.data);
                    if(response.data.status === 200){
                        alert('가입되었습니다!');
                        router.push({name : "Login"});
                    }
                    else if(response.data.status === 202){
                        alert('가입되었습니다!');
                        router.push({name : "Login"});
                    }
                }
                else{
                    alert('잘못된 연락처 형식입니다');
                    state.mphone = '';
                }
            }
            else{
                alert('잘못된 이름형식 입니다.');
                state.mname = '';
            }
        };

        // 이메일 정규식
        const validEmail = (memail) => {
            var re = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]*$/i;
            return re.test(memail);
        }

        // 이름 정규식
        const validname = (mname) => {
            var re = /(^[가-힣a-zA-Z]{2,15})+$/;
            return re.test(mname);
        }

        //연락처 정규식
        const validPhone = (mphone) => {
            var Phone = /^01([0])-?([0-9]{4})-?([0-9]{4})$/;
            return Phone.test(mphone);
        }

        // 정규식 설명
        // var Phone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        // 핸드폰번호 첫/두번째 자리는 01로 시작하며 세번째 자리는 01+0/1/6/7/8/9 가 될 수 있다.
        // 번호 사이사이 대쉬('-')는 사용자가 작성하든 안하든 무시한다.
        // 번호 두번째 마디는 3-4자리가 가능하며 숫자는 0-9까지 들어올 수 있다.
        // 마지막 마디는 마찬가지로 0-9까지 가능하며 4자리만 가능하다.

        // 이메일 체크
        const emailCheck = async() => {
            if(validEmail(state.memail+'@'+state.memail1)){
                console.log(state.memail +'@'+ state.memail1);
                const url = `/ROOT/api/member/emailcheck?memail=${state.memail+'@'+ state.memail1}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    state.usermailcheck = '"사용불가"';
                }
                else{
                    state.usermailcheck = '"사용가능"';
                }   
            }
            else{
            state.usermailcheck = '"중복확인"';
            }
        }

        const handleChk = () => {
            state.usermailcheck = '"중복확인"';
        }

        const handleMidChk = () => {
            state.usermidcheck = '"중복확인"';
        }

        // 닉네임 체크
        const checkMid = async() => {
            if(state.mid){
                const url = `/ROOT/api/member/checkmid?mid=${state.mid}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    state.usermidcheck = '"사용불가"';
                }
                else{
                    state.usermidcheck = '"사용가능"';
                    }
            }
            else{
                state.usermidcheck = '"중복확인"';
            }
        }
        
        // 이미지 전환
        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.mimage = e.target.files[0];
            }
            else{
                state.mimage = '';
            }
        }

        // 홈으로 이동
        const handleLogin = () => {
            router.push({name :"Login"});
        }
        
        
        // 생년월일 오늘 넘지않기 element plus
        const disabledDate = (time) => {
        return time.getTime() > Date.now()
        }

        return {
            state, 
            disabledDate, 
            handleChk, 
            handleMidChk, 
            usermidcheck, usermailcheck, 
            memail, memail1, 
            mpw, mpw1, 
            mname, mid, 
            mgender, mbirth, 
            mheight, mweight, 
            mphone, mrole, 
            checkMid, 
            handleData, 
            handleImage, 
            handleLogin, 
            emailCheck
        }
    }
}
</script>

<style lang="css" scoped>

.hide {
    display: none;
}

.button-blk1 {
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
}

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
    width: 350px;
}

.input-size {
    width: 350px;
}

.center{
    text-align: center;
}

.demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
}

.demo-date-picker .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
}

.demo-date-picker .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
}

</style>