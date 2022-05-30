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
      jno: 118, // 연결 필요
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
      if (this.paychg.cancelprice === 0) {
        axios({
          url: `/ROOT/api/pay/refund.json`, // 환급 요청을 받을 서비스 URL
          method: "post",
          headers: { "Content-Type": "application/json" },
          data: {
            impuid: this.paychg.impuid, // 결제 당시 고유 ID
            pprice: this.paychg.pprice, // 환불금액
            reason: "테스트 결제 환불", // 환불사유
            cancelprice: this.paychg.cancelprice, // 총 환불된 금액
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

<style lang="scss" scoped></style>
