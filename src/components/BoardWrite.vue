@@ -1,51 +0,0 @@
<template>
    <div>
        <h3>게시판 글쓰기</h3>
        제목 : <input type="text" v-model="state.btitle" /><br />
        내용 : <textarea rows="10" v-model="state.bcontent"></textarea><br />
<<<<<<< HEAD
        <img :src="state.imageUrl" style="width:50px" />
        이미지 : <input type="file" @change="handleImage($event)"/><br />
=======
        <hr />
        <img :src="state.imageUrl" style="width:50px" />
        이미지 : <input type="file" @change="handleImage($event)" /><br />
>>>>>>> 6f7ae72f07d8d96f45b4f2d2bbaf91fb829cfb62
        <button @click="handleInsert">등록하기</button>
    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router';
export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            btitle : '',
            bcontent : '',
            mimage : null,
<<<<<<< HEAD
            imageUrl : require('../assets/logo.png'),
=======
            imageUrl : require('../assets/img/default.png'),
>>>>>>> 6f7ae72f07d8d96f45b4f2d2bbaf91fb829cfb62
            token : sessionStorage.getItem("TOKEN")
        });

        const handleInsert = async() => {
            const url = `/ROOT/api/community/insert`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const body = {
                btitle : state.btitle,
                bcontent : state.bcontent
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
<<<<<<< HEAD

=======
>>>>>>> 6f7ae72f07d8d96f45b4f2d2bbaf91fb829cfb62
                const url1 = `/ROOT/api/bimg/insert`;
                const headers1 = {"Content-Type":"multipart/form-data", "token":state.token};
                const body1 = new FormData();
                body1.append("file", state.mimage);
                body1.append("bno", response.data.result);
                
                const response1 = await axios.post(url1, body1, {headers:headers1});
                console.log(response1.data);
                if(response1.data.status === 200){
                    router.push({name:"Board"});
                }
            }

            
            
        };

        const handleImage = (e) => {
            if(e.target.files[0]){
<<<<<<< HEAD
                state.mimage = URL.createObjectURL(e.target.files[0]);
                state.mimage = e.target.files[0];
            }
            else{
                state.imageUrl = require('../assets/logo.png');
=======
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.mimage = e.target.files[0];
            }
            else{
                state.imageUrl = require('../assets/img/default.png');
>>>>>>> 6f7ae72f07d8d96f45b4f2d2bbaf91fb829cfb62
                state.mimage = null;
            }
        }

<<<<<<< HEAD


=======
>>>>>>> 6f7ae72f07d8d96f45b4f2d2bbaf91fb829cfb62
        return {state, handleInsert, handleImage}
    }
}
</script>

<style lang="scss" scoped>

</style>