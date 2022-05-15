<template>
    <div>
        <h3>인증하기</h3>
        {{state.jno}}
        <div>
            이미지 : <input type="file" /> <br />
            내용 : <input type="text" /> <br />
            <button @click="handleProve">인증하기</button>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import { useRoute } from 'vue-router';

export default {
    setup () {
        const route = useRoute();

        const state = reactive({
            jno : route.params.jno,
        });

        const handleProve = async()=> {

        };

        return {
            state,
            handleProve,
        }
    }
}
</script>