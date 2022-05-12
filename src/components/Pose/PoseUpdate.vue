<template>
    <div>
        <div v-if="state.pose">
            <h3>자세 수정 페이지</h3>
            자세 이름 : <input type="text" v-model="state.pose.pname"><br>
            자세 부위 : <input type="text" v-model="state.pose.ppart"><br>
            자세 내용 : <textarea rows="3" v-model="state.pose.pcontent"></textarea><br>
            자세 난이도 : <input type="number" min="1" max="5" v-model="state.pose.plevel"><br>
            <br>
            <!-- 동영상이 없는 경우 Insert -->
            <div v-if="!state.video">
                <input type="file" @change="handleVideo"><br>
                <button @click="handleUpdateAction(state.no), handleVideoInsertAction()">수정</button>
            </div>
            <!-- 동영상이 있는 경우 Update, Delete -->
            <div v-if="state.video">
                    <button @click="handleVideoDelete(state.no)">동영상 삭제</button><br>
                <video width='400' controls>
                    <source :src="state.video">
                </video>
                <br>
                <input type="file" @change="handleVideo"><br><br>
                <button @click="handleUpdateAction(state.no), handleVideoUpdateAction()">수정</button>
            </div>
            <router-link to="/pose"><button>목록</button></router-link><br>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const route = useRoute(); // 이동 후 받기
        const router = useRouter(); // 이동하기

        const state = reactive({
            no : route.query.pno,
            token : sessionStorage.getItem("TOKEN"),
            videodata : '',

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
        const handleVideoInsertAction = async() => {
            const url = `/ROOT/api/pose/insertvideo.json`;
            const headers = {"Content-Type":"multipart/form-data", "token":state.token};
            const body = new FormData();
            body.append("pvideo", state.videodata);
            body.append("pno", state.no);
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
        }
        const handleVideoDelete = async(no) => {
            if(confirm('삭제하시겠습니까?')){
                const url = `/ROOT/api/pose/deletevideo.json?no=${state.vno}&pno=${state.no}`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const response = await axios.delete(url, {headers:headers, data:{}});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('삭제되었습니다.');
                    router.push({name:"PoseOne", query:{pno:no}})
                }
            }

        }

        const handleVideoUpdateAction = async() => {
            const url = `/ROOT/api/pose/updatevideo.json`;
            const headers = {"Content-Type":"multipart/form-data", "token":state.token};
            const body = new FormData();
            body.append("pvideo", state.videodata);
            body.append("vno", state.vno);
            body.append("pno", state.no);
            const response = await axios.put(url, body, {headers:headers});
            console.log(response.data);
        }

        const handleUpdateAction = async(no) => {
            const url = `/ROOT/api/pose/update.json`;
            const body = {
                pname : state.pose.pname,
                ppart : state.pose.ppart,
                pcontent : state.pose.pcontent,
                plevel : state.pose.plevel,
                pno : state.no
            };
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.put(url, body, {headers:headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('수정되었습니다.');
                router.push({name:"PoseOne", query:{pno:no}})

            }
        }

        const handleLoadData = async(no) => {
            const url = `/ROOT/api/pose/selectone.json?pno=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.pose = response.data.result;
                state.video = response.data.videoUrl;
                state.vno = response.data.videoVno;
            }
            state.pose = response.data.result;
        }

        onMounted(async() => {
            await handleLoadData(state.no);
        });

        return {
            state, 
            handleUpdateAction, 
            handleVideo, 
            handleVideoUpdateAction, 
            handleVideoDelete,
            handleVideoInsertAction
        }
    }
}
</script>

<style lang="scss" scoped>

</style>