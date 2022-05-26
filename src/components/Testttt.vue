<template>
    <div>
        <input type="text" v-model="state.memail1"   />
        <button @keyup="validPhone">등록</button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
export default {
    setup () {
        const state = reactive({
            memail1 : '',
            mpw : '',
        })

     //연락처 정규식
        const validPhone = (mphone) => {
            var Phone = /^01([0])-?([0-9]{4})-?([0-9]{4})$/;
            return Phone.test(mphone);
        }
        
        

        return {state, validPhone }
    }
}
</script>

<style lang="scss" scoped>

</style>