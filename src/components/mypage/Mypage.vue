<template>
    <div>
        <div>
            <!-- 타이틀 -->
            <div class="center">
                <h3 style="margin-top:100px;">나의 정보</h3>
            </div>

            <!-- 프로필 사진 -->
            <a class="center" style="margin-top:40px;">
                <div style="border-radius: 70%; width:130px; height:130px;overflow: hidden; border: 3px solid #e2e2e2;">
                    <img :src="state.imageUrl" style="width:100%; height:100% object-fit: cover;margin-top:0px" />
                </div>
            </a>
            <br />


            <!-- 정보 입력 -->
            <div v-if="state.item" style="margin-right:60px;margin-top:-40px">

                <el-form class="center" :inline="true" style="margin-top:50px;" >
                    <!-- 이름 -->
                    <el-form-item label="이름" label-width="80px" style="margin-left:-15px;margin-top:20px;">
                        <el-input class="input-size" size="medium" ref="mname" v-model="state.item.mname" placeholder="이름" disabled />
                    </el-form-item>
                </el-form>

                <el-form class="center" :inline="true">
                    <!-- 닉네임 -->
                    <el-form-item label="닉네임" label-width="80px;" style="margin-left:22px;margin-top:-20px;">
                        <el-input class="input-size" size="medium" ref="mid" v-model="state.item.mid" placeholder="닉네임" disabled />
                    </el-form-item>
                </el-form>

                <el-form class="center" :inline="true">
                    <!-- 닉네임 -->
                    <el-form-item label="생년월일" label-width="80px;" style="margin-left:12px;margin-top:-20px;">
                        <el-input class="input-size" size="medium" v-model="state.item.mbirth" placeholder="생년월일" disabled />
                    </el-form-item>
                </el-form>

                <el-form class="center" :inline="true">
                    <!-- 연락처 -->
                    <el-form-item label="연락처" label-width="80px;" style="margin-left:22px;margin-top:-20px;">
                        <el-input class="input-size" size="medium" ref="mphone" maxlength="11" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" v-model="state.item.mphone" type="text" placeholder="-는 빼고 입력해주세요" disabled />
                    </el-form-item>
                </el-form>

                <el-form class="center" :inline="true">
                    <!-- 키 -->
                    <el-form-item label="키" label-width="80px;" style="margin-left:66px;margin-top:-15px;">
                        <el-select class="input-size" ref="mrole" v-model="state.item.mheight" size="medium" placeholder="키" disabled>
                            <el-option v-for="no in 250" :key="no" :label="no" :value="no">
                                {{no}}
                            </el-option>
                        </el-select>
                        cm
                    </el-form-item>
                </el-form>

                <el-form class="center" :inline="true" style="margin-right:-32px;"  >
                    <!-- 몸무게 -->
                    <el-form-item label="몸무게" label-width="80px;" style="margin-left:9px;margin-top:-15px;">
                        <el-select class="input-size" ref="mrole" v-model="state.item.mweight" size="medium" placeholder="몸무게" disabled>
                            <el-option v-for="no in 250" :key="no" :label="no" :value="no">
                                {{no}}
                            </el-option>
                        </el-select>
                        kg
                    </el-form-item>
                </el-form>

                <el-form class="center" :inline="true">
                    <!-- 랭크 -->
                    <el-form-item label="랭크" label-width="80px;" style="margin-left:35px;margin-top:-20px;">
                        <el-input class="input-size" size="medium" ref="mphone" maxlength="11" v-model="state.item.mrank" type="text" disabled/>
                    </el-form-item>
                </el-form>
            </div>

            <div class="center" >
                <el-button class="button-blk1" type="info" @click="handleMenu1">정보 수정</el-button>
            </div>
            <br /><br />
        </div>

    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            item : {
                mpw : '',
                mpw1 : '',
                mpw2 : ''
            },
            mimage : null,
            usermidcheck : '',
            table : ref(false),
        });

        const mid = ref(null);
        const mpw = ref(null);
        const mpw1 = ref(null);
        const mpw2 = ref(null);

        // 이름 정규식
        const validname = (mname) => {
            var re = /(^[가-힣a-zA-Z]{2,15})+$/;
            return re.test(mname);
        };

        // 연락처 정규식
        const validPhone = (mphone) => {
            var Phone = /^01([0])-?([0-9]{4})-?([0-9]{4})$/;
            return Phone.test(mphone);
        };

        // 데이터 불러오기(회원)
        const handleData = async() => {
            const url = `/ROOT/api/member/selectmemberone`;
            const headers = {"Content-Type":"application/json","token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                state.mmid = response.data.result1;
                state.image = response.data.imgurl;
                state.imageUrl = state.image;
            }
        };

        // 회원정보 수정하기
        const handleUpdate = async() => {
            if(state.usermidcheck === '"중복확인"'){
                alert('닉네임 중복확인을 해주세요.');
                mid.value.focus();
                return false;
            }
    
            if(state.usermidcheck === '"사용불가"'){
                alert('사용중인 닉네임입니다.');
                mid.value.focus();
                handleData();
                state.usermidcheck = '';
                return false;
            }

            if(state.item.mid === ''){
                alert('닉네임을 입력해주세요.');
                mid.value.focus();
                return false;
            }

            if(state.token !== null){
                if(validname(state.item.mname)){
                    if(validPhone(state.item.mphone)){
                        const mphone = state.item.mphone;
                        const newmphone = mphone.replace(/-/g, '');
                        const url = `/ROOT/api/member/updatemember`;
                        const headers = {"Content-Type":"multipart/form-data", "token":state.token};
                        const body = new FormData();
                        body.append("mname", state.item.mname);
                        body.append("mid", state.item.mid);
                        body.append("mphone", state.item.mphone = newmphone);
                        body.append("mheight", state.item.mheight);
                        body.append("mweight", state.item.mweight);
                        body.append("mimage", state.item.mimage);
                        const response = await axios.put(url, body, {headers});
                        console.log(response.data);
                        if(response.data.status === 200){
                            alert('수정되었습니다.');
                            handleData();
                            router.push({name:"menu11"});
                        }
                    }
                    else{
                        alert('잘못된 연락처입니다.');
                        handleData();
                    }
                }
                else{
                    alert('잘못된 이름의 형식입니다.');
                    handleData();
                }
                
            }
        }

        onMounted(() => {
            handleData();
        });

        // 이미지 전환
        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.item.mimage = e.target.files[0];
            }
            else{
                state.item.mimage = '';
            }
        }

        // 닉네임 체크
        const checkMid = async() => {
            const url = `/ROOT/api/member/checkmidone?mid=${state.item.mid}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 1){
                state.usermidcheck = '"사용불가"';

            }
            else if(response.data.status === 200){
                state.usermidcheck = '';
              
            }
            else if(state.item.mid === ''){
                state.usermidcheck = '"닉네임을 입력하세요"';
            }
            else{
                state.usermidcheck = '"사용가능"';
            }
        }

        // 암호변경 다이얼로그 열기
        const handlePwUpdate = () => {
            state.table = ref(true);
            state.item.mpw = '';
            state.item.mpw1 = '';
            state.item.mpw2 = '';
        }

        //암호 변경
        const handleUpdatePw1 = async() => {
            
            if(state.item.mpw === ''){
                alert('기존 암호를 입력해주세요.');
                mpw.value.focus();
                return false;
            }

            if(state.item.mpw1 === ''){
                alert('새암호를 입력해주세요.');
                mpw1.value.focus();
                return false;
            }

            if(state.item.mpw2 === ''){
                alert('암호확인을 입력해주세요.');
                mpw2.value.focus();
                return false;
            }

            if(state.item.mpw === state.item.mpw1){
                alert('기존 암호와 동일한 암호입니다.');
                mpw1.value.focus();
                return false;
            }

            if(state.item.mpw1 !== state.item.mpw2){
                alert('새암호와 암호확인이 일치하지 않습니다.');
                mpw2.value.focus();
                return false;
            }

            if(state.token !== null){
                const url = `/ROOT/api/member/updatepw`;
                const headers = {"Content-Type":"application/json","token":state.token};
                const body = {
                    mpw : state.item.mpw,
                    mpw1 : state.item.mpw1
                };
                const response = await axios.put(url, body, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('변경되었습니다');
                    handleData();
                    state.table = ref(false);
                    console.log(state.item.mpw);
                }
                else{
                    alert('기존암호 또는 새암호가 일치하지 않습니다.');
                    handleData();
                }   
            }
        }

        const handleMidChk = () => {
            state.usermidcheck = '"중복확인"';
        }

        const handleUpdatePW = async() => {
            router.push({name :"UpdatePw"});
        }

        const handleMenu1 = () => {
            router.push({name : "menu1"});
        }

         const handleMenu2 = () => {
            router.push({name : "menu2"});
        }

         const handleMenu3 = () => {
            router.push({name : "menu3"});
        }
        
        return {state, handlePwUpdate, mid, mpw, mpw1, mpw2, handleUpdate, handleImage, checkMid, handleUpdatePw1, handleMidChk, handleUpdatePW, handleMenu1, handleMenu2, handleMenu3}
    }
}
</script>

<style lang="css" scoped>

.center{
  text-align: center;
}

.button-wht {
    background-color: #ffffff;
    border: 1px solid #212529;
    color: #212529;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
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
    width: 300px;
}

.input-size {
    width: 300px;
}

.hide {
    display: none;
}
</style>