<template>
    <div>
        <h3>PROVE LIST</h3>

        <div v-if="state.items">

            <!-- 검색기능 -->
            <input type="text" v-model="state.text">
            <button @click="handleData(state.page, state.text)">검색</button>

            <!-- 리스트 -->
            <table border="1">
                <tr>
                    <th>이미지</th>
                    <th>인증자명</th>
                    <th>첼린지 제목</th>
                    <th>인증 내용</th>
                    <th>인증일</th>
                    <th>진행 상태</th>
                    <th>성공 유무</th>
                    <th>달성률</th>
                </tr>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>
                        <div v-for="(tmp1, idx) in state.imageUrl" :key="tmp1">
                            <span>sdf</span>
                            <img :src="state.imageUrl[idx]" />
                        </div>
                    </td>
                    <td>{{tmp.memail}}</td>
                    <td>{{tmp.chgtitle}}</td>
                    <td>{{tmp.cfcomment}}</td>
                    <td>{{tmp.ccregdate}}</td>
                    <td>{{tmp.chgstate}}</td>
                    <td>{{tmp.cfsuccess}}</td>
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
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    setup () {
        const state = reactive({
            page : 1,
            pages : 1,
            text : "",
        });

        const handleData = async(tmp, text)=> {
            const url = `/ROOT/api/confirm/provelist.json?page=${tmp}&email=${text}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                state.items = response.data.result
                state.pages = response.data.pages

                for( let i=0;i<state.items.length;i++){
                    state.imageNo = state.items[i].cfno
                    console.log(state.imageNo);

                    const url1 = `/ROOT/api/confirm/selectimages?cfno=${state.imageNo}`;
                    const headers1 = {"Content-Type":"application/json"};
                    const response1 = await axios.get(url1, {headers:headers1});
                    console.log(response1.data);
                    if (response1.data.status === 200) {
                        state.imageUrl = response1.data.images
                    }
                }

            }
        };

        const handlePage = async(tmp, text)=> {

            handleData(tmp, text);
        }

        onMounted(()=> {
            handleData(state.page, state.text);
        });

        return {state, handleData, handlePage}
    }
}
</script>

<style lang="scss" scoped>

</style>