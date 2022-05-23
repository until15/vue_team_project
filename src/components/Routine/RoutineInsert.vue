<template>
    <div align="center">
        <el-card shadow="never">
        <h3>루틴 생성 페이지</h3>
        <br>
        루틴 이름 : <input type="text" v-model="state.rtnname"> <br><br>
        <el-button type="info" plain size="mini" @click="handlePlus">루틴추가</el-button>
        <el-button type="info" plain size="mini" @click="handleMinus">루틴삭제</el-button><br><br>
        <div v-for="(routine,i) in state.routines" :key="i">
            <!-- 루틴 이름 : <input type="text" v-model="state.routines[i].rtnname"> -->
            요일 : 
            <select v-model="state.routines[i].rtnday">
                <option :value="'월'">월요일</option>
                <option :value="'화'">화요일</option>
                <option :value="'수'">수요일</option>
                <option :value="'목'">목요일</option>
                <option :value="'금'">금요일</option>
                <option :value="'토'">토요일</option>
                <option :value="'일'">일요일</option>
            </select>
            횟수 : <input type="number" min="1" v-model="state.routines[i].rtncnt">
            세트 : <input type="number" min="1" v-model="state.routines[i].rtnset">
            <el-button @click="state.routines[i].dialogTableVisible = true" size="mini">자세추가</el-button>
            자세 : <input type="text" v-model="state.routines[i].posechg.pno" readonly>
            <el-dialog v-model="state.routines[i].dialogTableVisible" title="자세 추가" width="550px" center>
            <el-table :data="state.pose">
                <!-- chk : true 된 것 번호 저장, state.routines[i].posechg.pno 에 세팅-->
                <el-table-column>
                    <template #default="scope">
                        <el-checkbox v-model="state.pose[scope.$index].chk" size="small"/>
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
            <el-button type="info" size="mini" @click="handleChk(i)">선택</el-button>
            </el-dialog>
        </div>
        <br>
        <!-- {{state.routines}} -->
        <el-button type="info" plain size="small" @click="handleRoutineInsert">생성</el-button>
        <!-- <el-button type="info" plain size="small" @click="handleRoutineData">불러오기</el-button>
        <div v-if="state.rtn">
        <div v-for="rtn,i in state.rtn" :key="i">
        {{state.rtn[i].rtnname}}
        {{state.rtn[i].rtnday}}
        횟수 : {{state.rtn[i].rtncnt}}
        세트 : {{state.rtn[i].rtnset}}
        </div>
        </div> -->
        </el-card>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
export default {
    setup () {
        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            rtnname : '',
            routines : [
                {rtnday : '월', rtncnt : 1, rtnset : 1, rtnname : '루틴명', posechg:{pno:0}},
                {rtnday : '화', rtncnt : 1, rtnset : 1, rtnname : '루틴명', posechg:{pno:0}},
                {rtnday : '수', rtncnt : 1, rtnset : 1, rtnname : '루틴명', posechg:{pno:0}}
            ],
            // 자세
            step : 1, // 삭제 되지 않은 것만
            page : 1,
            title : '',

            // 루틴
            rtnseq : 38,
        })

        const handlePlus = ()=> {
            state.routines.push({rtnday : '월', rtncnt : 1, rtnset : 1, rtnname : '루틴명', posechg:{pno:0}});
        }

        const handleMinus= ()=> {
            if(state.routines.length > 1){
                state.routines.pop();
            }
        }

        const handleChk = (index) => {
            console.log("RoutineInsert.vue =>" + index);
            let arr = 1
            for(let tmp of state.pose){
                if(tmp.chk === true){
                    arr = (tmp.pno);
                }
            }
            for(let i=0; i<state.routines.length; i++){
                state.routines[index].posechg.pno = arr
                console.log("==============" + state.routines[i].posechg.pno)
                state.routines[i].dialogTableVisible = false;
                for(let tmp of state.pose){
                    tmp.chk = false
                }
            }
        }

        // 일괄등록 (RequestBody)
        const handleRoutineInsert = async() => {
            if(state.rtnname === ''){
                alert('루틴 이름을 입력하세요')
                return false;
            }
            const url = `/ROOT/api/routine/insertbatch.json`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            let body = [];
            for(let i=0; i<state.routines.length; i++){
                state.routines[i].rtnname = state.rtnname
                body.push({
                    rtnday : state.routines[i].rtnday,
                    rtncnt : state.routines[i].rtncnt,
                    rtnset : state.routines[i].rtnset,
                    rtnname : state.routines[i].rtnname,
                    posechg : state.routines[i].posechg
                })
                console.log("==========" + JSON.stringify(body));
            }
            const response = await axios.post(url, body, {headers});
            console.log(response);
            if(response.data.status === 200){
                alert('새 루틴이 생성되었습니다.');
            }
        }

        // 루틴 불러오기 확인용
        const handleRoutineData = async() => {
            const url = `/ROOT/api/routine/selectlist.json`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers:headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.rtn = response.data.result
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
            console.log('RoutineInsert.vue => currentChange', page);
            state.page = page;
            handleLoadData();
        }

        onMounted( async() => {
            await handleLoadData();

        });

        return {
            state,
            currentChange, 
            handleChk, 
            handlePlus, 
            handleMinus,
            handleRoutineData,
            handleRoutineInsert 
        }
    }
}
</script>

<style lang="scss" scoped>

</style>