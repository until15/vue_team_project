<template>
    <div align="center">
        <el-card >
        <h3>돈관리</h3>
        <hr /> 
            <el-table :data="state.items">
                <el-table-column prop="chgno" label="챌린지 번호" width="100" />
                <el-table-column prop="chgtitle" label="챌린지 제목" width="200" />
                <el-table-column prop="memail" label="아이디"  width="130" />
                <el-table-column prop="pprice" label="입금액"  width="130" />
                <el-table-column prop="cancelprice" label="환불된 금액"  width="130" />
                <el-table-column prop="pregdate" label="결제일" width="100" />
                 
            </el-table>

            <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentchange">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
export default {
    setup () {
        
        const state = reactive({
            total : 1,
            token : sessionStorage.getItem("TOKEN")
        });

        const handleData = async() => {
            const url = `/ROOT/api/pay/selectlist.json`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items = response.data.result;
                state.total = response.data.total;
            }
        };

        const currentchange = (page) => {
            state.page = page;
            handleData();
        }

        onMounted(() => {
            handleData();
        });

        return {state, currentchange}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}
</style>