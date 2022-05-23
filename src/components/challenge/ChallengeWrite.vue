<template>
    <div align="center">
        <h3>챌린지 생성</h3>
        제목 : <input type="text" ref="chgtitle" v-model="state.chgtitle" /><br />
        소개 : <input type="text" ref="chgintro" v-model="state.chgintro" /><br />
        내용 : <textarea rows="10" ref="chgcontent" v-model="state.chgcontent"></textarea><br />
        모집 마감일 : <input type="date" ref="recruitend" v-model="state.recruitend" /><br />
        챌린지 종료일 : <input type="date" ref="chgend" v-model="state.chgend" /><br />
        참가비 : <input type="number" ref="chgfee" v-model="state.chgfee" /><br />
        참가인원 : <input type="number" ref="chgcnt" v-model="state.chgcnt" /><br />
        <hr />
        <img :src="state.imageUrl" style="width:50px" />
        이미지 : <input type="file" @change="handleImage($event)" /><br />
        <button @click="handleInsert">등록하기</button>
        <button @click="handleBack">돌아가기</button>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router';
export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            chgtitle   : '',
            chgintro   : '',
            chgcontent : '',
            recruitend : '',
            chgend     : '',
            chgfee     : 1000,
            chgcnt     : 1,
            cimage     : null,
            //imageUrl   : require('../assets/img/default.png'),
            token      : sessionStorage.getItem("TOKEN")
        });

        const chgtitle   = ref(null);
        const chgintro   = ref(null);
        const chgcontent = ref(null);
        const recruitend = ref(null);
        const chgend     = ref(null);
        const chgfee     = ref(null);
        const chgcnt     = ref(null);

        const handleInsert = async() => {
            if(state.chgtitle === ''){
                alert('제목을 입력해주세요.');
                chgtitle.value.focus();
                return false;
            }
            
            if(state.chgintro === ''){
                alert('내용을 입력해주세요.');
                chgintro.value.focus();
                return false;
            }

            if(state.chgcontent === ''){
                alert('내용을 입력해주세요.');
                chgcontent.value.focus();
                return false;
            }

            if(state.recruitend === ''){
                alert('모집 마감일을 입력해주세요.');
                recruitend.value.focus();
                return false;
            }

            if(state.chgend === ''){
                alert('챌린지 종료일을 입력해주세요.');
                chgend.value.focus();
                return false;
            }

            if(state.chgfee === ''){
                alert('참가비를 설정해주세요.');
                chgfee.value.focus();
                return false;
            }

            if(state.chgcnt === ''){
                alert('참여인원을 설정해주세요.');
                chgcnt.value.focus();
                return false;
            }

            if(state.token !== null){
                const url = `/ROOT/api/challenge/insert`;
                const headers = {"Content-Type":"multipart/form-data", "token":state.token};
                const body = new FormData();

                body.append("chgtitle", state.chgtitle);
                body.append("chgintro", state.chgintro);
                body.append("chgcontent", state.chgcontent);
                body.append("recruitend1", state.recruitend);
                body.append("chgend1", state.chgend);
                body.append("chgfee", state.chgfee);
                body.append("chgcnt", state.chgcnt);
                body.append("cimage", state.cimage);

                console.log(typeof state.recruitend);
                const response = await axios.post(url, body, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('등록되었습니다!');
                    router.push({name:"Challenge"});
                }
            } 
        };

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.cimage = e.target.files[0];
            }
            else{
                //state.imageUrl = require('../assets/img/default.png');
                state.cimage = null;
            }
        }

        const handleBack = () => {
            router.push({name : "Challenge"});
        }

        return {
            state,  
            chgtitle,
            chgintro,
            chgcontent,
            recruitend,
            chgend,
            chgfee,
            chgcnt,
            handleInsert,
            handleImage,
            handleBack
        }
    }
}
</script>

<style lang="scss" scoped>

</style>