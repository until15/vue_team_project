<template>
    <div>
        <h3>마이페이지</h3>
        <button @click="state.menu=1">정보수정</button>
        <button @click="state.menu=2">회원탈퇴</button>
        <button @click="state.menu=3">1:1문의</button>

        <hr />
        <menu-1 v-if="state.menu == 1"></menu-1>
        <menu-2 v-if="state.menu == 2"></menu-2>
        <menu-3 v-if="state.menu == 3"></menu-3>


    </div>
</template>

<script>
import { reactive } from 'vue'
import menu1 from './mypage/menu1.vue';
import menu2 from './mypage/menu2.vue';
import menu3 from './mypage/menu3.vue';

export default {
  components: {
       menu1, menu2, menu3 
       },
    setup () {


        const state = reactive({
            menu : 1
        });
        

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>