<template>
    <div align="center">
        <h1>마이페이지</h1>
            <el-button @click="handleMenu1">정보수정</el-button>
            <el-button @click="handleMenu3">1:1문의</el-button>
            <el-button @click="handleMenu2">회원탈퇴</el-button>
            <br /><br />
        <el-card>
        <h3>1:1문의</h3>
        <hr />
            <el-table :data="state.items">
                <el-table-column prop="qno" label="번호" width="60" />
                <el-table-column prop="qtitle" label="제목"  width="250" >
            <template #default="scope">
                <div @click="handlePage(scope.row.qno)" style="cursor:pointer;">
                    {{scope.row.qtitle}}
                </div> 
            </template>
                </el-table-column>
                <el-table-column prop="memberchg.memail" label="작성자" width="100" />
                <el-table-column prop="qregdate" label="날짜" width="250" />
            </el-table>

            <el-pagination layout="prev, pager, next" :total="state.total" @current-change="currentchange">
            </el-pagination>
        </el-card>
        <el-form :inline="true" v-if="state.items" style="margin-top:20px;" >
            <el-form-item>
                <el-input type="text" size="mini" v-model="state.qtitle" placeholder="검색어 입력" @keydown.prevent.enter="handleData" />
            </el-form-item>
            <el-form-item>
                <el-button type="info" plain size="mini" style="margin-left:5px;" @click="handleData" >검색</el-button>
            </el-form-item>
        </el-form>
        <el-button type="info" plain @click="handleInquiryWriter">글쓰기</el-button>

    </div>

        <!-- <div v-if="state.items">
            <input type="text" v-model="state.items.title" @keyup.enter="handleData" placeholder="검색어" />
            <button @click="handleData">검색</button>
            <table border="1">
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>날짜</th>
                        <th>처리현황</th>
                    </tr>
                    <tr v-for="tmp in state.items" :key="tmp">
                        <td>{{tmp.qno}}</td>
                        <td @click="handlePage(tmp.qno)" style="cursor:pointer">{{tmp.qtitle}}</td>
                        <td>{{tmp.memberchgMemail}}</td>
                        <td>{{tmp.qregdate}}</td>
                        <td>처리중</td>
                    </tr>
            </table>
        <button @click="handleInquiryWriter">글쓰기</button>
        </div> -->
        

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

        });

        const handleData = async() => {
            const url = `/ROOT/api/Inquiry/selectlist??page=${state.page}&qtitle=${state.qtitle}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items = response.data.result;
                state.total = response.data.total;
            }
          
        }

        const currentchange = (page) => {
            state.page = page;
            handleData();
        }

        onMounted(() => {
            handleData();
        });

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
.center{
  text-align: center;
}

</style>