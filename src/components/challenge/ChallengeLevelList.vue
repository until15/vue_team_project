<template>
    <div align="center">
        <div>
            <h3 style="margin-top:100px;">챌린지 난이도순</h3>
        </div>

        <!-- 버튼 -->
        <div class="center">
            <el-button class="button-blk1" type="info" @click="handleMenu1">최신순</el-button>
            <el-button class="button-blk1" type="info" @click="handleMenu2">인기순</el-button>
            <el-button class="button-blk1" type="info"   @click="handleMenu3">난이도순</el-button>
        </div>

            <el-table :data="state.items"  style="width: 100% " >
                <el-table-column prop="chglevel" label="난이도" width="80" />
                <el-table-column prop="chgtitle" label="제목"  width="250" >
                    <template #default="scope">
                        <div @click="handlePage(scope.row.chgno)" style="cursor:pointer;">
                            {{scope.row.chgtitle}}
                        </div> 
                    </template>
                </el-table-column>
                <el-table-column prop="chgfee" label="참가비" width="100" />
                <el-table-column prop="chgcnt" label="참가인원" width="80" />
                <el-table-column prop="chglike" label="좋아요" width="80" />
                <el-table-column prop="chgregdate" label="작성일" width="250" />
            </el-table>
            <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentChange"></el-pagination>


        <br />
        <el-form :inline="true" v-if="state.items" >
            <el-form-item  label="" label-width="80px">
                <el-input type="text" size="mini" v-model="state.level" placeholder="검색어 입력" @keydown.prevent.enter="handleData" />
            </el-form-item>
            <el-form-item>
                <el-button type="info" plain size="mini" style="margin-left:5px" @click="handleData" >검색</el-button>
            </el-form-item>
        </el-form>

        <div v-if="logged === true">
            <el-button type="info" plain @click="handleChallenge">챌린지 생성</el-button>
        </div>
        <div v-if="logged === false">
            <el-button type="info" plain @click="handleMain">메인으로</el-button>
        </div>  
    </div>
</template>

<script>
import { reactive, onMounted, computed} from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default {
    setup () {

        const router = useRouter();
        const store = useStore();

        const state = reactive({
            page : 1,
            level : '',
            total : 1
        });

        const handleData = async() => {
            const url = `/until15/api/challenge/levelselectlist?page=${state.page}&level=${state.level}`;
            const headers = {"Content-Type" : "application/json"};
            const response = await axios.get(url, {headers});

            console.log(response.data);

            if(response.data.status === 200) {
                state.items = response.data.result;
                state.total = response.data.total;
                state.like= '';
            }
        }

        // 챌린지 상세 조회(1개)
        const  handlePage = async(no) => {
            console.log(no);
            router.push({name:"ChallengeOne", query:{no:no}});
        }

        const currentChange = (page) => {
            state.page = page
            handleData();
        }

        const handleMain = () => {
            router.push({name : "Home"})
        }

        const handleMenu1 = () => {
            router.push({name : "Challenge"});
        }

        const handleMenu2 = () => {
            router.push({name : "ChallengeLikeList"});
        }

        const handleMenu3 = () => {
            router.push({name : "ChallengeLevelList"});
        }

        const logged = computed(() => {
        return store.getters.getLogged
        });


        onMounted(() => {
            handleData();
        });

        return {
            state, 
            handleData,
            handlePage, 
            currentChange,
            handleMain,
            handleMenu1,
            handleMenu2,
            handleMenu3,
            logged

        }
    }
}
</script>

<style lang="css" scoped>

    .button-blk1 {
        background-color: #212529;
        border: none;
        color: rgb(255, 255, 255);
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 16px;
        width: 80px;
    }
</style>
