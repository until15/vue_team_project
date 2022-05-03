import { createWebHashHistory, createRouter } from "vue-router";

import Home from '@/components/Home.vue'; 

import Challenge from '@/components/Challenge.vue'; 
import MemberJoin from '@/components/MemberJoin.vue';
import Login from '@/components/Login.vue';
import Board from '@/components/Board.vue';
import BoardWrite from '@/components/BoardWrite.vue';
import BoardOne from '@/components/BoardOne.vue';
import BoardUpdate from '@/components/BoardUpdate.vue';


const routes = [
    { path:'/', name:"Home", component:Home },
    { path:'/challenge', name:"Challenge", component:Challenge },
    { path:'/memberjoin', name:"MemberJoin", component:MemberJoin },
    { path:'/login', name:"Login", component:Login },
    { path:'/board', name:"Board", component:Board },
    { path:'/boardwrite', name:"BoardWrite", component:BoardWrite },
    { path:'/boardone', name:"BoardOne", component:BoardOne },
    { path:'/boardupdate', name:"BoardUpdate", component:BoardUpdate },
];
  
const router = createRouter({
    history : createWebHashHistory(),
    routes : routes,
});
  
export default router;
