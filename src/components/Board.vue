<template>
    <div>
        <h3>자유게시판</h3>
        <router-link to="/boardwrite">글쓰기</router-link>
        <hr />
        <div v-if="state.items">
            <table border="1">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>날짜</th>
                    </tr>
                    <tr v-for="tmp in state.items" :key="tmp">
                        <td>{{tmp.bno}}</td>
                        <td>{{tmp.btitle}}</td>
                        <td>{{tmp.memberchg.memail}}</td>
                        <td>{{tmp.bhit}}</td>
                        <td>{{tmp.bregdate}}</td>
                    </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios';
export default {
    setup () {

        const state = reactive({
            page : 1,

        });
        
        onMounted(() => {
            handleData();
        });

        const handleData = async() => {
            const url = `/ROOT/api/community/selectlist?page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items = response.data.result;
            }
        }

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>