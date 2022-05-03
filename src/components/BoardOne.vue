<template>
    <div>
        <h3>게시물 상세</h3>
        <div v-if="state.item">
        제목 : {{state.item.btitle}} <br />
        내용 : {{state.item.bcontent}} <br />
        작성자 : {{state.item.memberchg.memail}} <br />
        조회수 : {{state.item.bhit}} <br />
        조회수 : {{state.item.bregdate}} <br />
        <hr />

        <router-link to="/board"><button>목록으로</button></router-link>
        <button @click="handleUpdate">수정</button>
        <button @click="handleDelete">삭제</button>
        <button v-if="state.item.prev" @click="handleData(1)">이전글</button>
        <button v-if="state.item.next" @click="handleData(2)">다음글</button>
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
            bno : route.query.bno,
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
                if(response.data.status === 200){
                    router.push({name:"Board"});
                }
            }
        };


        onMounted(() => {
            handleData(state.bno);
        });
        

        return {state, handleData, handleUpdate, handleDelete}
    }
}
</script>

<style lang="scss" scoped>

</style>