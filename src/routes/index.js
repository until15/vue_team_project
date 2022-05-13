import { createWebHashHistory, createRouter } from "vue-router";

import Home from '@/components/Home.vue'; 

import Challenge from '@/components/Challenge.vue'; 
import ChallengeOne from '@/components/ChallengeOne.vue';
import ChallengeWrite from '@/components/ChallengeWrite.vue';
import MemberJoin from '@/components/MemberJoin.vue';
import Login from '@/components/Login.vue';
import Logout from '@/components/Logout.vue';
import Board from '@/components/Board.vue';
import BoardWrite from '@/components/BoardWrite.vue';
import BoardOne from '@/components/BoardOne.vue';
import BoardUpdate from '@/components/BoardUpdate.vue';
import Mypage from '@/components/Mypage.vue';
import UpdatePw from '@/components/mypage/UpdatePw.vue';
import Inquiry from '@/components/mypage/Inquiry.vue';
import InquiryOne from '@/components/mypage/InquiryOne.vue';
import JoinList from '@/components/Join/JoinList.vue';
import JoinState from '@/components/Join/JoinState.vue';
import Pose from '@/components/Pose/Pose.vue';
import PoseOne from '@/components/Pose/PoseOne.vue';
import PoseUpdate from '@/components/Pose/PoseUpdate.vue';
import PoseInsert from '@/components/Pose/PoseInsert.vue';
import RoutineInsert from '@/components/Routine/RoutineInsert.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Navi from '@/components/Navi.vue';


const routes = [
    { path:'/', name:"Home", component:Home },
    { path:'/challenge', name:"Challenge", component:Challenge },
    { path:'/challengeone', name:"ChallengeOne", component:ChallengeOne },
    { path:'/challengewrite', name:"ChallengeWrite", component:ChallengeWrite },
    { path:'/memberjoin', name:"MemberJoin", component:MemberJoin },
    { path:'/login', name:"Login", component:Login },
    { path:'/logout', name:"Logout", component:Logout },
    { path:'/board', name:"Board", component:Board },
    { path:'/boardwrite', name:"BoardWrite", component:BoardWrite },
    { path:'/boardone', name:"BoardOne", component:BoardOne },
    { path:'/boardupdate', name:"BoardUpdate", component:BoardUpdate },
    { path:'/mypage', name:"Mypage", component:Mypage },
    { path:'/updatepw', name:"UpdatePw", component:UpdatePw },
    { path:'/inquiry', name:"Inquiry", component:Inquiry },
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
];
  
const router = createRouter({
    history : createWebHashHistory(),
    routes : routes,
});
  
export default router;
