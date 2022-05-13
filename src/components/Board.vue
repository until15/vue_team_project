<template >
    <div align="center" >
        <h3>자유게시판</h3>
        <el-card style="width:900px">
        <hr />
            <el-table :data="state.items"  style="width: 100% " >
                <el-table-column prop="bno" label="번호" width="60" />
                <el-table-column prop="btitle" label="제목"  width="250" >
            <template #default="scope">
                <div @click="handlePage(scope.row.bno)" style="cursor:pointer;">
                    {{scope.row.btitle}}
                </div> 
            </template>
                </el-table-column>
                <el-table-column prop="memail" label="작성자" width="100" />
                <el-table-column prop="bhit" label="조회수" width="80" />
                <el-table-column prop="bregdate" label="날짜" width="250" />
            </el-table>
       
            <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentchange">
            </el-pagination>

        <el-form :inline="true" v-if="state.items" >
            <el-form-item  label="" label-width="80px">
                <el-input type="text" size="mini" v-model="state.btitle" placeholder="검색어 입력" @keyup.enter="handleData" />
            </el-form-item>
            <el-form-item>
                <el-button type="info" plain size="mini" style="margin-left:5px" @click="handleData" >검색</el-button>
            </el-form-item>
        </el-form>
        <hr />
        <el-button type="info" plain @click="handleBoardWrite">글쓰기</el-button>
        </el-card>


            <!-- <table border="1" >
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>조회수</th>
                        <th>날짜</th>
                    </tr>
                    <tr v-for="tmp in state.items" :key="tmp">
                        <td>{{tmp.bno}}</td>
                        <td @click="handlePage(tmp.bno)" style="cursor:pointer">{{tmp.btitle}}</td>
                        <td>{{tmp.memail}}</td>
                        <td>{{tmp.bhit}}</td>
                        <td>{{tmp.bregdate}}</td>
                    </tr>
            </table> -->
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router';
export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            page : 1,
            btitle : '',
            total : 1


        });
        
        onMounted(() => {
            handleData();
        });

        const handleData = async() => {
            const url = `/ROOT/api/community/selectlist?page=${state.page}&btitle=${state.btitle}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items = response.data.result;
                state.pages = response.data.pages;
                state.total = response.data.total;
            }
        }

        const handlePage = async(bno) => {
            const url = `/ROOT/api/community/updatehit?bno=${bno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.put(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                router.push({name:"BoardOne", query : {bno:bno}});
            }
        }

        const handleBoardWrite = () => {
            router.push({name : "BoardWrite"})
        }

        const currentchange = (page) => {
            state.page = page
            handleData();
        }

     


        return {state, handlePage, handleData, currentchange,  handleBoardWrite}


    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}
</style>