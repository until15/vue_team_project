<template>
    <div align="center" style="padding: 80px">
        <el-card shadow="never">
        <h3>자세 등록</h3>
        <h6>부적절하거나 운동과 관련없는 자세를 등록할 시 무통보 삭제가 될 수 있습니다.</h6>
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
        </el-row><br>
        <el-row :gutter="20">
        <el-col :span="2" :offset="8">동영상 :</el-col>
        <el-upload id="vFile" accept="video/*"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :on-remove="handleremove"
        :on-change="handleVideo2"
        :auto-upload="false"
        >
        <el-button type="info" size="mini" style="margin-left: 10px">파일선택</el-button>
        </el-upload>
        </el-row>
        <br>
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
        // 파일을 삭제한 경우
        const handleremove = () => {
            state.videodata = '';
        }

        const handleVideo2 = (e) => {
            // e 변수에 첨부한 파일의 정보 저장
            console.log(e.raw);
            if(e.raw){ // 파일 첨부의 경우
                state.videodata = e.raw;
            }
            else{ // 취소의 경우
                state.videodata = '';
            }
        }

        const handlePoseInsert = async() => {
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
            if(state.videodata === ''){
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
        return {state, handlePoseInsert, handleVideo, handleVideo2, handleremove}
    }
}
</script>

<style lang="css" scoped>
h6{
    color: rgb(209, 209, 209);
}

</style>