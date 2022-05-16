<template>
    <div>
        <div v-if="state.item" class="center" >
            <el-card style="height:600px">
            <h3>회원탈퇴</h3>
            <hr />
            <el-form :inline="true"  >
                <el-form-item label="암호">
                    <el-input  size="medium" ref="mpw" v-model="state.item.mpw" type="password" placeholder="암호"/>
                </el-form-item>
            </el-form>
        <el-button type="info" size="small" plain @click="handleDelete">회원탈퇴</el-button> 
        </el-card>
        
        </div>
        <!-- 암호 : <input type="password" v-model="state.item.mpw" /><br />
        <button @click="handleDelete">회원탈퇴</button> -->
    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            mpw : '',
        });

        const mpw = ref(null);

        const handleData = async() => {
            
                const url = `/ROOT/api/member/selectmemberone`;
                const headers = {"Content-Type":"application/json","token":state.token};
                const response = await axios.get(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    state.item = response.data.result;
                }
            
        };
        
        const handleDelete = async() => {
                if(confirm('정말 탈퇴하시겠습니까?')){
                const url = `/ROOT/api/member/deletemember`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const body = {
                    mstep : state.mstep = 1,
                };
                const response = await axios.put(url, body, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('탈퇴하였습니다.');
                    router.push({name : "Logout"});
                }
            }
        }

        onMounted(() => {
            handleData();
        });

        return {state, mpw, handleDelete}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>