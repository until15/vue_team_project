<template>
  <div>
    <!-- 메인 화면 -->
    <section class="py-5">

        <!-- 진행 중인 첼린지 -->
        <div class="container px-4 px-lg-5 mt-5 mb-6" v-if="logged === true">
            
            <div class="list-top">
              <span> 진행 중인 첼린지 </span>
              <button class="seemore" @click="JoinListPage"> 더 보기 </button>
            </div>
            <!-- vueper Slider -->
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
                      
                      <el-card :body-style="{ padding: '0px' }" class="c-m">
                        <img
                          :src="state.images[idx]"
                          class="image"
                        />
                        
                        <!-- 내용 -->
                        <div style="padding: 14px">
                          <span>{{tmp.chgtitle}}</span>
                          <span class="ch-mem">{{tmp.chgrate}}</span>
                          <div class="bottom time">
                            <time>{{ tmp.jregdate }}</time>
                          </div>
                          <div class="chg-detail">
                            <el-button text class="button" @click="handleSelectOne(tmp.jno)">상세 보기</el-button>
                          </div>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </template>

              </vueper-slide>
            </vueper-slides>
        </div>


        <!-- 인기 리스트 -->
        <div class="container px-4 px-lg-5 mb-6">
            <div class="list-top">
              <span> 인기 리스트 </span>
              <button class="seemore" @click="LikeListPage"> 더 보기 </button>
            </div>
            
            <!-- vueper Slider -->
            <vueper-slides
              :fixed-height="true"
              class="no-shadow"
              :visible-slides="3"
              :slide-ratio="1 / 4"
              :dragging-distance="70">
              <vueper-slide v-for="(tmp, idx) in state1.items" :key="tmp">

                <!-- card -->
                <template v-slot:content>
                  <el-row>
                    <el-col>
                      <el-card :body-style="{ padding: '0px' }" class="c-m">
                        <img
                          :src="state1.images[idx]"
                          class="image"
                        />
                        <div style="padding: 14px">
                          <span>{{tmp.chgtitle}}<br />좋아요{{tmp.chglike}}개</span>
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


        <!-- 난이도 별 리스트 -->
        <div class="container px-4 px-lg-5 mb-6">
            <div class="list-top">
              <span> 난이도 별 리스트 </span>
              <a class="seemore" @click="LevelListPage"> 더 보기 </a>
            </div>

            <!-- vueper Slider -->
            <vueper-slides
              :fixed-height="true"
              class="no-shadow"
              :visible-slides="3"
              :slide-ratio="1 / 4"
              :dragging-distance="70">
              <vueper-slide v-for="(tmp, idx) in state2.items" :key="tmp">

                <!-- card -->
                <template v-slot:content>
                  <el-row>
                    <el-col>
                      <el-card :body-style="{ padding: '0px' }" class="c-m">
                        <img
                          :src="state1.images[idx]"
                          class="image"
                        />
                        <div style="padding: 14px">
                          <span>{{tmp.chgtitle}}<br />난이도{{tmp.chglevel}}단계</span>
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
    
    const state1 = reactive({}); // 인기 챌린지 

    const state2 = reactive({}); // 난이도 챌린지 

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
    const handleSelectOne = async(no)=> {
      console.log(no);
      router.push({name : 'JoinOne', params: {jno:no}});
    };

    // 인기 챌린지 상세보기
    const handleSelectLike = async(chgno)=> {
      console.log(chgno);
      router.push({name : 'ChallengeOne', params: {chgno:chgno}});
    };

    // 난이도 챌린지 상세보기
    const handleSelectLevel = async(chgno)=> {
      console.log(chgno);
      router.push({name : 'ChallengeOne', params: {chgno:chgno}});
    };

    // 인기 첼린지 리스트
    const likeChallengeData = async() => {
      const url = `/ROOT/api/challenge/selectlikelist`;
      const headers = {"Content-Type":"application/json"};
      const response = await axios.get(url, {headers});
      // console.log("벡엔드에서 불러온 데이터 : ", response.data);
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
      // console.log("벡엔드에서 불러온 데이터 : ", response.data);
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
      // console.log("벡엔드에서 불러온 데이터 : ", response.data);
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
    background-color: rgb(206, 206, 206);
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
    width: 100%;
    display: block;
  }


</style>