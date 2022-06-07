<template>
    <div>
        <div>
            <!-- 타이틀 -->
            <div class="center">
                <h3 style="margin-top:100px;">회원 탈퇴</h3>
            </div>
            
            <!-- 버튼 -->
            <div class="center">
                <el-button class="button-blk1" type="info" @click="handleMenu1">정보 수정</el-button>
                <el-button class="button-blk1" type="info" @click="handleMenu3">1:1 문의</el-button>
                <el-button class="button-blk1" type="info"   @click="handleMenu2">회원 탈퇴</el-button>
            </div>

            <!-- 회원탈퇴 -->
            <el-form class="center" :inline="true" style="margin-top:60px;" >
                <el-form-item>
                    <el-input style="width:300px" size="medium" v-model="state.mpw" type="password" placeholder="비밀번호를 입력해주세요."/>
                </el-form-item>
            </el-form>

            <div class="center">
                <el-button class="button-blk" style="margin-bottom:60px;" type="info" size="medium" plain @click="handleDelete">회원 탈퇴</el-button> 
            </div>
        </div>
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
        
        // 회원탈퇴
        const handleDelete = async() => {
            if(state.mpw === ''){
                alert('암호를 입력해주세요.');
                return false;
            }

            if(confirm('정말 탈퇴하시겠습니까?')){
                const url = `/until15/api/member/deletemember?mpw=${state.mpw}`;
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

.button-blk {
    background-color: #212529;
    border: none;
    color: rgb(255, 255, 255);
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
    width: 300px;
}

.button-blk1 {
    background-color: #212529;
    border: none;
    color: rgb(255, 255, 255);
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
}

.center{
  text-align: center;
}

</style>