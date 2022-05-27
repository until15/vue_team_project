<template>
    <div>
        <h2 style="padding:20px">관리자 페이지</h2>
        <div class="center" style="margin-bottom:10px">
            <el-button type="primary" round plain @click="handleMenu(1)">문의</el-button>     
            <el-button type="primary" round plain @click="handleMenu(2)">회원관리</el-button>  
        </div>
        
           
       
         

        <admin-1 v-if="state.menu === 1"></admin-1>
        <member-list v-if="state.menu === 2"></member-list>

    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import Admin1 from '../admin/Admin1.vue'
import MemberList from '../admin/MemberList.vue';

import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
export default {
    components : {
        Admin1, MemberList
    },

    setup () {
        const route = useRoute();
        const router = useRouter();

        const state = reactive({
            menu : Number(route.query.menu),
            
        });

        onMounted( () =>{
            if(typeof route.query.menu === 'undefined'){
                state.menu = 1
            }
            
        });

        const handleMenu = (idx) => {
            router.push({name:'Admin', query:{menu:idx}});
            state.menu = idx;
        }
        
    
        return {state, handleMenu}
    }
}
</script>

<style lang="css" scoped>
.center{
  text-align: center;
}

</style>