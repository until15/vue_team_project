<template>
<div>
    <div>
        <h3>내가 참가한 첼린지 상세 내용</h3>
        <div v-if="state.item">
            
            <img :src="state.thumnail" style="width:70px;" /> <br />
            첼린지 번호: {{state.item.chgno}} <br />
            첼린지 제목: {{state.item.chgtitle}}<br />
            참여자 수 : {{state.item.chgcnt}}<br />
            첼린지 시작일 : {{state.item.chgstart}}<br />
            첼린지 종료일 : {{state.item.chgend}}<br />
            첼린지 참가비 : {{state.item.chgfee}}<br />
            내가 참가한 날 : {{state.item.jregdate}}<br />
            첼린지 레벨 : {{state.item.chglevel}}<br />
            좋아요 개수 : {{state.item.chglike}}<br />
            달성률 : {{state.item.chgrate}}<br />
            진행 상황 : {{state.item.recstate}}<br />
        </div>
        
        <div>
            <button> 포기하기 </button>
            <button> 채팅하기 </button>
            <button @click="handleConfirm(state.jno)"> 인증하기 </button>
        </div>
    </div>

    <hr>

    <!-- 첼린지 내 인증 리스트 -->
    <div>
        <h3>인증 글</h3>

        <div>
            <table>
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
                            <!-- <span>{{state.imageUrl[i][j]}}</span> -->
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
                    <td v-if="state.item.cid === state.mId">
                        <div v-if="tmp.cfsuccess === 0">
                            <button @click="handleSuccess(1, tmp.cfno)">성공</button>
                            <button @click="handleSuccess(2, tmp.cfno)">실패</button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <!-- 페이지네이션 -->
        <div>
            <label v-for="tmp in state.pages" :key="tmp">
                <button @click="handlePage(state.chgno, tmp)" >{{ tmp }}</button>
            </label>
        </div>

        <!-- 상황별 인증 조회 -->
        <!-- 성공, 실패, 인증 대기중 -->
    </div>
</div>
</template>
<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            jno : route.query.jno,
            chgno : route.query.chgno,
            token : sessionStorage.getItem("TOKEN"),
            mId : sessionStorage.getItem("MEMAIL"),
            page : 1,
            pages : 1,
            imageUrl : [],      // 이미지url
            jconfirm : "",      // 성공/실패
        });

        // 내가 참여한 진행 중인 첼린지 상세 내용
        const handleData = async(no)=> {
            console.log(no);
            const url = `/ROOT/api/join/selectone?jno=${no}`;
            const headers = {
                "Content-Type":"application/json",
                "token" : state.token
            }
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                state.item = response.data.result
                state.thumnail = response.data.image
            }

        };

        // 인증하기
        const handleConfirm = async(no)=> {
            // console.log("인증하기");
            router.push({name:'ConfirmInsert', params:{jno:no}});
        };

        // 인증글 조회
        const handleCfmData = async(chgno, page)=> {
            // console.log("첼린지 번호 : ", chgno);
            // console.log("페이지 : ", page);
            const url = `/ROOT/api/confirm/chgcfmlist.json?chgno=${chgno}&page=${page}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            // console.log("인증글 조회 : ", response.data);
            if (response.data.status === 200) {
                state.cfitems = response.data.result
                state.pages = response.data.pages

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

        // 페이지네이션
        const handlePage = async(chgno, page)=> {
            handleCfmData(chgno, page);
        };

        // 인증글 성공 유무 판별
        const handleSuccess = async(e, cfno)=> {
            if (e === 1) {
                state.jconfirm = "성공";
            } else if (e === 2) {
                state.jconfirm = "실패";
            }

            if (confirm( state.jconfirm+" 확정하시겠습니까?")) {
                console.log("인증 번호 : ", cfno);
                console.log("성공 여부 : ", e);
                const url = `/ROOT/api/confirm/whethercfm.json?cfno=${cfno}`;
                const headers = {"Content-Type":"application/json"};
                const body = {cfsuccess : e};
                const response = await axios.put(url, body, {headers});
                console.log(response.data);
                if (response.data.status === 200) {
                    console.log("완료");
                    handleCfmData(state.chgno, state.page);
                }
            }
            
        };

        onMounted(()=> {
            handleData(state.jno);
            handleCfmData(state.chgno, state.page);
        });

        return {
            state,
            handleConfirm,
            handlePage,
            handleSuccess
        }
    }
}
</script>