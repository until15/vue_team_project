<template>
    <div>
        <input type="text" v-model="state.mphone"  placeholder="000-0000-0000" />
        <button @click="handletest">등록</button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
export default {
    setup () {
        const state = reactive({
            mphone : '',
        })
        const validPhone = (mphone) => {
        var Phone = /^01([0])-?([0-9]{4})-?([0-9]{4})$/;
        return Phone.test(mphone);
        }

        const handletest = () => {
            if(validPhone(state.mphone)){
                const mphone = state.mphone;
                const mmphone = mphone.replace(/-/g, '');
                console.log(mmphone);
                alert('연락처가 맞음!! 잘했음');
                state.mphone = '';
            }
            else{
                alert('못했음');
                state.mphone = '';
            }
        }

        return {state, validPhone, handletest}
    }
}
</script>

<style lang="scss" scoped>

</style>