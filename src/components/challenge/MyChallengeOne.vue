<template>
    <div class="padding-tb container px-4 px-lg-5 mt-5 mb-6" >
        <div>
            <div v-if="state.item">
                
                <!-- 윗 부분 -->
                <div class="btn1">

                    <!-- 이미지 -->
                    <div class="center">
                        <img :src="state.thumnail" class="image" style="width:800px;height:500px;margin-top:100px" /> <br />
                    </div>
                
                    <!-- 제목 -->
                    <div class="center" style="margin-top:60px;">
                        <h1>{{state.item.chgtitle}}</h1>
                    </div>

                    <!-- 버튼 -->
                    <div class="btn">      
                        <div class="text-right" style="margin-top:40px;">
                            <!-- 즐겨찾기 -->
                            <el-button @click="handleBmk" class="button-bmk" type="info" size="medium" plain>★</el-button>
                            <!-- 좋아요 -->
                            <el-button @click="handleLike" class="button-like" type="info" size="medium" plain>♥{{state.item.chglike}}</el-button>
                        </div>

                        <!-- 인증하기 -->
                        <div class="center" style="margin-top:-45px;">
                            <el-button class="button-blk" type="info" size="medium" plain @click="handleConfirm(state.item.jno)" >인증하기</el-button>
                        </div>
                    
                        <!-- 뒤로가기 -->
                        <div class="text-left" style="margin-top:-45px;">
                            <router-link to="/challenge">
                                <el-button class="button-wht" type="info" size="medium" plain>뒤로가기</el-button>
                            </router-link>
                        </div>
                    </div>
                </div>
                

                <!-- 아래부분 -->
                <div class="el-card" style="margin-top:60px;margin-bottom:60px;">
                    <!-- 소개 -->
                    <div style="margin-top:20px;">
                        <h3>
                            {{state.item.chgintro}}
                        </h3>
                    </div>

                    <!-- 내용 -->
                    <div style="margin-top:10px;">
                        {{state.item.chgcontent}}
                    </div>

                    <hr />

                    <div class="wrapper">

                        <div class="one">

                            <!-- 챌린지 기간 -->
                            <h4 class="text-left1" style="margin-left:30px;">챌린지 기간</h4>
                            <div class="text-left1" style="margin-left:30px;">
                                {{state.item.chgstart}} <br />- {{state.item.chgend}} 
                            </div><br />

                            <!-- 모집기간 -->
                            <h4 class="text-left1" style="margin-left:30px;">챌린지 달성률</h4>
                            <div class="text-left1" style="margin-left:30px;">
                                {{state.item.chgrate}} %
                            </div><br />
                        
                            <!-- 참가비 -->
                            <h4 class="text-left1" style="margin-left:30px;">참가비</h4>
                            <div class="text-left1" style="margin-left:30px;">
                                {{state.item.chgfee}}원 
                            </div><br />

                            <!-- 참여인원 -->
                            <h4 class="text-left1" style="margin-left:30px;">참여인원</h4>
                            <div class="text-left1" style="margin-left:30px;">
                                {{state.item.chgcnt}}명
                            </div><br />

                            <!-- 난이도 -->
                            <h4 class="text-left1" style="margin-left:30px;">챌린지 난이도</h4>
                            <div class="text-left1" style="margin-left:30px;">
                                {{state.item.chglevel}} 단계
                            </div><br />

                        </div>

                        <div class="two">

                            <h4 class="text-right1">루틴</h4><br />
                            <div>
                                <el-table class="el-table" :data="state.routines" style="width:370px;">
                                    <el-table-column prop="rtnday" label="요일" width="74" />
                                    <el-table-column prop="rtncnt" label="횟수" width="74" />
                                    <el-table-column prop="rtnset" label="세트" width="74" />
                                    <el-table-column prop="pname" label="자세" width="74" />
                                    <el-table-column prop="ppart" label="부위" width="74" />
                                </el-table>     
                            </div><br />
        
                            <h4 class="text-right1">인증글</h4><br />
                            <div>
                                <el-table class="el-table" :data="state.cfitems" style="width:370px;">
                                    <el-table-column prop="memail" label="작성자" width="120" />
                                    <el-table-column prop="cfsuccess" label="인증상태" width="120" />
                                    <el-table-column prop="ccregdate" label="등록일" width="120" />
                                </el-table>
                            </div>
                            
                        </div>
                    </div>

                </div>

                <div class="center">
                    <!-- 포기하기 -->
                    <div style="margin-top:10px;">
                        <el-button class="btn-give-up" type="info" size="medium" plain @click="handleGiveup">챌린지 포기</el-button>
                    </div>
                </div>

            </div>
        </div>


        <hr />
        <div v-if="state.item">
            <SuccessCfm 
                :chgno="state.chgno" 
                :cid="state.item.cid" 
                :jno="state.item.jno"
                :chgrate="state.item.chgrate">
            </SuccessCfm>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import SuccessCfm from '../Confirm/SuccessCfm.vue';

export default {
    components:{
        SuccessCfm,
    },

    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            chgno : route.query.chgno,
        });

        // 인증하기
        const handleConfirm = async(no)=> {
            // console.log("인증하기");
            router.push({name:'ConfirmInsert', query:{jno:no}});
        };
        
        // 첼린지 포기
        const handleGiveup = async()=> {
            // console.log("포기하기");
            // console.log(state.chgno);

            if (confirm("포기하시겠습니까?")) {
                const url = `/until15/api/join/giveup?chgno=${state.chgno}`;
                const headers = {
                    "Content-Type":"application/json",
                    "token" : state.token
                }
                const body = {};
                const response = await axios.put(url, body, {headers});
                // console.log("첼린지 포기 : ", response.data);
                if (response.data.status === 200) {
                    console.log("포기");
                    router.push({name:'JoinState'});
                }
            }
        };

        // 내가만든 첼린지 상세
        const handleData = async()=> {
            const url = `/until15/api/join/cidselectone?chgno=${state.chgno}`;
            const headers = {
                "Content-Type":"application/json",
                "token" : state.token
            };
            const response = await axios.get(url, {headers});
            console.log("내가 만든 첼린지 상세 : ", response.data);
            if (response.data.status === 200) {
                state.item = response.data.result
                state.thumnail = response.data.image

                
            }
        };

        // 좋아요
        const handleLike = async() => {
            // console.log(state.chgno);
            const url = `/until15/api/like/insert?chgno=${state.chgno}`;
            const headers = {
                "Content-Type" : "application/json",
                "token":state.token
            };
            const body = {chgno : state.chgno};
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                alert("이 챌린지를 좋아합니다 ! 이제 좋아하는 챌린지에서 확인 가능합니다.");
                state.chgno = response.data.chgno;
                // console.log(state.chgno);
                handleData(state.chgno);
            }
            // else if(response.data.status === 0) {
            //     const url = `/until15/api/like/delete?chgno=${state.chgno}&lno=${state.lno}`;
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

        // 즐겨찾기
        const handleBmk = async() => {
            console.log(state.chgno);
            const url = `/until15/api/bookmark/insert?chgno=${state.chgno}`;
            const headers = {
                "Content-Type" : "application/json",
                token:state.token
            };
            const body = {chgno : state.chgno};
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200) {
                alert("즐겨찾는 챌린지에 추가되었습니다.");
                state.chgno = response.data.chgno;
                console.log(state.chgno);
            }
            // else if(response.data.status === 0) {
            //     const url = `/until15/api/like/delete?chgno=${state.chgno}&lno=${state.lno}`;
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

        onMounted(()=> {
            handleData();
        });

        

        return {
            state,
            handleGiveup,
            handleConfirm,
            handleLike,
            handleBmk,
        
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

.button-wht {
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
}

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
}

.button-blk {
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
    width: 300px;
}

.btn-give-up {
    background-color: #ff5757;
    border: none;
    color: rgb(255, 255, 255);
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
    width: 300px;
}

.image {
    border-radius: 16px;
}

.input-size {
    width: 300px;
}

.text-right {
    justify-content : right;
    display: flex;


}

.text-right1 {
    margin-right: 30px;;
    justify-content : right;
    display: flex;
}

.text-left {
    display: flex;

}

.text-left1 {
    display: flex;
    justify-content : left;
}

.el-table {
    border-radius: 16px;
}

.el-card {
    text-align: center;
    background-color: rgb(231, 231, 231);
    border-radius: 16px;
    margin :0 auto;
    width: 800px;
}

.el-card1 {
    width: 400px;
}

.btn1 {
    text-align: center;
}
.btn {
    width: 800px;
    height: 100px;
}

.div1 {
    background-color: #ff5757;
    width: 370px;
    height: 100px;
    display: flex;
}

.div2 {
    background-color: rgb(244, 255, 87);
    width: 370px;
    display: flex;
    justify-content : right;
}

/* 그리드 */
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.one {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
}
.two {
  grid-column: 2 / 2;
  grid-row: 1 / 2;
}

.three {
  grid-column: 2 / 2;
  grid-row: 2 / 2;
}

.pro {
    background-color: #ffffff;
    border-radius: 16px;
    width: 370;

}
</style>