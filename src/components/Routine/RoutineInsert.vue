<template>
    <div>
        <el-card shadow="never">
        <h3>루틴 생성 페이지</h3>
        <br>
        루틴 이름 : <input type="text" v-model="state.routines.rtnname"> <br><br>
        <div v-for="(routine,i) in state.routines" :key="i">
            요일 : 
            <select v-model="state.routines[i].rtnday">
                <option :value="{rtnday: '월'}">월요일</option>
                <option :value="{rtnday: '화'}">화요일</option>
                <option :value="{rtnday: '수'}">수요일</option>
                <option :value="{rtnday: '목'}">목요일</option>
                <option :value="{rtnday: '금'}">금요일</option>
                <option :value="{rtnday: '토'}">토요일</option>
                <option :value="{rtnday: '일'}">일요일</option>
            </select>
            횟수 : <input type="number" min="1" v-model="state.routines[i].rtncnt">
            세트 : <input type="number" min="1" v-model="state.routines[i].rtnset">
            <el-button text @click="dialogTableVisible = true" size="mini">자세추가</el-button>
        </div>
        <el-dialog v-model="dialogTableVisible" title="자세 추가" width="500px">
            <el-table :data="state.pose">
                {{state.pose}}
                <el-table-column>
                    <template #default="scope">
                        <el-checkbox :value="state.pose.pno" v-model="state.pose[scope.$index].chk" size="small"/>
                    </template>
                </el-table-column>
                <el-table-column v-if='false' property="pno" label="번호" width="50"/>
                <el-table-column property="pname" label="자세" width="150" />
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
            <br>
            <el-button type="info" size="mini" @click="chkRow()">선택</el-button>
        </el-dialog>
        <br>
        <el-button type="info" plain size="small">생성</el-button>
        </el-card>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
export default {
    setup () {
        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            routines : [
                {rtnday : '월', rtncnt : 1, rtnset : 1, rtnname : '루틴명', posechg:{pno:0}},
                {rtnday : '화', rtncnt : 1, rtnset : 1, rtnname : '루틴명', posechg:{pno:0}},
                {rtnday : '수', rtncnt : 1, rtnset : 1, rtnname : '루틴명', posechg:{pno:0}}
            ],
            // 자세
            step : 1, // 삭제 되지 않은 것만
            page : 1,
            title : ''
        })

        const handleChk = () => {

        }

        const dialogTableVisible = ref(false)
        const dialogFormVisible = ref(false)

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
            console.log('RoutineInsert.vue => currentChange', page);
            state.page = page;
            handleLoadData();
        }

        onMounted( async() => {
            await handleLoadData();

        });

        return {state, dialogTableVisible, dialogFormVisible, currentChange, handleChk}
    }
}
</script>

<style lang="scss" scoped>

</style>