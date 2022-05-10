<template>
    <div>
        <h3>상세내용</h3>
        <div v-if="state.item" style="padding:20px">
            제목 : {{state.item.qtitle}}<br /><br />
            내용 : {{state.item.qcontent}}<br /><br />
            작성자 : {{state.item.memberchgMemail}}<br /><br />
            이미지 : <img :src="state.image[0]" style="width:200px" />
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import {useRoute} from 'vue-router';
export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            qno : Number(route.query.qno),
            token : sessionStorage.getItem("TOKEN")
        });

        const handleData = async(qno) => {
            const url = `/ROOT/api/Inquiry/selectone?qno=${qno}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                state.image = response.data.imgurl;
            }
        }
        onMounted(() =>{
            handleData(state.qno);
        });

        

        
        

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>