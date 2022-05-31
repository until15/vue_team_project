<template>
    <div>
        <h3>나의 참가 목록</h3>

        <div v-if="state.items">

            <!-- 검색기능 -->
            <input type="text" v-model="state.text">
            <button @click="handleData(state.page, state.text)">검색</button>

            <!-- 리스트 -->
            <table border="1">
                <tr>
                    <th>첼린지 번호</th>
                    <th>첼린지 제목</th>
                    <th>첼린지 진행상태</th>
                    <th>첼린지 가입날짜</th>
                    <th>첼린지 달성률</th>
                </tr>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp.jno}}</td>
                    <td>{{tmp.challengechgChgtitle}}</td>
                    <td>{{tmp.chgstate}}</td>
                    <td>{{tmp.jregdate}}</td>
                    <td>{{tmp.chgrate}}</td>
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
import { onMounted, reactive } from 'vue';
import axios from 'axios';

export default {
    setup () {

        const state = reactive({
            page : 1,
            pages : 1,
            text : "",
            token : sessionStorage.getItem("TOKEN")
        });

        // 내가 참가한 첼린지 리스트
        const handleData = async(tmp, text) => {
            console.log("page", state.page);
            console.log("text", state.text);
            const url = `ROOT/api/join/selectlist?page=${tmp}&title=${text}`;
            const headers = {
                "Content-Type":"application/json",
                "token" : state.token
                };
            const response = await axios.get(url, {headers});
            // console.log(response.data);

            if (response.data.status === 200) {
                state.items = response.data.result
                state.pages = response.data.pages

                let chgrate = []; 
                for(let tmp of response.data.result){
                   chgrate.push(tmp.chgrate);
                   if(tmp.chgrate <= 0){
                       tmp.chgrate = '0%';
                   }

               }
            }

        };

        const handlePage = async(tmp, text)=> {

            handleData(tmp, text);
        }

        onMounted(() => {
            handleData(state.page, state.text);
        });

        return {state, handleData, handlePage}
    }
}
</script>

<style lang="scss" scoped>

</style>