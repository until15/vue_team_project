import { createWebHashHistory, createRouter } from "vue-router";

import Home from '@/components/Home.vue'; 


const routes = [
    { path:'/', name:"Home", component:Home }

];
  
const router = createRouter({
    history : createWebHashHistory(),
    routes : routes,
});
  
export default router;
