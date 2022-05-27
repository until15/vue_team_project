<template>
    <div>
        <el-form :inline="true" style="margin-right:150px" >
            <el-form-item  label="생년월일" label-width="80px" style="margin-top:-20px">
                <el-date-picker ref="mbirth" v-model="state.mbirth" type="date" placeholder="날짜선택" 
                format="YYYY-MM-DD" value-format="YYYY-MM-DD" :disabled-date="disabledDate" />
            </el-form-item>
        </el-form>
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
        
        // 생년월일 오늘 넘지않기 element plus
        const disabledDate = (time) => {
        return time.getTime() < Date.now();
        }
        

        return {state, validPhone, disabledDate }
    }
}
</script>

<style lang="scss" scoped>

</style>