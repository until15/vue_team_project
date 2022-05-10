<template>
    <div>
        <h3>상세내용</h3>
        <div v-if="state.item" style="padding:20px">
            번호 : {{state.item.qno}}<br /><br />
            제목 : {{state.item.qtitle}}<br /><br />
            내용 : {{state.item.qcontent}}<br /><br />
            작성자 : {{state.item.memberchgMemail}}<br /><br />
            이미지 : <img :src="state.image[0]" style="width:200px" />
        </div>

        <hr />
        <div v-for="tmp in state.reply" :key="tmp">
                <tr>
                    <th>작성자</th>
                    <td>{{tmp.memberchg.memail}}</td>
                    <th>내용</th>
                    <td>{{tmp.iqcontent}}</td>
                    <td><button @click="handleReplyDelete(tmp.iqcmtno)">삭제</button></td>
                </tr>
        </div>

        <hr />
        댓글 : <input type="text" v-model="state.reply1.iqcontent" />
        <button @click="handleComment">입력</button>

        
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import {useRoute} from 'vue-router';
export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            qno : Number(route.query.qno),
            token : sessionStorage.getItem("TOKEN"),
            reply1 :{
                iqcontent : '',
            },
            editable : false,
        });

        const handleData = async(qno) => {
            const url = `/ROOT/api/Inquiry/selectone?qno=${qno}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                state.image = response.data.imgurl;
            }
        }

        const handleComment = async() => {
            const url = `/ROOT/api/Iqcomment/insert`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const body = {
                iqcontent : state.reply1. iqcontent ,
                inquirychg :{qno : state.item.qno}
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.reply = response.data.result;
                handleData(state.item.qno);
                handleSelectComment(state.item.qno);
            }
        }

        const handleSelectComment = async(qno) => {
            const url = `/ROOT/api/Iqcomment/selectone?qno=${qno}`;
            const headers = {"Content-Type":"application/json","token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.reply = response.data.result;
            }
        }

        const handleReplyDelete = async(iqcmtno) => {
            const url = `/ROOT/api/Iqcomment/delete?iqcmtno=${iqcmtno}`;
            const headers = {"Content-Type":"application/json","token":state.token};
            const response = await axios.delete(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                handleSelectComment(state.item.qno);
            }
        }


        onMounted(() =>{
            handleData(state.qno);
            handleSelectComment(state.qno);
         
        });

        

        
        

        return {state, handleComment, handleReplyDelete}
    }
}
</script>

<style lang="scss" scoped>

</style>