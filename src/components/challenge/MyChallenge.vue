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

            <div>
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
            <div>
                <label v-for="tmp in state.pages" :key="tmp">
                    <button @click="handlePage(tmp, state.text)" >{{ tmp }}</button>
                </label>
            </div>

            <div class="example-pagination-block">
                <el-pagination layout="prev, pager, next" :total="state.pages" @current-change="handleCurrent" />
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

        const handleRow = (e)=> {
            console.log("row 누름 : ", e.chgno);
            router.push({name: 'MyChallengeOne', query:{chgno:e.chgno}});
        };

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

        const handleCurrent = (e)=> {
            console.log(e);
        };

        onMounted(()=> {
            handleData(state.page, state.text);
        });

        return {
            state,
            handlePage,
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