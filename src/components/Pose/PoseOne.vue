<template>
    <div v-if="state.pose">
        <div style="padding: 80px">
            <div style="margin-left:150px">
            <h2>{{state.pose.pname}}</h2>
            | {{state.pose.pregdate}}<br><br>
            부위 : {{state.pose.ppart}}<br><br>
            난이도 : {{state.pose.plevel}} <br><br>
            <el-card shadow="never" style="width:500px">{{state.pose.pcontent}} </el-card><br><br>
            </div>
            <div align="center">
                <div v-if="state.video">
                    <div v-if="state.type === state.vio || state.type === state.vio1 || state.type === state.vio2">
                    <video width='400' controls>
                        <source :src="state.video">
                    </video><br>
                    </div>
                    <div v-if="state.type === state.img || state.type === state.img1 || state.type === state.img2">              
                        <img :src="state.video" width="400"/>
                    </div>
                </div>
                <br><br>
                <router-link to="/pose"><el-button id="btn">목록</el-button></router-link><br>
                <div v-if="state.member.memail === state.useremail" >
                    <el-button id="btn" @click="handleUpdate(state.pose.pno)">수정</el-button>
                    <el-button id="btn" @click="handleDelete" style="margin-left: 35%;">삭제</el-button>
                </div>
                <!-- 관리자 삭제 -->
                <div v-if="state.memberRole">
                    <div v-if="state.memberRole.mrole === 'admin'">
                        <el-button type="danger" @click="handleDeleteAdmin" style="margin-left: 35%;">삭제</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import {useStore} from 'vuex';
import axios from 'axios';
export default {
    setup () {
        const store = useStore();
        const route = useRoute(); // 이동 후 받기
        const router = useRouter(); // 이동하기

        const state = reactive({
            no : route.query.pno,
            token : sessionStorage.getItem("TOKEN"),
            useremail : sessionStorage.getItem("MEMAIL"),
            img : "image/jpeg",
            img1 : "image/png",
            img2 : "image/gif",
            vio : "video/mp4",
            vio1 : "video/ogg",
            vio2 : "video/webm"
        })

        onMounted(async() => {
            await handleLoadData(state.no);
            await handleMemberData();
        });

        // 회원 조회
        const handleMemberData = async() => {
            const url = `/ROOT/api/member/selectmemberone`;
            const headers = {
                "Content-Type": "application/json",
                token: state.token,
            };
            const response = await axios.get(url, { headers : headers });
            console.log(response.data);
            if (response.data.status === 200) {
                state.memberRole = response.data.result;
            }
        }

        const handleDeleteAdmin = async() => {
            if(confirm('관리자 권한으로 삭제하시겠습니까? 삭제된 자세는 보관됩니다.')){
                const url = `/ROOT/api/pose/deleteone.json`;
                const headers = {"Content-Type":"application/json"};
                const body = {
                    "pno" : state.no,
                    "pstep" : 2
                }
                const response = await axios.put(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('보관되었습니다.');
                    router.push({name:"Pose"});
                }
            }
        }

        const handleDelete = async() => {
            if(confirm('삭제하시겠습니까?')){
                const url = `/ROOT/api/pose/delete.json`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const body = {
                    "pno" : state.no,
                    "pstep" : 2
                }
                const response = await axios.put(url, body, {headers:headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('삭제되었습니다.');
                    router.push({name:"Pose"});
                }
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
                state.type = response.data.videotype;
                state.member = response.data.userEmail;
            }
            state.pose = response.data.result;
            state.member = response.data.userEmail;
        }

        const handleUpdate = (no) => {
            console.log(no);
            router.push({name:"PoseUpdate", query:{pno:no}})

        }

        // 로그인 유저 이메일 정보 가져오기
        const memail = computed(() => {
            return store.getters.getMemail
        });

        return {state, handleUpdate, memail, handleDelete, handleDeleteAdmin}
    }
}
</script>

<style scoped>

#btn:hover{
   color: rgb(255, 255, 255);
   background-color: black;
   border: 0;
}

</style>