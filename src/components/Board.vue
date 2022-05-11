<template >
    <div >
        <h3>자유게시판</h3>
        <router-link to="/boardwrite">글쓰기</router-link>
        <hr />
            <table border="1" >
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>날짜</th>
                    </tr>
                    <tr v-for="tmp in state.items" :key="tmp">
                        <td>{{tmp.bno}}</td>
                        <td @click="handlePage(tmp.bno)" style="cursor:pointer">{{tmp.btitle}}</td>
                        <td>{{tmp.memail}}</td>
                        <td>{{tmp.bhit}}</td>
                        <td>{{tmp.bregdate}}</td>
                    </tr>
            </table>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router';
export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            page : 1,
            btitle : '',
            total : 0,

        });
        
        onMounted(() => {
            handleData();
        });

        const handleData = async() => {
            const url = `/ROOT/api/community/selectlist?page=${state.page}&text=${state.btitle}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items = response.data.result;
                state.total = response.data.pages;
            }
        }

        const handlePage = async(bno) => {
            const url = `/ROOT/api/community/updatehit?bno=${bno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.put(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                router.push({name:"BoardOne", query : {bno:bno}});
            }
        }


        return {state, handlePage}


    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
  display: inline-block;
}
</style>