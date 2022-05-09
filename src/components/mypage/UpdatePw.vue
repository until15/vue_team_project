<template>
    <div>
        <h3>암호변경</h3>
        <div v-if="state.item">
            기존암호 : <input type="password" v-model="state.item.mpw" placeholder="기존암호" /><br />
            새암호 : <input type="password" v-model="state.item.mpw1" placeholder="새암호" /><br />
            암호확인 : <input type="password" v-model="state.item.mpw2" placeholder="암호확인" /><br />
            <button @click="handleUpdate">변경하기</button>

        </div>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import {useRouter} from 'vue-router';
import axios from 'axios';
export default {
    setup () {

        const router = useRouter();

        const state = reactive({
            token : sessionStorage.getItem("TOKEN"),

        });

        const handleData = async() => {
            const url = `/ROOT/api/member/selectmemberone`;
            const headers = {"Content-Type":"application/json","token":state.token};
            const response = await axios.get(url, {headers});
            console.log(response.data);
            if(response.data.status === 200){
                state.item = response.data.result;
            }
           
            
        };

        const handleUpdate = async() => {
            if(state.token !== null){
                const url = `/ROOT/api/member/updatepw`;
                const headers = {"Content-Type":"application/json","token":state.token};
                const body = {
                    mpw : state.item.mpw,
                    mpw1 : state.item.mpw1
                };
                const response = await axios.put(url, body, {headers});
                console.log(response.data);
                if(response.data.status === 200){
                    alert('변경되었습니다');
                    router.push({name:"Mypage"});
                }
                else{
                    alert('기존암호 또는 새암호가 일치하지 않습니다');
                }
            }
        }

        onMounted(() => {
            handleData();
        });
        
        

        return {state, handleUpdate}
    }
}
</script>

<style lang="scss" scoped>

</style>