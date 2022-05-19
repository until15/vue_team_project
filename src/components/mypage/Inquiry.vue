<template>
    <div>
        <h3>게시판 글쓰기</h3>
        제목 : <input type="text" v-model="state.qtitle" /><br />
        내용 : <textarea rows="10" v-model="state.qcontent" ></textarea><br />
        <hr />
        <img :src="state.imageUrl" style="width:100px" />
        이미지 : <input type="file" @change="handleImage($event)" /><br />
        <button @click="handleInsert">등록하기</button>
        <button @click="handleBack">돌아가기</button>

    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            qtitle : '',
            qcontent : '',
            qimage : null,
            imageUrl : require('@/assets/img/default.png'),
            token : sessionStorage.getItem("TOKEN")

        });

        const handleInsert = async() => {
            if(state.token !== null){
                const url = `/ROOT/api/Inquiry/insert`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const body = {
                    qtitle : state.qtitle,
                    qcontent : state.qcontent
                };
                const response = await axios.post(url, body, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    const url1 = `/ROOT/api/Inquiryimg/insert`;
                    const headers1 = {"Content-Type":"multipart/form-data", "token":state.token};
                    const body1 = new FormData();
                    body1.append("file", state.qimage);
                    body1.append("qno", response.data.result);
                    
                    const response1 = await axios.post(url1, body1, {headers:headers1});
                    console.log(response1.data);
                    if(response1.data.status === 200){
                        alert('등록되었습니다!');
                        router.push({name:"Mypage", query:{menu:3}});
                    }
                }
            } 
        };

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.qimage = e.target.files[0];
            }
            else{
                state.imageUrl = require('@/assets/img/default.png');
                state.qimage = null;
            }
        }

         const handleBack = () => {
            router.push({name:"menu3"})
        }

        
        

        return {state, handleInsert, handleBack, handleImage}
    }
}
</script>

<style lang="scss" scoped>

</style>