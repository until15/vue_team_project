<template>
    <div align="center">
        
        <div>
            <h3 style="margin-top:100px;">챌린지 최신순</h3>
        </div>
            
        <!-- 버튼 -->
        <div class="center">
            <el-button class="button-menu" type="info" @click="handleMenu1">최신순</el-button>
            <el-button class="button-menu" type="info" @click="handleMenu2">인기순</el-button>
            <el-button class="button-menu" type="info"   @click="handleMenu3">난이도순</el-button>
        </div>

        <!-- 3*3 화면 구현 테스트 -->
        <!-- <div class="chg-card">
            <div>
                <div class="center">
                    <img :src="state.imgurl" class="image" style="width:800px;height:500px;margin-top:100px" /> <br />
                </div>
            </div>
            
            <div v-for="(tmp) in state.items" :key="tmp"  align="center">
                <el-col :span="8" :gutter="20" v-for="(j) in 1" :key="j" >
                    <el-card :body-style="{ padding: '0px' }" style="width:300px;height:350px">

                        <div style="padding: 14px">
                            <span>
                                <h4>{{tmp.chgtitle}}</h4><br />
                                {{tmp.chgintro}}<br />
                                좋아요 {{tmp.chglike}}개<br />
                                난이도 {{tmp.chglevel}}단계<br />
                                {{tmp.chgfee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}원
                            </span>

                            <span class="ch-mem">
                                {{tmp.chgrate}}
                            </span>

                            <div class="chg-detail">
                                <el-link style="margin-top:20px;" @click="handleSelect(tmp.chgno)">상세 보기</el-link>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </div>
        </div> -->

        <!-- 테이블 -->
        <el-table :data="state.items"  style="width: 100% " >
            <el-table-column prop="chgtitle" label="제목"  width="250" >
            <template #default="scope">
                <div @click="handlePage(scope.row.chgno)" style="cursor:pointer;">
                    {{scope.row.chgtitle}}
                </div> 
            </template>
            </el-table-column>
            <el-table-column prop="chgfee" label="참가비" width="100">
            <template #default="scope">
                <div>
                    {{scope.row.chgfee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
                </div> 
            </template>
            </el-table-column>
            <el-table-column prop="chgcnt" label="참가인원" width="80" />
            <el-table-column prop="chglike" label="좋아요" width="80" />
            <el-table-column prop="chglevel" label="난이도" width="80" />
            <el-table-column prop="chgregdate" label="작성일" width="100" />
        </el-table>
                
        <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentChange">
        </el-pagination>

        <el-form :inline="true" v-if="state.items" >
            <!-- <select>
                    <option>전체</option>
                    <option>작성자</option>
                    <option>인기</option>
                    <option>난이도</option>
            </select> -->
            <!-- <el-select v-model="state.options" size="mini" placeholder="Select">
                <el-option
                v-for="item in state.selectoptions"
                :key="item"
                :label="item"
                :value="item"
                size="mini"
                ></el-option>
                
            </el-select> -->
            <br />
            <el-form-item  label="" label-width="80px">
                <el-input type="text" size="mini" v-model="state.challenge" placeholder="검색어 입력" @keydown.prevent.enter="handleData" />
            </el-form-item>

            <el-form-item>
                <el-button type="info" plain size="mini" style="margin-left:5px" @click="handleData" >검색</el-button>
            </el-form-item>

        </el-form>
        <div v-if="logged === true">
            <el-button class="button-write" style="margin-bottom:60px;" type="info" plain @click="handleChallenge">챌린지 생성</el-button>
        </div>
        <div v-if="logged === false">
            <el-button type="info" plain @click="handleMain">메인으로</el-button>
        </div>  


    </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default {
    data(){
    },
    setup () {
        const router = useRouter();
        const store = useStore();

        const state = reactive({
            token     : sessionStorage.getItem("TOKEN"),
            chgno     : '',
            lno : '',
            page      : 1,
            challenge : '',
            like      : '',
            total     : 1,
            selectoptions : ['전체', '작성자', '제목', '난이도'],
        });

        // 최신순 목록
        const handleData = async() => {
            const url = `/until15/api/challenge/selectlist?page=${state.page}&challenge=${state.challenge}`;
            const headers = {"Content-Type" : "application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                state.items = response.data.result;
                //state.imgurl = response.data.image;
                state.total = response.data.total;
                state.challenge= '';
            }
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

        // 챌린지 상세 조회(1개)
        const  handlePage = async(no) => {
            console.log(no);
            router.push({name:"ChallengeOne", query:{chgno:no}});
        }

        const currentChange = (page) => {
            state.page = page
            handleData();
        }

        const handleChallenge = () => {
            router.push({name : "ChallengeWrite"})
        }

        const handleMain = () => {
            router.push({name : "Home"})
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
            handleChallenge,
            handleMenu1,
            handleMenu2,
            handleMenu3,
            handleMain,
            logged
        }
    }
}
</script>

<style lang="css" scoped>
    .chg-card {
        background-color: #999;
        
        width: 900px;
    }

    .c-m {
        margin: 3rem;
    }

    .ch-mem {
        float: right;
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

    .image {
        width: 100%;
        display: block;
    }

    .chg-detail {
        text-align: center;
        padding: 5px;
    }

    .button-menu {
        background-color: #ffffff;
        border: 2px solid #212529;
        color: #212529;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 16px;
        width: 80px;
    }

    .button-write {
        background-color: #212529;
        border:none;
        color: #ffffff;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 16px;
        width: 300px;
    }

</style>
