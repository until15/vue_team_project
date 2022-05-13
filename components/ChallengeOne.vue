<template>

    <div>
        <!-- 수정중 !!
            CHGNO, CHGCNT, CHGCONTEN,T CHGEND 
            CHGFEE, CHGINTRO, CHGLEVEL, CHGLIKE 
            CHGREGDATE, CHGSTART, CHGTITLE, RECRUITEND 
            RECRUITSTART, RECSTATE, CHGIMAGE, CHGINAME 
            CHGISIZE, CHGITYPE MEMAIL 
        -->
        <h3>챌린지 상세보기</h3>

        <div v-if="state.item">
            번호 : {{state.item.chgno}} <br />
            제목 : {{state.item.chgtitle}} <br />

                <div v-for="tmp in state.image" :key="tmp">
                    <img :src="tmp" style="width:200px" />
                </div>

            <hr />
            <router-link to="/challenge"><button>뒤로가기</button></router-link>
            <button @click="handleUpdate">수정</button>
        </div>
    </div>

</template>

<script>
import { onMounted, reactive} from 'vue';
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            chgno : Number(route.query.chgno),
            cimage : null,
            editable : false,
            token : sessionStorage.getItem("TOKEN"),
            imageUrl : require('../assets/img/default.png'),
        });
        
        const handleData = async(chgno) => {
            const url = `/ROOT/api/challenge/selectone?chgno=${chgno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                state.image = response.data.imgurl;
            }
        };

        const handleUpdate = async() => {
            router.push({name : "ChallengeUpdate", query:{bno:state.chgno}});
        };

        onMounted(() => {
            handleData(state.chgno);
        });
        return {
            state, 
            handleData,
            handleUpdate
        }
    }
}
</script>

<style lang="scss" scoped>

</style>