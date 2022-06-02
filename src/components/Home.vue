<template>
  <div>
    <!-- Header-->
    <header>
    <div class="container px-4 px-lg-5 header-mb bg-white">

      <!-- 드웨인 존슨 썸네일 1 -->
      <div class="text-center">
        <div style="margin-top:40px;">
          <img 
            class="image-thumbnail" 
            src='https://1.bp.blogspot.com/-EyJrKPuJf-U/XQ2YpSY7n-I/AAAAAAAAADo/8IfUH9x0s7YvnbTRnwiz7oSbi-2WypO9gCKgBGAs/w919-h516-p-k-no-nu/dwayne-johnson-working-out-uhdpaper.com-8K-356.jpg'/>
        </div>
      </div>
      <!-- 폰트 이미지 -->
      <!-- <div class="text-center">
        <div>
          <img 
            style="margin-top:20px;" 
            src="../assets/img/끝없는_도전.jpg">
        </div>
      </div> -->

      <div class="text-center">
        <div style="margin-top:40px;">
          <div data-aos="fade-up"  data-aos-easing="linear"
     data-aos-duration="1500">
          <h2 style="font-size:5rem;">
            끝없는 우리의 도전
          </h2>
          </div> 
        </div>
      </div> 
      <div data-aos="fade-up"  data-aos-easing="linear"
     data-aos-duration="1500">
      <!-- 헬린지 타이틀 -->
      <div class="text-center">
        <div>
          <img 
            class="logo_black"
            :src="logo_black">
        </div>
        <div>
          <p class="lead fw-normal mb-0">
            헬린지에서 당신의 한계에 도전하세요. <br />
          </p>
        </div>
        <button 
          style="margin-top:10px;" 
          class="button-blk"
          @click="handleAbout">더 보기</button>
      </div>
      </div>

      <!-- 드웨인 존슨 썸네일 2 -->
      <div class="text-center">
        <div style="margin-top:200px;">
          <div data-aos="fade-down"  data-aos-easing="linear"
     data-aos-duration="1500">
          <img 
            class="image-thumbnail1" 
            src='https://rare-gallery.com/thumbs/322766-Dwayne-Johnson-Gym-Workout-4K-iphone-wallpaper.jpg'/>
          </div> 
        </div>
      </div>

      <!-- 드웨인 존슨의 명언 -->
      <div>
        <div class="font-right">
           <div data-aos="fade-down"  data-aos-easing="linear"
     data-aos-duration="1500">
          <h2 style="font-size:6rem;">
            '피, 땀, 존경'을 <br /> 기억해라.
          </h2>
           </div>
        </div>
        <div class="font-right">
          <div data-aos="fade-left"  data-aos-easing="linear"
     data-aos-duration="1500">
          <h2 style="font-size:3rem;">
              "첫 두가지는 <br />
              당신이 투자해야 하는 것이고 <br />
              마지막 한 가지는 <br />
              당신이 얻게 되는 것이다." <br />
              - 드웨인 존슨 -
          </h2>
          </div>
        </div>
      </div>

      <div>
        <div class="text-center"
        style="margin-top:300px;">
        <div data-aos="zoom-in-up">
          <h2 style="font-size:6rem;">
            수많은 챌린지들이 <br /> 
            당신을 <br />
            기다리고 있습니다.<br />
          </h2> 
        </div>
        </div>
      </div>
      
        
    </div>
    </header>

    <!-- 메인 화면 -->
    <section class="py-5">

        <!-- 참가 중인 첼린지 -->
        <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" data-aos-easing="linear"
     data-aos-duration="1500">
        <div class="container px-4 px-lg-5 mt-5 mb-6" v-if="logged === true">
            <div style="margin-top:200px;" class="list-top">
              <span> 
                <h2 style="font-size:3rem;">
                  참가 중인 챌린지
                </h2>
                <button 
                  style="margin-top:10px;" 
                  class="button-blk"
                  @click="JoinListPage">더 보기</button>
              </span>
            </div>

            <!-- vueper Slider -->
            <div>
              <vueper-slides
                :fixed-height="true"
                class="no-shadow"
                :visible-slides="3"
                :slide-ratio="1 / 4"
                :dragging-distance="70">
                <vueper-slide v-for="(tmp, idx) in state.items" :key="tmp">
                  
                  <!-- card -->
                  <template v-slot:content>
                    <el-row>
                      <el-col>
                        
                        <el-card :body-style="{ padding: '0px' }" class="c-m" style="width:228.92px;">
                          <div style="height:228.92px;">
                            <img
                              :src="state.images[idx]"
                              class="img-size"
                            />
                          </div>
                          
                          <!-- 내용1 -->
                          <div style="padding: 14px">
                            <span>{{tmp.chgtitle}}</span>
                            <span class="ch-mem">{{tmp.chgrate}}</span>
                            <div class="bottom time">
                              <time>{{ tmp.jregdate }}</time>
                            </div>
                            <div class="chg-detail" >
                              <el-button text class="button" @click="handleSelectOne(tmp.jno, tmp.chgno)">상세 보기</el-button>
                            </div>
                          </div>
                        </el-card>
                      </el-col>
                    </el-row>
                  </template>

                </vueper-slide>
              </vueper-slides>
            </div>
        </div>
        </div>

        <!-- 인기 리스트 -->
      <div div data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-easing="linear"
     data-aos-duration="1500">
        <div class="container px-4 px-lg-5 mb-6">
            <div style="margin-top:100px;"  class="list-top">
              <span> 
                <h2 style="font-size:3rem;">
                  인기 챌린지
                </h2>
                <button 
                  style="margin-top:10px;" 
                  class="button-blk"
                  @click="LikeListPage">더 보기</button>
              </span>
            </div>
            
          <!-- vueper Slider -->
          <vueper-slides
            :fixed-height="true"
            class="no-shadow" 
            :visible-slides="3"
            :slide-ratio="1 / 4"
            :dragging-distance="70">
            <vueper-slide v-for="(tmp) in state1.items" :key="tmp">

              <!-- card -->
              <template v-slot:content>
                <el-row>
                  <el-col>
                    <el-card :body-style="{ padding: '0px' }" class="c-m"  style="width:228.92px;">
                      <div style="height:228.92px;">
                        <img
                          :src="tmp.imgurl"
                          class="img-size"
                        />
                      </div>
                      <div style="padding: 14px">
                        <span>{{tmp.chgtitle}}</span><br />
                        <span>좋아요 {{tmp.chglike}}개</span><br />
                        <span>참가비 {{tmp.chgfee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}원</span>
                        <span class="ch-mem">{{tmp.chgrate}}</span>
                        <div class="bottom">
                          <time class="time">{{tmp.chgregdate}}</time>
                        </div>
                        <div class="chg-detail">
                          <el-button text class="button" @click="handleSelectLike(tmp.chgno)">상세 보기</el-button>
                        </div>
                      </div>
                    </el-card>
                  </el-col>
                </el-row>
              </template>
            </vueper-slide>
          </vueper-slides>
        </div>
        </div>
        <!-- 난이도 별 리스트 -->
              <div div data-aos="fade-up" data-aos-duration="1500">
        <div class="container px-4 px-lg-5 mb-6">
            <div style="margin-top:300px;" class="list-top">
              <span> 
                <h2 style="font-size:3rem;">
                  난이도 순 챌린지
                </h2>
                <button 
                  style="margin-top:10px;" 
                  class="button-blk"
                  @click="LevelListPage">더 보기</button>
              </span>
            </div> 

            <!-- vueper Slider -->
            <vueper-slides
              :fixed-height="true"
              class="no-shadow"
              :visible-slides="3"
              :slide-ratio="1 / 4"
              :dragging-distance="70">
              <vueper-slide v-for="(tmp) in state2.items" :key="tmp">

                <!-- card -->
                <template v-slot:content >
                  <el-row>
                    <el-col>
                      <el-card :body-style="{ padding: '0px' }" class="c-m" style="width:228.92px;">
                        <!-- 상단: 이미지 -->
                        <div style="height:228.92px;">
                          <img
                            :src="tmp.imgurl"
                            class="img-size"
                          />
                        </div>
                        <!-- 하단: 내용 -->
                        <div style="padding: 14px">
                          

                          <span>{{tmp.chgtitle}}<br />난이도 {{tmp.chglevel}}단계</span><br />
                          <span>참가비 {{tmp.chgfee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}원</span>

                          <span class="ch-mem">{{tmp.chgrate}}</span>
                          <div class="bottom">
                            <time class="time">{{tmp.chgregdate}}</time>
                          </div>
                          <div class="chg-detail">
                            <el-button text class="button" @click="handleSelectLevel(tmp.chgno)">상세 보기</el-button>
                          </div>
                        </div>

                      </el-card>
                    </el-col>
                  </el-row>
                </template>
              </vueper-slide>
            </vueper-slides>
        </div>
        </div>

    </section>

  </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useRouter } from 'vue-router';
import {useStore} from 'vuex';

export default {
  components: {
    VueperSlides, VueperSlide
  },

  // 로고 require
  data () {
        return {
            logo_black : require("@/assets/img/헬린지_블랙_로고.gif")
        }
  },

  setup () {

    const store = useStore();

    const logged = computed(() => {
      return store.getters.getLogged
    });

    const router = useRouter();

    const currentDate = new Date();


    // 진행중인 챌린지
    const state = reactive({
      token : sessionStorage.getItem("TOKEN"),
    });
    
    const state1 = reactive({
      like : ''
    }); // 인기 챌린지 

    const state2 = reactive({}); // 난이도 챌린지 

    // about us 더보기 클릭
    const handleAbout = async()=> {
      router.push({name:'AboutUs'});
    };

    // 진행 중인 첼린지 더보기 클릭
    const JoinListPage = async()=> {
      router.push({name:'JoinState'});
    };

    // 인기 첼린지 더보기 클릭
    const LikeListPage = async()=> {
      router.push({name:'ChallengeLikeList'});
    };

    // 난이도 별 첼린지 더보기 클릭
    const LevelListPage = async()=> {
      router.push({name:'ChallengeLevelList'});
    };

    // 기간 별 첼린지 더보기 클릭

    // 진행중인 챌린지 상세보기
    const handleSelectOne = async(jno, chgno)=> {
      console.log(jno);
      router.push({name : 'JoinOne', query: {jno:jno, chgno:chgno}});
    };

    // 인기 챌린지 상세보기
    const handleSelectLike = async(no)=> {
      console.log(no);
      router.push({name : 'ChallengeOne', query: {chgno:no}});
    };

    // 난이도 챌린지 상세보기
    const handleSelectLevel = async(chgno)=> {
      console.log(chgno);
      router.push({name : 'ChallengeOne', query: {chgno:chgno}});
    };

    // 인기 첼린지 리스트
    const likeChallengeData = async() => {
      const url = `/ROOT/api/challenge/selectlikelist?like=${state1.like}`;
      const headers = {"Content-Type":"application/json"};
      const response = await axios.get(url, {headers});
       console.log("인기 챌린지 : ", response.data);
      if (response.data.status === 200) {
        state1.items = response.data.result
        state1.images = response.data.images
      }
    };

    // 난이도 별 첼린지 리스트
    const levelChallengeData = async() => {
      const url = `/ROOT/api/challenge/selectlevellist`;
      const headers = {"Content-Type":"application/json"};
      const response = await axios.get(url, {headers});
       console.log("난이도별 챌린지 : ", response.data);
      if (response.data.status === 200) {
        state2.items = response.data.result
        state2.images = response.data.images
      }
    };
    // 기간 별 첼린지 리스트

    // 내가 참여한 진행 중인 첼린지 리스트
    const joinChallengeData = async() => {
      const url = `/ROOT/api/join/inglist`;
      const headers = {
        "Content-Type":"application/json",
        "token" : state.token
      };
      const response = await axios.get(url, {headers});
       console.log("참여중인 챌린지 : ", response.data);
      if (response.data.status === 200) {
        state.items = response.data.result
        state.images = response.data.images
      }

    };


    onMounted(()=> {
      joinChallengeData();

      if(sessionStorage.getItem("TOKEN") !== null){
        store.commit('setLogged', true);
   
      }
      else {
        store.commit('setLogged', false);
      }
    });

    // 인기 챌린지
    onMounted(() => {
      likeChallengeData();
    });

    // 난이도 챌린지
    onMounted(() => {
      levelChallengeData();
    });

    return {
      logged,
      state,  // 진행중인 챌린지
      state1, // 인기별 챌린지
      state2, // 난이도별 챌린지
      currentDate,
      handleSelectOne,
      handleSelectLike,
      handleSelectLevel,
      handleAbout,
      JoinListPage,
      LikeListPage,
      LevelListPage,
  
    }
  }
}
</script>

<style lang="css" scoped>

  .vueperslides--fixed-height { height: 480px; }

  .vueper-list {
    width: 940px;
    float: center;
  }

  .c-m {
    margin: 3rem;
  }

  .ch-mem {
    float: right;
    font-size: 12px;
    color: #999;
  }

  .list-top {
    background-color: rgb(255, 255, 255);
    padding: 15px;
    text-align: center;
  }

  .chg-detail {
    text-align: center;
    padding: 5px;
  }

  .seemore {
    float: right;
    margin-right: 50px;
  }

  .time {
    font-size: 12px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    margin-bottom: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    padding: 5px;
    min-height: auto;
  }

  .image {
    width: 280px;
    height: 280px;
    display: block;
  }

  .img-size {
    height: 100%; 
    width: 100%;
    /* object-fit:cover; */
    background-size: cover;
  }

  /* 메인 */
  .image-thumbnail {
    width:100%;
    height:100%;
    object-fit:cover;
  }

  .image-thumbnail1 {
    float: left;
    height:100%;
    object-fit:cover;
  }

  .font-right {
    justify-content : right;
    display: flex;
    
  }

  .logo_black {
    width: 200px;
  }

  .button-blk {
  background-color: #212529;
  border: none;
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 16px;
}

  @-webkit-keyframes tracking-in-expand-fwd{0%{letter-spacing:-.5em;-webkit-transform:translateZ(-700px);transform:translateZ(-700px);opacity:0}40%{opacity:.6}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}@keyframes tracking-in-expand-fwd{0%{letter-spacing:-.5em;-webkit-transform:translateZ(-700px);transform:translateZ(-700px);opacity:0}40%{opacity:.6}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}


.tracking-in-expand-fwd{
    -webkit-animation:tracking-in-expand-fwd 2s cubic-bezier(.215,.61,.355,1.000) both;animation:tracking-in-expand-fwd 2s cubic-bezier(.215,.61,.355,1.000) both
}

.header-pb {
  padding-bottom: 3rem !important;
}

.header-mb {
  margin-bottom: 3rem !important;
}

.cropping{
  max-height: 300px;
  overflow: hidden;
}

.cropping img{
  max-height: initial;
  margin-top: -15%;
}

#nav1{
    text-align: center;
    font-size: 18px;
    margin-right: 10px;
    display: inline-block;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -o-transition: 0.3s;
    -ms-transition: 0.3s;
    transition: 0.3s;
}

#nav1:hover {
    -webkit-transform: scale(1.5,1.5);
    -moz-transform: scale(1.5,1.5);
    -o-transform: scale(1.5,1.5);
    -ms-transform: scale(1.5,1.5);
    transform: scale(1.5,1.5);
}


</style>