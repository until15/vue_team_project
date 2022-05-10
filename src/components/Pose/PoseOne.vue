<template>
    <div>
        <h3>자세 상세내용 페이지</h3>
        자세 이름 : {{state.pose.pname}} <br>
        자세 부위 : {{state.pose.ppart}} <br>
        자세 내용 : {{state.pose.pcontent}} <br>
        자세 난이도 : {{state.pose.plevel}} <br>
        자세 등록일 : {{state.pose.pregdate}} <br><br>
        자세 동영상 
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios'; 
// import { useRouter } from 'vue-router';
export default {
    setup () {
        const route = useRoute(); // 이동 후 받기

        const state = reactive({
            no : route.query.pno

        })

        onMounted(async() => {
            await handleLoadData(state.no);
        });

        const handleLoadData = async(no) => {
            const url = `/ROOT/api/pose/selectone.json?pno=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.pose = response.data.result;
            }

        }

        

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>