<template>
    <div align="center">
        <!--  form-data : "chgtitle":"aaa", "chgintro" : "bbb", "chgcontent" : "ccc", "chglevel" : 1,
            "chgend" : yyyy-mm-dd 00:00:00, "recruitend" : yyyy-mm-dd 00:00:00, "chfee" : 10000 -->

        <!-- v-model="state.userid" ref="userid" -->  

        <el-card>
            <h3>챌린지 생성</h3>
            <hr />

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-10px">
                <el-form-item>
                    <el-input v-model="state.chgtitle" placeholder="챌린지 제목" style="width:400px"></el-input>
                     <!-- v-model="state.username" ref="username"  -->
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-10px">
                <el-form-item>
                    <el-input v-model="state.chgintro" placeholder="챌린지 소개" style="width:400px"></el-input>
                     <!-- v-model="state.username" ref="username"  -->
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-10px">
                <el-form-item>
                    <el-input v-model="state.chgcontent" type="textarea" placeholder="챌린지 내용" style="width:400px"></el-input>
                     <!-- v-model="state.username" ref="username"  -->
                </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-10px">
                <el-form-item>
                    <el-input-number v-model="state.chgfee" placeholder="참가비 설정" style="width:400px" />
              </el-form-item>
            </el-form>

            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-10px">
                <el-form-item>
                    <el-input-number v-model="state.chgcnt" placeholder="모집인원 설정" style="width:400px" />
              </el-form-item>
            </el-form>
            
            <!-- 모집기간 설정 (캘린더) -->
            <div class="demo-date-picker">

                <div class="block" style="margin-bottom:-10px">
                    <span class="demonstration"></span>
                    <el-date-picker
                        style="width:400px"
                        v-model="state.recruitend"
                        type="daterange"
                        range-separator="부터"
                        start-placeholder="모집 시작일"
                        end-placeholder="모집 마감일" />
                </div>
<!-- 
                <div class="block">
                    <span class="demonstration"></span>
                    <el-date-picker
                        v-model="state.recruitend"
                        type="date"
                        placeholder="모집 마감일"
                        style="width:400px"
                        :default-value="new Date()"
                    />
                </div> -->

                <div class="block" style="margin-bottom:-10px">
                    <span class="demonstration"></span>
                    <el-date-picker
                        v-model="state.chgstart"
                        type="date"
                        placeholder="챌린지 시작일"
                        style="width:400px"
                        :default-value="new Date()"
                    />
                </div>
            </div>

             


            <el-button type="info" style="width:400px" plain @click="handleInsert">생성하기</el-button>

        </el-card>


          

    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router';
export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            chgtitle   : '',
            chgintro   : '',
            chgcontent : '',
            chgfee     : '',
            chgcnt     : '',
            recruitend : '',
            chgstart   : '',
            //cimage     : null,
            //imageUrl   : require('../assets/img/default.png'),
            token      : sessionStorage.getItem("TOKEN")
        });

        const handleInsert = async() => {

            const url     = `/ROOT/api/challenge/insert`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const body    = {
                chgtitle   : state.chgtitle,
                chgintro   : state.chgintro,
                chgcontent : state.chgcontent,
                chgfee     : state.chgfee,
                chgcnt     : state.chgcnt,            
                recruitend : state.recruitend,
                chgstart   : state.chgstart
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('등록되었습니다!');
                router.push({name:"Challenge"});
                
            }
            
        };

        // 루틴 불러오기 
        /*const hadnleRoutine = async() => {
            const url     = ``;
            const headers = {"Content-Type":"application/json"};
            const body    = {};
            const response = await axios.get(url, body, {headers});
            console.log(response.data);
        }*/



        return {
            state, 
            handleInsert,
            //handelRoutine
        }
    }
}
</script>

<style lang="scss" scoped>

</style>