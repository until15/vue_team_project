<template>
    <div align="center">
        <el-card>
        <h3>챌린지 인기목록</h3>
        <hr />
            <el-table :data="state.items"  style="width: 100% " >
                <el-table-column prop="chgno" label="번호" width="60" />
                <el-table-column prop="chgtitle" label="제목"  width="250" >
            <template #default="scope">
                <div @click="handlePage(scope.row.chgno)" style="cursor:pointer;">
                    {{scope.row.chgtitle}}
                </div> 
            </template>
                </el-table-column>
                <el-table-column prop="chgfee" label="참가비" width="100" />
                <el-table-column prop="chgcnt" label="참가인원" width="80" />
                <el-table-column prop="chglike" label="좋아요" width="80" />
                <el-table-column prop="chglevel" label="난이도" width="80" />
                <el-table-column prop="chgregdate" label="작성일" width="250" />
            </el-table>
       
            <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentChange">
            </el-pagination>
        </el-card>

        <el-form :inline="true" v-if="state.items" >
            <el-form-item  label="" label-width="80px">
                <el-input type="text" size="mini" v-model="state.chgtitle" placeholder="검색어 입력" @keydown.prevent.enter="handleData" />
            </el-form-item>
            <el-form-item>
                <el-button type="info" plain size="mini" style="margin-left:5px" @click="handleData" >검색</el-button>
            </el-form-item>
        </el-form>
        <el-button type="info" plain @click="handleMain">메인으로</el-button>


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
            like : '',
            total : 1
        });


        const handleData = async() => {
            const url = `/ROOT/api/challenge/likeselctlist?page=${state.page}&like=${state.like}`;
            const headers = {"Content-Type" : "application/json"};
            const response = await axios.get(url, {headers});

            console.log(response.data);

            if(response.data.status === 200) {
                state.items = response.data.result;
                state.total = response.data.total;
                state.like= '';
            }
        }

        // 챌린지 상세 조회(1개)
        const  handlePage = async(no) => {
            console.log(no);
            router.push({name:"ChallengeOne", query:{chgno:no}});
        }

        const currentChange = (page) => {
            state.page = page
            handleData();
        }

        const handleMain = () => {
            router.push({name : "Home"})
        }


        onMounted(() => {
            handleData();
        });

        return {
            state, 
            handleData,
            handlePage, 
            currentChange,
            handleMain

        }
    }
}
</script>

<style lang="scss" scoped>

</style>
