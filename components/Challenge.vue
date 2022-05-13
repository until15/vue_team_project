<template>
    <div>
        <h3>챌린지</h3>
        <router-link to="/challengewrite">생성</router-link>
        <hr />

         <!--  // form-data : "chgtitle":"aaa", "chgintro" : "bbb", "chgcontent" : "ccc", "chglevel" : 1,
    // "chgend" : yyyy-mm-dd 00:00:00, "recruitend" : yyyy-mm-dd 00:00:00, "chfee" : 10000 -->
        <div v-if="state.items">
            <input type="text" v-model="state.text">
            <select name="" id="">
                <option>전체</option>
                <option>제목</option>
                <option>난이도</option>
                <option>인기순</option>
                <option>작성자</option>
            </select>
            <button @click="handleData(state.page, state.text)">검색</button>          
            

            <table border="1">

                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>참가비</th>
                    <th>참가인원</th>
                    <th>좋아요</th>
                    <th>작성일</th>
                </tr>

                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp.chgno}}</td>
                    <td @click="handlePage(tmp.chgno)" style="cursor:pointer">{{tmp.chgtitle}}</td>
                    <td>{{tmp.chgfee}}</td>
                    <td>{{tmp.chgcnt}}</td>
                    <td>{{tmp.chglike}}</td>
                    <td>{{tmp.chgregdate}}</td>
                </tr>

            </table>
        </div>

        <div>
            <button v-for="tmp in state.pageable" :key="tmp" @click="handlePagenation(tmp)">
                {{tmp}}
            </button>
        </div>


    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            page : 1,
            chgtitle : '',
            total : 0,
        });

        const handleData = async() => {
            const url = `/ROOT/api/challenge/selectlist?page=${state.page}&text=${state.chgtitle}`;
            const headers = {"Content-Type" : "application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                state.items = response.data.result; 
            }
        }

        const  handlePage = async(chgno) => {
            console.log(chgno);
            router.push({name:"ChallengeOne", query:{chgno:chgno}});
        }

        const handlePagenation = (tmp) => {
            state.page = Number(tmp);
            handleData();
        }

        onMounted(() => {
            handleData();
        });

        return {state, handlePage, handlePagenation}
    }
}
</script>

<style lang="scss" scoped>

</style>