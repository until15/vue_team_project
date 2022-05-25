<template>
    <div align="center" style="padding : 50px">
        <div v-if="this.paychg">
            <el-button type="info" plain size="mini" @click="cancelPay">참가비 환급받기</el-button>
            {{this.paychg.impuid}}
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    created(){
        this.handlePayCHG();
    },

    data(){
        return{
            token : sessionStorage.getItem("TOKEN"),
            paychg : '',
            jno : 88
        }
    },

    methods: {

        //참가비 조회
        async handlePayCHG (){
            const url =`/ROOT/api/pay/selectone.json?no=${this.jno}`;
            const headers = {"Content-Type":"application/json", "token":this.token};
            const response = await this.axios.get(url, {headers:headers});
            console.log(response.data)
            if(response.data.status === 200){
                this.paychg = response.data.result;
            }
        },


        // 환급
        cancelPay : function () {
            axios({
                url: `/ROOT/api/pay/refund.json`, // 환급 요청을 받을 서비스 URL
                method: "post",
                headers: { "Content-Type": "application/json" },
                data: {
                    impuid: this.paychg.impuid, // 결제 당시 고유 ID
                    pprice: this.paychg.pprice, // 환불금액
                    reason: "테스트 결제 환불", // 환불사유
                    joinchg : {jno:this.paychg.jno}// 참가 챌린지 번호
                }
            })
            .then((data) => {// 환급 성공 시 응답 처리
            console.log(data);
            location.href = "http://localhost:8080/?#/pay"; // 환급 성공 시 이동할 페이지
            alert("환급 되었습니다.");
            })
        },

    }
}
</script>

<style lang="scss" scoped>

</style>