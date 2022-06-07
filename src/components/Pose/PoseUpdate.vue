<template>
  <div style="padding: 100px" align="center">
    <div v-if="state.pose">
      <el-card shadow="hover" style="width:1000px">
      <h3>자세 수정</h3>
      <br />
        <el-col :span="2" :offset="9">이름 :</el-col>
        <el-col :span="5" style="margin-left: 20px">
        <el-input v-model="state.pose.pname" clearable></el-input></el-col
        ><br /> 
        <br />
        <el-col :span="2" :offset="9">부위 :</el-col>
        <el-col :span="5" style="margin-left: 20px"
          ><el-input v-model="state.pose.ppart" clearable></el-input></el-col
        ><br /><br />
        <el-col :span="2" :offset="9">내용 :</el-col>
        <el-col :span="5" style="margin-left: 20px"
          ><el-input
            type="textarea"
            :rows="2"
            v-model="state.pose.pcontent"
          ></el-input></el-col
        ><br /><br /><br />
        <el-col :span="2" :offset="9">난이도 :</el-col>
        <el-col :span="5" style="margin-left: 9px"
          ><el-input
            type="number"
            min="1"
            max="5"
            v-model="state.pose.plevel"
          ></el-input></el-col
        ><br />
      <br /><br />
      <!-- 동영상이 없는 경우 Insert -->
      <div v-if="!state.video">
        <el-upload id="vFile" accept="video/*"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :on-remove="handleremove"
        :on-change="handleVideo"
        :auto-upload="false"
        >
        <el-button type="info" size="mini" style="margin-right: 60px">파일선택</el-button>
        </el-upload><br>
        <el-button id="btn"
          round
          @click="handleUpdateAction(state.no), handleVideoInsertAction()"
          >수정</el-button
        >
      </div>
      <!-- 동영상이 있는 경우 Update, Delete -->
      <div v-if="state.video">
        <el-button type="info" id="btn" plain @click="handleVideoDelete(state.no)" size="mini" style="margin-right: 327px"
          >파일 삭제</el-button
        ><br />
        <div
          v-if="
            state.type === state.vio ||
            state.type === state.vio1 ||
            state.type === state.vio2
          "
        >
          <video width="400" controls>
            <source :src="state.video" />
          </video>
        </div>
        <br />
        <div
          v-if="
            state.type === state.img ||
            state.type === state.img1 ||
            state.type === state.img2
          "
        >
          <img :src="state.video" style="width: 400px" /><br />
        </div>
        <el-upload id="vFile" accept="video/*"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :on-remove="handleremove"
        :on-change="handleVideo"
        :auto-upload="false"
        >
        <el-button type="info" size="mini" style="margin-right: 327px">파일선택</el-button>
        </el-upload><br /><br />
        <el-button id="btn"
          round
          @click="handleUpdateAction(state.no), handleVideoUpdateAction()"
          >수정</el-button
        >
      </div>
      <router-link to="/pose"><el-button round id="btn">목록</el-button></router-link
      ><br />
      </el-card>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  setup() {
    const route = useRoute(); // 이동 후 받기
    const router = useRouter(); // 이동하기

    const state = reactive({
      no: route.query.pno,
      token: sessionStorage.getItem("TOKEN"),
      videodata: "",
      img: "image/jpeg",
      img1: "image/png",
      img2: "image/gif",
      vio: "video/mp4",
      vio1: "video/ogg",
      vio2: "video/webm",
    });

    // 파일을 삭제한 경우
    const handleremove = () => {
      state.videodata = '';
    }

    const handleVideo = (e) => {
    // e 변수에 첨부한 파일의 정보 저장
      console.log(e.raw);
        if(e.raw){ // 파일 첨부의 경우
          state.videodata = e.raw;
        }
        else{ // 취소의 경우
          state.videodata = '';
        }
    }
    const handleVideoInsertAction = async () => {
      const url = `/until15/api/pose/insertvideo.json`;
      const headers = {
        "Content-Type": "multipart/form-data",
        token: state.token,
      };
      const body = new FormData();
      body.append("pvideo", state.videodata);
      body.append("pno", state.no);
      const response = await axios.post(url, body, { headers });
      console.log(response.data);
    };
    const handleVideoDelete = async (no) => {
      if (confirm("삭제하시겠습니까?")) {
        const url = `/until15/api/pose/deletevideo.json?no=${state.vno}&pno=${no}`;
        const headers = {
          "Content-Type": "application/json",
          token: state.token,
        };
        const response = await axios.delete(url, {
          headers: headers,
          data: {},
        });
        console.log(response.data);
        if (response.data.status === 200) {
          alert("삭제되었습니다.");
          handleLoadData(no);
        }
      }
    };

    const handleVideoUpdateAction = async () => {
      const url = `/until15/api/pose/updatevideo.json`;
      const headers = {
        "Content-Type": "multipart/form-data",
        token: state.token,
      };
      const body = new FormData();
      body.append("pvideo", state.videodata);
      body.append("vno", state.vno);
      body.append("pno", state.no);
      const response = await axios.put(url, body, { headers: headers });
      console.log(response.data);
    };

    const handleUpdateAction = async (no) => {
      if (state.pose.pname === "") {
        alert("자세 이름을 입력하세요");
        return false;
      }
      if (state.pose.ppart === "") {
        alert("자세 부위를 입력하세요");
        return false;
      }
      if (state.pose.pcontent === "") {
        alert("자세 내용을 입력하세요");
        return false;
      }
      if (5 < state.pose.plevel) {
        alert("난이도는 1~5까지 설정 가능합니다.");
        return false;
      }
      if (1 > state.pose.plevel) {
        alert("난이도는 1~5까지 설정 가능합니다.");
        return false;
      }
      const url = `/until15/api/pose/update.json`;
      const body = {
        pname: state.pose.pname,
        ppart: state.pose.ppart,
        pcontent: state.pose.pcontent,
        plevel: state.pose.plevel,
        pno: state.no,
      };
      const headers = {
        "Content-Type": "application/json",
        token: state.token,
      };
      const response = await axios.put(url, body, { headers: headers });
      console.log(response.data);
      if (response.data.status === 200) {
        alert("수정되었습니다.");
        router.push({ name: "PoseOne", query: { pno: no } });
      }
    };

    const handleLoadData = async (no) => {
      const url = `/until15/api/pose/selectone.json?pno=${no}`;
      const headers = { "Content-Type": "application/json" };
      const response = await axios.get(url, { headers });
      console.log(response.data);
      if (response.data.status === 200) {
        state.pose = response.data.result;
        state.video = response.data.videoUrl;
        state.vno = response.data.videoVno;
        state.type = response.data.videotype;
      }
      state.pose = response.data.result;
    };

    onMounted(async () => {
      await handleLoadData(state.no);
    });

    return {
      state,
      handleUpdateAction,
      handleVideo,
      handleVideoUpdateAction,
      handleVideoDelete,
      handleVideoInsertAction,
      handleremove
    };
  },
};
</script>

<style lang="css" scoped>
#btn:hover{
   color: rgb(255, 255, 255);
   background-color: black;
   border: 0;
}
</style>
