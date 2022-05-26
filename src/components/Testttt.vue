<template>
    <div>
        <input type="text" v-model="state.memail1"   />
        <button @click="handleUpdate">등록</button>
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

    const handleUpdate = async() => {


    }
        
        

        return {state, handleUpdate }
    }
}
</script>

<style lang="scss" scoped>

</style>