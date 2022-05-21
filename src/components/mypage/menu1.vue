<template>
    <div class="center">
            <h1>마이페이지</h1>
            <el-button @click="handleMenu1">정보수정</el-button>
            <el-button @click="handleMenu3">1:1문의</el-button>
            <el-button @click="handleMenu2">회원탈퇴</el-button>
            <br /><br />
        <el-card>
        <h3>정보수정</h3>
        <hr />
        <div v-if="state.item" style="margin-right:60px">
            <el-form :inline="true" style="margin-left:90px" >
                <el-form-item  label="이름" label-width="80px" style="margin-top:20px">
                    <el-input  size="medium" ref="mname"  v-model="state.item.mname" placeholder="이름" />
                </el-form-item>

                <el-form-item>
                    <el-button type="info" size="small" style="margin-top:20px" plain @click="handleUpdatePW">암호변경</el-button>
                </el-form-item>
            </el-form>

            <el-form :inline="true" style="margin-left:150px" >
                <el-form-item  label="닉네임" label-width="80px" style="margin-top:-20px">
                    <el-input  size="medium" ref="mid"  v-model="state.item.mid" placeholder="닉네임" @keyup="handleMidChk"/>
                </el-form-item>
                <el-form-item label-width="80px" style="margin-top:-20px">
                    <el-button type="info" size="small" plain @click="checkMid">중복확인</el-button> {{state.usermidcheck}}
                </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item  label="연락처" label-width="80px" style="margin-top:-20px">
                    <el-input  size="medium" ref="mphone" v-model="state.item.mphone" type="text" placeholder="000-0000-0000"/>
              </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item  label="키" label-width="80px" style="margin-top:-20px">
                    <el-input-number ref="mheight" v-model="state.item.mheight" size="medium" />
              </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item  label="몸무게" label-width="80px" style="margin-top:-20px">
                    <el-input-number ref="mweight" v-model="state.item.mweight" size="medium" />
              </el-form-item>
            </el-form>

            <img :src="state.imageUrl" style="width:100px; margin-left:50px"/><br />
            <input type="file" @change="handleImage($event)" style="margin-left:270px" /><br />
            
            <hr />
            <el-button type="info" style="margin-left:50px" plain @click="handleUpdate">수정하기</el-button>


            <!-- 이름 : <input type="text" v-model="state.item.mname" /><br />
            <button @click="handleUpdatePW">암호변경</button><br />
            닉네임 : <input type="text" v-model="state.item.mid" /><br />
            연락처 : <input type="text" v-model="state.item.mphone" /><br />
            키 : <input type="text" v-model="state.item.mheight" /><br />
            몸무게 : <input type="text" v-model="state.item.mweight" /><br />
            이미지 : <img :src="state.imageUrl" style="width:100px"/><br />
            프로필사진 : <input type="file" @change="handleImage($event)" /><br />
            <button @click="handleUpdate">수정하기</button>
         -->
        </div>
        </el-card>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            mimage : null,
            usermidcheck : '"중복확인"'
        });

        const handleData = async() => {
            const url = `/ROOT/api/member/selectmemberone`;
            const headers = {"Content-Type":"application/json","token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                state.image = response.data.imgurl;
                state.imageUrl = state.image;
            }
        };

        const handleUpdate = async() => {

            if(state.usermidcheck === '"사용불가"'){
                alert('사용할수없는 닉네임입니다.');
                return false;
            }
            if(state.token !== null){
                const url = `/ROOT/api/member/updatemember`;
                const headers = {"Content-Type":"multipart/form-data", "token":state.token};
                const body = new FormData();
                body.append("mname", state.item.mname);
                body.append("mid", state.item.mid);
                body.append("mphone", state.item.mphone);
                body.append("mheight", state.item.mheight);
                body.append("mweight", state.item.mweight);
                body.append("mimage", state.item.mimage);
                const response = await axios.put(url, body, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('수정되었습니다.');
                    handleData();
                }
                
            }
        }

        onMounted(() => {
            handleData();
        });

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.item.mimage = e.target.files[0];
            }
            else{
                state.item.mimage = '';
            }
        }

        const checkMid = async() => {
            const url = `/ROOT/api/member/checkmidone?mid=${state.item.mid}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 1){
                state.usermidcheck = '"사용불가"';
            }
            else if(response.data.status === 200){
                state.usermidcheck = '"중복확인"';
               
              
            }
            else{
                state.usermidcheck = '"사용가능"';

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
        
        return {state, handleUpdate, handleImage, checkMid, handleMidChk, handleUpdatePW, handleMenu1, handleMenu2, handleMenu3}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>