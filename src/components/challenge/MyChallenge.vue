<template>
    <div>

        <div v-if="state.items">

            <!-- 검색 -->
            <div class="center my-3">
                <el-form :inline="true">
                    <el-form-item  label="" label-width="80px">
                        <el-input 
                        type="text" 
                        v-model="state.text" 
                        placeholder="제목 검색" 
                        @keydown.prevent.enter="handleData(state.page, state.text)" />
                    </el-form-item>
                    <el-form-item>
                        <el-button 
                        type="info" 
                        plain style="margin-left:5px" 
                        @click="handleData(state.page, state.text)" >검색</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <!-- 리스트 -->
            <div class="center">
                <el-table :data="state.items" style="width: 100%" @row-click="handleRow">
                    <el-table-column prop="chgno" label="번호" width="50" />
                    <el-table-column prop="chgtitle" label="제목" width="180" />
                    <el-table-column prop="chgintro" label="소개" />
                    <el-table-column prop="chgcnt" label="인원수" />
                    <el-table-column prop="chgfee" label="참가비" />
                    <el-table-column prop="chgstart" label="시작일" />
                    <el-table-column prop="chgend" label="종료일" />
                    <el-table-column prop="recstate" label="첼린지 상태" />
                    <el-table-column prop="chglevel" label="난이도" />
                    <el-table-column prop="chglike" label="좋아요" />
                </el-table>
            </div>

            <!-- 페이지네이션 -->
            
            <div class="example-pagination-block center my-3" v-if="state.pages">
                <el-pagination 
                    layout="prev, pager, next" 
                    :page-size="5" 
                    :total="state.pages" 
                    @current-change="handleCurrent" />
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

        // 상세보기
        const handleRow = (e)=> {
            // console.log("row 누름 : ", e.chgno);
            router.push({name: 'MyChallengeOne', query:{chgno:e.chgno}});
        };

        const handleData = async(page, text)=> {
            const url = `/until15/api/join/cidselectlist?page=${page}&text=${text}`;
            const headers = {
                "Content-Type":"application/json",
                "token" : state.token
            };
            const response = await axios.get(url, {headers});
            console.log("내가 만든 첼린지 : ", response.data);
            if (response.data.status === 200) {
                state.items = response.data.result;
                state.pages = response.data.pages;

                for (let i in state.items) {
                    // 첼린지 시작일 정규식
                    state.items[i].chgstart = startDate(state.items[i].chgstart);
                    // 첼린지 종료일 정규식
                    state.items[i].chgend = endDate(state.items[i].chgend);
                    // 첼린지 상태 표현식
                    state.items[i].recstate = challengeState(state.items[i].recstate);
                }
            }
        };

        // 시작일 정규 표현식
        const startDate = (date)=> {
            // console.log("시작일 : ", date);
            var regdate = new Date(date);

            var year = regdate.getFullYear();
            var month = ('0' + (regdate.getMonth() + 1)).slice(-2);
            var day = ('0' + regdate.getDate()).slice(-2);

            var hours = ('0' + regdate.getHours()).slice(-2); 
            var minutes = ('0' + regdate.getMinutes()).slice(-2);
            var seconds = ('0' + regdate.getSeconds()).slice(-2); 
            
            var dateString = year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;
            // console.log(dateString);
            return dateString;
        };

        // 종료일 정규 표현식
        const endDate = (date)=> {
            // console.log("종료일 : ", date);
            var regdate = new Date(date);

            var year = regdate.getFullYear();
            var month = ('0' + (regdate.getMonth() + 1)).slice(-2);
            var day = ('0' + regdate.getDate()).slice(-2);

            var hours = ('0' + regdate.getHours()).slice(-2); 
            var minutes = ('0' + regdate.getMinutes()).slice(-2);
            var seconds = ('0' + regdate.getSeconds()).slice(-2); 
            
            var dateString = year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;
            // console.log(dateString);
            return dateString;
        };

        // 첼린지 상태
        const challengeState = (state)=> {
            if (state === 1) {
                state = "시작전";
            }
            else if (state === 2) {
                state = "시작";
            }
            else if (state === 3) {
                state = "종료";
            }
            var stateString = state;
            return stateString;
        };

        // 페이지네이션
        const handleCurrent = (e)=> {
            handleData(e, state.text);
        };

        onMounted(()=> {
            handleData(state.page, state.text);
        });

        return {
            state,
            handleData,
            handleRow,
            handleCurrent
        }
    }
}
</script>

<style lang="css" scoped>

.example-pagination-block{
  margin-top: 10px;
  margin-bottom: 16px;
}

</style>