<template>
    <div>
        <h3>abt us</h3>
            ddd
    </div>
</template>

<script>
import { onMounted } from 'vue'
import {useRouter} from 'vue-router';
export default {
    setup () {

        const router = useRouter();

        onMounted(()=>{
            router.push({name:"Login"});
        })
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>