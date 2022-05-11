import { createWebHashHistory, createRouter } from "vue-router";

import Home from '@/components/Home.vue'; 

import Challenge from '@/components/Challenge.vue'; 
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
import JoinList from '@/components/JoinList.vue';
import JoinState from '@/components/JoinState.vue';


const routes = [
    { path:'/', name:"Home", component:Home },
    { path:'/challenge', name:"Challenge", component:Challenge },
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
];
  
const router = createRouter({
    history : createWebHashHistory(),
    routes : routes,
});
  
export default router;
