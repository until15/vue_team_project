<template>
    <div>
        <h3>자세 등록 페이지</h3>
        <br>
        자세 이름 : <input type="text" v-model="state.name"><br>
        자세 부위 : <input type="text" v-model="state.part"><br>
        자세 내용 : <textarea rows="3" v-model="state.content"></textarea><br>
        자세 난이도 : <input type="number" min="1" max="5" v-model="state.level"><br>
        자세 동영상 : <input type="file" accept="video/*" @change="handleVideo"><br><br>
        <button @click="handlePoseInsert">등록</button>
        <router-link to="/pose"><button>목록</button></router-link><br>
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