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

                <tr v-for="(tmp, i) in state.items" :key="tmp">
                    <td>
                        <div v-for="(tmp1, j) in state.imageUrl[i]" :key="tmp1">
                            <!-- <span>{{state.imageUrl[i][j]}}</span> -->
                            <img :src="state.imageUrl[i][j]" style="width:50px" />
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
            imageUrl : [],
            
        });

        const handleData = async(tmp, text)=> {
            const url = `/ROOT/api/confirm/provelist.json?page=${tmp}&email=${text}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            // console.log(response.data);
            if (response.data.status === 200) {
                state.items = response.data.result
                state.pages = response.data.pages

                // imageUrl 배열 초기화
                state.imageUrl.splice(0, state.items.length);   //idx 0부터 요소의 갯수만큼

                for( let i=0;i<state.items.length;i++){
                    state.imageNo = state.items[i].cfno
                    console.log(state.imageNo);

                    // 인증 이미지
                    const url1 = `/ROOT/api/confirm/selectimages?cfno=${state.imageNo}`;
                    const headers1 = {"Content-Type":"application/json"};
                    const response1 = await axios.get(url1, {headers:headers1});
                    console.log("이미지 데이터 : ", response1.data);

                    if (response1.data.status === 200) {
                            
                        state.imageUrl.push(response1.data.images);
                        
                    }
                }
                console.log("이미지 url : ", state.imageUrl);
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