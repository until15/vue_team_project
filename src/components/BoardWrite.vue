<template>
    <div>
        <h3>게시판 글쓰기</h3>
        제목 : <input type="text" v-model="state.btitle" /><br />
        내용 : <textarea rows="10" v-model="state.bcontent"></textarea><br />
        이미지 : <input type="file" /><br />
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
            minage : null,
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
                router.push({name:"Board"});
            }
            
        };



        return {state, handleInsert}
    }
}
</script>

<style lang="scss" scoped>

</style>