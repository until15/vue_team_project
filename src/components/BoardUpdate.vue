<template>
    <div>
        <h3>게시물 수정</h3>
        <div v-if="state.item">
        제목 : <input type="text" v-model="state.item.btitle" /><br />
        내용 : <input type="text" v-model="state.item.bcontent" /><br />
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
            token : sessionStorage.getItem("TOKEN")
        });

        const handleData = async(bno) => {
            const url = `/ROOT/api/community/selectone?bno=${bno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
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

        onMounted(() =>{
            handleData(state.bno);
        });
        

        return {state, handleData, handleUpdate}
    }
}
</script>

<style lang="scss" scoped>

</style>