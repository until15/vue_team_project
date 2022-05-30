<template>
    <div align="center">
        {{state.no}}
        <el-card>
            <h3>챌린지 생성</h3>
            <div style="display:none">
                {{currentTime()}} :D
            </div>
            <el-form :inline="true" style="margin:50px auto;" >
                
                <!-- 제목 -->
                <el-form-item label="제목" label-width="80px">
                    <el-input type="text" style="width:350px" ref="chgtitle" v-model="state.chgtitle" placeholder="제목을 입력하세요." />
                </el-form-item><br />

                <!-- 소개 -->
                <el-form-item  label="소개" label-width="80px">
                    <el-input type="text" style="width:350px" ref="chgintro" v-model="state.chgintro" placeholder="소개를 입력하세요." />
                </el-form-item><br />

                <!-- 내용 -->
                <el-form-item  label="내용" label-width="80px">
                    <el-input type="textarea" style="width:350px" ref="chgcontent" v-model="state.chgcontent" placeholder="내용 입력하세요." />
                </el-form-item><br />   

                <!-- 모집 기간 -->
                <el-form-item  label="모집 기간" label-width="80px">
                    <el-input type="text" style="width:152px" v-model="state.currenttime" readonly />
                </el-form-item>
                <el-form-item  label="부터" label-width="37px">
                    <el-date-picker 
                        style="width:152px" ref="recruitend" 
                        format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                        v-model="state.recruitend" type="date" placeholder="모집 마감일" :disabled-date="disabledDate" />     
                </el-form-item><br />
                
                <!-- 챌린지 기간 -->
                <el-form-item  label="챌린지 기간" label-width="80px">
                    <el-input type="text" style="width:152px" v-model="state.recruitend" readonly />
                </el-form-item>
                <el-form-item  label="부터" label-width="37px">
                    <el-date-picker 
                    style="width:152px" ref="chgend" 
                    format="YYYY-MM-DD" value-format="YYYY-MM-DD"
                    v-model="state.chgend" type="date" placeholder="챌린지 종료일" :disabled-date="disabledDate" />     
                </el-form-item><br />
                
                <!-- 참가비 -->
                <el-form-item  label="참가비" label-width="80px">
                    <el-input type="number" style="width:152px" ref="chgfee" step="500" min="5000" max="15000" v-model="state.chgfee" placeholder="참가비를 설정해주세요." @change="handleNumber" />
                </el-form-item>

                <!-- 참가인원 -->
                <el-form-item  label="참가인원" label-width="60px">
                    <el-input type="number" style="width:130px" ref="chgcnt" v-model="state.chgcnt" placeholder="참가인원을 설정해주세요." />
                </el-form-item><br />

                <!-- 루틴 설정 다이어로그 -->
                <el-form-item style="margin-left:80px;">
                    <el-button type="info" plain @click="dialogTableVisible = true" style="width:350px">루틴 생성</el-button>
                    <el-dialog v-model="dialogTableVisible" title="루틴 생성"  center>
                        <RoutineInsert></RoutineInsert>
                    </el-dialog>    
                </el-form-item><br />

                <!-- 루틴 불러오기 다이어로그 -->
                <el-form-item  label="루틴불러오기" label-width="80px">
                    <el-input type="number" style="width:150px" ref="chgroutine" v-model="state.chgroutine" placeholder="루틴번호." readonly />
                </el-form-item>
                <el-form-item  label="" label-width="70px">
                    <el-button type="info" plain @click="state.dialogTableVisible1 = true" style="width:190px">루틴 불러오기</el-button>
                    <el-dialog v-model="state.dialogTableVisible1" title="루틴 불러오기" center>
                        <RoutineSelect></RoutineSelect>
                    </el-dialog>     
                </el-form-item><br />

                <!-- 챌린지 등록 -->
                <el-form-item style="margin-left:80px;">
                    <el-button type="info" plain @click="handleInsert" style="width:350px">챌린지 등록</el-button>
                </el-form-item><br />

                <!-- 이미지 -->
                <img :src="state.imageUrl" style="width:300px" /><br />
        이미지 : <input type="file" @change="handleImage($event)" /><br />



                <!-- 목록으로 -->
                <el-form-item style="margin-left:80px;">
                    <el-button @click="handleBack" style="width:350px">목록으로</el-button>
                </el-form-item><br />

            </el-form>
        </el-card>
        <!-- 제목 : <input type="text" ref="chgtitle" v-model="state.chgtitle" /><br />
        소개 : <input type="text" ref="chgintro" v-model="state.chgintro" /><br />
        내용 : <textarea rows="10" ref="chgcontent" v-model="state.chgcontent"></textarea><br />
        모집 마감일 : <input type="date" ref="recruitend" v-model="state.recruitend" /><br />
        챌린지 종료일 : <input type="date" ref="chgend" v-model="state.chgend" /><br />
        참가비 : <input type="number" ref="chgfee" v-model="state.chgfee" /><br />
        참가인원 : <input type="number" ref="chgcnt" v-model="state.chgcnt" /><br />
        <button @click="handleRoutine">루틴 추가</button> 

        <hr />
        <img :src="state.imageUrl" style="width:300px" /><br />
        이미지 : <input type="file" @change="handleImage($event)" /><br />
        <button @click="handleInsert">등록하기</button>
        <button @click="handleBack">돌아가기</button> -->
    </div>
</template>

<script>
import RoutineInsert from '@/components/Routine/RoutineInsert.vue';
import RoutineSelect from '@/components/Routine/RoutineSelect.vue';

import { useStore } from "vuex";
import { computed, reactive, ref } from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router';
import {useRoute} from 'vue-router';

export default {

    components : {
        RoutineInsert,
        RoutineSelect
    },

    setup () {

        const store = useStore();
        const router = useRouter();
        const route = useRoute();

        // index.js/state.routine 값 가져오기
        const routine = computed(() => store.getters.getRoutine);

        console.log(routine);

        const state = reactive({
            no : route.query.rtnno,
            chgtitle   : '',
            chgintro   : '',
            chgcontent : '',
            recruitend : '',
            chgend     : '',
            chgfee     : 5000,
            chgcnt     : 1,
            chgroutine : routine, // 가져온 index.js/state.routine 값 넣기
            cimage     : null,
            currenttime : '',
            dialogTableVisible1 : false,
            //imageUrl   : require('../assets/img/default.png'),
            token      : sessionStorage.getItem("TOKEN")
        });


        const chgtitle   = ref(null);
        const chgintro   = ref(null);
        const chgcontent = ref(null);
        const recruitend = ref(null);
        const chgend     = ref(null);
        const chgfee     = ref(null);
        const chgcnt     = ref(null);
        const chgroutine = ref(null);
        const dialogTableVisible = ref(false);
        const dialogTableVisible1 = ref(false);

        const handleInsert = async() => {
            if(state.chgtitle === ''){
                alert('제목을 입력해주세요.');
                chgtitle.value.focus();
                return false;
            }
            
            if(state.chgintro === ''){
                alert('소개를 입력해주세요.');
                chgintro.value.focus();
                return false;
            }

            if(state.chgcontent === ''){
                alert('내용을 입력해주세요.');
                chgcontent.value.focus();
                return false;
            }

            if(state.recruitend === ''){
                alert('모집 마감일을 입력해주세요.');
                recruitend.value.focus();
                return false;
            }

            if(state.chgend === ''){
                alert('챌린지 종료일을 입력해주세요.');
                chgend.value.focus();
                return false;
            }

            if(state.chgfee === ''){
                alert('참가비를 설정해주세요.');
                chgfee.value.focus();
                return false;
            }

            if(state.chgfee > 15000){
                alert('참가비는 15000원을 넘을 수 없습니다.');
                chgfee.value.focus();
                state.chgfee = 15000;
                return false;
            }

             if(state.chgfee < 5000){
                alert('참가는 5000원부터 가능합니다.');
                chgfee.value.focus();
                state.chgfee = 5000;
                return false;
            }

            if(state.chgcnt === ''){
                alert('참여인원을 설정해주세요.');
                chgcnt.value.focus();
                return false;
            }

            if(state.chgroutine === ''){
                alert('루틴을 불러와주세요.');
                chgcnt.value.focus();
                return false;
            }

            if(state.token !== null){
                const url = `/ROOT/api/challenge/insert`;
                const headers = {"Content-Type":"multipart/form-data", "token":state.token};
                const body = new FormData();

                body.append("chgtitle", state.chgtitle);
                body.append("chgintro", state.chgintro);
                body.append("chgcontent", state.chgcontent);
                body.append("recruitend1", state.recruitend);
                body.append("chgend1", state.chgend);
                body.append("chgfee", state.chgfee);
                body.append("chgcnt", state.chgcnt);
                body.append("chgroutine", state.chgroutine);
                body.append("cimage", state.cimage);

                console.log(typeof state.recruitend);
                const response = await axios.post(url, body, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('등록되었습니다!');
                    router.push({name:"Challenge"});
                }
            } 
        };

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.cimage = e.target.files[0];
            }
            else{
                //state.imageUrl = require('../assets/img/default.png');
                state.cimage = null;
            }
        }

        // 실시간 시간 : 챌린지 생성일 = 모집 시작일
        const currentTime = () => {
            const current = new Date();
            const date = current.getFullYear()+'-'+(current.getMonth()+1)+'-'+current.getDate();
            //const time = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
            //const dateTime = date;
            state.currenttime = date; //+' '+ time;
            return date;
        }

        const handleBack = () => {
            router.push({name : "Challenge"});
        }

        // 생년월일 오늘 넘지않기 element plus
        const disabledDate = (time) => {
        return time.getTime() < Date.now();
        }

        const handleNumber = () => {
            if(state.chgfee >= 15000){
                state.chgfee = 15000;
            }

            if(state.chgfee < 5000){
                state.chgfee = 5000;
            }
        }

      


        return {
            state,  
            chgtitle,
            chgintro,
            chgcontent,
            recruitend,
            chgend,
            chgfee,
            chgcnt,
            chgroutine,
            handleInsert,
            handleImage,
            handleBack,
            currentTime,
            dialogTableVisible,
            dialogTableVisible1,
            routine,
            disabledDate,
            handleNumber
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
