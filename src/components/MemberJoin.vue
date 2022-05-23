@@ -1,95 +0,0 @@
<template>
    <div >
        <!-- 이메일 : <input type="text" v-model="state.memail" placeholder="이메일" /><br />
        암호 : <input type="password" v-model="state.mpw" placeholder="암호" /><br />
        암호확인 : <input type="password" v-model="state.mpw1" placeholder="암호확인" /><br />
        이름 : <input type="text" v-model="state.mname" placeholder="이름" /><br />
        별명(닉네임) : <input type="text" v-model="state.mid" placeholder="닉네임" /><br />
        성별 : <select v-model="state.mgender">
            <option value="1">남</option>
            <option value="2">여</option>
        </select><br />
        생년월일 : <input type="number" v-model="state.mbirth" placeholder="생년월일" /><br />
        키 : <input type="number" v-model="state.mheight" placeholder="키" /><br />
        몸무게 : <input type="number" v-model="state.mweight" placeholder="몸무게" /><br />
        연락처 : <input type="number" v-model="state.mphone" placeholder="연락처" /><br />
        권한 : <select v-model="state.mrole">
            <option value="admin">관리자</option>
            <option value="member">회원</option>
        </select><br />
        <img :src="state.imageUrl" style="width:100px" />
        프로필사진 : <input type="file" @change="handleImage($event)" /><br />
        <button @click="handleData">화원가입</button> -->
    
        <el-card shadow="always">
            <div class="center">
            <el-form :inline="true" style="margin-left:250px; display:block">
                <el-form-item label="이메일" label-width="80px">
                    <el-input v-model="state.memail" size="medium" ref="memail" placeholder="이메일" @keyup="handleChk" />
                </el-form-item>
                <el-form-item>@</el-form-item>
                <el-form-item>
                        <el-select v-model="state.memail1" size="medium" ref="memail1" placeholder="선택">
                            <el-option  v-for="tmp in state.emailoption" :key="tmp" :label="tmp" :value="tmp" >
                            </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" size="small" plain @click="emailCheck">중복확인</el-button>{{state.usermailcheck}}
                </el-form-item>
            </el-form>

            <!-- <el-form :inline="true" style="margin-left:90px" >
                <el-form-item  label="이메일" label-width="80px">
                    <el-input  size="medium" ref="memail" v-model="state.memail" placeholder="이메일" @keyup="emailCheck"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" size="small" plain>{{state.usermailcheck}}</el-button> 
                </el-form-item>
            </el-form> -->
            <el-form :inline="true" style="margin-right:150px" >
                <el-form-item label="암호" label-width="80px" style="margin-top:-20px" >
                    <el-input  size="medium" ref="mpw" v-model="state.mpw" type="password" placeholder="암호"/>
                </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-right:150px"  >
                <el-form-item label="암호확인" label-width="80px" style="margin-top:-20px">
                    <el-input  size="medium" ref="mpw1" v-model="state.mpw1" type="password" placeholder="암호확인"/>
                </el-form-item>
            </el-form>

             <el-form :inline="true" style="margin-right:150px"  >
                <el-form-item  label="이름" label-width="80px" style="margin-top:-20px">
                    <el-input  size="medium" ref="mname"  v-model="state.mname" placeholder="이름" />
                </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-left:12px;margin-top:-20px" >
                <el-form-item  label="닉네임" label-width="80px">
                    <el-input  size="medium" ref="mid"  v-model="state.mid" placeholder="닉네임" @keyup="handleMidChk" />
                </el-form-item>
                <el-form-item>
                    <el-button type="info" size="small" plain @click="checkMid">중복확인</el-button> {{state.usermidcheck}}
                </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-right:150px"  >
                <el-form-item  label="성별" label-width="80px" style="margin-top:-20px">
                    <el-select ref="mgender" v-model="state.mgender" size="medium" placeholder="성별">
                        <el-option value="1" label="남자">남자</el-option>
                        <el-option value="2" label="여자">여자</el-option>
                    </el-select>
              </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-right:150px" >
                <el-form-item  label="생년월일" label-width="80px" style="margin-top:-20px">
                    <el-date-picker ref="mbirth" v-model="state.mbirth" type="date" placeholder="날짜선택" 
                    format="YYYY/MM/DD" value-format="YYYY-MM-DD" :disabled-date="disabledDate" />
              </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-right:150px"  >
                <el-form-item  label="키" label-width="80px" style="margin-top:-20px">
                    <el-input-number ref="mheight" v-model="state.mheight" size="medium" />
              </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-right:150px"  >
                <el-form-item  label="몸무게" label-width="80px" style="margin-top:-20px">
                    <el-input-number ref="mweight" v-model="state.mweight" size="medium" />
              </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-right:150px"  >
                <el-form-item  label="연락처" label-width="80px" style="margin-top:-20px">
                    <el-input  size="medium" ref="mphone" v-model="state.mphone" type="text" placeholder="000-0000-0000"/>
              </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-right:150px"  >
                <el-form-item  label="권한" label-width="80px" style="margin-top:-20px">
                    <el-select ref="mrole" v-model="state.mrole" size="medium" placeholder="권한">
                        <el-option value="admin" label="관리자"></el-option>
                        <el-option value="member" label="회원"></el-option>
                    </el-select>
              </el-form-item>
            </el-form>

            <img :src="state.imageUrl" style="width:100px" />
            프로필사진 : <input type="file" @change="handleImage($event)" /><br />

            <el-button type="info" plain  style="margin-left:-100px" @click="handleData">회원가입</el-button>
            <el-button type="info" plain  @click="hendleHome">홈으로</el-button>
            </div>
        </el-card>
    </div>

</template>

<script>
import axios from 'axios';
import {reactive, ref } from 'vue'
import {useRouter} from 'vue-router';
export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            memail : '',
            memail1 : '',
            mpw : '',
            mpw1 : '',
            mname : '',
            mid : '',
            mgender : '',
            mbirth : '',
            mheight : 1,
            mweight : 1,
            mphone : '',
            mrole : '',
            mimage : null,
            imageUrl : require('../assets/img/default.png'),
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
            body.append("mphone", state.mphone);
            body.append("mrole", state.mrole);
            body.append("mimage", state.mimage);

            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('가입되었습니다!');
                router.push({name : "Login"});
            }
            
        }

        //정확한 이메일 주소인지 확인
        const validEmail = (memail) => {
            // 정규표현식
            var re = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]*$/i;
            return re.test(memail);
        }
        // const validPhone = (mphone) => {
        // var Phone = /^01([0])-?([0-9]{4})-?([0-9]{4})$/;
        // return Phone.test(mphone);
        // }
        // var Phone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
        // 핸드폰번호 첫/두번째 자리는 01로 시작하며 세번째 자리는 01+0/1/6/7/8/9 가 될 수 있다.
        // 번호 사이사이 대쉬('-')는 사용자가 작성하든 안하든 무시한다.
        // 번호 두번째 마디는 3-4자리가 가능하며 숫자는 0-9까지 들어올 수 있다.
        // 마지막 마디는 마찬가지로 0-9까지 가능하며 4자리만 가능하다.
  


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
        

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.mimage = e.target.files[0];
            }
            else{
                state.mimage = '';
            }
        }

        const hendleHome = () => {
            router.push({name :"Home"});
        }

        const disabledDate = (time) => {
        return time.getTime() > Date.now()
        }

        

        


    
        return {state, disabledDate, handleChk, handleMidChk, usermidcheck, usermailcheck, memail, memail1, mpw, mpw1, mname, mid, mgender, mbirth, mheight, mweight, mphone, mrole, checkMid, handleData, handleImage, hendleHome, emailCheck}
    }
}
</script>

<style lang="css" scoped>
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