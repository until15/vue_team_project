<template>
    <div>
        <h3>인증하기</h3>
        {{state.jno}}
        <div>
            <!-- 이미지 : <input type="file" /> <br /> -->
            내용 : <input type="text" v-model="state.comment" /> <br />
            <button @click="handleProve">인증하기</button>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import axios from 'axios';

export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            jno : route.params.jno,
            token : sessionStorage.getItem("TOKEN"),
            comment : ''
        });

        const handleProve = async()=> {
            const url = `/ROOT/api/confirm/insert.json?jno=${state.jno}`;
            const headers = {
                "Content-Type":"application/json",
                "token":state.token
            }
            const body = {
                cfcomment : state.comment
            };
            const response = await axios.post(url, body, {headers});
            console.log(response.data);
            if (response.data.status === 200) {
                console.log("인증 완료");
            }
        };

        return {
            state,
            handleProve,
        }
    }
}
</script>