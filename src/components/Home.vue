<template>
  <div>
    <!-- 메인 화면 -->
    <section class="py-5">
        
        <!-- 인기 리스트 -->
        <div class="container px-4 px-lg-5 mt-5 mb-6" style="height:500px">
            <div class="list-top">
              <span> 인기 첼린지 </span>
              <a class="seemore"> 더 보기 </a>
            </div>
            
            <!-- vueper Slider -->
            <vueper-slides
              :fixed-height="true"
              class="no-shadow"
              :visible-slides="3"
              :slide-ratio="1 / 4"
              :dragging-distance="70">
              <vueper-slide v-for="i in 9" :key="i" :span="9">

                <!-- card -->
                <template v-slot:content>
                  <el-row>
                    <el-col>
                      <el-card :body-style="{ padding: '0px' }" style="margin: 3rem;">
                        <img
                          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                          class="image"
                        />
                        <!-- 내용 -->
                        <div style="padding: 14px">
                          <span>challenge title</span>
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


        <!-- 추천 리스트 -->
        <div class="container px-4 px-lg-5 mb-6" style="height:500px">
            <div class="list-top">
              <span> 추천 첼린지 </span>
              <a class="seemore"> 더 보기 </a>
            </div>
            
            <!-- vueper Slider -->
            <vueper-slides
              :fixed-height="true"
              class="no-shadow"
              :visible-slides="3"
              :slide-ratio="1 / 4"
              :dragging-distance="70">
              <vueper-slide v-for="i in 9" :key="i" :span="9">

                <!-- card -->
                <template v-slot:content>
                  <el-row>
                    <el-col>
                      <el-card :body-style="{ padding: '0px' }" style="margin: 3rem;">
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


        <!-- 기간별 리스트 -->
        <div class="container px-4 px-lg-5 mb-6">
            <div class="list-top">
              <span> 기간별 첼린지 </span>
              <a class="seemore"> 더 보기 </a>
            </div>

            <!-- vueper Slider -->
            <vueper-slides
              :fixed-height="true"
              class="no-shadow"
              :visible-slides="3"
              :slide-ratio="1 / 4"
              :dragging-distance="70">
              <vueper-slide v-for="i in 9" :key="i" :span="9">

                <!-- card -->
                <template v-slot:content>
                  <el-row>
                    <el-col>
                      <el-card :body-style="{ padding: '0px' }" style="margin: 3rem;">
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
import { reactive } from '@vue/reactivity'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  components: {
    VueperSlides, VueperSlide
  },

  setup () {
    const currentDate = new Date();

    const state = reactive({

      // 슬라이더
      slides: [
        {
          title: 'Slide #1',
          content: 'Slide content.'
        }
      ]
    });

    return {state, currentDate}
  }
}
</script>

<style lang="css" scoped>

  .vueperslides--fixed-height { height: 470px; }

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