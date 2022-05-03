import { createWebHashHistory, createRouter } from "vue-router";

import Home from '@/components/Home.vue'; 

import Challenge from '@/components/Challenge.vue'; 
import MemberJoin from '@/components/MemberJoin.vue';
import Login from '@/components/Login.vue';
import Board from '@/components/Board.vue';
import BoardWrite from '@/components/BoardWrite.vue';


const routes = [
    { path:'/', name:"Home", component:Home },
    { path:'/challenge', name:"Challenge", component:Challenge },
    { path:'/memberjoin', name:"MemberJoin", component:MemberJoin },
    { path:'/login', name:"Login", component:Login },
    { path:'/board', name:"Board", component:Board },
    { path:'/boardwrite', name:"BoardWrite", component:BoardWrite },

];
  
const router = createRouter({
    history : createWebHashHistory(),
    routes : routes,
});
  
export default router;
