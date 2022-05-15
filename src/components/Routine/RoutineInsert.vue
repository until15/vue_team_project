<template>
    <div>
        <el-card shadow="never">
        <h3>루틴 생성 페이지</h3>
        <br>
        루틴 이름 : <input type="text" v-model="state.routines.rtnname"> <br><br>
        <el-button type="info" plain size="mini" @click="handlePlus">루틴추가</el-button>
        <el-button type="info" plain size="mini" @click="handleMinus">루틴삭제</el-button><br><br>
        <div v-for="(routine,i) in state.routines" :key="i">
            루틴 이름 : <input type="text" v-model="state.routines[i].rtnname">
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
            자세 : <input type="text" v-model="state.routines[i].posechg.pno">
            <el-dialog v-model="state.routines[i].dialogTableVisible" title="자세 추가" width="550px" center>
            <el-table :data="state.pose">
                <!-- chk : true 된 것 번호 저장, state.routines[i].posechg.pno 에 세팅-->
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
            <el-button type="info" size="mini" @click="handleChk[i]">선택</el-button>
            </el-dialog>
        </div>
        <br>
        {{state.routines}}
        <el-button type="info" plain size="small" @click="handleRoutineInsert">생성</el-button>
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
                {rtnday : '월', rtncnt : 1, rtnset : 1, rtnname : '루틴명', posechg:{pno:0}, 
                dialogTableVisible: () => {
                    handleChk();
                },
                },
                {rtnday : '화', rtncnt : 1, rtnset : 1, rtnname : '루틴명', posechg:{pno:0}},
                {rtnday : '수', rtncnt : 1, rtnset : 1, rtnname : '루틴명', posechg:{pno:0}}
            ],
            dialogTableVisible : [],
            pnochk : '',
            // 자세
            step : 1, // 삭제 되지 않은 것만
            page : 1,
            title : ''
        })

        const handlePlus = ()=> {
            state.routines.push({rtnday : '월', rtncnt : 1, rtnset : 1, rtnname : '루틴명', posechg:{pno:0}});
        }

        const handleMinus= ()=> {
            if(state.routines.length > 1){
                state.routines.pop();
            }
        }

        const handleChk = () => {
            console.log("RoutineInsert.vue =>");
            let arr = 1
     
            for(let tmp of state.pose){
                if(tmp.chk === true){
                    arr = (tmp.pno);
                }
            }
            console.log(arr)
            for(let i=0; i<state.pose.length; i++){
                state.routines[i].posechg.pno = arr
                state.state.routines[i].posechg.pno = JSON.stringify(state.pnochk);
                console.log("==============" + state.routines[i].posechg.pno)
            }

            state.dialogTableVisible = false;
        }

        const handleRoutineInsert = async() => {
            const url = `/ROOT/api/routine/insertbatch.json`;
            const headers = {"Content-Type":"application/json"};
            // const body = {
            //     rtnday : state.routines.rtnday,
            //     rtncnt : state.routines.rtncnt,
            //     rtnset : state.routines.rtnset,
            //     rtnname : state.routines.rtnname,
            //     posechg : state.pnochk
            // }
            const body = [];
            for(let i=0; i<state.pose.length; i++){
                body.append("rtnday", state.routines[i].rtnday);
                body.append("rtncnt", state.routines[i].rtncnt);
                body.append("rtnset", state.routines[i].rtnset);
                body.append("rtnname", state.routines[i].rtnname);
                body.append("posechg", state.routines[i].posechg.pno);
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
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

 
        const dialogTableVisible = () => {
            // console.log(i);
            // for(let i=0; i<state.pose.length; i++){
            //     state.routines.dialogTableVisible[i] = false
            // }
            true;

        }
        
        const dialogFormVisible = ref(false)

        return {
            state, 
            dialogTableVisible, 
            dialogFormVisible, 
            currentChange, 
            handleChk, 
            handlePlus, 
            handleMinus,
            handleRoutineInsert 
        }
    }
}
</script>

<style lang="scss" scoped>

</style>