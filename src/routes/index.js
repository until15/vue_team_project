import { createWebHashHistory, createRouter } from "vue-router";

import Home from '@/components/Home.vue'; 

import Challenge from '@/components/Challenge.vue'; 
import MemberJoin from '@/components/MemberJoin.vue';
import Login from '@/components/Login.vue';
import Logout from '@/components/Logout.vue';
import Board from '@/components/Board.vue';
import BoardWrite from '@/components/BoardWrite.vue';
import BoardOne from '@/components/BoardOne.vue';
import BoardUpdate from '@/components/BoardUpdate.vue';
import Mypage from '@/components/Mypage.vue';
import UpdatePw from '@/components/mypage/UpdatePw.vue';
import Pose from '@/components/Pose/Pose.vue';
import PoseOne from '@/components/Pose/PoseOne.vue';


const routes = [
    { path:'/', name:"Home", component:Home },
    { path:'/challenge', name:"Challenge", component:Challenge },
    { path:'/memberjoin', name:"MemberJoin", component:MemberJoin },
    { path:'/login', name:"Login", component:Login },
    { path:'/logout', name:"Logout", component:Logout },
    { path:'/board', name:"Board", component:Board },
    { path:'/boardwrite', name:"BoardWrite", component:BoardWrite },
    { path:'/boardone', name:"BoardOne", component:BoardOne },
    { path:'/boardupdate', name:"BoardUpdate", component:BoardUpdate },
    { path:'/mypage', name:"Mypage", component:Mypage },
    { path:'/updatepw', name:"UpdatePw", component:UpdatePw },
    { path:'/pose', name:"Pose", component:Pose },
    { path:'/poseone', name:"PoseOne", component:PoseOne },
];
  
const router = createRouter({
    history : createWebHashHistory(),
    routes : routes,
});
  
export default router;
