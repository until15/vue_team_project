<template>
    <div class="padding-tb container px-4 px-lg-5 mt-5 mb-6">
        
        <div class="text-center" style="margin-bottom:1.5rem;">
            <h3>진행 상태 별 조회</h3>
        </div>
        
        <!-- 진행 상태 -->
        <div class="text-center center">
            <el-select class="m-2" v-model="label" placeholder="진행 상태" size="large" @change="handleChange">
                <el-option value="1" label="대기중" />
                <el-option value="2" label="포기" />
                <el-option value="3" label="진행중" />
                <el-option value="4" label="달성" />
            </el-select>
        </div>

        <!-- 리스트 -->
        <div class="center" align="center">
            <el-table :data="state.items" style="width:100%" @row-click="handleRow">
                <el-table-column prop="challengechgChgno" label="번호" width="50" />
                <el-table-column prop="challengechgChgtitle" label="제목" width="180" />
                <el-table-column prop="chgstate" label="진행상태" width="80" />
                <el-table-column prop="jregdate" label="가입일" width="180" />
                <el-table-column prop="chgrate" label="달성률" width="80" />
            </el-table>
        </div>

        <!-- 페이지네이션 -->
        <div class="example-pagination-block center my-3" v-if="state.pages">
            <el-pagination 
                layout="prev, pager, next" 
                :page-size="10"
                :total="state.pages" 
                @current-change="handleCurrent" />
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

        // 상세 페이지로
        const handleRow = (e)=> {
            // console.log(e.jno);
            // console.log(e.challengechgChgno);
            router.push({name:'JoinOne', query:{jno: e.jno, chgno:e.challengechgChgno}});
        };

        // 페이지네이션
        const handleCurrent = (e)=> {
            console.log(e);
            state.page = e;
            handleData(state.chgstate);
        };

        onMounted(()=> {
            handleData(state.chgstate, state.page);
        });

        // 상태에 따라 다른 값
        const handleChange = (e)=> {
            // console.log(e);
            // state.chgstate = e;
            handleData(e);
        };

        return {
            state,
            handleData,
            handleChange,
            handleCurrent,
            handleRow
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