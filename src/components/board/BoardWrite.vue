@@ -1,51 +0,0 @@
<template>
    <div align="center">
        <br />
        <!-- 글쓰기 ckeditor -->
        <el-card  style="width:1200px">
            <h3>게시판 글쓰기</h3>
            <el-input  size="medium" ref="memail" v-model="state.btitle" style="margin-bottom:10px" placeholder="글제목"/>
            <ckeditor :editor="state.editor" v-model="state.bcontent" @ready="onReady"></ckeditor>
            
            <img :src="state.imageUrl" style="width:50px" />
            <input type="file" @change="handleImage($event)" /><br />
        </el-card><br />
        <el-button type="info" size="small" plain @click="handleInsert">등록하기</el-button> 
        <el-button type="info" size="small" plain @click="handleBack">돌아가기</el-button><br /><br />

        <!-- 옛날꺼 -->
        <!-- <div>
            <button @click="handleInsert">등록하기</button>
            <button @click="handleBack">돌아가기</button>
            
            제목 : <input type="text" ref="btitle" v-model="state.btitle" /><br />
            내용 : <textarea rows="10" ref="bcontent" v-model="state.bcontent"></textarea><br />
            <hr />
            <img :src="state.imageUrl" style="width:50px" />
            이미지 : <input type="file" @change="handleImage($event)" /><br />
            <button @click="handleInsert">등록하기</button>
            <button @click="handleBack">돌아가기</button>
        </div> -->
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import axios from 'axios';
import {useRouter} from 'vue-router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '../UploadAdapter.js';
import CKEditor from '@ckeditor/ckeditor5-vue'

export default {
    components: { ckeditor: CKEditor.component },
    setup () {

        const router = useRouter();

        const state = reactive({
            btitle : '',
            bcontent : '',
            mimage : null,
            imageUrl : require('@/assets/img/default.png'),
            token : sessionStorage.getItem("TOKEN"),
            editor       : ClassicEditor, 
            editorData   : '',
        });

        const btitle = ref(null);
        const bcontent = ref(null);

        const onReady = ( editor ) => {
            console.log(editor);
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                return new UploadAdapter( loader );
            };
          
          
            editor.editing.view.change( writer => {
                writer.setStyle( 'height', '600px', editor.editing.view.document.getuntil15() );
            });
        }

        // 글쓰기
        const handleInsert = async() => {
            if(state.btitle === ''){
                alert('제목을 입력해주세요.');
                btitle.value.focus();
                return false;
            }

            if(state.bcontent === ''){
                alert('내용을 입력해주세요.');
                bcontent.value.focus();
                return false;
            }


            if(state.token !== null){
                const url = `/until15/api/community/insert`;
                const headers = {"Content-Type":"application/json", "token":state.token};
                const body = {
                    btitle : state.btitle,
                    bcontent : state.bcontent.replace("<p>","").replace("</p>","")
                };
                const response = await axios.post(url, body, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    
                    const url1 = `/until15/api/bimg/insert`;
                    const headers1 = {"Content-Type":"multipart/form-data", "token":state.token};
                    const body1 = new FormData();
                    body1.append("file", state.mimage);
                    body1.append("bno", response.data.result);
                    
                    const response1 = await axios.post(url1, body1, {headers:headers1});
                    console.log(response1.data);
                    if(response1.data.status === 200){
                        alert('등록되었습니다!');
                        router.push({name:"Board"});
                    }
                }
            } 
        };

        // 이미지 전환
        const handleImage = (e) => {
            if(e.target.files[0]){
                state.imageUrl = URL.createObjectURL(e.target.files[0]);
                state.mimage = e.target.files[0];
            }
            else{
                state.imageUrl = require('@/assets/img/default.png');
                state.mimage = null;
            }
        }

        // 뒤로가기
        const handleBack = () => {
            router.push({name : "Board"});
        }

        return {state, onReady, btitle, bcontent, handleInsert, handleImage, handleBack}
    }

    
}
</script>

<style lang="css" scoped>
.ck-editor__editable {
        min-height: 400px;
    }

.center{
  text-align: center;
}

</style>