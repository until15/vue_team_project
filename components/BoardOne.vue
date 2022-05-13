@@ -1,131 +0,0 @@
<template>
    <div>
        <h3>게시물 상세</h3>
        <div v-if="state.item">
        번호 : {{state.item.bno}} <br />
        제목 : {{state.item.btitle}} <br />
        내용 : {{state.item.bcontent}} <br />
        작성자 : {{state.item.memail}} <br />
        조회수 : {{state.item.bhit}} <br />
        등록일 : {{state.item.bregdate}} <br />
       <div v-for="tmp in state.image" :key="tmp">
        <img :src="tmp" style="width:200px" />
       </div>
       
        <img :src="state.imageUrl" style="width:100px" />
        <input type="file" @change="handleImage($event)" />
        <button @click="handleImageInsert">이미지등록</button>
        <hr />

        <router-link to="/board"><button>목록으로</button></router-link>
        <button @click="handleUpdate">수정</button>
        <button @click="handleDelete">삭제</button>
        
        <hr />
        <div v-for="tmp in state.reply" :key="tmp">
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
            bno : Number(route.query.bno),
            reply1 :{
                cmtcontent : '',
            },
            mimage : null,

            editable : false,
            token : sessionStorage.getItem("TOKEN"),
            imageUrl : require('../assets/img/default.png'),
        });

        
        const handleData = async(bno) => {
            const url = `/ROOT/api/community/selectone?bno=${bno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                state.image = response.data.imgurl;
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
                }
            }
        };

        const handleComment = async() => {
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
                handleData(state.item.bno);
            }

        };

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.mimage = e.target.files[0];
            }
            else{
                state.imageUrl = require('../assets/img/default.png');
                state.mimage = null;
            }
        }

        onMounted(() => {
            handleData(state.bno);
            handleSelectComment(state.bno); 
            
        });
        

        return {state, handleData, handleUpdate, handleDelete, handleSelectComment, handleComment, handleSelectImage ,handleReplyDelete, handleImageInsert, handleImage}
    }
}
</script>

<style lang="scss" scoped>

</style>