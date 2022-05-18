<template>
    <div>
        <h3>인증하기</h3>
        {{state.jno}}
        imgcount : {{state.imgcount}}
        <div>
            <!-- 내용 -->
            내용 : <input type="text" v-model="state.comment" /> <br />

            <!-- 이미지 일괄 추가-->
            <div v-for="(tmp, idx) in state.imgcount" :key="tmp">
                <img :src="state.imageUrl[idx]" alt="인증 이미지" style="width:50px">
                <input type="file" @change="handleImage($event, idx)" />
                <button @click="handleDelete(idx)">X</button>
            </div>

            <!-- 인증하기 버튼 -->
            <button @click="handleProve">인증하기</button>
        </div>

    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
    setup () {

        const route = useRoute();

        const state = reactive({
            jno : route.params.jno,     // 참가번호
            token : sessionStorage.getItem("TOKEN"),    // 토큰
            comment : '',   // 인증 내용
            cfno : 0,   // 인증번호
            imgcount : 1,    // 선택할 파일 갯수
            proImg : [],    // 이미지 데이터
            imageUrl : []   // 파일을 URL화 시킨거
        });

        // 인증하기
        const handleProve = async()=> {
            const url = `/ROOT/api/confirm/insert.json?jno=${state.jno}`;
            const headers = {
                "Content-Type":"application/json",
                "token":state.token
            }
            const body = {
                cfcomment : state.comment
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                console.log("인증 완료");
                state.cfno = response.data.result

                const urlImg = `/ROOT/api/confirm/cfimage.insert?cfno=${state.cfno}`;
                const headersImg = {"Content-Type":"multipart/form-data"};
                const bodyImg = new FormData();
                for (let i=0; i<state.proImg.length; i++) {
                    bodyImg.append("file", state.proImg[i]);                    
                }
                const responseImg = await axios.post(urlImg, bodyImg, {headers:headersImg});
                console.log(responseImg.data);
                if (responseImg.data.status === 200) {
                    console.log("dkanrjs");
                }
            }
        };

        // 이미지 선택 취소
        const handleDelete = (i)=> {
            console.log(i);
        }

        // 이미지 불러와서 변수에 담기
        const handleImage = (e, idx)=> {
            console.log(idx);
            if(e.target.files[0]){
                state.imgcount += 1;
                state.proImg[idx] = e.target.files[0];
                state.imageUrl[idx] = URL.createObjectURL(e.target.files[0]);
            }
        }

        return {
            state,
            handleProve,
            handleImage,
            handleDelete,
        }
    }
}
</script>