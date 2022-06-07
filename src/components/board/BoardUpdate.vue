@@ -1,65 +0,0 @@
<template>
    <div align="center">
        <!-- 게시물 수정화면 -->
        <el-card style="width:1200px">
            <h3>게시물 수정</h3>
            <div v-if="state.item" >
            <el-form >
                <el-form-item  label="제목" label-width="40px">
                    <el-input  size="medium" ref="memail" v-model="state.item.btitle" />
                </el-form-item>
            </el-form>
            
            <el-form >
                <el-form-item  label="내용" label-width="40px">
                    <el-input v-model="state.item.bcontent" :rows="10" type="textarea" />
                    <div v-for="(tmp, idx) in state.image" :key="tmp">
                        <img :src="state.image[idx]" style="width:200px;margin-top:20px" /><br />
                        <div style="margin-left:300px;margin-top:-60px">
                            <el-button type="info" plain @click="handleDeleteImg(tmp)">삭제</el-button> 
                        </div>
                    </div>
                </el-form-item>
            </el-form>
            </div>
            <br />

            <el-button type="info" plain @click="handleUpdate">수정하기</el-button> 
            <el-button type="info" plain @click="handleBack">돌아가기</el-button> <br /><br />

            <!-- 옛날꺼 -->
            <div>
                <!-- <div v-if="state.item">
                {{state.item.bno}}<br />
                제목 : <input type="text" v-model="state.item.btitle" /><br />
                내용 : <input type="text" v-model="state.item.bcontent" /><br />
                <div v-for="(tmp, idx) in state.image" :key="tmp">
                    <img :src="state.image[idx]" style="width:200px" />
                    <input type="file" @change="handleImage($event, idx)"/>
                    <button @click="handleUpdateImg(tmp)">수정</button>
                    <button @click="handleDeleteImg(tmp)">삭제</button>
                </div>

                <button @click="handleUpdate">수정하기</button>
                <button @click="handleBack">돌아가기</button>
                </div> -->
            </div>
        </el-card>
        <br />
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import {useRoute} from 'vue-router';
import {useRouter} from 'vue-router';
import axios from 'axios';
import { onMounted } from '@vue/runtime-core';
export default {
    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            bno : route.query.bno,
            token : sessionStorage.getItem("TOKEN"),
        });

        // 데이터 불러오기
        const handleData = async(bno) => {
            const url = `/until15/api/community/selectone?bno=${bno}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
                state.image = response.data.imgurl;
            }
        };

        // 수정버튼
        const handleUpdate = async() => {
            const url = `/until15/api/community/update?bno=${state.bno}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const body = {
                btitle : state.item.btitle,
                bcontent : state.item.bcontent
            }
            const response = await axios.put(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                router.push({name:"BoardOne", query:{bno:state.bno}});
            }
        };

        // 이미지 삭제
        const handleDeleteImg = async(tmp) => {
            const no = tmp.split('=');
            console.log("==no==", Number(no[1]));
            const url = `/until15/api/bimg/delete?bimgno=${Number(no[1])}`;
            const headers = {"Content-Type":"application/json", "token":state.token};
            const response = await axios.delete(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('삭제되었습니다');
                handleData(state.bno);
            }
            else{
                alert('권한 없음');
            }
        }

        // 뒤로가기
        const handleBack = () => {
            router.push({name : "BoardOne", query:{bno:state.bno}});
        }

        onMounted(() =>{
            handleData(state.bno);
        });
        
        return {state, handleData, handleUpdate, handleBack, handleDeleteImg}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>