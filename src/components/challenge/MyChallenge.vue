<template>
    <div>
        <div>
            <h3>내가 만든 첼린지</h3>
        </div>
        <div v-if="state.items">
            
            <!-- 검색기능 -->
            <div class="center">
                <input type="text" v-model="state.text">
                <button @click="handleData(state.page, state.text)">검색</button>
            </div>

            <!-- 리스트 -->
            <table border="1">
                <tr>
                    <th>첼린지 번호</th>
                    <th>첼린지 제목</th>
                    <th>첼린지 소개</th>
                    <th>첼린지 인원수</th>
                    <th>첼린지 참가비</th>
                    <th>첼린지 시작일</th>
                    <th>첼린지 종료일</th>
                    <th>첼린지 진행상태</th>
                    <th>첼린지 난이도</th>
                    <th>첼린지 좋아요</th>
                </tr>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp.chgno}}</td>
                    <td @click="handleSelectOne(tmp.chgno)">{{tmp.chgtitle}}</td>
                    <td>{{tmp.chgintro}}</td>
                    <td>{{tmp.chgcnt}}</td>
                    <td>{{tmp.chgfee}}</td>
                    <td>{{tmp.chgstart}}</td>
                    <td>{{tmp.chgend}}</td>
                    <td>{{tmp.recstate}}</td>
                    <td>{{tmp.chglevel}}</td>
                    <td>{{tmp.chglike}}</td>
                </tr>
            </table>

            <!-- 페이지네이션 -->
            <div>
                <label v-for="tmp in state.pages" :key="tmp">
                    <button @click="handlePage(tmp, state.text)" >{{ tmp }}</button>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import {useRouter} from 'vue-router';

export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            page : 1,
            pages : 1,
            text : "",
        });

        const handleData = async(page, text)=> {
            const url = `/ROOT/api/join/cidselectlist?page=${page}&text=${text}`;
            const headers = {
                "Content-Type":"application/json",
                "token" : state.token
            };
            const response = await axios.get(url, {headers});
            console.log("내가 만든 첼린지 : ", response.data);
            if (response.data.status === 200) {
                state.items = response.data.result;
            }
        };

        const handlePage = async(tmp, text)=> {

            handleData(tmp, text);
        }

        const handleSelectOne = async(no)=> {
            console.log(no);
            router.push({name: 'MyChallengeOne', query:{chgno:no}});
        }

        onMounted(()=> {
            handleData(state.page, state.text);
        });

        return {
            state,
            handlePage,
            handleData,
            handleSelectOne,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>