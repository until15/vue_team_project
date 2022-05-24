<template>
    <div class="center">
        <h1>마이페이지</h1>
            <el-button @click="handleMenu1">정보수정</el-button>
            <el-button @click="handleMenu3">1:1문의</el-button>
            <el-button @click="handleMenu2">회원탈퇴</el-button>
            <br /><br />
        <el-card style="height:600px">
            <h3>회원탈퇴</h3>
            <hr />
            <el-form :inline="true" style="margin-top:50px" >
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
import {useRouter} from 'vue-router';
import axios from 'axios';
import {useStore} from 'vuex';
export default {
    setup () {
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            mpw : ''
        });
        
        const handleDelete = async() => {
            if(state.mpw === ''){
                alert('암호를 입력해주세요.');
                return false;
            }

            if(confirm('정말 탈퇴하시겠습니까?')){
                const url = `/ROOT/api/member/deletemember?mpw=${state.mpw}`;
                const headers = {"Content-Type":"multipart/form-data", "token":state.token};
                const body = new FormData();
                const response = await axios.put(url, body, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('탈퇴하였습니다.');
                    sessionStorage.removeItem("TOKEN");
                    store.commit('setLogged', false);
                    store.commit('ClearMemail');
                    router.push({name : "Home"});
                }
                else{
                    alert('암호가 일치하지 않습니다.');
                }
            }
        }

        const handleMenu1 = () => {
            router.push({name : "menu1"});
        }

         const handleMenu2 = () => {
            router.push({name : "menu2"});
        }

         const handleMenu3 = () => {
            router.push({name : "menu3"});
        }

        onMounted(() => {
         
        });

        return {state,  handleDelete, handleMenu1, handleMenu2, handleMenu3}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>