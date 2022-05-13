@@ -1,95 +0,0 @@
<template>
    <div style="padding:20px">
        이메일 : <input type="text" v-model="state.memail" placeholder="이메일" /><br />
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
        <button @click="handleData">화원가입</button>
    </div>
    <el-card shadow="always">
            <el-form :inline="true"  >
                <el-form-item  label="이메일" label-width="80px">
                    <el-input  size="mini" ref="memail" v-model="state.memail" placeholder="이메일" @keyup="handleEmailCheck"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" round >{{state.usermailcheck}}</el-button> 
                </el-form-item>
            </el-form>
            
            <el-form :inline="true"  >
                <el-form-item label="암호" label-width="80px" style="margin-top:-20px" >
                    <el-input  size="mini" ref="mpw" v-model="state.mpw" type="password" placeholder="암호"/>
                </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item label="암호확인" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" ref="mpw1" v-model="state.mpw1" type="password" placeholder="암호확인"/>
                </el-form-item>
            </el-form>

             <el-form :inline="true"  >
                <el-form-item  label="이름" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" ref="mname"  v-model="state.mname" placeholder="이름" />
                </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item  label="닉네임" label-width="80px" style="margin-top:-20px">
                    <el-input  size="mini" ref="mid"  v-model="state.mid" placeholder="닉네임" />
                </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item  label="성별" label-width="80px" style="margin-top:-20px">
                    <el-select v-model="state.mgender" size="mini" placeholder="성별">
                        <el-option value="1" label="남자">남자</el-option>
                        <el-option value="2" label="여자">여자</el-option>
                    </el-select>
              </el-form-item>
            </el-form>


            <el-form :inline="true" style="margin-top:-20px" >
                <el-form-item label="이용약관" label-width="80px">
                    <el-input  type="textarea" v-model="state.text" placeholder="이용약관"></el-input>
                </el-form-item>
            </el-form>

            <el-form :inline="true"  >
                <el-form-item  label="권한" label-width="80px" style="margin-top:-20px">
                    <el-select v-model="state.userrole" size="mini" placeholder="Select">
                        <el-option value="CUSTOMER" label="고객">고객</el-option>
                        <el-option value="SELLER" label="판매자">판매자</el-option>
                    </el-select>
              </el-form-item>
            </el-form>

            <el-button type="primary" size="mini" round style="margin-left:75px" @click="handleJoin">회원가입</el-button>
            <el-button type="primary" size="mini" round @click="hendleHome">홈으로</el-button>
        </el-card>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue'
import {useRouter} from 'vue-router';
export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            memail : '',
            mpw : '',
            mpw1 : '',
            mname : '',
            mid : '',
            mgender : '',
            mbirth : '',
            mheight : '',
            mweight : '',
            mphone : '',
            mrole : '',
            mimage : null,
            imageUrl : require('../assets/img/default.png'),

        });

        const handleData = async() => {
            const url = `/ROOT/api/member/join`;
            const headers = {"Content-Type":"multipart/form-data"};

            const body = new FormData();
            body.append("memail", state.memail);
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

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.mimage = e.target.files[0];
            }
            else{
                state.imageUrl = require('../assets/img/default.png');
                state.mimage = null;
            }
        }
        

        return {state, handleData, handleImage}
    }
}
</script>

<style lang="scss" scoped>

</style>