@@ -1,65 +0,0 @@
<template>
    <div>
        <h3>게시물 수정</h3>
        <div v-if="state.item">
        제목 : <input type="text" v-model="state.item.btitle" /><br />
        내용 : <input type="text" v-model="state.item.bcontent" /><br />
        <div v-for="(tmp, idx) in state.image" :key="tmp">
            <img :src="state.image[idx]" style="width:200px" />
        <button @click="handleDeleteImg(tmp)">삭제</button><br />
        <!-- <input type="file" @change="handleImage($event, idx)" /> -->
        <!-- <button @click="handleUpdateImg(tmp)">수정</button> -->
        </div>
        <button @click="handleUpdate">수정하기</button>
        </div>
        
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';
export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            bno : route.query.bno,
            token : sessionStorage.getItem("TOKEN"),
            mimage : [new File([""],"")],
        });

        const handleData = async(bno) => {
            const url = `/ROOT/api/community/selectone?bno=${bno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                state.image = response.data.imgurl;
            }
        };

        const handleUpdate = async() => {
            const url = `/ROOT/api/community/update?bno=${state.bno}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const body = {
                btitle : state.item.btitle,
                bcontent : state.item.bcontent
            }
            const response = await axios.put(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                router.push({name:"BoardOne", query:{bno:state.bno}});
            }
        };

        const handleDeleteImg = async(tmp) => {
            const no = tmp.split('=');
            console.log("==no==", Number(no[1]));
            const url = `/ROOT/api/bimg/delete?bimgno=${Number(no[1])}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.delete(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('삭제되었습니다');
                handleData(state.bno);
            }
            else{
                alert('권한 없음');
            }
        }

        // const handleUpdateImg = async(tmp, idx) => {
        //     const no = tmp.split('=');
        //     console.log("==no==", Number(no[1]));
        //     const url = `/ROOT/api/bimg/update?bimgno=${Number(no[1])}`;
        //     const headers = {"Content-Type":"application/json", "token":state.token};
        //     const body = new FormData();
        //     body.append("mimage", state.image[idx]);
   
        //     const response = await axios.put(url, {headers});
        //     console.log(response.data);

        // }

        // const handleImage = (e, idx) => {
        //     if(e.target.files[0]){
        //         state.image[idx] = URL.createObjectURL(e.target.files[0]);
        //         state.mimage[idx] = e.target.files[0];
        //     }
        //     else{
        //         state.mimage[idx] = new File([""],"");
        //     }
        // }
       
        onMounted(() =>{
            handleData(state.bno);
        });
        

        return {state, handleData, handleUpdate,  handleDeleteImg}
    }
}
</script>

<style lang="scss" scoped>

</style>