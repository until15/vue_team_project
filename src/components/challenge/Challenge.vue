<template>
    <div align="center">
        
        <el-card>
            <h3>챌린지 최신순</h3><br/>
            <el-button @click="handleMenu1">최신순</el-button>
            <el-button @click="handleMenu2">인기순</el-button>
            <el-button @click="handleMenu3">난이도순</el-button>
            <br /><br />
            <hr />
                <el-table :data="state.items"  style="width: 100% " >
                    <el-table-column prop="chgno" label="번호" width="60" />
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
                    <el-table-column prop="chglevel" label="난이도" width="80" />
                    <el-table-column prop="chgregdate" label="작성일" width="100" />
                    <el-table-column label="버튼" width="170">
                        <template #default="scope">
                            <el-button 
                                size="small"
                                text
                                @click="handleLike(scope.row.chgno)">좋아요</el-button>
                            <el-button 
                                size="small"
                                text
                                @click="handleBmk(scope.row.chgno)">북마크</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                
        
                <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentChange">
                </el-pagination>
        </el-card>

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
            <el-button type="info" plain @click="handleChallenge">챌린지 생성</el-button>
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
            const url = `/ROOT/api/challenge/selectlist?page=${state.page}&challenge=${state.challenge}`;
            const headers = {"Content-Type" : "application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                state.items = response.data.result;
                state.total = response.data.total;
                state.challenge= '';
            }
        }

        const handleLike = async() => {
            console.log(state.chgno);
            const url = `/ROOT/api/like/insert?chgno=${state.chgno}`;
            const headers = {
                "Content-Type" : "application/json",
                token:state.token
            };
            const body = {chgno : state.chgno};
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                state.chgno = '';
                state.lno = '';
                console.log(state.chgno);
                alert("이 챌린지를 좋아합니다 !");
            }
            // else if(response.data.status === 0) {
            //     const url = `/ROOT/api/like/delete?chgno=${state.chgno}&lno=${state.lno}`;
            //     const headers = {
            //         "Content-Type" : "application/json",
            //         token:state.token
            //     };
            //     const body = {chgno : state.chgno};
            //     const response = await axios.delete(url, body, {headers});
            //     console.log(response.data);
            //     if(response.data.status === 200) {
            //         alert("좋아요를 취소 하였습니다.");
            //         handleLike();
            //     }
            // }

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
            handleLike,
            handleMain,
            logged

        }
    }
}
</script>

<style lang="scss" scoped>

</style>
