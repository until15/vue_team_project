<template>
    <div align="center">
        <br />
        <h3>상세내용</h3>
        <!-- 상세내용 -->
        <el-card style="width:1200px">
            <div v-if="state.item" >
                <el-descriptions direction="horizontal" title="" :column="1" border>
                <el-descriptions-item label="등록일"  label-align="center" align="center">
                    {{state.item.qregdate}}</el-descriptions-item>
                <el-descriptions-item label="작성자" width="10px" label-align="center" align="center">
                    {{state.item.mid}}</el-descriptions-item>
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
        <br />

        <!-- 답글 보이기 -->
        <div v-for="tmp in state.reply" :key="tmp">
        <el-collapse>
            <el-collapse-item style="margin-left:100px;"  title="문의답변" name="1">
                <div style="margin-right:100px;">
                    {{tmp.iqcontent}}
                </div>
                <div style="margin-left:1000px;" v-if="tmp.memberchg.mrole === 'admin'">
                    <el-button type="info" size="small" plain @click="handleReplyDelete(tmp.iqcmtno)">삭제</el-button>
                </div>           
            </el-collapse-item>
        </el-collapse>
        </div>
        
            <!-- 댓글 등록 -->
            <div v-if="state.item">
                <el-form :inline="true" class="center" v-if="state.item.mrole === 'admin'">
                    <el-form-item  label="댓글" label-width="50px">
                        <el-input  size="medium" v-model="state.reply1.iqcontent" placeholder="댓글"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="info" size="small" plain @click="handleComment">입력</el-button>
                    </el-form-item>
                </el-form>
            </div>    
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

        // 데이터 불러오기
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

        // 댓글 쓰기(댓글 등록시 com 숫자 +1)
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

                state.reply1.iqcontent = '';
                state.reply = response.data.result;
                handleData(state.item.qno);
                handleSelectComment(state.item.qno);
            }
        }

        // 댓글 불러오기
        const handleSelectComment = async(qno) => {
            const url = `/ROOT/api/Iqcomment/selectone?qno=${qno}`;
            const headers = {"Content-Type":"application/json","token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.reply = response.data.result;
            }
        }

        // 댓글 삭제(댓글 삭제시 com 숫자 -1)
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

        // 뒤로가기
        const handleMenu = () => {
            router.push({name : "Admin"})
        };

        // 상세글 삭제
        const handleDelete = async() => {
            if(confirm('정말 삭제하시겠습니까?')){
                const url = `/ROOT/api/Inquiry/delete?qno=${state.qno}`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const response = await axios.delete(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    router.push({name : "Admin2"})
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