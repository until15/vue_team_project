<template>
    <div>

    </div>
</template>

<script>
import { onMounted } from 'vue';
import {useRouter} from 'vue-router';
export default {
    setup () {

        const router = useRouter();

        
        onMounted(() =>{
            if (self.name != 'reload') {
                    self.name = 'reload';
                    self.location.reload(true);
                }
                else self.name = ''
            router.push({name : "Login"});
        })

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>