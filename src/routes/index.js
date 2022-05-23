import { createWebHashHistory, createRouter } from "vue-router";

import Home from '@/components/Home.vue';

/////////////////////////// Challenge ////////////////////////////////
import Challenge from '@/components/challenge/Challenge.vue'; 
import ChallengeOne from '@/components/challenge/ChallengeOne.vue';
import ChallengeWrite from '@/components/challenge/ChallengeWrite.vue';
import ChallengeLikeList from '@/components/challenge/ChallengeLikeList.vue';
import ChallengeLevelList from '@/components/challenge/ChallengeLevelList.vue';
//////////////////////////////////////////////////////////////////////
import MemberJoin from '@/components/MemberJoin.vue';
import Login from '@/components/login/Login.vue';
import Login1 from '@/components/login/Login1.vue';
import Logout from '@/components/login/Logout.vue';
import Logout1 from '@/components/login/Logout1.vue';
import Board from '@/components/board/Board.vue';
import BoardWrite from '@/components/board/BoardWrite.vue';
import BoardOne from '@/components/board/BoardOne.vue';
import BoardUpdate from '@/components/board/BoardUpdate.vue';
////////////////////////////////////////////////////////////////
import UpdatePw from '@/components/mypage/UpdatePw.vue';
import Inquiry from '@/components/mypage/Inquiry.vue';
import InquiryOne from '@/components/mypage/InquiryOne.vue';
import menu1 from '@/components/mypage/menu1.vue';
import menu11 from '@/components/mypage/menu11.vue';
import menu2 from '@/components/mypage/menu2.vue';
import menu3 from '@/components/mypage/menu3.vue';
/////////////////////////// JOIN ////////////////////////////////
import JoinList from '@/components/Join/JoinList.vue';
import JoinState from '@/components/Join/JoinState.vue';
import JoinOne from '@/components/Join/JoinOne.vue';
import JoinListPage from '@/components/Join/JoinListPage.vue';
/////////////////////// Confirm ////////////////////////////////
import ConfirmInsert from '@/components/Confirm/ConfirmInsert.vue';
import ConfirmList from '@/components/Confirm/ConfirmList.vue';
//////////////////////// Pose //////////////////////////////
import Pose from '@/components/Pose/Pose.vue';
import PoseOne from '@/components/Pose/PoseOne.vue';
import PoseUpdate from '@/components/Pose/PoseUpdate.vue';
import PoseInsert from '@/components/Pose/PoseInsert.vue';
///////////////////////// Routine ////////////////////////////////
import RoutineInsert from '@/components/Routine/RoutineInsert.vue';
import RoutineSelect from '@/components/Routine/RoutineSelect.vue';
/////////////////////// 결제 /////////////////////////////
import Pay from '@/components/payment/Pay.vue';
/////////////////////// 화면 틀 //////////////////////////
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Navi from '@/components/Navi.vue';


const routes = [
    { path:'/', name:"Home", component:Home },
    /////////////////////////// Challenge ////////////////////////////////
    { path:'/challenge', name:"Challenge", component:Challenge },
    { path:'/challengeone', name:"ChallengeOne", component:ChallengeOne },
    { path:'/challengewrite', name:"ChallengeWrite", component:ChallengeWrite },
    { path:'/challengelikelist', name:"ChallengeLikeList", component:ChallengeLikeList },
    { path:'/challengelevellist', name:"ChallengeLevelList", component:ChallengeLevelList },
    //////////////////////////////////////////////////////////////////////
    { path:'/memberjoin', name:"MemberJoin", component:MemberJoin },
    { path:'/login', name:"Login", component:Login },
    { path:'/login1', name:"Login1", component:Login1 },
    { path:'/logout', name:"Logout", component:Logout },
    { path:'/logout1', name:"Logout1", component:Logout1 },
    { path:'/board', name:"Board", component:Board },
    { path:'/boardwrite', name:"BoardWrite", component:BoardWrite },
    { path:'/boardone', name:"BoardOne", component:BoardOne },
    { path:'/boardupdate', name:"BoardUpdate", component:BoardUpdate },
    { path:'/updatepw', name:"UpdatePw", component:UpdatePw },
    { path:'/inquiry', name:"Inquiry", component:Inquiry },
    { path:'/menu1', name:"menu1", component:menu1 },
    { path:'/menu11', name:"menu11", component:menu11 },
    { path:'/menu2', name:"menu2", component:menu2 },
    { path:'/menu3', name:"menu3", component:menu3 },
    { path:'/inquiryone', name:"InquiryOne", component:InquiryOne },
    { path:'/joinlist', name:"JoinList", component:JoinList },
    { path:'/joinstate', name:"JoinState", component:JoinState },
    { path:'/pose', name:"Pose", component:Pose },
    { path:'/poseone', name:"PoseOne", component:PoseOne },
    { path:'/poseupdate', name:"PoseUpdate", component:PoseUpdate },
    { path:'/poseinsert', name:"PoseInsert", component:PoseInsert },
    { path:'/routineinsert', name:"RoutineInsert", component:RoutineInsert },
    { path:'/header', name:"Header", component:Header },
    { path:'/footer', name:"Footer", component:Footer },
    { path:'/navi', name:"Navi", component:Navi },
    { path:'/joinone', name:"JoinOne", component:JoinOne },
    { path:'/joinlistpage', name:"JoinListPage", component:JoinListPage },
    { path:'/confirminsert', name:"ConfirmInsert", component:ConfirmInsert },
    { path:'/confirmlist', name:"ConfirmList", component:ConfirmList },
    { path:'/pay', name:"Pay", component:Pay },
    { path:'/routineselect', name:"RoutineSelect", component:RoutineSelect },
];
  
const router = createRouter({
    history : createWebHashHistory(),
    routes : routes,
});

  
export default router;
