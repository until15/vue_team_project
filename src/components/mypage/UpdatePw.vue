<template>
    <div class="center">
        <!-- 회원정보수정으로 합치고 암호수정 페이지는 사용 안합니다 -->
        <h3>암호변경</h3>
        <el-card>
            <div v-if="state.item" >
                <el-form :inline="true"  >
                    <el-form-item label="기존암호" label-width="80px">
                        <el-input  size="medium" ref="mpw" v-model="state.item.mpw" type="password" placeholder="기존암호"/>
                    </el-form-item>
                </el-form>

                <el-form :inline="true"  >
                    <el-form-item label="새암호" label-width="80px" style="margin-top:-20px" >
                        <el-input  size="medium" ref="mpw" v-model="state.item.mpw1" type="password" placeholder="새암호"/>
                    </el-form-item>
                </el-form>

                <el-form :inline="true"  >
                    <el-form-item label="암호확인" label-width="80px" style="margin-top:-20px" >
                        <el-input  size="medium" ref="mpw" v-model="state.item.mpw2" type="password" placeholder="암호확인"/>
                    </el-form-item>
                </el-form>

                <el-button type="info" size="small" style="margin-left:65px" plain @click="handleUpdate">변경하기</el-button>
                <el-button type="info" size="small" plain @click="handleBack">돌아가기</el-button>

                <!-- 기존암호 : <input type="password" v-model="state.item.mpw" placeholder="기존암호" /><br />
                새암호 : <input type="password" v-model="state.item.mpw1" placeholder="새암호" /><br />
                암호확인 : <input type="password" v-model="state.item.mpw2" placeholder="암호확인" /><br />
                <button @click="handleUpdate">변경하기</button> -->
            </div>
        </el-card>
        <br /><br />
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

        });

        // 데이터 불러오기
        const handleData = async() => {
            const url = `/ROOT/api/member/selectmemberone`;
            const headers = {"Content-Type":"application/json","token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
            }
        };

        // 암호 수정하기
        const handleUpdate = async() => {
            if(state.token !== null){
                const url = `/ROOT/api/member/updatepw`;
                const headers = {"Content-Type":"application/json","token":state.token};
                const body = {
                    mpw : state.item.mpw,
                    mpw1 : state.item.mpw1
                };
                const response = await axios.put(url, body, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('변경되었습니다');
                    router.push({name:"Mypage", query:{menu:1}});
                }
                else{
                    alert('기존암호 또는 새암호가 일치하지 않습니다.');
                }
                
            }
        }

        // 뒤로가기
        const handleBack = () => {
            router.push({name:"menu1"})
        }

        onMounted(() => {
            handleData();
        });

        return {state, handleUpdate, handleBack}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>