<template>
    <div>
        <div v-if="state.pose">
            <h3>자세 상세내용 페이지</h3>
            자세 이름 : {{state.pose.pname}} <br>
            자세 부위 : {{state.pose.ppart}} <br>
            자세 내용 : {{state.pose.pcontent}} <br>
            자세 난이도 : {{state.pose.plevel}} <br>
            자세 등록일 : {{state.pose.pregdate}} <br><br>
            자세 동영상<br>
            <div v-if="state.video">
                <video width='400' controls>
                    <source :src="state.video">
                </video>
            </div>
            <br>
            <router-link to="/pose"><button>목록</button></router-link><br>
            <div v-if="state.member.memail === memail" >
                <button @click="handleUpdate(state.pose.pno)">수정</button>
                <button @click="handleDelete">삭제</button>
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
            token : sessionStorage.getItem("TOKEN")

        })

        onMounted(async() => {
            await handleLoadData(state.no);
        });

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

        return {state, handleUpdate, memail, handleDelete}
    }
}
</script>

<style lang="scss" scoped>

</style>