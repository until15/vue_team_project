<template>
    <div>
        <br />
        <h2 style="padding:30px">관리자 페이지</h2>
        <el-button type="primary" size="mini" round plain @click="state.menu === 1">문의</el-button>     
        <el-button type="primary" size="mini" round plain @click="state.menu === 2">회원관리</el-button>     
       
         

        <inquiry-admin v-if="state.menu = 1"></inquiry-admin>
        <member-list v-if="state.menu = 2"></member-list>

    </div>
</template>

<script>
import { reactive } from 'vue';
import InquiryAdmin from './InquiryAdmin.vue';
import MemberList from './MemberList.vue';
export default {
    components : {
        InquiryAdmin, MemberList
    },

    setup () {

        
      
        const state = reactive({
            
            menu : 0,
            
        });
        
    
        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>