<template>
  <div>
    <!-- 메인 화면 -->
    <section class="py-5">

        <!-- 진행 중인 첼린지 -->
        <div class="container px-4 px-lg-5 mt-5 mb-6" v-if="state.items">
            
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
              <vueper-slide v-for="i in state.items" :key="i">

                <!-- card -->
                <template v-slot:content>
                  <el-row>
                    <el-col>
                      
                      <el-card :body-style="{ padding: '0px' }" class="c-m">
                        <img
                          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                          class="image"
                        />
                        
                        <!-- 내용 -->
                        <div style="padding: 14px">
                          <span>{{i.challengechgChgtitle}}</span>
                          <span class="ch-mem">이름</span>
                          <div class="bottom">
                            <time class="time">{{ i.jregdate }}</time>
                          </div>
                          <div class="chg-detail">
                            <el-button text class="button" @click="handleSelectOne(i.jno)">상세 보기</el-button>
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
              <a class="seemore"> 더 보기 </a>
            </div>
            
            <!-- vueper Slider -->
            <vueper-slides
              :fixed-height="true"
              class="no-shadow"
              :visible-slides="3"
              :slide-ratio="1 / 4"
              :dragging-distance="70">
              <vueper-slide v-for="i in 9" :key="i">

                <!-- card -->
                <template v-slot:content>
                  <el-row>
                    <el-col>
                      <el-card :body-style="{ padding: '0px' }" class="c-m">
                        <img
                          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                          class="image"
                        />
                        <div style="padding: 14px">
                          <span>Yummy hamburger</span>
                          <span class="ch-mem">이름</span>
                          <div class="bottom">
                            <time class="time">{{ currentDate }}</time>
                          </div>
                          <div class="chg-detail">
                            <el-button text class="button">상세 보기</el-button>
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
              <span> 난이도 별 첼린지 </span>
              <a class="seemore"> 더 보기 </a>
            </div>

            <!-- vueper Slider -->
            <vueper-slides
              :fixed-height="true"
              class="no-shadow"
              :visible-slides="3"
              :slide-ratio="1 / 4"
              :dragging-distance="70">
              <vueper-slide v-for="i in 9" :key="i">

                <!-- card -->
                <template v-slot:content>
                  <el-row>
                    <el-col>
                      <el-card :body-style="{ padding: '0px' }" class="c-m">
                        <img
                          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                          class="image"
                        />
                        <div style="padding: 14px">
                          <span>Yummy hamburger</span>
                          <span class="ch-mem">이름</span>
                          <div class="bottom">
                            <time class="time">{{ currentDate }}</time>
                          </div>
                          <div class="chg-detail">
                            <el-button text class="button">상세 보기</el-button>
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
import { reactive } from '@vue/reactivity';
import { VueperSlides, VueperSlide } from 'vueperslides';
import 'vueperslides/dist/vueperslides.css';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  components: {
    VueperSlides, VueperSlide
  },

  setup () {
    const router = useRouter();

    const currentDate = new Date();

    const state = reactive({

      token : sessionStorage.getItem("TOKEN"),

    });

    // 진행 중인 첼린지 더보기 클릭
    const JoinListPage = async()=> {
      router.push({name:'JoinState'});
    };

    // 인기 첼린지 더보기 클릭

    // 난이도 별 첼린지 더보기 클릭

    // 기간 별 첼린지 더보기 클릭

    // 상세 버튼 클릭
    const handleSelectOne = async(no)=> {
      console.log(no);
      router.push({name : 'JoinOne', params: {jno:no}});
    };

    // 인기 첼린지 리스트

    // 난이도 별 첼린지 리스트

    // 기간 별 첼린지 리스트

    // 내가 참여한 진행 중인 첼린지 리스트
    const joinChallengeData = async() => {

      const url = `/ROOT/api/join/inglist`;
      const headers = {
        "Content-Type":"application/json",
        "token" : state.token
      };
      const response = await axios.get(url, {headers});
      console.log("벡엔드에서 불러온 데이터 : ", response.data);
      if (response.data.status === 200) {
        state.items = response.data.result
      }

    };

    onMounted(()=> {
      joinChallengeData();
    });

    return {
      state,
      currentDate,
      handleSelectOne,
      JoinListPage,
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