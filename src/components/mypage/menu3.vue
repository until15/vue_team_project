<template>
    <div class="center">
        <div>
            <!-- 타이틀 -->
            <div>
                <h3 style="margin-top:100px;">1:1 문의</h3>
            </div>
            
            <!-- 버튼 -->
            <div>
                <el-button class="button-blk1" type="info" @click="handleMenu1">정보 수정</el-button>
                <el-button class="button-blk1" type="info" @click="handleMenu3">1:1 문의</el-button>
                <el-button class="button-blk1" type="info"   @click="handleMenu2">회원 탈퇴</el-button>
            </div>

            <!-- 검색창 -->
            <el-form :inline="true" v-if="state.items" style="margin-top:60px;" >
                <el-form-item>
                    <el-input style="width:200px;" type="text" size="mini" v-model="state.qtitle" placeholder="검색어를 입력하세요." @keydown.prevent.enter="handleData" />
                </el-form-item>
                <el-form-item>
                    <el-button type="info" plain size="mini" style="margin-left:5px;" @click="handleData" >검색</el-button>
                </el-form-item>
            </el-form>

            <div style="margin-top:10px;">
                <el-table :data="state.items">
                    <el-table-column prop="qno" label="번호" width="60" />
                    <el-table-column prop="qtitle" label="제목"  width="230" >
                        <template #default="scope">
                            <div @click="handlePage(scope.row.qno)" style="cursor:pointer;">
                                {{scope.row.qtitle}}
                            </div> 
                        </template>
                    </el-table-column>
                    <el-table-column prop="mid" label="작성자" width="130" />
                    <el-table-column prop="qregdate" label="날짜" width="100" />
                    <el-table-column prop="com" label="처리현황" width="100" />
                </el-table>

                <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentchange">
                </el-pagination>
            </div>
            
            <!-- 글쓰기 버튼 -->
            <div>
                <el-button class="button-blk1" style="margin-top:20px;margin-bottom:60px;" type="info" plain @click="handleInquiryWriter">글쓰기</el-button><br /><br />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import {useRouter} from 'vue-router';

import axios from 'axios';
export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            qtitle : '',
            page : 1,
            total : 0,
            items : [
                {com : []},
            ]
        });

        // 데이터 불러오기(목록)
        const handleData = async() => {
            const url = `/ROOT/api/Inquiry/selectlist??page=${state.page}&qtitle=${state.qtitle}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items = response.data.result;
                state.total = response.data.total;

                let com = []; 
                for(let tmp of response.data.result){
                   com.push(tmp.com);
                  
                   if(tmp.com === 0){
                       tmp.com = '처리중';
                   }
                   else if(tmp.com >= 1){
                       tmp.com = '답변완료';
                   }
                   else{
                       tmp.com = '처리중';
                   }
               }
            }
        }

        const currentchange = (page) => {
            state.page = page;
            handleData();
        }

        onMounted(() => {
            handleData();

        });

        // 글쓰기 이동
        const handleInquiryWriter = () => {
            router.push({name : "Inquiry"});
        }

        const handlePage = (qno) => {
            router.push({name:"InquiryOne", query:{qno:qno}});
        }

        const handleMenu1 = () => {
            router.push({name : "menu1"});
        }

         const handleMenu2 = () => {
            router.push({name : "menu2"});
        }

         const handleMenu3 = () => {
            router.push({name : "menu3"});
        }

        return {state, handleInquiryWriter, handleData, currentchange, handlePage, handleMenu1, handleMenu2, handleMenu3}
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
}

.center{
  text-align: center;
}

</style>