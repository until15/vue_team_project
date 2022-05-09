<template>
    <div style="padding:20px">
        <h3>정보수정</h3>
        <div v-if="state.item">
            이름 : <input type="text" v-model="state.item.mname" /><br />
            닉네임 : <input type="text" v-model="state.item.mid" /><br />
            연락처 : <input type="text" v-model="state.item.mphone" /><br />
            키 : <input type="text" v-model="state.item.mheight" /><br />
            몸무게 : <input type="text" v-model="state.item.mweight" /><br />
            이미지 : <img :src="state.imageUrl" style="width:100px"/><br />
            프로필사진 : <input type="file" @change="handleImage($event)" /><br />
            <button @click="handleUpdate">수정하기</button>
        
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
export default {
    setup () {

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            mimage : null,
            imageUrl : '',
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
        }

        onMounted(() => {
            handleData();
        });

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.mimage = e.target.files[0];
            }
            else{
                state.imageUrl = '';
                state.mimage = null;
            }
        }
        

        return {state, handleUpdate, handleImage}
    }
}
</script>

<style lang="scss" scoped>

</style>