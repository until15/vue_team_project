<template>
    <div align="center">
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
            
            <h3>챌린지</h3>
            <table border="1">

                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>참가비</th>
                    <th>참가인원</th>
                    <th>작성일</th>
                    <th>좋아요</th>
                </tr>

                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp.chgno}}</td>
                    <td @click="handlePage(tmp.chgno)" style="cursor:pointer">{{tmp.chgtitle}}</td>
                    <td>{{tmp.chgfee}}</td>
                    <td>{{tmp.chgcnt}}</td>
                    <td>{{tmp.chgregdate}}</td>
                    <td @click="handleLike(tmp.chgno)" style="cursor:pointer">{{tmp.chglike}}♥</td>
                </tr>

            </table>

            <hr />

            <h3>인기 챌린지</h3>

            <table border="1">
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>참가비</th>
                    <th>참가인원</th>
                    <th>작성일</th>
                    <th>좋아요</th>
                </tr>

                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp.chgno}}</td>
                    <td @click="handlePage(tmp.chgno)" style="cursor:pointer">{{tmp.chgtitle}}</td>
                    <td>{{tmp.chgfee}}</td>
                    <td>{{tmp.chgcnt}}</td>
                    <td>{{tmp.chgregdate}}</td>
                    <td>{{tmp.chglike}}♥</td>
                </tr>

            </table>

            <hr />

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
            chgtitle : '',
        });


        const handleData = async() => {
            const url = `/ROOT/api/challenge/selectlist`;
            const headers = {"Content-Type" : "application/json"};
            const response = await axios.get(url, {headers});

            console.log(response.data);

            if(response.data.status === 200) {
                state.items = response.data.result; 
            }
        }

        // 챌린지 상세 조회(1개)
        const  handlePage = async(chgno) => {
            console.log(chgno);
            router.push({name:"ChallengeOne", query:{chgno:chgno}});
        }

        // 좋아요
        const handleLike = async(chgno) => {
            console.log(chgno);
            const url = `/ROOT/api/like/insert`;
            const headers = {"Content-Type" : "application/json"};
            const response = await axios.get(url, {headers});

            console.log(response.data);

            if(response.data.status === 200) {
                state.items = response.data.result; 
            }
        }


        onMounted(() => {
            handleData();
        });

        return {
            state, 
            handleData,
            handlePage, 
            handleLike,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>