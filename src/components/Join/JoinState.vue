<template>
    <div class="padding-tb container px-4 px-lg-5 mt-5 mb-6">
        
        <div class="text-center" style="margin-bottom:1.5rem;">
            <h3>진행 상태 별 조회</h3>
        </div>
        
        <div class="text-center center">
            <!-- 진행 상태 -->
            <select @change="handleState($event)" >
                <option value="1">대기중</option>
                <option value="2">포기</option>
                <option value="3">진행중</option>
                <option value="4">달성</option>
            </select>
        </div>

        <div v-if="state.items" class="text-center center" style="margin-top:1.5rem; margin-bottom:1.5rem;">
            <!-- 리스트 -->
            <table border="1">
                <tr>
                    <th>첼린지 번호</th>
                    <th>첼린지 제목</th>
                    <th>첼린지 진행상태</th>
                    <th>첼린지 가입날짜</th>
                    <th>첼린지 달성률</th>
                </tr>
                <tr v-for="tmp in state.items" :key="tmp">
                    <td>{{tmp.challengechgChgno}}</td>
                    <td @click="handleDetail(tmp.jno, tmp.challengechgChgno)" style="cursor:pointer">{{tmp.challengechgChgtitle}}</td>
                    <td>{{tmp.chgstate}}</td>
                    <td>{{tmp.jregdate}}</td>
                    <td>{{tmp.chgrate}}%</td>
                </tr>
            </table>
        </div>

        <!-- 페이지네이션 -->
        <div class="text-center center">
            <label v-for="tmp in state.pages" :key="tmp">
                <button @click="handlePage(tmp)" >{{ tmp }}</button>
            </label>
        </div>
        
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    setup () {
        const router = useRouter();

        const state = reactive({
            page : 1,
            chgstate : 1,
            token : sessionStorage.getItem("TOKEN")
        });

        // 제목을 클릭하면 상세 페이지로
        const handleDetail = async(jno, chgno)=> {
            console.log("상세 페이지로 : ", chgno);
            router.push({name:'JoinOne', query:{jno: jno, chgno:chgno}});
        };

        // 진행 상태에 따른 리스트 조회
        const handleData = async(chgs)=> {
            // console.log("넘어오는 상태값 : ", chgs);
            // console.log("페이지 : ", state.page);
            const url = `/ROOT/api/join/joinstate?chgstate=${chgs}&page=${state.page}`;
            const headers = {
                "Content-Type":"application/json",
                "token" : state.token
                };
            const response = await axios.get(url, {headers});
            console.log(response.data);

            if (response.data.status === 200) {
                state.items = response.data.result
                state.pages = response.data.pages

                let chgrate = []; 
                for(let tmp of response.data.result){
                   chgrate.push(tmp.chgrate);

                   if(tmp.chgrate <= 0){
                       tmp.chgrate = '0';
                   }
                }
            }
            else{
                alert("찾는 첼린지 없음");
            }

        };

        // 상태에 따라 다른 값
        const handleState = async(event)=> {
            state.chgstate = event.target.value;
            // console.log("클릭시 진행 상태 : ", state.chgstate);
            handleData(state.chgstate);
        };

        // 페이지네이션
        const handlePage = async(page)=> {
            state.page = page;
            handleData(state.chgstate, state.page);
        };

        onMounted(()=> {
            handleData(state.chgstate, state.page);
        });

        return {
            state,
            handleState,
            handleData,
            handlePage,
            handleDetail,
        }
    }
}
</script>

<style lang="css" scoped>

.padding-tb {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>