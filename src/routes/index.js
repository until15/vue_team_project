import { createWebHashHistory, createRouter } from "vue-router";

import Home from '@/components/Home.vue';

import AboutUs from '@/components/AboutUs.vue';

import Admin from '@/components/admin/Admin.vue'; 
import Admin1 from '@/components/admin/Admin1.vue'; 
import Admin2 from '@/components/admin/Admin2.vue'; 
import Admin3 from '@/components/admin/Admin3.vue'; 
import Admin4 from '@/components/admin/Admin4.vue'; 
import MemberList from '@/components/admin/MemberList.vue'; 
/////////////////////////// Challenge ////////////////////////////////
import Challenge from '@/components/challenge/Challenge.vue'; 
import ChallengeOne from '@/components/challenge/ChallengeOne.vue';
import ChallengeWrite from '@/components/challenge/ChallengeWrite.vue';
import ChallengeLikeList from '@/components/challenge/ChallengeLikeList.vue';
import ChallengeLevelList from '@/components/challenge/ChallengeLevelList.vue';
import MyChallenge from '@/components/challenge/MyChallenge.vue';
import MyChallengeOne from '@/components/challenge/MyChallengeOne.vue';
//////////////////////////////////////////////////////////////////////
import MemberJoin from '@/components/MemberJoin.vue';
import Login from '@/components/login/Login.vue';
import Login1 from '@/components/login/Login1.vue';
import Login2 from '@/components/login/Login2.vue';
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
import Mypage from '@/components/mypage/Mypage.vue'; 
import MyLikeList from '@/components/mypage/MyLikeList.vue';
import MyBookmarkList from '@/components/mypage/MyBookmarkList.vue';
import MyCommunity from '@/components/mypage/MyCommunity.vue';
/////////////////////////// JOIN ////////////////////////////////
import JoinList from '@/components/Join/JoinList.vue';
import JoinState from '@/components/Join/JoinState.vue';
import JoinOne from '@/components/Join/JoinOne.vue';
import JoinListPage from '@/components/Join/JoinListPage.vue';
/////////////////////// Confirm ////////////////////////////////
import ConfirmInsert from '@/components/Confirm/ConfirmInsert.vue';
import ConfirmList from '@/components/Confirm/ConfirmList.vue';
import MyConfirm from '@/components/Confirm/MyConfirm.vue';
import SuccessCfm from '@/components/Confirm/SuccessCfm.vue';
//////////////////////// Pose //////////////////////////////
import Pose from '@/components/Pose/Pose.vue';
import PoseOne from '@/components/Pose/PoseOne.vue';
import PoseUpdate from '@/components/Pose/PoseUpdate.vue';
import PoseInsert from '@/components/Pose/PoseInsert.vue';
///////////////////////// Routine ////////////////////////////////
import RoutineInsert from '@/components/Routine/RoutineInsert.vue';
import RoutineSelect from '@/components/Routine/RoutineSelect.vue';
/////////////////////// ?????? /////////////////////////////
import Pay from '@/components/payment/Pay.vue';
import PayRefund from '@/components/payment/PayRefund.vue';
/////////////////////// ?????? ??? //////////////////////////
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Navi from '@/components/Navi.vue';
import Testttt from '@/components/Testttt.vue';
import TestM from '@/components/Test-M.vue';
import MyActivity from '@/components/MyActivity.vue';


const routes = [
    { path:'/', name:"Home", component:Home },
    { path:'/aboutus', name:"AboutUs", component:AboutUs },
    { path:'/admin', name:"Admin", component:Admin },
    { path:'/admin1', name:"Admin1", component:Admin1 },
    { path:'/admin2', name:"Admin2", component:Admin2 },
    { path:'/admin3', name:"Admin3", component:Admin3 },
    { path:'/admin4', name:"Admin4", component:Admin4 },
    { path:'/memberlist', name:"MemberList", component:MemberList },
    /////////////////////////// Challenge ////////////////////////////////
    { path:'/challenge', name:"Challenge", component:Challenge },
    { path:'/challengeone', name:"ChallengeOne", component:ChallengeOne },
    { path:'/challengewrite', name:"ChallengeWrite", component:ChallengeWrite },
    { path:'/challengelikelist', name:"ChallengeLikeList", component:ChallengeLikeList },
    { path:'/challengelevellist', name:"ChallengeLevelList", component:ChallengeLevelList },
    { path:'/mylikelist', name:"MyLikeList", component:MyLikeList },
    { path:'/mybookmarklist', name:"MyBookmarkList", component:MyBookmarkList },
    //////////////////////////////////////////////////////////////////////
    { path:'/memberjoin', name:"MemberJoin", component:MemberJoin },
    { path:'/login', name:"Login", component:Login },
    { path:'/login1', name:"Login1", component:Login1 },
    { path:'/login2', name:"Login2", component:Login2 },
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
    { path:'/mypage', name:"Mypage", component:Mypage },
    { path:'/mycommunity', name:"MyCommunity", component:MyCommunity },
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
    { path:'/myconfirm', name:"MyConfirm", component:MyConfirm },
    { path:'/successcfm', name:"SuccessCfm", component:SuccessCfm },
    { path:'/mychallenge', name:"MyChallenge", component:MyChallenge },
    { path:'/mychallengeone', name:"MyChallengeOne", component:MyChallengeOne },
    { path:'/pay', name:"Pay", component:Pay },
    { path:'/payrefund', name:"PayRefund", component:PayRefund },
    { path:'/routineselect', name:"RoutineSelect", component:RoutineSelect },
    { path:'/testttt', name:"Testttt", component:Testttt },
    { path:'/testm', name:"TestM", component:TestM },
    { path:'/myactivity', name:"MyActivity", component:MyActivity },
];
  
const router = createRouter({
    history : createWebHashHistory(),
    routes : routes,
});

  
export default router;
