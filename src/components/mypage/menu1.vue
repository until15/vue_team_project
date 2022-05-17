<template>
    <div class="center">
        <el-card>
        <h3>정보수정</h3>
        <hr />
        <div v-if="state.item">
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

            이미지 : <img :src="state.imageUrl" style="width:100px"/><br />
            프로필사진 : <input type="file" @change="handleImage($event)" /><br />
            
            <el-button type="info" size="small" style="margin-top:20px" plain @click="handleUpdate">수정하기</el-button>
            <hr />


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
            usermidcheck : '중복확인'
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
            if(state.item.mid){
                const url = `/ROOT/api/member/checkmid?mid=${state.item.mid}`;
                const headers = {"Content-Type":"application/json"};
                const response = await axios.get(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    state.usermidcheck = '사용불가';
                }
                else{
                    state.usermidcheck = '사용가능';
                }
            }
            else{
                state.usermidcheck = '중복확인';
            }
        }

        const handleMidChk = () => {
            state.usermidcheck = '"중복확인"';
        }

        const handleUpdatePW = async() => {
            router.push({name :"UpdatePw"});
        }
        
        return {state, handleUpdate, handleImage, checkMid, handleMidChk, handleUpdatePW}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>