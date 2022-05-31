<template>
    <div>
        
        <!-- 페이지 제목 -->
        <div>
            <h3>내가 생성한 첼린지 상세 내용</h3>
        </div>
        <div v-if="state.item">

            <!-- 썸네일 이미지 -->
            <div style="margin-top:1rem; margin-bottom:1rem;">
                <img :src="state.thumnail" style="width:300px;" /> <br />
            </div>
            <!-- 참여 정보 -->
            <div v-if="state.item">    
                첼린지 번호: {{state.item.chgno}} <br />
                첼린지 제목: {{state.item.chgtitle}}<br />
                참여자 수 : {{state.item.chgcnt}}<br />
                첼린지 시작일 : {{state.item.chgstart}}<br />
                첼린지 종료일 : {{state.item.chgend}}<br />
                첼린지 참가비 : {{state.item.chgfee}}<br />
                내가 참가한 날 : {{state.item.jregdate}}<br />
                첼린지 레벨 : {{state.item.chglevel}}<br />
                좋아요 개수 : {{state.item.chglike}}<br />
                달성률 : {{state.item.chgrate}}%<br />
                진행 상황 : {{state.item.chgstate}}<br />
            </div>
            <!-- 인증/포기 -->
            <div class="center" v-if="state.item.chgstate === 1">
                <button @click="handleGiveup" > 포기하기 </button>
                <button @click="handleConfirm(state.item.jno)"> 인증하기 </button>
            </div>
            
            <hr />
            <SuccessCfm 
                :chgno="state.chgno" 
                :cid="state.item.cid" 
                :jno="state.item.jno"
                :chgrate="state.item.chgrate">
            </SuccessCfm>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import SuccessCfm from '../Confirm/SuccessCfm.vue';

export default {
    components:{
        SuccessCfm,
    },

    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            chgno : route.query.chgno,
        });

        // 인증하기
        const handleConfirm = async(no)=> {
            // console.log("인증하기");
            router.push({name:'ConfirmInsert', query:{jno:no}});
        };
        
        // 첼린지 포기
        const handleGiveup = async()=> {
            // console.log("포기하기");
            // console.log(state.chgno);

            if (confirm("포기하시겠습니까?")) {
                const url = `/ROOT/api/join/giveup?chgno=${state.chgno}`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token
                }
                const body = {};
                const response = await axios.put(url, body, {headers});
                // console.log("첼린지 포기 : ", response.data);
                if (response.data.status === 200) {
                    console.log("포기");
                    router.push({name:'JoinState'});
                }
            }
        };

        // 내가만든 첼린지 상세
        const handleData = watch(async()=> {
            const url = `/ROOT/api/join/cidselectone?chgno=${state.chgno}`;
            const headers = {
                "Content-Type":"application/json",
                "token" : state.token
            };
            const response = await axios.get(url, {headers});
            console.log("내가 만든 첼린지 상세 : ", response.data);
            if (response.data.status === 200) {
                state.item = response.data.result
                state.thumnail = response.data.image
            }
        });

        onMounted(()=> {
            handleData();
        });

        

        return {
            state,
            handleGiveup,
            handleConfirm,
            handleData
        }
    }
}
</script>

<style lang="scss" scoped>

</style>