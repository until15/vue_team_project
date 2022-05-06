@@ -1,48 +0,0 @@
<template>
    <div>
        <h3>로그인</h3>
        이메일 : <input type="text" v-model="state.memail" placeholder="이메일" /><br />
        암호 : <input type="password" v-model="state.mpw" placeholder="암호" /><br />
        <button @click="handleLogin">로그인</button>

    </div>
</template>

<script>
import { reactive } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
import {useStore} from 'vuex';
export default {
    setup () {
        const store = useStore();
        const router = useRouter();
        const state = reactive({
            memail : '',
            mpw : ''
        });

        const handleLogin = async() => {
            const url = `/ROOT/api/member/login`;
            const headers = {"Content-Type":"application/json"};
            const body = {
                memail : state.memail,
                mpw : state.mpw
            }
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                alert('로그인 되었습니다');
                sessionStorage.setItem("TOKEN", response.data.token);
                store.commit('setLogged', true);
                router.push({name : "Home"});
                
            }
        }
        

        return {state, handleLogin}
    }
}
</script>

<style lang="scss" scoped>

</style>