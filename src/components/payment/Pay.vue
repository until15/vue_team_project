<template>
  <div align="center" style="padding: 150px">
    <div v-if="this.pjoinchg">
      <div class="img">
        <img src="@/assets/img/결제.png" style="width: 500px" />
      </div>
      <el-card shadow="never" style="width: 500px">
        <h3>{{ this.pjoinchg.chgtitle }}</h3>
        <br />
        <h6>
          ※ 챌린지 시작일 후 <mark>챌린지 포기</mark>를 누르시면
          <mark>참가비는 환불되지 않습니다.</mark>
        </h6>
        <br />
        <el-input
          type="number"
          placeholder="결제금액"
          v-model="this.pjoinchg.chgfee"
          style="width: 100px"
          readonly
        />
        <el-button type="info" plain size="mini" @click="requestPay"
          >참가비 결제</el-button
        >
      </el-card>
    </div>
  </div>
</template>

<script>
const { IMP } = window;
import axios from "axios";
export default {
  created() {
    this.handleJoinCHG();
    this.handleMemberData();
  },

  data() {
    return {
      jno: this.$route.query.jno,
      token: sessionStorage.getItem("TOKEN"),
      pjoinchg: "",
      price: 0,
    };
  },

  methods: {
    // 회원 조회
    async handleMemberData() {
      const url = `/ROOT/api/member/selectmemberone`;
      const headers = {
        "Content-Type": "application/json",
        token: this.token,
      };
      const response = await this.axios.get(url, { headers });
      console.log(response.data);
      if (response.data.status === 200) {
        this.member = response.data.result;
      }
    },

    // 참여중인 챌린지 상세조회 (번호)
    async handleJoinCHG() {
      const url = `/ROOT/api/join/selectone?jno=${this.jno}`;
      const headers = { "Content-Type": "application/json", token: this.token };
      const response = await this.axios.get(url, { headers: headers });
      console.log(response.data);
      if (response.data.status === 200) {
        this.pjoinchg = response.data.result;
      }
    },

    // 결제
    requestPay: function () {
      // IMP.request_pay(param, callback) 결제창 호출
      IMP.init("imp20187774"); // 발급받은 가맹점 식별코드 사용
      IMP.request_pay(
        {
          // param
          pg: "html5_inicis", // PG사
          pay_method: "card", // 결제수단
          merchant_uid: "CHG_" + new Date().getTime(), // 결제번호
          name: this.pjoinchg.chgtitle, // 결제 시 표시되는 이름
          amount: this.pjoinchg.chgfee, // 결제금액
          buyer_name: this.member.mid, // 참여자 이름
          buyer_email: this.pjoinchg.memail, // 참여자 이메일
          buyer_tel: this.pjoinchg.mphone, // 참여자 번호
        },
        (rsp) => {
          // callback
          if (rsp.success) {
            // 결제 성공 시 로직
            // axios로 HTTP 요청
            axios({
              url: `/ROOT/api/pay/insert.json`, // 서버의 결제 정보
              method: "post",
              headers: { "Content-Type": "application/json" },
              data: {
                imp_uid: rsp.imp_uid,
                merchant_uid: rsp.merchant_uid,
                amount: rsp.paid_amount,
                joinchg: { jno: this.pjoinchg.jno },
                pmethod: rsp.pay_method,
                checksum: 0,
              },
            }).then((data) => {
              // 응답 처리
              console.log(data);
              location.href =
                "http://localhost:8080/?#/challengeone?chgno=" +
                this.pjoinchg.chgno; // 결제 성공 시 이동할 페이지
              alert("결제가 완료되었습니다.");
            });
          } else {
            // 결제 실패 시 로직
            console.log("결제 실패");
            alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);
          }
        }
      );
    },
  },
};
</script>

<style scoped>
.img {
  position: relative;
  margin-right: 100px;
  margin-bottom: 20px;
  width: 400px;
  height: 200px;
  z-index: -1;
}
button {
  font-size: 14px;
  margin-top: 20px;
  position: relative;
  outline: none;
  text-decoration: none;
  /* border-radius: 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  height: 30px;
  width: 150px;
  opacity: 1;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.92);
}
button:hover {
  animation: rotate 0.7s ease-in-out both;
  background-color: black;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
  25% {
    transform: rotate(3deg) translate3d(0, 0, 0);
  }
  50% {
    transform: rotate(-3deg) translate3d(0, 0, 0);
  }
  75% {
    transform: rotate(1deg) translate3d(0, 0, 0);
  }
  100% {
    transform: rotate(0deg) translate3d(0, 0, 0);
  }
}
@keyframes storm {
  0% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }
  25% {
    transform: translate3d(4px, 0, 0) translateZ(0);
  }
  50% {
    transform: translate3d(-3px, 0, 0) translateZ(0);
  }
  75% {
    transform: translate3d(2px, 0, 0) translateZ(0);
  }
  100% {
    transform: translate3d(0, 0, 0) translateZ(0);
  }
}
</style>
