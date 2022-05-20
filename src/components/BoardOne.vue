<template>
    <div >
        <div align="center">
            <el-card style="width:1200px" >
            <h3>게시물 상세</h3>
                <div v-if="state.item">
                    <el-descriptions direction="horizontal" title="" :column="1" border>
                    <el-descriptions-item label="글번호" width="10px" label-align="center" align="center">
                        {{state.item.bno}}</el-descriptions-item>
                    <el-descriptions-item label="작성자" width="10px" label-align="center" align="center">
                        {{state.item.mid}}</el-descriptions-item>
                    <el-descriptions-item label="제목"  label-align="center" align="center">
                        {{state.item.btitle}}</el-descriptions-item>
                    <el-descriptions-item label="조회수"  label-align="center" align="center">
                        {{state.item.bhit}}</el-descriptions-item>
                        <el-descriptions-item label="등록일"  label-align="center" align="center">
                        {{state.item.bregdate}}</el-descriptions-item>
                    <el-descriptions-item label="내용" hight="20px" label-align="center" align="center">
                        {{state.item.bcontent}}<br />
                        {{state.image}}
                        <div class="center" v-for="tmp in state.image" :key="tmp">
                        <img :src="tmp" style="width:300px" /><br />
                    </div></el-descriptions-item>
                    </el-descriptions>

                        <img :src="state.imageUrl" style="width:80px" />
                        <input type="file" @change="handleImage($event)"  style="width:200px" />
                        <el-button type="info" size="small" plain @click="handleImageInsert">이미지등록</el-button>
                    <hr />
                    <div style="margin-right:900px;" >
                        <div class="float">
                            <el-button type="info" size="small" plain @click="handleBoard">목록</el-button>
                        </div>
                        <div v-if="state.iitems !== 0" class="float" style="margin-left:5px">
                         <el-button type="info"  size="small"  plain @click="handleNext">다음글</el-button>
                        </div>
                        <div v-if="state.iitem !== 0" class="float" style="margin-left:5px">
                            <el-button type="info"  size="small"  plain @click="handlePrev">이전글</el-button>
                        </div>
                    </div>
                     
                    <div v-if="state.member.memail === memail" style="margin-left:1040px">
                        <div class="float">
                            <el-button type="info" size="small" style="margin-right:5px" plain @click="handleUpdate">수정</el-button>
                        </div>
                        <div class="float">
                            <el-button type="info" size="small"  plain @click="handleDelete">삭제</el-button>
                        </div>
                    </div>
                    <br />
                    <div v-for="tmp in state.reply" :key="tmp" class="center">
                        <el-divider border-style="dotted" />
                        <span>{{tmp.memberchg.mid}}</span> : 
                        <span>{{tmp.cmtcontent}}</span>
                        <el-button type="info" size="small" style="margin-left:20px" plain @click="handleReplyDelete(tmp.cmtno)">삭제</el-button>
                    </div>  
                    <hr />
                    <el-form :inline="true" al="center">
                        <el-form-item  label="댓글" label-width="50px">
                            <el-input  size="medium" ref="cmtcontent" v-model="state.reply1.cmtcontent" placeholder="댓글"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="info" size="small" plain @click="handleComment">입력</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>


        <!-- <div v-if="state.item">
        번호 : {{state.item.bno}} <br />
        제목 : {{state.item.btitle}} <br />
        내용 : {{state.item.bcontent}} <br />
        작성자 : {{state.item.memail}} <br />
        조회수 : {{state.item.bhit}} <br />
        등록일 : {{state.item.bregdate}} <br />
       <div v-for="tmp in state.image" :key="tmp">
        <img :src="tmp" style="width:200px" />
       </div>
        </div> -->
       
        

        <!-- <router-link to="/board"><button>목록으로</button></router-link>
        <button @click="handleUpdate">수정</button>
        <button @click="handleDelete">삭제</button> -->
        
        <!-- <div v-for="tmp in state.reply" :key="tmp">
                <tr>
                    <th>작성자</th>
                    <td>{{tmp.memberchg.memail}}</td>
                    <th>내용</th>
                    <td>{{tmp.cmtcontent}}</td>
                    <td><button @click="handleReplyDelete(tmp.cmtno)">삭제</button></td>
                </tr>
        </div>
        <hr />
        댓글 : <input type="text" v-model="state.reply1.cmtcontent" />
        <button @click="handleComment">입력</button>
        </div>
         -->
    </div>
</template>

<script>
import { onMounted, computed, reactive, ref} from 'vue';
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

      

        const state = reactive({
            bno : route.query.bno,
            reply1 :{
                cmtcontent : '',
            },
            token : sessionStorage.getItem("TOKEN"),
            imageUrl : '',
        });

        const cmtcontent = ref(null);

        
        const handleData = async(bno) => {
            const url = `/ROOT/api/community/selectone?bno=${bno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                state.image = response.data.imgurl;
                state.member = response.data.useremail;
                state.iitem = response.data.prev1;
                state.iitems = response.data.next2;

                console.log("====================", state.iitem);
            }
        };

        const handleUpdate = async() => {
            router.push({name : "BoardUpdate", query:{bno:state.bno}});
            
        };

        const handleDelete = async() => {
            if(confirm('삭제하시겠습니까?')){
                const url = `/ROOT/api/community/delete?bno=${state.bno}`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const response = await axios.delete(url, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    router.push({name:"Board"});
                    alert('삭제되었습니다');
                }
                else{
                    alert('권한 없음');
                }
            }
        };

        const handleComment = async() => {
            if(state.reply1.cmtcontent === ''){
                alert('내용을 입력해주세요.');
                cmtcontent.value.focus();
                return false;
            }
            const url = `/ROOT/api/comment/insert`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const body = {
                cmtcontent : state.reply1.cmtcontent,
                communitychg :{bno : state.item.bno}
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                handleData(state.item.bno);
                handleSelectComment(state.item.bno);
                state.reply1.cmtcontent = '';
            }
            else{
                alert('로그인이 필요합니다.');
            }
        }

        const handleSelectComment = async(bno) => {
            const url = `/ROOT/api/comment/selectone?bno=${bno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.reply = response.data.result;
            }
        }

        const handleReplyDelete = async(cmtno) => {
            const url = `/ROOT/api/comment/delete?cmtno=${cmtno}`;
            const headers = {"Content-Type":"application/json","token":state.token};
            const response = await axios.delete(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                handleSelectComment(state.item.bno);
            }
            else{
                alert('권한 없음');
            }
            
        }

        const handleSelectImage = async(bno) => {
            const url = `/ROOT/api/bimg/selectimg?bno=${bno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log("============", response.data);
        };

        const handleImageInsert = async() => {
            const url = `/ROOT/api/bimg/insert`;
            const headers = {"Content-Type":"multipart/form-data","token":state.token};
            const body = new FormData();
            body.append("file", state.mimage);
            body.append("bno", state.bno);
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('등록되었습니다');
                handleData(state.item.bno);
                
            }

        };

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.mimage = e.target.files[0];
            }
            else{
                state.mimage = '';
            }
        }

         // 로그인 유저 이메일 정보 가져오기
        const memail = computed(() => {
            return store.getters.getMemail
        });

        const handleBoard = () => {
            router.push({name :"Board"});
        }

        const handlePrev = () => {
            router.push({name : "BoardOne", query :{bno : state.iitem.bno}});
            state.bno = state.iitem.bno;
            console.log("======================", state.bno);
            handleSelectComment(state.item.bno);
            handleData(state.bno);
        }

        const handleNext = () => {
            router.push({name : "BoardOne", query:{bno:state.iitems.bno}})
            state.bno = state.iitems.bno;
            console.log("======================", state.bno);
            handleSelectComment(state.item.bno);
            handleData(state.bno);
        }

        onMounted(() => {
            handleData(state.bno);
            handleSelectComment(state.bno); 
            
        });
        

        return {state,handlePrev, handleNext,  handleData, handleBoard, memail, handleUpdate, handleDelete, handleSelectComment, handleComment, handleSelectImage ,handleReplyDelete, handleImageInsert, handleImage}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}
.float{
    float: left;

}
</style>