<template>
  <div>
    <!-- 메인 화면 -->
    <section class="py-5">
        <!-- 첼린지 전체 --->
        <div class="container px-4 px-lg-5 mt-5">
            <span> 첼린지 전체 </span>
            <a class="selectbutton"> 상세보기 </a>
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              
              <div class="col mb-5">
                  <div class="card h-100">
                      <!-- 첼린지 썸네일 -->
                      <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />

                      <!-- 첼린지 내용-->
                      <div class="card-body p-4">
                          <div class="text-center">
                              <!-- 첼린지 제목-->
                              <h5 class="fw-bolder">여기 제목</h5>
                              <!-- 첼린지 기간 -->
                              
                          </div>
                      </div>

                      <!-- 첼린지 상세내용 -->
                      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                          <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                      </div>
                  </div>
              </div>
            
            </div>
        </div>

        <!-- 인기 첼린지 -->
        <div class="container px-4 px-lg-5 mt-5">
            <span> 인기 첼린지 </span>
            <a class="selectbutton"> 상세 보기 </a>
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

              <vueper-slides
                class="no-shadow"
                :visible-slides="3"
                :slide-ratio="1 / 4"
                :dragging-distance="70">
                <vueper-slide v-for="i in 9" :key="i" :title="i.toString()">

                  <template v-slot:content>
                    <div class="col mb-5">
                        <div class="card h-100">
                            <!-- 첼린지 썸네일 -->
                            <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />

                            <!-- 첼린지 내용-->
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <!-- 첼린지 제목 -->
                                    <h5 class="fw-bolder">여기 제목</h5>
                                    <!-- 첼린지 기간 -->
                                    
                                </div>
                            </div>

                            <!-- 첼린지 상세내용 -->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                            </div>
                        </div>
                    </div>
                  </template>

                </vueper-slide>
              </vueper-slides>
            </div>
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
    const state = reactive({

      // 슬라이더
      slides: [
        {
          title: 'Slide #1',
          content: 'Slide content.'
        }
      ]
    });

    return {state}
  }
}
</script>

<style lang="css" scoped>
  .selectbutton {
    float: right;
  }
</style>