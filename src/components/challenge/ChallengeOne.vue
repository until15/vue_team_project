<template>

    <div>
        <!-- 수정중 !!
             CHGCNT, CHGEND 
            CHGFEE, CHGLEVEL, 
            CHGREGDATE, CHGSTART, CHGTITLE, RECRUITEND 
            RECRUITSTART, RECSTATE, CHGIMAGE, CHGINAME 
            CHGISIZE, CHGITYPE MEMAIL 
        -->
        <h3>챌린지 상세보기</h3>

        <div v-if="state.item">
            번호 : {{state.item.chgno}} <br />
            ♥♡ : {{state.item.chglike}} <br />
            
            제목 : {{state.item.chgtitle}} <br />
            소개 : {{state.item.chgintro}} <br />
            내용 : {{state.item.chgcontent}} <br />
            모집기간 : {{state.item.recruitstart}} ~ {{state.item.recruitend}} <br />
            챌린지 시작 : {{state.item.chgstart}} <br />
            참가비 : {{state.item.chgfee}} <br />
            인원수 : {{state.item.chgcnt}} <br />
            난이도 : {{state.item.chglevel}} <br />
            <hr />
            <button>참여하기</button>
            <router-link to="/challenge"><button>뒤로가기</button></router-link>
        </div>
    </div>

</template>

<script>
import { onMounted, reactive} from 'vue';
import {useRoute} from 'vue-router';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            chgno : route.params.chgno,     
        });
        
        const handleData = async(chgno) => {
            const url = `/ROOT/api/challenge/selectone?chgno=${chgno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
            }
        };

        onMounted(() => {
            handleData(state.chgno);
        });
        return {
            state
        }
    }
}
</script>

<style lang="scss" scoped>

</style>