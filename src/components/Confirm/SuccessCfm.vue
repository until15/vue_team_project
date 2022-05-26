<template>

    <div>
        <div>
            <h3>첼린지 내 전체 인증글</h3>
        </div>

        <div v-if="state.cfitems">
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
                    <!-- <td>{{cid}}</td> -->
                    <td v-if="cid === state.mId">
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
                <button @click="handlePage(tmp)" >{{ tmp }}</button>
            </label>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import axios from 'axios';

export default {
    props : {
        chgno : String,
        cid : String,
        jno : [String, Number],
    },
    setup (props) {
        
        const state = reactive({
            page : 1,
            pages : 1,
            imageUrl : [],
            mId : sessionStorage.getItem("MEMAIL"),
            jconfirm : "",      // 성공/실패
        });


        const handleData = async(page)=> {
            const url = `/ROOT/api/confirm/chgcfmlist.json?chgno=${props.chgno}&page=${page}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log("인증글 조회 : ", response.data);
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
        const handlePage = async(page)=> {
            handleData(page);
        };

        // 인증글 성공 유무 판별
        const handleSuccess = async(e, cfno)=> {
            if (e === 1) {
                state.jconfirm = "성공";
            } else if (e === 2) {
                state.jconfirm = "실패";
            }

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

                    if (e === 1) {
                        const url1 = `/ROOT/api/confirm/successrate.json?chgno=${props.chgno}&jno=${props.jno}`;
                        const headers1 = {"Content-Type":"application/json"};
                        const body1 = {};
                        const response1 = await axios.put(url1, body1, {headers:headers1});
                        // console.log("달성률 결과 : ", response1.data);
                        if (response1.data.status === 200) {
                            handleData(state.page);
                        }
                    }

                    handleData(state.page);
                }
            }
            
        };

        onMounted(()=> {
            handleData(state.page);
        });

        return {
            state,
            props,
            handlePage,
            handleData,
            handleSuccess,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>