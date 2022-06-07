<template>
    <div class="padding-tb container px-4 px-lg-5 mt-5 mb-6" align="center">
        <div class="text-center">
            <h1>인증하기</h1>
        </div>

        <div class="img">
            <img src="@/assets/img/결제.png" alt="" style="width:800px;height:500px;">
        </div>
        
        <div>
            <!-- 내용 -->
            <div class="m-tb">
                <!-- 내용 : <input type="text" v-model="state.comment" /> <br /> -->
                <el-row :gutter="20">
                <el-col :span="2" :offset="8">내용 :</el-col> 
                <el-col :span="5"><el-input type="textarea" :rows="2" v-model="state.comment"></el-input></el-col><br>
                </el-row>
                <!-- 내용 : <el-input type="textarea" v-model="state.comment" placeholder="내용 입력" /> -->
            </div>

            <!-- <div>
                <div v-for="(tmp, i) in state.imageUrl" :key="tmp" style="margin-bottom:1rem;">
                    <img :src="state.imageUrl[i]" alt="인증 이미지" style="width:50px">
                </div>
            </div> -->

            <div class="demo-image">
                <div class="block m-lr" v-for="(tmp, i) in state.imageUrl" :key="tmp" >
                <el-image class="image" style="width: 200px; height: 200px" :src="state.imageUrl[i]" fit="cover" />
                </div>
            </div>

            <div>
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                    :auto-upload="false"
                    :on-remove="handleremove"
                    :on-change="handleChange"
                >
                    <el-button type="primary">파일 선택</el-button>
                    
                </el-upload>
            </div>

            <!-- 인증하기 버튼 -->
            <!-- <div>
                <button @click="handleProve">인증하기</button>
            </div> -->

            <!-- 인증하기 -->
            <div class="center" style="margin-top : 3rem;">
                <el-button class="button-blk" type="info" size="medium" plain @click="handleProve">인증하기</el-button>
            </div>
        </div>

    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    setup () {
        const router = useRouter();
        const route = useRoute();

        const state = reactive({
            jno : route.query.jno,     // 참가번호
            token : sessionStorage.getItem("TOKEN"),    // 토큰
            comment : '',   // 인증 내용
            cfno : 0,   // 인증번호
            imgcount : 1,    // 선택할 파일 갯수
            proImg : [],    // 이미지 데이터
            imageUrl : [],   // 파일을 URL화 시킨거
        });

        const handleChange = (e) => {
            // e 변수에 첨부한 파일의 정보 저장
            // console.log("e.target.files[0] : ", e.target.files[0]);
            // console.log("e.raw : ", e.raw);
            if(e.raw){ // 파일 첨부의 경우
                state.proImg.push(e.raw);
                state.imageUrl.push(URL.createObjectURL(e.raw));
                // console.log("이미지 첨부 : ", URL.createObjectURL(e.raw));
            }
            else{ // 취소의 경우
                state.proImg = [];
                state.imageUrl = [];
            }
        }

        // 파일을 삭제한 경우
        const handleremove = (e) => {
            // console.log("e.raw : ", e.name);
            // console.log("URL.createObjectURL(e.raw) : ", URL.createObjectURL(e.raw));
            // console.log("state.proImg.name : ", state.proImg[0].name);
            for (let i in state.imageUrl){
                if (state.proImg[i].name === e.name) {
                    // console.log(i, "번째 삭제");
                    state.proImg.splice(i,1);
                    state.imageUrl.splice(i,1);
                    i--;
                }
            }
            // console.log("파일 삭제 state.proImg : ", state.proImg);
            // console.log("파일 삭제 state.imageUrl : ", state.imageUrl);
            
        }

        // 인증하기
        const handleProve = async()=> {

            // 이미지 유효성 검사
            if (state.proImg.length <= 0) {
                alert("이미지 없음");
                return false;
            }

            // if (state.comment.length <= 0) {
            //     alert("내용을 입력해주세요");
            //     return false;
            // }

            const url = `/until15/api/confirm/insert.json?jno=${state.jno}`;
            const headers = {
                "Content-Type":"application/json",
                "token":state.token
            }
            const body = {
                cfcomment : state.comment
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                console.log("인증 완료");
                state.cfno = response.data.result
                // 이미지 등록
                const urlImg = `/until15/api/confirm/cfimage.insert?cfno=${state.cfno}`;
                const headersImg = {"Content-Type":"multipart/form-data"};
                const bodyImg = new FormData();
                for (let i=0; i<state.proImg.length; i++) {
                    bodyImg.append("file", state.proImg[i]);                    
                }
                const responseImg = await axios.post(urlImg, bodyImg, {headers:headersImg});
                console.log(responseImg.data);
                if (responseImg.data.status === 200) {
                    // 뒤로가기
                    router.go(-1);
                }
            
            } else {
                alert("이미 인증을 했습니다");
            }
        };


        // 이미지 불러와서 변수에 담기
        const handleImage = (e, idx)=> {
            console.log(idx);
            console.log(e.target.files[0]);
            if(e.target.files[0]){
                state.imgcount += 1;
                state.proImg[idx] = e.target.files[0];
                state.imageUrl[idx] = URL.createObjectURL(e.target.files[0]);
                console.log(state.proImg);
            }
        }

        return {
            state,
            handleProve,
            handleImage,
            handleremove,
            handleChange
        }
    }
}
</script>

<style lang="css" scoped>

.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}

.demo-image .block:last-child {
  border-right: none;
}

.demo-image {
  display: block;
  color: var(--el-text-color-secondary);
  margin-bottom: 20px;
}

.padding-tb {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.m-tb {
    margin-top:1.5rem;
    margin-bottom:1.5rem;
}

.m-lr {
    margin-left: 1rem;
    margin-right: 1rem;
}

.center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.button-blk {
    background-color: #212529;
    border: none;
    color: rgb(255, 255, 255);
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 16px;
    width: 300px;
}

.image {
    border-radius: 16px;
}

</style>