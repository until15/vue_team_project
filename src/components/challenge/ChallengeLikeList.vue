<template>
    <div>
        <div align="center" v-if="state.items">
            <h3>챌린지 인기순 목록</h3>

            <table border="1">
                <tr>
                    <th>인기순</th>
                    <th>제목</th>
                    <th>소개</th>
                    <th>난이도</th>
                    <th>작성일</th>
                </tr>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>좋아요{{tmp.chglike}}개</td>
                    <td @click="handleSelectOne(tmp.chgno)" style="cursor:pointer">{{tmp.chgtitle}}</td>
                    <td>{{tmp.chgintro}}</td>
                    <td>{{tmp.chglevel}}단계</td>
                    <td>{{tmp.chgregdate}}</td>
                </tr>
            </table>

            <input type="text" v-model="state.text">
            <button @click="handleData(state.page, state.text)">검색</button>

            <div>
                <label v-for="tmp in state.pages" :key="tmp">
                    <button @click="handlePage(tmp, state.text)" >{{ tmp }}</button>
                </label>
            </div>
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
            pages : 1,
            text : "",
        });

        const  handleSelectOne = async(chgno) => {
            console.log(chgno);
            router.push({name:"ChallengeOne", query:{chgno:chgno}});
        }

        // 내가 참가한 첼린지 리스트
        const handleData = async(tmp, text) => {
            console.log("page", state.page);
            console.log("text", state.text);
            const url = `ROOT/api/challenge/likeselectlist?page=${tmp}&title=${text}`;
            const headers = {
                "Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            // console.log(response.data);

            if (response.data.status === 200) {
                state.items = response.data.result
                state.pages = response.data.pages
            }

        };

        const handlePage = async(tmp, text)=> {

            handleData(tmp, text);
        }

        onMounted(() => {
            handleData(state.page, state.text);
        });

        return {state, handleData, handlePage, handleSelectOne}
    }
}
</script>

<style lang="scss" scoped>

</style>