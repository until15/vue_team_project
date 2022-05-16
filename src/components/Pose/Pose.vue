<template>
    <div>
        <h3>자세 페이지</h3>
        <input type="text" v-model="state.title">
        <button @click="handleLoadData()">검색</button>
        {{state.title}}
        <el-table :data="state.pose">
            <el-table-column property="pno" label="번호" width="50"/>
            <el-table-column property="pname" label="자세" width="150">
                <template #default="scope">
                    <div @click="handlePoseOne(scope.row.pno)" style="cursor:pointer;">
                        {{scope.row.pname}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="ppart" label="부위" width="100" />
            <el-table-column property="plevel" label="난이도" width="100"/>
        </el-table>
        <el-pagination
            layout="prev, pager, next"
            @current-change="currentChange"
            :current-page="state.page"
            :page-size="10"
            :pager-count="5"
            :total="state.total">
        </el-pagination>
        <button @click="handlePoseInsert">글쓰기</button><br>
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
            title : ''

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
            const url = `/ROOT/api/pose/selectlist.json?title=${state.title}&page=${state.page}`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                pstep : state.step
            }
            const response = await axios.post(url, body, {headers});
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