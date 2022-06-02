<template>
    <div align="center">

        <!-- 타이틀 -->
        <div>
            <h3 style="margin-top:100px;">자세</h3>
        </div>

        <div>
            <h6>루틴에 등록될 자세를 등록하는 곳입니다.</h6><br>    
        </div>

        <!-- 검색창 -->
        <el-form :inline="true" v-if="state.pose" style="margin-top:20px;" >
            <el-form-item>
                <el-input v-model="state.title" placeholder="검색어를 입력하세요" style="width:200px;" type="text" size="small" v-on:keydown.enter.prevent='handleLoadData()'/>
            </el-form-item>
            <el-form-item>
                <el-button type="info" plain size="small" style="margin-left:5px;" @click="handleLoadData()">검색</el-button>
            </el-form-item>
        </el-form>

        <!-- 테이블 -->
        <el-table :data="state.pose" align="center">
            <el-table-column property="pno" label="번호" width="150"/>
            <el-table-column property="pname" label="자세" width="250">
                <template #default="scope">
                    <div @click="handlePoseOne(scope.row.pno)" style="cursor:pointer;">
                        {{scope.row.pname}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column property="ppart" label="부위" width="300" />
            <el-table-column property="plevel" label="난이도" width="100"/>
        </el-table>

        <!-- 페이지네이션 -->
        <el-pagination
            align="center"
            layout="prev, pager, next"
            @current-change="currentChange"
            :current-page="state.page"
            :total="state.total">
        </el-pagination>
        <br>

        <!-- 글쓰기 버튼 -->
        <div>
            <el-button class="button-blk1" style="margin-top:20px;margin-bottom:60px;" type="info" plain @click="handlePoseInsert">자세 등록</el-button><br /><br />
        </div>
        <!-- 삭제된 자세 보기 : 관리자 -->
        <div v-if="state.member">
            <div v-if="state.member.mrole === 'admin'">
            <el-button type="info" plain @click="handleStep">삭제된 자세 관리</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
export default {
    setup () {
        // 이동하기
        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            step : 1, // 삭제 되지 않은 것만
            page : 1,
            title : '',
            total : 1,
            search : "close"

        });

        // 삭제 자세 보기
        const handleStep = () => {
            state.step = 2
            handleLoadData();
        }

        // 회원 조회
        const handleMemberData = async() => {
            const url = `/ROOT/api/member/selectmemberone`;
            const headers = {
                "Content-Type": "application/json",
                token: state.token,
            };
            const response = await axios.get(url, { headers : headers });
            console.log(response.data);
            if (response.data.status === 200) {
                state.member = response.data.result;
            }
        }

        const handlePoseInsert = () => {
            if(sessionStorage.getItem("TOKEN") !== null){
                router.push({name:"PoseInsert"});

            }
            else{
                alert('로그인이 필요한 페이지입니다.');
                router.push({name:"Login"});
            }
        }

        const handleLoadData = async () => {
            const url = `/ROOT/api/pose/selectlist.json?step=${state.step}&page=${state.page}&title=${state.title}`;
            const headers = {"Content-Type":"application/json"};
            const response = await axios.get(url, { headers: headers });
            console.log(response.data);
            if(response.data.status === 200){
                state.pose = response.data.result;
                state.total = response.data.titleTotal
            }
        }

        const currentChange = (page) => {
            console.log('Pose.vue => currentChange', page);
            state.page = page;
            handleLoadData();
        }

        const handlePoseOne = (no) => {
            console.log(no);
            router.push({name:"PoseOne", query:{pno:no}})
        }

        // 생명주기 onMounted()
        onMounted( async() => {
            await handleLoadData();
            await handleMemberData();

        });

        return {state, handlePoseOne, handleLoadData, handlePoseInsert, currentChange, handleStep}
    }
}
</script>

<style lang="css" scoped>
h6{
    color: rgb(209, 209, 209);
}

.button-blk1 {
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
}

</style>