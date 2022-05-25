<template>
    <div>
        <input type="text" v-model="state.memail"   />
        <button @click="handleUpdate">등록</button>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import axios from 'axios';
export default {
    setup () {
        const state = reactive({
            memail : '',
            mpw : '',
        })

    const handleUpdate = async() => {
        const url = `/ROOT/api/member/updatepw3?memail=${state.memail}`;
        const headers = {"Content-Type":"application/json"};
        const body = {
            mpw : state.mpw = "2gfda34"
        }
        const response = await axios.put(url, body, {headers});
        console.log(response.data);

    }
        
        

        return {state, handleUpdate }
    }
}
</script>

<style lang="scss" scoped>

</style>