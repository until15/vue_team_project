<template>
    <div>

    </div>
</template>

<script>
import { onMounted } from 'vue';
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';
export default {
    setup () {
        const router = useRouter();
        const store = useStore();

        onMounted(() => {
            
            if (confirm("로그아웃 하시겠습니까?")) {
                alert("로그아웃 완료");
                sessionStorage.removeItem("TOKEN");
                sessionStorage.removeItem("MEMAIL");
                store.commit('setLogged', false);
                store.commit('ClearMemail');
                router.push({name : 'Logout1'}); 
            }
        })

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>
