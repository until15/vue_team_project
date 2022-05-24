<template>
    <div align="center">
        <br />
        <h3>상세내용</h3>
        <el-card style="width:1200px">
            <div v-if="state.item" >
                <el-descriptions direction="horizontal" title="" :column="1" border>
                <el-descriptions-item label="등록일"  label-align="center" align="center">
                    {{state.item.qregdate}}</el-descriptions-item>
                <el-descriptions-item label="작성자" width="10px" label-align="center" align="center">
                    {{state.item.qno}}</el-descriptions-item>
                <el-descriptions-item label="제목"  label-align="center" align="center">
                    {{state.item.qtitle}}</el-descriptions-item>
                <el-descriptions-item label="내용" hight="20px" label-align="center" align="center">
                    {{state.item.qcontent}}
                <div class="center" v-for="tmp in state.image" :key="tmp">
                    <img :src="state.image[0]" style="width:300px" /><br />
                </div>
                    </el-descriptions-item>
                </el-descriptions>
                <hr />
                <el-button type="info" size="small" plain @click="handleMenu">목록</el-button>
                <el-button type="info" size="small" plain @click="handleDelete">삭제</el-button>

            </div>
        </el-card>



            <!-- 번호 : {{state.item.qno}}<br /><br />
            제목 : {{state.item.qtitle}}<br /><br />
            내용 : {{state.item.qcontent}}<br /><br />
            작성자 : {{state.item.memberchgMemail}}<br /><br />
            이미지 : <img :src="state.image[0]" style="width:200px" />
        <hr />
        <button @click="handleMenu">목록으로</button>
        <button @click="handleDelete">삭제</button> -->
        

        <hr />
        <div v-for="tmp in state.reply" :key="tmp">
            <el-descriptions title="답글" :column="1" border>
            <el-descriptions-item label="작성자" label-align="center" align="center" width="10px">{{tmp.memberchg.mid}}</el-descriptions-item>
            <el-descriptions-item label="내용" label-align="center" align="center">{{tmp.iqcontent}}</el-descriptions-item>
            <el-descriptions-item label="버튼" label-align="center" align="center">
                <el-button type="info" size="small" plain @click="handleReplyDelete(tmp.iqcmtno)">삭제</el-button>
                </el-descriptions-item>
            </el-descriptions>
        <hr />
        </div>
                <!-- <tr>
                    <th>작성자</th>
                    <td>{{tmp.memberchg.memail}}</td>
                    <th>내용</th>
                    <td>{{tmp.iqcontent}}</td>
                    <td><button @click="handleReplyDelete(tmp.iqcmtno)">삭제</button></td>
                </tr> -->


        <el-form :inline="true" class="center">
                <el-form-item  label="댓글" label-width="50px">
                    <el-input  size="medium" v-model="state.reply1.iqcontent" placeholder="댓글"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" size="small" plain @click="handleComment">입력</el-button>
                </el-form-item>
            </el-form>
        <!-- 댓글 : <input type="text" v-model="state.reply1.iqcontent" />
        <button @click="handleComment">입력</button> -->

        
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';
export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

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
                const url1 = `/ROOT/api/Inquiry/updatecom?qno=${state.qno}`;
                const headers1 = {"Content-Type":"application/json"};
                const response1 = await axios.put(url1, {headers:headers1});
                console.log(response1.data);


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
            const url1 = `/ROOT/api/Inquiry/updatetwo?qno=${state.qno}`;
                const headers1 = {"Content-Type":"application/json"};
                const response1 = await axios.put(url1, {headers:headers1});
                console.log(response1.data);
            if(response1.data.status === 200){

                const url = `/ROOT/api/Iqcomment/delete?iqcmtno=${iqcmtno}`;
                const headers = {"Content-Type":"application/json","token":state.token};
                const response = await axios.delete(url, {headers});
                console.log(response.data);
                handleSelectComment(state.item.qno);
            }
        }

        const handleMenu = () => {
            router.push({name : "menu3"})
        };

        const handleDelete = async() => {
            if(confirm('정말 삭제하시겠습니까?')){
                const url = `/ROOT/api/Inquiry/delete?qno=${state.qno}`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const response = await axios.delete(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    router.push({name : "menu3"})
                }
            }
        };

        onMounted(() =>{
            handleData(state.qno);
            handleSelectComment(state.qno);
         
        });

        

        
        

        return {state, handleComment, handleReplyDelete, handleMenu, handleDelete}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}
</style>