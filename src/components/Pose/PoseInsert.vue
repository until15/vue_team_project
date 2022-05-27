<template>
    <div align="center" style="padding: 80px">
        <el-card shadow="never">
        <h3>자세 등록</h3>
        <br>
        <el-row :gutter="20">
        <el-col :span="2" :offset="8">이름 :</el-col> 
        <el-col :span="5"><el-input v-model="state.name"></el-input></el-col><br>
        </el-row>
        <el-row :gutter="20">
        <el-col :span="2" :offset="8">부위 :</el-col> 
        <el-col :span="5"><el-input v-model="state.part"></el-input></el-col><br>
        </el-row>
        <el-row :gutter="20">
        <el-col :span="2" :offset="8">내용 :</el-col> 
        <el-col :span="5"><el-input type="textarea" :rows="2" v-model="state.content"></el-input></el-col><br>
        </el-row>
        <el-row :gutter="20">
        <el-col :span="2" :offset="8">난이도 :</el-col> 
        <el-col :span="5"><el-input type="number" min="1" max="5" v-model="state.level"></el-input></el-col><br>
        </el-row>
        <el-row :gutter="20">
        <el-col :span="2" :offset="8">동영상 :</el-col> 
        <el-col :span="5"><input type="file" id="vFile" accept="video/*" @change="handleVideo"><br><br></el-col>
        </el-row>
        <el-button round @click="handlePoseInsert">등록</el-button>
        <router-link to="/pose"><el-button round>목록</el-button></router-link><br>
        </el-card>
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
export default {
    setup () {
        const router = useRouter(); // 이동하기
        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            name : '',
            part : '',
            content : '',
            level : 1,
            step : 1,
            videodata : ''
        })

        const handleVideo = (e) => {
            // e 변수에 첨부한 파일의 정보 저장
            console.log(e);
            if(e.target.files[0]){ // 파일 첨부의 경우
                state.videodata = e.target.files[0];
            }
            else{ // 취소의 경우
                state.videodata = '';
            }
        }

        const handlePoseInsert = async() => {
            let filechk = document.getElementById("vFile").value;
            if(state.name === ''){
                alert('자세 이름을 입력하세요')
                return false;
            }
            if(state.part === ''){
                alert('자세 부위를 입력하세요')
                return false;
            }
            if(state.content === ''){
                alert('자세 내용을 입력하세요')
                return false;
            }
            if( 5 < state.level){
                alert('난이도는 1~5까지 설정 가능합니다.')
                return false;
            }
            if( 1 > state.level){
                alert('난이도는 1~5까지 설정 가능합니다.')
                return false;
            }
            if(!filechk){
                alert('파일을 첨부하세요.')
                return false;
            }
            const url = `/ROOT/api/pose/insert.json`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const body = {
                pname : state.name,
                ppart : state.part,
                pcontent : state.content,
                plevel : state.level,
                pstep : state.step
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                const url1 = `/ROOT/api/pose/insertvideo.json`;
                const headers1 = {"Content-Type":"multipart/form-data", "token":state.token};
                const body1 = new FormData();
                body1.append("pvideo", state.videodata);
                body1.append("pno", response.data.result);
                const response1 = await axios.post(url1, body1, {headers:headers1});
                console.log(response1.data);
                if(response1.data.status === 200){
                    alert('등록되었습니다.');
                    router.push({name:"Pose"});
                }
            }

        }
        return {state, handlePoseInsert, handleVideo}
    }
}
</script>

<style lang="scss" scoped>

</style>