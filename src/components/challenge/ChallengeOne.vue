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
            좋아요 : {{state.item.chglike}} <br />
            제목 : {{state.item.chgtitle}} <br />
            소개 : {{state.item.chgintro}} <br />
            내용 : {{state.item.chgcontent}} <br />
            모집기간 : {{state.item.recruitstart}} ~ {{state.item.recruitend}} <br />
            챌린지 시작 : {{state.item.chgstart}} <br />
            참가비 : {{state.item.chgfee}} <br />
            인원수 : {{state.item.chgcnt}} <br />
            난이도 : {{state.item.chglevel}} <br />
            루틴 : 
            <div v-if="state.routines">
                {{state.routines[0].rtnname}}
                <div v-for="rtn,i in state.routines" :key="i">
                요일 : {{state.routines[i].rtnday}}
                횟수 : {{state.routines[i].rtncnt}}
                세트 : {{state.routines[i].rtnset}}
                </div>
            </div>
            <hr />
            <button @click="handleJoin">참여하기</button>
            <router-link to="/challenge"><button>뒤로가기</button></router-link>
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
            chgno : route.query.chgno,
            token : sessionStorage.getItem("TOKEN"),
        });
        
        // 첼린지 조회
        const handleData = async(no) => {
            console.log("챌린지 번호 : " + no);
            const url = `/ROOT/api/challenge/selectone?chgno=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                const url2 = `/ROOT/api/routine/chgselectone.json?no=${state.item.chgroutine}`;
                const headers2 = {"Content-Type":"application/json"};
                const response2 = await axios.get(url2, { headers: headers2 });
                console.log(response2.data);
                if(response2.data.status === 200){
                    state.routineseq = response2.data.result;
                    const url1 = `/ROOT/api/routine/chgselectseq.json?no=${state.routineseq.rtnseq}`;
                    const headers1 = {"Content-Type":"application/json"};
                    const response1 = await axios.get(url1, { headers: headers1 });
                    console.log(response1.data);
                    if(response1.data.status === 200){
                        state.routines = response1.data.result;
                    }
                }
            }
        };

        // 첼린지 참가하기
        const handleJoin = async()=> {
            // console.log("참가하기");
            // console.log("첼린지 번호 : ", state.chgno);
            // console.log("토큰 : ", state.token);
            const url = `/ROOT/api/join/insert?chgno=${state.chgno}`;
            const headers = {
                "Content-Type":"application/json",
                "token":state.token
            }
            const body ={};
            const response = await axios.post(url, body, {headers});
            console.log("참가하기 결과 : ", response.data);
            if (response.data.status === 200) {
                alert("참가 완료");
                router.push({name:'Pay', query:{ jno:response.data.result}});
            }
        }

        onMounted(() => {
            handleData(state.chgno);
        });

        return {
            state,
            handleData,
            handleJoin,
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>