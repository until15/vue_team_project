<template>
    <div style="padding : 50px">
        <div v-if="this.pjoinchg">
            <input type="number" placeholder="결제금액" v-model="this.price">
            <el-button type="info" plain size="mini" @click="requestPay">참가비 결제하기</el-button>
        </div>
    </div>
</template>

<script>
const { IMP } =  window;
import axios from 'axios';
export default {
    created(){
        this.handleJoinCHG();
    },

    data(){
        return{
            jno : 88,
            token : sessionStorage.getItem("TOKEN"),
            pjoinchg : '',
            price: 0
        }
    },

    methods: {

        // 참여중인 챌린지 상세조회 (번호)
        async handleJoinCHG (){
            const url =`/ROOT/api/join/selectone?jno=${this.jno}`;
            const headers = {"Content-Type":"application/json", "token":this.token};
            const response = await this.axios.get(url, {headers:headers});
            console.log(response.data)
            if(response.data.status === 200){
                this.pjoinchg = response.data.result;
            }
        },

        // 결제
        requestPay:  function () {
            // IMP.request_pay(param, callback) 결제창 호출
            IMP.init('imp20187774'); // 발급받은 가맹점 식별코드 사용
            IMP.request_pay({ // param
                pg: "html5_inicis", // PG사
                pay_method: "card", // 결제수단
                merchant_uid: "CHG_"+new Date().getTime(), // 결제번호
                name: this.pjoinchg.chgtitle, // 결제 시 표시되는 이름
                amount: this.price, // 결제금액
                buyer_email: this.pjoinchg.memail,  // 참여자 이메일
                buyer_tel : this.pjoinchg.memberchgMphone // 참여자 번호
            }, rsp => { // callback
            if (rsp.success) {// 결제 성공 시 로직
                // axios로 HTTP 요청
                axios({
                    url: `/ROOT/api/pay/insert.json`, // 서버의 결제 정보
                    method: "post",
                    headers: { "Content-Type": "application/json" },
                    data: {
                        impuid: rsp.imp_uid,
                        merchantuid: rsp.merchant_uid,
                        pprice : rsp.paid_amount,
                        join : {jno:this.pjoinchg.jno},
                        pmethod : rsp.pay_method,
                    }
                })
                .then((data) => {// 응답 처리
                    console.log(data);
                    location.href = "http://localhost:8080/?#/"; // 결제 성공 시 이동할 페이지
                    alert("결제가 완료되었습니다.");
                })
                } else {// 결제 실패 시 로직
                console.log("결제 실패");
                alert("결제에 실패하였습니다. 에러 내용: " +  rsp.error_msg);
                
                }
            });
        }
    }
}
</script>

<style scoped>

</style>