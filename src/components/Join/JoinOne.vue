<template>
<div>
    <h3>내가 참가한 첼린지 상세 내용</h3>
    <div v-if="state.item">
        첼린지 번호: {{state.item.challengechgChgno}} <br />
        첼린지 제목: {{state.item.challengechgChgtitle}}<br />
        참여자 수 : {{state.item.chgcnt}}<br />
        첼린지 시작일 : {{state.item.chgstart}}<br />
        첼린지 종료일 : {{state.item.chgend}}<br />
        첼린지 참가비 : {{state.item.chgfee}}<br />
        내가 참가한 날 : {{state.item.jregdate}}<br />
        첼린지 레벨 : {{state.item.chglevel}}<br />
        좋아요 개수 : {{state.item.chglike}}<br />
        달성률 : {{state.item.chgrate}}<br />
        진행 상황 : {{state.item.chgstate}}<br />
    </div>
    <div>
        <button> 채팅하기 </button>
        <button> 인증하기 </button>
    </div>
</div>
</template>
<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            jno : route.params.jno,
            token : sessionStorage.getItem("TOKEN")
        });

        // 내가 참여한 진행 중인 첼린지 상세 내용
        const handleData = async(no)=> {
            console.log(no);
            const url = `/ROOT/api/join/selectone?jno=${no}`;
            const headers = {
                "Content-Type":"application/json",
                "token" : state.token
            }
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                state.item = response.data.result
            }

        };

        onMounted(()=> {
            handleData(state.jno);
        });

        return {state}
    }
}
</script>