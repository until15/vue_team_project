<template>
    <div align="center">
        <el-card>
            <h3>좋아요 한 챌린지</h3><br />
            <hr />
            <el-table :data="state.items"  style="width: 100% " >
                <el-table-column prop="chgtitle" label="제목"  width="250" >
                    <template #default="scope">
                        <div @click="handlePage(scope.row.chgno)" style="cursor:pointer;">
                            {{scope.row.chgtitle}}
                        </div> 
                    </template>
                </el-table-column>
                <el-table-column prop="chgfee" label="참가비" width="100" />
                <el-table-column prop="chgcnt" label="참가인원" width="80" />
                <el-table-column prop="chglike" label="좋아요" width="80" />
                <el-table-column prop="chglevel" label="난이도" width="80" />

            </el-table>
            <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentChange">
            </el-pagination>
        </el-card>
        <el-button type="info" plain @click="handleMain">메인으로</el-button>
    </div>
</template>

<script>
import { reactive, onMounted} from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router';

export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            page  : 1,
            total : 1,
            token : sessionStorage.getItem("TOKEN")
        });


        const handleData = async() => {
            const url = `/until15/api/like/selectlist?page=${state.page}`;
            const headers = {
                "Content-Type" : "application/json",
                "token":state.token    
            };
            const response = await axios.get(url, {headers});

            console.log(response.data);

            if(response.data.status === 200) {
                state.items = response.data.result;
                state.total = response.data.total;
            }
        }

        // 챌린지 상세 조회(1개)
        const  handlePage = async(no) => {
            console.log("챌린지 번호 : " + no);
            router.push({name:"ChallengeOne", query:{chgno:no}});
        }

        const currentChange = (page) => {
            state.page = page
            handleData();
        }

        const handleMain = () => {
            router.push({name : "Home"})
        }

        onMounted(() => {
            handleData();
        });

        return {
            state, 
            handleData,
            handlePage, 
            currentChange,
            handleMain
        }
    }
}
</script>

<style lang="scss" scoped>

</style>