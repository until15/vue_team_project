<template>
    <div>
        <h3>인증하기</h3>
        {{state.jno}}
        <div>
            내용 : <input type="text" v-model="state.comment" /> <br />
            <button @click="handleProve">인증하기</button>
        </div>

        <!-- 이미지 일괄 추가 테스트 -->
        <div>
            <input type="file" @change="handleImage($event)" />
            <button @click="handleTest">이미지 테스트</button>
        </div>

        <!-- 파일 여러개 element plus -->
        <div>
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
                
                <template #file="{ file }">
                <div>
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />

                </div>
                </template>
            </el-upload>

            <el-dialog v-model="state.dialogVisible">
                <img w-full :src="state.dialogImageUrl" />
            </el-dialog>
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
            jno : route.params.jno,
            token : sessionStorage.getItem("TOKEN"),
            comment : '',
            cfno : 0,
            proImg : [],
            dialogImageUrl : '',
            dialogVisible : false
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
                const urlImg = ``;
                const headersImg = {"Content-Type":"multipart/form-data"};
                const bodyImg = new FormData();
                for (let i=0; i<state.file.length; i++) {
                    bodyImg.append("file", state.file[i]);                    
                }

                const responseImg = await axios.post(urlImg, bodyImg, {headers:headersImg});
                console.log(responseImg.data);
            }
        };

        // 이미지 불러와서 변수에 담기
        const handleImage = (e)=> {
            console.log("e : ", e);
            console.log("파일 : ", e.target.files[0]);
            state.proImg = e.target.files[0];
            console.log(" 파일 2 :", state.proImg);
        }

        // 여러개 append 테스트
        const handleTest = ()=> {
            const testImage = new FormData();
            for (let i=0; i<state.proImg.length; i++) {
                testImage.append("file["+i+"]", state.proImg[i]);                    
            }
            console.log(" 이게 맞나ㅋㅋㅋㅋ : ", testImage);
        };


        return {
            state,
            handleProve,
            handleImage,
            handleTest,
        }
    }
}
</script>