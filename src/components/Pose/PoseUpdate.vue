<template>
    <div>
        <h3>자세 수정 페이지</h3>
        <div v-if="state.pose">
            자세 이름 : <input type="text" v-model="state.pose.pname"><br>
            자세 부위 : <input type="text" v-model="state.pose.ppart"><br>
            자세 내용 : <textarea rows="3" v-model="state.pose.pcontent"></textarea><br>
            자세 난이도 : <input type="number" v-model="state.pose.plevel"><br>
            <br>
            <button>수정</button>
            <router-link to="/pose"><button>목록</button></router-link><br>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
// import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        const route = useRoute(); // 이동 후 받기
        // const router = useRouter(); // 이동하기

        const state = reactive({
            no : route.query.pno,
            token : sessionStorage.getItem("TOKEN")

        })

        const handleUpdateAction = async() => {
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
        }

        const handleLoadData = async(no) => {
            const url = `/ROOT/api/pose/selectone.json?pno=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.pose = response.data.result;
                state.video = response.data.videoUrl;
            }
            state.pose = response.data.result;
        }

        onMounted(async() => {
            await handleLoadData(state.no);
        });

        return {state, handleUpdateAction}
    }
}
</script>

<style lang="scss" scoped>

</style>