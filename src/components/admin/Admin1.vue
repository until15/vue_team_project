<template>
    <div align="center">
        <!-- 문의목록 -->
        <el-card style="height:550px">
        <h3>1:1문의</h3>
        <hr /> 
            <el-table :data="state.items">
                <el-table-column prop="qno" label="번호" width="60" />
                <el-table-column prop="qtitle" label="제목"  width="230" >
                <template #default="scope">
                    <div @click="handlePage(scope.row.qno)" style="cursor:pointer;">
                        {{scope.row.qtitle}}
                    </div> 
                </template>
                </el-table-column>
                <el-table-column prop="mid" label="작성자" width="130" />
                <el-table-column prop="qregdate" label="날짜" width="100" />
                <el-table-column prop="com" label="처리현황" width="100" />
                 
            </el-table>

            <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentchange">
            </el-pagination>
        </el-card>
        <!-- 검색창 -->
        <el-form :inline="true" v-if="state.items" style="margin-top:20px;" >
            <el-form-item>
                <el-input type="text" size="mini" v-model="state.qtitle" placeholder="검색어 입력" @keydown.prevent.enter="handleData" />
            </el-form-item>
            <el-form-item>
                <el-button type="info" plain size="mini" style="margin-left:5px;" @click="handleData" >검색</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
import { reactive, onMounted } from 'vue';
import {useRouter} from 'vue-router';

import axios from 'axios';
export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            qtitle : '',
            page : 1,
            total : 0,
            items : [
                {com : []},
            ]
        });

        // 데이터 불러오기(목록)
        const handleData = async() => {
            const url = `/ROOT/api/Inquiry/selectlist2??page=${state.page}&qtitle=${state.qtitle}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items = response.data.result;
                state.total = response.data.total;

                let com = []; 
                for(let tmp of response.data.result){
                   com.push(tmp.com);
                  
                   if(tmp.com === 0){
                       tmp.com = '처리중';
                   }
                   else if(tmp.com === 1){
                       tmp.com = '답변완료';
                   }
                   else{
                       tmp.com = '처리중';
                   }
               }
            }
        }

        const currentchange = (page) => {
            state.page = page;
            handleData();
        }

        onMounted(() => {
            handleData();

        });

        const handlePage = (qno) => {
            router.push({name:"Admin2", query:{qno:qno}});
        }


        return {state,  handleData, currentchange, handlePage}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>