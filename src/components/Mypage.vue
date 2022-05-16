<template>
    <div>
        <h3>마이페이지</h3>
        <!-- <button @click="state.menu=1">정보수정</button>
        <button @click="state.menu=3">1:1문의</button>
        <button @click="state.menu=2">회원탈퇴</button> -->

        <button @click="handleMenu(1)">정보수정</button>
        <button @click="handleMenu(3)">1:1문의</button>
        <button @click="handleMenu(2)">회원탈퇴</button>

    
        <menu-1 v-if="state.menu == 1"></menu-1>
        <menu-2 v-if="state.menu == 2"></menu-2>
        <menu-3 v-if="state.menu == 3"></menu-3>


    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import menu1 from './mypage/menu1.vue';
import menu2 from './mypage/menu2.vue';
import menu3 from './mypage/menu3.vue';

import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
export default {
  components: {
       menu1, menu2, menu3 
       },
    setup () {

        const route = useRoute();
        const router = useRouter();


        const state = reactive({
            menu : Number(route.query.menu),
        });

        onMounted(() => {
            console.log(route.query.menu);
            if(typeof route.query.menu === 'undefined'){
                state.menu = 1
            }
        });

        const handleMenu = (idx) => {
            router.push({name:'Mypage', query:{menu:idx}});
            state.menu = idx;
        }
        

        return {state, handleMenu}
    }
}
</script>

<style lang="scss" scoped>

</style>