<template>
    <div align="center" >
        <!-- 게시판 테이블 -->
        <el-card>
        <h3>자유게시판</h3>
        <hr />
            <el-table :data="state.items"  style="width: 100%;" >
                <el-table-column prop="bno" label="번호" width="60" />
                <el-table-column prop="btitle" label="제목"  width="250" >
            <template #default="scope">
                <div @click="handlePage(scope.row.bno)" style="cursor:pointer;">
                    {{scope.row.btitle}}
                </div> 
            </template>
                </el-table-column>
                <el-table-column prop="mid" label="작성자" width="100" />
                <el-table-column prop="bhit" label="조회수" width="80" />
                <el-table-column prop="bregdate" label="날짜" width="100" />
            </el-table>
       
            <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentchange">
            </el-pagination>
        </el-card>
        <br />
        <!-- 검색 -->
        <el-form :inline="true" v-if="state.items" >
            <el-form-item  label="" label-width="80px">
                <el-input type="text" size="mini" v-model="state.btitle" placeholder="검색어 입력" @keydown.prevent.enter="handleData" />
            </el-form-item>
            <el-form-item>
                <el-button type="info" plain size="mini" style="margin-left:5px" @click="handleData" >검색</el-button>
            </el-form-item>
        </el-form>
            <div v-if="logged === true">
                <el-button type="info" plain @click="handleBoardWrite">글쓰기</el-button>
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
            total : 0,
            btitle : '',
            memail : '',
            token : sessionStorage.getItem("TOKEN"),

        });

        const handleData = async() => {
            const url = `/ROOT/api/community/myselectlist?page=${state.page}&btitle=${state.btitle}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items = response.data.result;
                state.total = response.data.total;
            }
            
        }

        onMounted(() =>{
            handleData();
        });

        const currentchange = (page) => {
            state.page = page
            handleData();
        }
        

        return {state, currentchange}
    }
}
</script>

<style lang="scss" scoped>

</style>