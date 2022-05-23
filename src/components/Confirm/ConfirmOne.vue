<template>
    <div>
        <div>
            <h3>인증 상세</h3>
            {{state.cfno}}
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
            cfno : route.query.cfno
        });

        return {state}
    }
}
</script>

<style lang="scss" scoped>

</style>