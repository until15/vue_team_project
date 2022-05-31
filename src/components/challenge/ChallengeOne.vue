<template>

    <div>
        <div v-if="state.item">

            <!-- 이미지 -->
            <div class="center">
                <img :src="state.image" class="image" style="width:800px;height:500px;margin-top:100px" /> <br />
            </div>
            
            <!-- 제목 -->
            <div class="center" style="margin-top:60px;">
                <h1>{{state.item.chgtitle}}</h1>
            </div>
            
            <!-- 버튼 -->
            <div class="text-right" style="margin-top:40px;">
                <!-- 즐겨찾기 -->
                <el-button class="button-bmk" type="info" size="medium" plain>★</el-button>
                <!-- 좋아요 -->
                <el-button @click="handleLike" class="button-like" type="info" size="medium" plain>♥{{state.item.chglike}}</el-button>
            </div>

            <!-- 참가하기 -->
            <div class="center" style="margin-top:-45px;">
                <el-button class="button-blk" type="info" size="medium" plain @click="handleJoin">참가하기</el-button>
            </div>
            
            <!-- 뒤로가기 -->
            <div class="text-left" style="margin-top:-45px;">
                <router-link to="/challenge">
                    <el-button class="button-wht" type="info" size="medium" plain>뒤로가기</el-button>
                </router-link>
            </div>

            <div align="center" class="el-card" style="margin-top:60px;margin-bottom:60px;">
                <!-- 소개 -->
                <div class="center" style="margin-top:20px;">
                    <h3>
                        {{state.item.chgintro}}
                    </h3>
                </div>

                <!-- 내용 -->
                <div class="el-card1" style="margin-top:10px;">
                    {{state.item.chgcontent}}
                </div>

                <hr />

                <div style="margin-top:20px;">
                    <!-- 루틴 -->
                    <h4 class="text-right1" style="margin-right:30px;">루틴</h4>
                    <div class="text-right1" style="margin-right:30px;">
                        <el-table class="el-table" :data="state.routines" style="width:370px; " >
                            <el-table-column prop="rtnday" label="요일" width="74" />
                            <el-table-column prop="rtncnt" label="횟수" width="74" />
                            <el-table-column prop="rtnset" label="세트" width="74" />
                            <el-table-column prop="pname" label="자세" width="74" />
                            <el-table-column prop="ppart" label="부위" width="74" />
                        </el-table>  
                    </div><br />

                    <!-- 모집기간 -->
                    <h4 class="text-left1" style="margin-left:30px;margin-top:-250px;">모집 기간</h4>
                    <div class="text-left1" style="margin-left:30px;">
                        {{state.item.recruitstart}} - {{state.item.recruitend}} 
                    </div><br />

                    <!-- 챌린지 기간 -->
                    <h4 class="text-left1" style="margin-left:30px;">챌린지 기간</h4>
                    <div class="text-left1" style="margin-left:30px;">
                        {{state.item.chgstart}} - {{state.item.chgend}} 
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

        
            </div>


        </div>
    </div>

</template>

<script>
import { onMounted, reactive} from 'vue';
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';
import axios from 'axios';

export default {
    
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            chgno : route.query.chgno,

            token : sessionStorage.getItem("TOKEN"),        
        });
        
        // 첼린지 조회
        const handleData = async(no) => {
            console.log("챌린지 번호 : " + no);
            const url = `/ROOT/api/challenge/selectone?chgno=${no}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                state.image = response.data.image;

                const url2 = `/ROOT/api/routine/chgselectone.json?no=${state.item.chgroutine}`;
                const headers2 = {"Content-Type":"application/json"};
                const response2 = await axios.get(url2, { headers: headers2 });
                console.log(response2.data);
                if(response2.data.status === 200){
                    state.routineseq = response2.data.result;
                    const url1 = `/ROOT/api/routine/chgselectseq.json?no=${state.routineseq.rtnseq}`;
                    const headers1 = {"Content-Type":"application/json"};
                    const response1 = await axios.get(url1, { headers: headers1 });
                    console.log(response1.data);
                    if(response1.data.status === 200){
                        state.routines = response1.data.result;
                    }
                }
            }
        };

        // 첼린지 참가하기
        const handleJoin = async()=> {
            // console.log("참가하기");
            // console.log("첼린지 번호 : ", state.chgno);
            // console.log("토큰 : ", state.token);
            const url = `/ROOT/api/join/insert?chgno=${state.chgno}`;
            const headers = {
                "Content-Type":"application/json",
                "token":state.token
            }
            const body ={};
            const response = await axios.post(url, body, {headers});
            console.log("참가하기 결과 : ", response.data);
            if (response.data.status === 200) {
                alert("참가 완료");
                router.push({name:'Pay', query:{ jno:response.data.result}});
            }
            else if(response.data.status !== 200) {
                alert("아직 등급이 낮습니다 !");
            }
        }

        // 좋아요
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
                alert("이 챌린지를 좋아합니다 !");
                state.chgno = response.data.chgno;
                console.log(state.chgno);
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

        onMounted(() => {
            handleData(state.chgno);
        });

        return {
            state,
            handleData,
            handleJoin,
            handleLike
        }
    }
}
</script>

<style lang="css" scoped>


.center{
  text-align: center;
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

.image {
    border-radius: 16px;
}

.input-size {
    width: 300px;
}

.text-right {
    justify-content : right;
    display: flex;
    margin-right: 248px;
}

.text-right1 {
    justify-content : right;
    display: flex;
}

.text-left {
    display: flex;
    margin-left: 248px; 
}

.text-left1 {
    display: flex;
    justify-content : left;
}

.el-table {
    border-radius: 16px;
}

.el-card {
    background-color: rgb(231, 231, 231);
    border-radius: 16px;
    margin-left: 248px;
    width: 800px;
}

.el-card1 {

    width: 400px;
    
}
/* 하트 */



</style>