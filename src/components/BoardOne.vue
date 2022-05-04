@@ -1,131 +0,0 @@
<template>
    <div>
        <h3>게시물 상세</h3>
        <div v-if="state.item">
        번호 : {{state.item.bno}} <br />
        제목 : {{state.item.btitle}} <br />
        내용 : {{state.item.bcontent}} <br />
        작성자 : {{state.item.memberchg.memail}} <br />
        조회수 : {{state.item.bhit}} <br />
        등록일 : {{state.item.bregdate}} <br />
        이미지 : <img :src="state.item.imageurl" style="width:100px" /> <br />
        <hr />

        <router-link to="/board"><button>목록으로</button></router-link>
        <button @click="handleUpdate">수정</button>
        <button @click="handleDelete">삭제</button>
        
        <hr />
        <div v-for="tmp in state.reply" :key="tmp">
            <table border="1">
                <tr>

                    <th>작성자</th>
                    <td>{{tmp.memberchg.memail}}</td>
                    <th>내용</th>
                    <td>{{tmp.cmtcontent}}</td>
                    <td><button @click="handleReplyDelete(tmp.cmtno)">삭제</button></td>
                </tr>
            </table>
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
            imageUrl : require('../assets/img/default.png'),
            token : sessionStorage.getItem("TOKEN") 
        });

        
        const handleData = async(bno) => {
            const url = `/ROOT/api/community/selectone?bno=${bno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
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
                if(response === 200){
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

        onMounted(() => {
            handleData(state.bno);
            handleSelectComment(state.bno); 
            
        });
        

        return {state, handleData, handleUpdate, handleDelete, handleSelectComment, handleComment ,handleReplyDelete}
    }
}
</script>

<style lang="scss" scoped>

</style>