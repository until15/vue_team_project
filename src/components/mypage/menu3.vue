<template>
    <div>
        <h3>1:1문의</h3>
        <div v-if="state.items">
            <input type="text" v-model="state.items.btitle" @keyup.enter="handleData" placeholder="검색어" />
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
        </div>
        
        <button @click="handleInquiryWriter">글쓰기</button>

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
            token : sessionStorage.getItem("TOKEN")

        });

        const handleData = async() => {
            const url = `/ROOT/api/Inquiry/selectlistone`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.items = response.data.result;
            }
          
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


        

        return {state, handleInquiryWriter, handlePage}
    }
}
</script>

<style lang="scss" scoped>

</style>