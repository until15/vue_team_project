<template>
    <div align="center" style="padding : 50px">
        <el-button type="info" plain size="mini" @click="cancelPay">참가비 환급받기</el-button>
    </div>
</template>

<script>
import axios from 'axios';
export default {

    created(){
        // this.handlePayCHG();
    },

    data(){
        return{
            token : sessionStorage.getItem("TOKEN"),
        }
    },

    methods: {

        // 참가비 조회
        // async handlePayCHG (){
        //     const url =`/ROOT/api/join/selectone?jno=${this.jno}`;
        //     const headers = {"Content-Type":"application/json", "token":this.token};
        //     const response = await this.axios.get(url, {headers:headers});
        //     console.log(response.data)
        //     if(response.data.status === 200){
        //         this.pjoinchg = response.data.result;
        //     }
        // },


        // 환급
        cancelPay : function () {
            axios({
                url: `/ROOT/api/pay/refund.json`, // 환급 요청을 받을 서비스 URL
                method: "post",
                headers: { "Content-Type": "application/json" },
                data: {
                    merchant_uid: "{결제건의 주문번호}", // 주문번호
                    cancel_request_amount: 1000, // 환불금액
                    reason: "테스트 결제 환불", // 환불사유
                    // 참가한 챌린지 번호
                }
            })
            .then((data) => {// 환급 성공 시 응답 처리
            console.log(data);
            location.href = "http://localhost:8080/?#/"; // 환급 성공 시 이동할 페이지
            alert("환급 되었습니다.");
            })
            .catch({ // 환급 실패 시 응답 처리
                
            })

        },

    }
}
</script>

<style lang="scss" scoped>

</style>