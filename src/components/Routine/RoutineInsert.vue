<template>
    <div>
        <h3>루틴 생성 페이지</h3>
        <div v-for="(routine,i) in state.routines" :key="i">
            <!-- {{routine[i]}} -->
            <input type="text" v-model="state.routines[i]">
        </div>

    </div>
</template>

<script>
import { reactive } from 'vue';
export default {
    setup () {
        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),
            routines : [
                {rtnday : '월', rtncnt : 1, rtnset : 1, rtnname : '루틴명'},
                {rtnday : '화', rtncnt : 1, rtnset : 1, rtnname : '루틴명'},
                {rtnday : '수', rtncnt : 1, rtnset : 1, rtnname : '루틴명'}
            ],
        })
        

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>