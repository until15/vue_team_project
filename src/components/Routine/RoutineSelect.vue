<template>
  <div align="center" style="padding: 50px">
    <h3>루틴 불러오기 작업용</h3>
    <el-button text @click="dialogTableVisible = true">불러오기</el-button>
    <el-dialog v-model="dialogTableVisible" title="나의 루틴" fullscreen center>
      <el-table :data="state.rtn">
        <el-table-column width="80">
          <template #default="scope">
            <el-checkbox
            :label="state.rtn[scope.$index].rtnseq"
            v-model="state.chk"
            size="small"
            @click="handleRtnno(scope.row.rtnno)" />
          </template>
        </el-table-column>
        <el-table-column v-if="false" property="rtnno" label="번호" width="150" />
        <el-table-column v-if="false" property="rtnseq" label="SEQ" width="150" />
        <el-table-column property="rtnname" label="이름" width="220" />
        <el-table-column property="rtnday" label="요일" width="170" />
        <el-table-column property="pname" label="자세" width="170" />
        <el-table-column property="ppart" label="부위" width="170" />
        <el-table-column property="rtncnt" label="횟수" width="170" />
        <el-table-column property="rtnset" label="세트" width="170" />
        <el-table-column label="편집" width="170">
          <template #default="scope">
            <el-button
              size="small"
              text
              @click="
                (state.dialogTableVisible2 = true),
                  handleRoutineOneData(scope.row.rtnno)
              "
              >수정</el-button
            >
            <el-button size="small" type="danger" @click="handleRoutineDelete(scope.row.rtnno)">삭제</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        align="center"
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="state.total"
      >
      </el-pagination>
      <el-button size="small" @click="handleInsert">등록</el-button>
      <el-popconfirm title="정말 삭제하시겠습니까?" @confirm="handleDelete()">
        <template #reference>
          <el-button size="small" type="danger">삭제</el-button>
        </template>
      </el-popconfirm>
    </el-dialog>
    <div v-if="state.routine">
      <el-dialog v-model="state.dialogTableVisible2" title="루틴 수정">
        <el-form :model="state.routine">
          <el-form-item label="요일 :" :label-width="formLabelWidth">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-select
                  size="large"
                  v-model="state.routine.rtnday"
                  placeholder="state.routine.rtnday"
                >
                  <el-option label="월요일" value="월" />
                  <el-option label="화요일" value="화" />
                  <el-option label="수요일" value="수" />
                  <el-option label="목요일" value="목" />
                  <el-option label="금요일" value="금" />
                  <el-option label="토요일" value="토" />
                  <el-option label="일요일" value="일" />
                </el-select>
              </el-col>
              <el-col :span="19"></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="자세 : " :label-width="formLabelWidth">
            <!-- <input type="hidden" v-model="state.routine.pno"> -->
            <el-row :gutter="20">
              <el-col :span="17"
                ><el-input v-model="state.routine.pname" autocomplete="off"
              />
              </el-col>
              <el-col :span="2"><el-tag>{{state.routine.pno}}</el-tag></el-col>
              <el-col :span="5"
                ><el-button text @click="state.dialogTableVisible3 = true"
                  >변경</el-button
                ></el-col
              >
            </el-row>
          </el-form-item>
          <el-form-item label="횟수 : " :label-width="formLabelWidth">
            <el-input
              type="number"
              min="1"
              v-model="state.routine.rtncnt"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item label="세트 : " :label-width="formLabelWidth">
            <el-input
              type="number"
              min="1"
              v-model="state.routine.rtnset"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <input type="hidden" v-model="state.routine.rtnno" />
          </el-form-item>
        </el-form>
        <el-button
          size="small"
          text
          @click="handleRoutineUpdate(state.routine.rtnno)"
          >수정</el-button
        >
      </el-dialog>
    </div>
    <el-dialog v-model="state.dialogTableVisible3" title="자세">
      <el-table :data="state.pose">
        <!-- chk : true 된 것 번호 저장-->
        <el-table-column>
          <template #default="scope">
            <el-checkbox v-model="state.pose[scope.$index].chk" size="small" />
          </template>
        </el-table-column>
        <el-table-column v-if="false" property="pno" label="번호" width="0" />
        <el-table-column property="pname" label="자세" width="150" />
        <el-table-column property="ppart" label="부위" width="150" />
        <el-table-column property="plevel" label="난이도" width="150" />
      </el-table>
      <el-pagination
        align="center"
        layout="prev, pager, next"
        @current-change="currentChange2"
        :total="state.total1"
      >
      </el-pagination>
      <br />
      <el-button type="info" size="mini" @click="handleChk">선택</el-button>
    </el-dialog>
    <br />
  </div>
</template>

<script>
import axios from "axios";
import { reactive, onMounted, ref } from "vue";
export default {
  setup() {
    onMounted(async () => {
      await handleRoutineData();
      await handlePoseData();
    });

    const dialogTableVisible = ref(false);

    const state = reactive({
      token: sessionStorage.getItem("TOKEN"),
      page: 1,
      page2: 1,
      title: "",
      step: 1, // 자세, 삭제되지 않은 것만
      dialogTableVisible2: false,
      dialogTableVisible3: false,
      chk : [], // 루틴 선택 보관
      rtnno : 1 // 루틴 등록할 때 저장될 하나의 번호 
    });

    // 루틴 번호 받기
    const handleRtnno = (no) => {
      state.rtnno = no;
    }

    // 루틴 등록 : 챌린지 등록할 때 같이 등록 되어야 함.
    const handleInsert = () => {
      console.log("루틴등록=================="+state.rtnno);
      
      alert('챌린지 등록할 때 연결하기')
    }

    // 루틴 개별 삭제
    const handleRoutineDelete = async(no) => {
      if(confirm('삭제하시겠습니까?')){
        const url =`/ROOT/api/routine/delete.json?no=${no}`;
        const headers = {
          "Content-Type": "application/json",
          token: state.token,
        };
        const response = await axios.delete(url, {headers:headers})
        console.log(response);
        if(response.data.status === 200){
          alert('루틴이 삭제되었습니다.');
          handleRoutineData();
        }
      }
    }

    // 루틴 삭제
    const handleDelete = async() => {
      let chked = [];
      let cnt = 0;
      for (let tmp of state.rtn) {
        if (tmp.chk === true) {
          chked.push(tmp.rtnno);
          cnt++;
        }
      }
      if(cnt === 0 || cnt === 1){
        alert('삭제할 루틴을 선택하세요.')
        return false;
      }
      console.log(chked)
      const url =`/ROOT/api/routine/deletebatch.json?no=${chked}`;
      const headers = {
        "Content-Type": "application/json",
        token: state.token,
      };
      const response = await axios.delete(url, {headers:headers})
      console.log(response);
      if(response.data.status === 200){
        alert('루틴이 삭제되었습니다.');
        handleRoutineData();
        for (let tmp of state.rtn) {
          tmp.chk =false
        }
      }
    }

    // 자세 체크
    const handleChk = () => {
      console.log("RoutineSelect.vue => handleChk");
      let chked = "";
      for (let tmp of state.pose) {
        if (tmp.chk === true) {
          chked = tmp.pno;
        }
      }
      state.routine.pno = chked
      state.dialogTableVisible3 = false
      for (let tmp of state.pose) {
        tmp.chk = false
      }
    };

    // 루틴
    const currentChange = (page) => {
      console.log("RoutineSelect.vue => currentChange", page);
      state.page = page;
      handleRoutineData();
    };

    // 자세
    const currentChange2 = (page) => {
      console.log("RoutineSelect.vue => currentChange2", page);
      state.page2 = page;
      handlePoseData();
    };

    // 자세 불러오기
    const handlePoseData = async () => {
      const url = `/ROOT/api/pose/selectlist.json?title=${state.title}&page=${state.page2}`;
      const headers = { "Content-Type": "application/json" };
      const body = {
        pstep: state.step,
      };
      const response = await axios.post(url, body, { headers });
      console.log(response.data);
      if (response.data.status === 200) {
        state.pose = response.data.result;
        state.total1 = response.data.titleTotal;
      }
    };

    // 루틴 수정하기
    const handleRoutineUpdate = async (no) => {
      const url = `/ROOT/api/routine/update.json?no=${no}`;
      const headers = {
        "Content-Type": "application/json",
        token: state.token,
      };
      const body = {
        rtnday: state.routine.rtnday,
        rtncnt: state.routine.rtncnt,
        rtnset: state.routine.rtnset,
        posechg: { pno: state.routine.pno },
      };
      const response = await axios.put(url, body, { headers: headers });
      console.log(response.data);
      if (response.data.status === 200) {
        alert("수정되었습니다.");
        state.dialogTableVisible2 = false;
        handleRoutineData();
      }
    };

    // 루틴 개별 불러오기
    const handleRoutineOneData = async (row) => {
      console.log(row);
      const url = `/ROOT/api/routine/selectoneDt.json?no=${row}`;
      const headers = {
        "Content-Type": "application/json",
        token: state.token,
      };
      const response = await axios.get(url, { headers: headers });
      console.log(response.data);
      if (response.data.status === 200) {
        state.routine = response.data.result;
      }
    };

    // 루틴 불러오기
    const handleRoutineData = async () => {
      const url = `/ROOT/api/routine/selectlist.json?page=${state.page}`;
      const headers = {
        "Content-Type": "application/json",
        token: state.token,
      };
      const response = await axios.get(url, { headers: headers });
      console.log(response.data);
      if (response.data.status === 200) {
        state.rtn = response.data.result;
        state.total = response.data.total;
      }
    };

    return {
      state,
      dialogTableVisible,
      currentChange,
      handleRoutineData,
      handleRoutineUpdate,
      handleRoutineOneData,
      handlePoseData,
      currentChange2,
      handleChk,
      handleDelete,
      handleRoutineDelete,
      handleInsert,
      handleRtnno
    };
  },
};
</script>

<style lang="scss" scoped></style>
