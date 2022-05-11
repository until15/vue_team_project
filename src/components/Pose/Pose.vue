<template>
    <div>
        <h3>자세 페이지</h3>
        <input type="text" v-model="state.title">
        <button @click="handleLoadData()">검색</button>
        {{state.title}}
        <table border="1">
            <tr>
                <td>번호</td>
                <td>이름</td>
                <td>부위</td>
                <td>내용</td>
                <td>난이도</td>
            </tr>
            <tr v-for="tmp in state.pose" :key="tmp">
                <td>{{tmp.pno}}</td>
                <td @click="handlePoseOne(tmp.pno)" style="cursor:pointer">{{tmp.pname}}</td>
                <td>{{tmp.ppart}}</td>
                <td>{{tmp.pcontent}}</td>
                <td>{{tmp.plevel}}</td>
            </tr>
        </table>

    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        // 이동하기
        const router = useRouter();

        const state = reactive({
            step : 1, // 삭제 되지 않은 것만
            page : 1,
            title : ''

        });

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
            }
        }

        const handlePoseOne = (no) => {
            console.log(no);
            router.push({name:"PoseOne", query:{pno:no}})
        }

        // 생명주기 onMounted()
        onMounted( async() => {
            await handleLoadData();

        });


        

        return {state, handlePoseOne, handleLoadData}
    }
}
</script>

<style lang="scss" scoped>

</style>