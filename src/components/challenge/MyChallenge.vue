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

        const handleRow = (e)=> {
            console.log(e);
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
            handleRow,
        }
    }
}
</script>

<style lang="css">

</style>