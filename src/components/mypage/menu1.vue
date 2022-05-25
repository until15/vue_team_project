<template>
    <div class="center">
            <h1>마이페이지</h1>
            <el-button @click="handleMenu1">정보수정</el-button>
            <el-button @click="handleMenu3">1:1문의</el-button>
            <el-button @click="handleMenu2">회원탈퇴</el-button>
            <br /><br />
        <!-- 회원정보 수정 -->
        <el-card >
        <h3>정보수정</h3>
        <hr />
        <div v-if="state.item" style="margin-right:60px">
            <el-form :inline="true" style="margin-left:80px" >
                <el-form-item  label="이름" label-width="80px" style="margin-top:20px">
                    <el-input  size="medium" ref="mname"  v-model="state.item.mname" placeholder="이름" />
                </el-form-item>

                <el-form-item>
                    <el-button type="info" size="small" style="margin-top:20px" plain @click="state.table = true">암호변경</el-button>
                </el-form-item>

                <!-- <el-form-item>
                    <el-button type="info" size="small" style="margin-top:20px" plain @click="handleUpdatePW">암호변경</el-button>
                </el-form-item> -->
            </el-form>

            <el-form :inline="true" style="margin-left:80px" >
                <el-form-item  label="닉네임" label-width="80px" style="margin-top:-15px">
                    <el-input  size="medium" ref="mid"  v-model="state.item.mid" placeholder="닉네임" @keyup="handleMidChk"/>
                </el-form-item>
                <el-form-item label-width="80px" style="margin-top:-15px">
                    <el-button type="info" size="small" plain @click="checkMid">중복확인</el-button>
                </el-form-item><br />
                <el-form-item label-width="80px" style="margin-top:-40px">
                
                    <div style="font-size:10px">{{state.usermidcheck}}</div>
          
                </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item  label="연락처" label-width="80px" style="margin-top:-40px">
                    <el-input  size="medium" ref="mphone" v-model="state.item.mphone" type="text" placeholder="000-0000-0000"/>
              </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-right:-36px"  >
                <el-form-item  label="키" label-width="80px" style="margin-top:-20px">
                    <el-select ref="mrole" v-model="state.item.mheight" size="medium" placeholder="키">
                        <el-option v-for="no in 250" :key="no" :label="no" :value="no">
                            {{no}}
                        </el-option>
                    </el-select>
                    cm
              </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-right:-32px"  >
                <el-form-item  label="몸무게" label-width="80px" style="margin-top:-20px">
                    <el-select ref="mrole" v-model="state.item.mweight" size="medium" placeholder="몸무게">
                        <el-option v-for="no in 250" :key="no" :label="no" :value="no">
                            {{no}}
                        </el-option>
                    </el-select>
                    kg
              </el-form-item>
            </el-form>

            <!-- <el-form :inline="true"  >
                <el-form-item  label="키" label-width="80px" style="margin-top:-15px">
                    <el-input-number ref="mheight" v-model="state.item.mheight" size="medium" />
              </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item  label="몸무게" label-width="80px" style="margin-top:-15px">
                    <el-input-number ref="mweight" v-model="state.item.mweight" size="medium" />
              </el-form-item>
            </el-form> -->

            <img :src="state.imageUrl" style="width:100px; margin-left:60px"/><br />
            <input type="file" @change="handleImage($event)" style="margin-left:220px; font-size:12px; margin-top:10px" /><br />
            
            <hr />
            <el-button type="info" style="margin-left:50px;margin-top:10px" plain @click="handleUpdate">수정하기</el-button>
            <br /><br /><br /><br /><br />

            <!-- 옛날꺼 -->
            <!-- <div>
                이름 : <input type="text" v-model="state.item.mname" /><br />
                <button @click="handleUpdatePW">암호변경</button><br />
                닉네임 : <input type="text" v-model="state.item.mid" /><br />
                연락처 : <input type="text" v-model="state.item.mphone" /><br />
                키 : <input type="text" v-model="state.item.mheight" /><br />
                몸무게 : <input type="text" v-model="state.item.mweight" /><br />
                이미지 : <img :src="state.imageUrl" style="width:100px"/><br />
                프로필사진 : <input type="file" @change="handleImage($event)" /><br />
                <button @click="handleUpdate">수정하기</button>
            </div> -->
        
        </div>
        </el-card>

        <!-- 암호변경 -->
        <el-drawer v-model="state.table" title="" size="30%">
            <div class="center">
                <h3>암호변경</h3>
                <el-card style="height:500px">
                    <div v-if="state.item" style="margin-right:50px">
                        <el-form :inline="true"  >
                            <el-form-item label="기존암호" label-width="80px">
                                <el-input  size="medium" ref="mpw" v-model="state.item.mpw" type="password" placeholder="기존암호"/>
                            </el-form-item>
                        </el-form>

                        <el-form :inline="true"  >
                            <el-form-item label="새암호" label-width="80px" style="margin-top:-20px" >
                                <el-input  size="medium" ref="mpw1" v-model="state.item.mpw1" type="password" placeholder="새암호"/>
                            </el-form-item>
                        </el-form>

                        <el-form :inline="true"  >
                            <el-form-item label="암호확인" label-width="80px" style="margin-top:-20px" >
                                <el-input  size="medium" ref="mpw2" v-model="state.item.mpw2" type="password" placeholder="암호확인"/>
                            </el-form-item>
                        </el-form>

                        <el-button type="info" size="small" style="margin-left:65px" plain @click="handleUpdatePw1">변경하기</el-button>

                       <!-- 옛날꺼  -->
                        <!-- <div>
                            <el-button type="info" size="small" plain @click="handleBack">돌아가기</el-button>

                            기존암호 : <input type="password" v-model="state.item.mpw" placeholder="기존암호" /><br />
                            새암호 : <input type="password" v-model="state.item.mpw1" placeholder="새암호" /><br />
                            암호확인 : <input type="password" v-model="state.item.mpw2" placeholder="암호확인" /><br />
                            <button @click="handleUpdate">변경하기</button>
                        </div> -->
                    </div>
                </el-card>
                <br /><br />
            </div>
        </el-drawer>

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
            mimage : null,
            usermidcheck : '',
            table : ref(false),
        });

        const mid = ref(null);
        const mpw1 = ref(null);
        const mpw2 = ref(null);

        // 이름 정규식
        const validname = (mname) => {
            // 정규표현식
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

        //암호 변경
        const handleUpdatePw1 = async() => {
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
        
        return {state, mid, mpw1, mpw2, handleUpdate, handleImage, checkMid, handleUpdatePw1, handleMidChk, handleUpdatePW, handleMenu1, handleMenu2, handleMenu3}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>