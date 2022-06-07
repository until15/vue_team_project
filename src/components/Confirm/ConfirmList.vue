<template>
    <div class="padding-tb">
        <div class="container px-4 px-lg-5 mt-5 mb-6">
            
            <div class="text-center">
                <!-- 페이지 이름 -->
                <h3 class="display-4 fw-bolder text-tb">PROVE LIST</h3>
            </div>

            <!-- 인증 전체 리스트 -->
            <div v-if="state.items" >
                
                <!-- 검색기능 -->
                <div class="center my-3">
                    <el-form :inline="true">
                        <el-form-item  label="" label-width="80px">
                            <el-input type="text" 
                            v-model="state.text" 
                            placeholder="참가자 검색" 
                            @keydown.prevent.enter="handleData(state.page, state.text)" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" plain style="margin-left:5px" @click="handleData(state.page, state.text)" >검색</el-button>
                        </el-form-item>
                    </el-form>
                </div>

                <!-- 리스트 -->
                <div v-for="(tmp, i) in state.items" :key="tmp" style="margin-top:30px;" class="center">
                <el-card>
                    <template #header>
                        <div class="m-tb side">
                            <!-- 작성자 -->
                            <div style="margin-left:10px">
                                <span style="font-size:2rem;">{{tmp.memail}}</span>
                            </div>
                            <!-- 등록일 -->
                            <div style="margin-right:10px">
                                <span>{{tmp.ccregdate}}</span>
                            </div>
                        </div>
                    </template>
                    <!-- 하단 -->
                    <div style="display:flex;">
                        <!-- 이미지 -->
                        <div v-if="state.imageUrl" style="padding:10px; width:370px;">
                            <el-carousel height="350px">
                                <el-carousel-item v-for="(tmp1, j) in state.imageUrl[i]" :key="tmp1">
                                    <img :src="state.imageUrl[i][j]" class="img-size" />
                                </el-carousel-item>
                            </el-carousel>
                        </div>

                        <!-- 내용 -->
                        <div style="padding:10px;">
                            <span>제목: {{tmp.chgtitle}}</span> <br />
                            <span>내용: {{tmp.cfcomment}}</span> <br />
                            <span>진행 상태 : {{tmp.chgstate}}</span> <br />
                            <span>인증 상태 : {{tmp.cfsuccess}}</span> <br />
                            <span>달성률 : {{tmp.chgrate}}%</span> <br />
                        </div>
                    </div>
                </el-card>
                </div>

                <!-- 페이지네이션 -->
                <div class="example-pagination-block center my-3" v-if="state.pages">
                    <el-pagination 
                        layout="prev, pager, next" 
                        :page-size="5" 
                        :total="state.pages" 
                        @current-change="handleCurrent" />
                </div>
                

            </div>

        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    setup () {
        const state = reactive({
            page : 1,
            pages : 1,
            text : "",
            imageUrl : [],
            
        });

        // 첼린지로 이동
        const handlePushCHG = async()=> {
            console.log("첼린지로 이동");
        };

        // 전체 인증 리스트
        const handleData = async(tmp, text)=> {
            const url = `/until15/api/confirm/provelist.json?page=${tmp}&email=${text}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            // console.log(response.data);
            if (response.data.status === 200) {
                state.items = response.data.result
                state.pages = response.data.pages

                for (let i in state.items) {
                    // console.log(state.items[i].ccregdate);
                    state.items[i].ccregdate = regdate(state.items[i].ccregdate);
                    state.items[i].cfsuccess = proveScState(state.items[i].cfsuccess);
                    state.items[i].chgstate = challengeState(state.items[i].chgstate);
                }

                // imageUrl 배열 초기화
                state.imageUrl.splice(0, state.items.length);   //idx 0부터 요소의 갯수만큼

                for( let i=0;i<state.items.length;i++){
                    state.imageNo = state.items[i].cfno
                    // console.log(state.imageNo);

                    // 인증 이미지
                    const url1 = `/until15/api/confirm/selectimages?cfno=${state.imageNo}`;
                    const headers1 = {"Content-Type":"application/json"};
                    const response1 = await axios.get(url1, {headers:headers1});
                    // console.log("이미지 데이터 : ", response1.data);

                    if (response1.data.status === 200) {
                            
                        state.imageUrl.push(response1.data.images);
                        
                    }
                }
                // console.log("이미지 url : ", state.imageUrl);
            }
        };

                // 등록일 정규 표현식
        const regdate = (date)=> {
            var regdate = new Date(date);

            var year = regdate.getFullYear();
            var month = ('0' + (regdate.getMonth() + 1)).slice(-2);
            var day = ('0' + regdate.getDate()).slice(-2);

            var hours = ('0' + regdate.getHours()).slice(-2); 
            var minutes = ('0' + regdate.getMinutes()).slice(-2);
            var seconds = ('0' + regdate.getSeconds()).slice(-2); 
            
            var dateString = year + '-' + month  + '-' + day + ' ' + hours + ':' + minutes  + ':' + seconds;
            // console.log(dateString);
            return dateString;
        };

        // 인증 상태
        const proveScState = (state)=> {
            if (state === 0) {
                state = "대기중";
            }
            else if (state === 1) {
                state = "성공";
            }
            else if (state === 2) {
                state = "실패";
            }
            var stateString = state;
            return stateString;
        };

        // 진행 상태 표시
        const challengeState = (state)=> {
            if (state === 1) {
                state = "대기중";
            }
            else if (state === 2) {
                state = "포기";
            }
            else if (state === 3) {
                state = "진행중";
            }
            else if (state === 4) {
                state = "달성";
            }
            var stateString = state;
            return stateString;
        }

        const handleCurrent = async(e)=> {
            // console.log(e);
            // console.log("검색어 넘어오나? ", state.text);
            handleData(e, state.text);
        }

        onMounted(()=> {
            handleData(state.page, state.text);
        });

        return {
            state, 
            handleData,
            handlePushCHG,
            handleCurrent
        }
    }
}
</script>

<style lang="css" scoped>

.m-tb {
    margin-top:5px;
    margin-bottom:5px;
}

.cf-list {
    padding:10px;
    margin-top:30px;
}

.side {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.img-size {
    height: 100%; 
    width: 100%;
    /* object-fit:cover; */
    background-size: cover;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

</style>