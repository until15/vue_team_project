<template>
    <div>
        <h3>참여중인 첼린지 리스트</h3>
        <div v-if="state.items">
            <table>
                <tr>
                    <th>첼린지 번호</th>
                    <th>첼린지 제목</th>
                    <th>첼린지 진행상태</th>
                    <th>첼린지 가입날짜</th>
                    <th>첼린지 달성률</th>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    setup() {

        const state = reactive({

            token : sessionStorage.getItem("TOKEN"),
            chgs : 1,
            page : 1

        });

        const handleData = async()=> {

            const url = `/ROOT/api/join/joinstate?chgstate=${state.chgs}&page=${state.page}`;
            const headers = {
                "Content-Type":"application/json",
                "token" : state.token
            };
            const response = await axios.get(url, {headers});
            console.log("JoinListPage : ", response.data);
            if (response.data.status === 200) {
                state.items = response.data.result
            }

        };

        onMounted(()=> {
            handleData();
        });

        return {state}
    }
}
</script>