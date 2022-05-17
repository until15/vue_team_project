<template>
    <div class="center">
        <el-card style="height:600px">
            <h3>회원탈퇴</h3>
            <hr />
            <el-form :inline="true"  >
                <el-input  size="medium" v-model="state.memail"  placeholder="이메일"/>
                <el-form-item label="암호">
                    <el-input  size="medium" v-model="state.mpw" type="password" placeholder="암호"/>
                </el-form-item>
            </el-form>
            <el-button type="info" size="small" plain @click="handleDelete">회원탈퇴</el-button> 
        </el-card>
        <!-- 암호 : <input type="password" v-model="state.item.mpw" /><br />
        <button @click="handleDelete">회원탈퇴</button> -->
    </div>
</template>

<script>
import { onMounted, reactive} from 'vue';
// import {useRouter} from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        // const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            mpw : '',
        });
        
        const handleDelete = async() => {
            if(confirm('정말 탈퇴하시겠습니까?')){
            const url = `/ROOT/api/member/deletemember?memail=${state.memail}&mpw=${state.mpw}`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                mstep : state.mstep = 1,
            };
            const response = await axios.put(url, body, {headers});
            console.log(response.data);
            // if(response.data.status === 200){
            //     alert('탈퇴하였습니다.');
            //     router.push({name : "Logout"});
            // }
            }
        }

        onMounted(() => {

        });

        return {state, handleDelete}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>