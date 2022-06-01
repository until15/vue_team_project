<template>
  <div align="center" style="padding: 180px">
    <div v-if="this.paychg">
      <img src="@/assets/img/환급.png" style="width: 500px" />
      <h3>
        <div v-if="this.member">
          {{ this.member.mid }} 님은 달성률을
          <mark>{{ this.pjoinchg.chgrate }}</mark
          >% 달성하셨습니다!
        </div>
      </h3>
      <h6>
        달성률 <mark>80%</mark> 이상 달성 시 <mark>전액</mark> 환급, 80% 미만
        달성 시 달성률만큼 환급 됩니다.
      </h6>
      <br />

      <el-button type="info" plain @click="cancelPay"
        >참가비 환급받기</el-button
      >
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.handlePayCHG();
    this.handleJoinCHG();
    this.handleData();
  },

  data() {
    return {
      token: sessionStorage.getItem("TOKEN"),
      paychg: "",
      pjoinchg: "",
      jno: 114, // 연결 필요
    };
  },

  methods: {
    // 회원 조회
    async handleData() {
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

    //참가비 조회
    async handlePayCHG() {
      const url = `/ROOT/api/pay/selectone.json?no=${this.jno}`;
      const headers = { "Content-Type": "application/json", token: this.token };
      const response = await this.axios.get(url, { headers: headers });
      console.log(response.data);
      if (response.data.status === 200) {
        this.paychg = response.data.result;
      }
    },

    // 환급
    cancelPay: function () {
      // 환급 중복 방지
      if (this.paychg.checksum === 0) {
        axios({
          url: `/ROOT/api/pay/refund.json`, // 환급 요청을 받을 서비스 URL
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            imp_uid: this.paychg.imp_uid, // 결제 당시 고유 ID
            amount: this.paychg.amount, // 환불금액
            reason: "테스트 결제 환불", // 환불사유
            checksum: this.paychg.checksum, // 총 환불된 금액
            joinchg: { jno: this.paychg.jno }, // 참가 챌린지 번호
          },
        }).then((data) => {
          // 환급 성공 시 응답 처리
          console.log(data);
          location.href = "http://localhost:8080/?#/"; // 환급 성공 시 이동할 페이지
          alert("환급 되었습니다.");
        });
      } else {
        alert("이미 처리된 환급입니다.");
      }
    },
  },
};
</script>

<style lang="css" scoped>
button {
  position: relative;
  outline: none;
  text-decoration: none;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  height: 60px;
  width: 210px;
  opacity: 1;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.92);
}
button span {
  color: #164ca7;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.7px;
}
button:hover {
  animation: rotate 0.7s ease-in-out both;
  background-color: black;
}
button:hover span {
  animation: storm 0.7s ease-in-out both;
  animation-delay: 0.06s;
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
