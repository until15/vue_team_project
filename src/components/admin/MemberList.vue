<template>
    <div align="center">
        <el-card>
        <h3>회원목록</h3>
        <hr />
            <el-table :data="state.item"  style="width: 100% " >
                <el-table-column prop="memail" label="아이디" width="200" />
                <el-table-column prop="mname" label="이름"  width="100" />
                <el-table-column prop="mid" label="닉네임" width="100" />
                <el-table-column prop="mgender" label="성별" width="80" />
                <el-table-column prop="mstep" label="탈퇴여부" width="100" />
            </el-table>
       
            <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentchange">
            </el-pagination>

            <el-form :inline="true" v-if="state.item" >
            <el-form-item  label="" label-width="80px">
                <el-input type="text" size="mini" v-model="state.mid" placeholder="닉네임 입력" @keydown.prevent.enter="handleData" />
            </el-form-item>
            <el-form-item>
                <el-button type="info" plain size="mini" style="margin-left:5px" @click="handleData" >검색</el-button>
            </el-form-item>
        </el-form>
        </el-card>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import axios from 'axios';
export default {
    setup () {
        const state = reactive({
            page : 1,
            total : 1,
            memail : '',
            mid : '',
        });

        const handleData = async() => {
            const url = `/until15/api/member/selectmemberlist1?page=${state.page}&memail=${state.memail}&mid=${state.mid}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                state.total = response.data.total;
                state.memail = '';
                state.mid = '';

                let mstep = []; 
                for(let tmp of response.data.result){
                   mstep.push(tmp.com);
                   if(tmp.mstep === 0){
                       tmp.mstep = '이용중';
                   }
                   else if(tmp.mstep === 1){
                       tmp.mstep = '탈퇴회원';
                   }
               }
            }
        } 

        onMounted(() => {
            handleData();
        });

        const currentchange = (page) => {
            state.page = page
            handleData();
        }

        return {state, currentchange, handleData}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>