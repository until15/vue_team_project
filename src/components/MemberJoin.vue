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
        <img :src="state.imageUrl" style="width:50px" />
        프로필사진 : <input type="file" @change="handleImage($event)" /><br />
        <button @click="handleData">화원가입</button>
    </div>
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
            imageUrl : require('../assets/logo.png'),

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
                router.push({name : "Home"});
            }
        }

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.mimage = URL.createObjectURL(e.target.files[0]);
                state.mimage = e.target.files[0];
            }
            else{
                state.imageUrl = require('../assets/logo.png');
                state.mimage = null;
            }
        }
        

        return {state, handleData, handleImage}
    }
}
</script>

<style lang="scss" scoped>

</style>