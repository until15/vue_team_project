<template>
    <div align="center">
        <br>
        <h3>자세</h3>
        <hr>
        <el-form :inline="true" v-if="state.pose" align="center" label-width="100px">
            <el-form-item>
                <el-input v-model="state.title" placeholder="검색어를 입력하세요" size="small" v-on:keydown.enter.prevent='handleLoadData()'/>
            </el-form-item>
            <el-form-item>
                <el-button type="info" plain size="small" @click="handleLoadData()">검색</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="state.pose" align="center">
            <el-table-column property="pno" label="번호" width="150"/>
            <el-table-column property="pname" label="자세" width="250">
                <template #default="scope">
                    <div @click="handlePoseOne(scope.row.pno)" style="cursor:pointer;">
                        {{scope.row.pname}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="ppart" label="부위" width="300" />
            <el-table-column property="plevel" label="난이도" width="100"/>
        </el-table>
        <el-pagination
            align="center"
            layout="prev, pager, next"
            @current-change="currentChange"
            :current-page="state.page"
            :total="state.total">
        </el-pagination>
        <el-button type="info" plain @click="handlePoseInsert" size="small">등록</el-button><br><br>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        // 이동하기
        const router = useRouter();

        const state = reactive({
            step : 1, // 삭제 되지 않은 것만
            page : 1,
            title : '',
            total : 1

        });

        const handlePoseInsert = () => {
            if(sessionStorage.getItem("TOKEN") !== null){
                router.push({name:"PoseInsert"});

            }
            else{
                alert('로그인이 필요한 페이지입니다.');
                router.push({name:"Login"});
            }
        }

        const handleLoadData = async () => {
            const url = `/ROOT/api/pose/selectlist.json?step=${state.step}&page=${state.page}&title=${state.title}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, { headers: headers });
            console.log(response.data);
            if(response.data.status === 200){
                state.pose = response.data.result;
                state.total = response.data.titleTotal
            }
        }

        const currentChange = (page) => {
            console.log('Pose.vue => currentChange', page);
            state.page = page;
            handleLoadData();
        }

        const handlePoseOne = (no) => {
            console.log(no);
            router.push({name:"PoseOne", query:{pno:no}})
        }

        // 생명주기 onMounted()
        onMounted( async() => {
            await handleLoadData();

        });

        return {state, handlePoseOne, handleLoadData, handlePoseInsert, currentChange}
    }
}
</script>

<style lang="scss" scoped>

</style>