<template>

    <div>
        <div class="text-center">
            <h3>첼린지 내 전체 인증글</h3>
        </div>

        <div v-if="state.cfitems">
            <!-- <table>
                <tr>
                    <th>이미지</th>
                    <th>인증 번호</th>
                    <th>작성자</th>
                    <th>인증내용</th>
                    <th>성공 유무</th>
                    <th>인증일</th>
                </tr>
                <tr v-for="(tmp, i) in state.cfitems" :key="tmp">
                    <td>
                        <div v-for="(tmp1, j) in state.imageUrl[i]" :key="tmp1">
                            <img :src="state.imageUrl[i][j]" style="width:50px" />
                        </div>
                    </td>
                    <td>{{tmp.cfno}}</td>
                    <td>{{tmp.memail}}</td>
                    <td>{{tmp.cfcomment}}</td>
                    <td>
                        <span v-if="tmp.cfsuccess === 0"> 대기중</span>
                        <span v-if="tmp.cfsuccess === 1"> 성공</span>
                        <span v-if="tmp.cfsuccess === 2"> 실패</span>
                    </td>
                    <td>{{tmp.ccregdate}}</td>
                    <td v-if="cid === state.mId">
                        <div v-if="tmp.cfsuccess === 0">
                            <button @click="handleSuccess(1, tmp.cfno)">성공</button>
                            <button @click="handleSuccess(2, tmp.cfno)">실패</button>
                        </div>
                    </td>
                </tr>
            </table> -->
            
            <div v-for="(tmp, i) in state.cfitems" :key="tmp" style="margin-top:30px;" class="center">
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
                            <span>번호: {{tmp.cfno}}</span> <br />
                            <span>내용: {{tmp.cfcomment}}</span> <br />
                            <span>인증 상태 : {{tmp.cfsuccess}}</span> <br />
                            <span>달성률 : {{tmp.chgrate}}</span> <br />
                            <!-- 성공 판별 버튼 -->
                            <div v-if="cid === state.mId" style="margin-top:10px">
                                <div v-if="tmp.cfsuccess === '대기중'">
                                    <el-button 
                                    class="button-bmk" type="info" size="medium" plain  
                                    @click="handleSuccess(1, tmp.cfno)">성공</el-button>
                                    <el-button 
                                    class="button-like" type="info" size="medium" plain  
                                    @click="handleSuccess(2, tmp.cfno)">실패</el-button>
                                    <!-- <button @click="handleSuccess(2, tmp.cfno)">실패</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
        

            <!-- 페이지네이션 -->
            <!-- <div>
                <label v-for="tmp in state.pages" :key="tmp">
                    <button @click="handlePage(tmp)" >{{ tmp }}</button>
                </label>
            </div> -->
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
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted, watch } from '@vue/runtime-core';
import axios from 'axios';

export default {
    props : {
        chgno : String,
        cid : String,
        jno : [String, Number],
        chgrate : Number,
    },
    setup (props) {
        
        const state = reactive({
            page : 1,
            pages : 1,
            imageUrl : [],
            mId : sessionStorage.getItem("MEMAIL"),
            jconfirm : "",      // 성공/실패
        });

        // 인증글 리스트
        const handleData = async(page)=> {
            const url = `/ROOT/api/confirm/chgcfmlist.json?chgno=${props.chgno}&page=${page}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log("인증글 조회 : ", response.data);
            if (response.data.status === 200) {
                state.cfitems = response.data.result
                state.pages = response.data.pages

                for (let i in state.cfitems) {
                    // console.log(state.items[i].ccregdate);
                    state.cfitems[i].ccregdate = regdate(state.cfitems[i].ccregdate);
                    state.cfitems[i].cfsuccess = proveScState(state.cfitems[i].cfsuccess);
                }

                // 인증 이미지 조회
                // imageUrl 배열 초기화
                state.imageUrl.splice(0, state.cfitems.length);   //idx 0부터 요소의 갯수만큼

                for( let i=0;i<state.cfitems.length;i++){
                    state.imageNo = state.cfitems[i].cfno
                    // console.log(state.imageNo);

                    // 인증 이미지
                    const url1 = `/ROOT/api/confirm/selectimages?cfno=${state.imageNo}`;
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

        // 페이지네이션
        const handlePage = async(page)=> {
            handleData(page);
        };

        const handleCurrent = (e)=> {
            // console.log(e);
            // console.log("검색어 넘어오나? ", state.text);
            handleData(e);
        }

        // 인증글 성공 유무 판별
        const handleSuccess = async(e, cfno)=> {
            if (e === 1) {
                state.jconfirm = "성공";
            } else if (e === 2) {
                state.jconfirm = "실패";
            }
            // console.log("cfno" , cfno);
            if (confirm( state.jconfirm+" 확정하시겠습니까?")) {
                // console.log("인증 번호 : ", cfno);
                // console.log("성공 여부 : ", e);
                const url = `/ROOT/api/confirm/whethercfm.json?cfno=${cfno}`;
                const headers = {"Content-Type":"application/json"};
                const body = {cfsuccess : e};
                const response = await axios.put(url, body, {headers});
                // console.log(response.data);
                if (response.data.status === 200) {
                    // console.log("완료");
                    alert( state.jconfirm+'확정 되었습니다');
                    handleData(state.page);
                }
            }

        };

        // 달성률 업데이트
        const challnegeRate = async()=> {
            const url1 = `/ROOT/api/confirm/successrate.json?chgno=${props.chgno}&jno=${props.jno}`;
            const headers1 = {"Content-Type":"application/json"};
            const body1 = {};
            const response1 = await axios.put(url1, body1, {headers:headers1});
            // console.log("달성률 결과 : ", response1.data);
            if (response1.data.status === 200) {
                handleData(state.page);
                // context.emit();
            }
        }

        // 성공 클릭하면 달성률 업데이트
        watch(() => (state.jconfirm), (currentValue, oldValue) => {
            console.log("성공 유무 현재값 :",currentValue);
            console.log("성공 유무 이전값",oldValue);
            if (currentValue === "성공") {
                challnegeRate();
            }
        });


        onMounted(()=> {
            handleData(state.page);
        });

        return {
            state,
            props,
            handlePage,
            handleData,
            handleSuccess,
            challnegeRate,
            handleCurrent
        }
    }
}
</script>

<style lang="css" scoped>

.button-bmk {
    background-color: #ffffff;
    border: 2px solid #be9200d3;
    color: #be9200d3;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
    width: 60px;
}

.button-like {
    background-color: #ffffff;
    border: 2px solid #ff5757;
    color: #ff5757;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
    width: 60px;
}

.padding-tb {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

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