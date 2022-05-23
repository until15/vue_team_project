<template>
    <div align="center">
        <el-card  style="width:1200px">
            <h3>게시판 글쓰기</h3>
            <el-input  size="medium" ref="memail" v-model="state.qtitle" style="margin-bottom:10px" placeholder="글제목"/>
            <ckeditor :editor="editor.editor" :config="editor.editorConfig" v-model="state.qcontent" ></ckeditor>
            
            <img :src="state.imageUrl" style="width:50px" />
            <input type="file" @change="handleImage($event)" /><br />
        </el-card><br />
        <el-button type="info" size="small" plain @click="handleInsert">등록하기</el-button> 
        <el-button type="info" size="small" plain @click="handleBack">돌아가기</el-button><br /><br />
    </div>
</template>

<script>
import { reactive } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
    setup () {
        const router = useRouter();

        const editor = {
            editor          : ClassicEditor,
            editorData      : '',
            editorConfig    : {}
        }

        const state = reactive({
            qtitle : '',
            qcontent : '',
            qimage : null,
            imageUrl : require('@/assets/img/default.png'),
            token : sessionStorage.getItem("TOKEN")

        });

        const handleInsert = async() => {
            if(state.token !== null){
                const url = `/ROOT/api/Inquiry/insert`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const body = {
                    qtitle : state.qtitle,
                    qcontent : state.qcontent
                };
                const response = await axios.post(url, body, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    const url1 = `/ROOT/api/Inquiryimg/insert`;
                    const headers1 = {"Content-Type":"multipart/form-data", "token":state.token};
                    const body1 = new FormData();
                    body1.append("file", state.qimage);
                    body1.append("qno", response.data.result);
                    
                    const response1 = await axios.post(url1, body1, {headers:headers1});
                    console.log(response1.data);
                    if(response1.data.status === 200){
                        alert('등록되었습니다!');
                        router.push({name:"menu3"});
                    }
                }
            } 
        };

        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.qimage = e.target.files[0];
            }
            else{
                state.imageUrl = require('@/assets/img/default.png');
                state.qimage = null;
            }
        }

         const handleBack = () => {
            router.push({name:"menu3"})
        }

        
        

        return {state, editor, handleInsert, handleBack, handleImage}
    }
}
</script>

<style lang="scss" scoped>

</style>