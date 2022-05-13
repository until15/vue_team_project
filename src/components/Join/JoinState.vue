<template>
    <div>
        <h3>진행 상태 별 조회</h3>

        <div>
            <!-- 진행 상태 -->
            <select @change="handleState($event)">
                <option value="1">대기중</option>
                <option value="2">포기</option>
                <option value="3">진행중</option>
                <option value="4">달성</option>
            </select>
        </div>

        <div>
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
            chgstate : 1,
            token : sessionStorage.getItem("TOKEN")
        });

        const handleData = async(chgstate)=> {
            console.log("넘어오는 상태값 : ", chgstate);
            console.log("페이지 : ", state.page);
            const url = `/ROOT/api/join/joinstate?chgstate=${chgstate}&page=${state.page}`;
            const headers = {
                "Content-Type":"application/json",
                "token" : state.token
                };
            const response = await axios.get(url, {headers});
            // console.log(response.data);

            if (response.data.status === 200) {
                state.items = response.data.result
            }

        };

        // 상태에 따라 다른 값
        const handleState = (event)=> {
            console.log(event.target.value);
            handleData(event.target.value);
        };

        onMounted(()=> {
            handleData(state.chgstate, state.page);
        });

        return {state, handleState, handleData}
    }
}
</script>

<style lang="scss" scoped>

</style>