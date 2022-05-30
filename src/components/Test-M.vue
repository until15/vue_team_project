<template>
    <div>
        <h3>test</h3>
        {{state.startDate}}
        
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity'


export default {
    // data() {
    //     return {
    //     date1: "2022-05-08T15:00:00.000+00:00"
    //     };
    // },

    setup () {
        const state = reactive({
            startDate : '2022-05-08T15:00:00.000+00:00',
            test : "test"
        });

        return {
            state
        }
    },
    filters: {
        yyyyMMdd : function(value, maskStr = "*"){ //  yyyy MM dd 형태로 만들어줄거기 때문에 이렇게 이름을 지었음
            if (!value) {
                return "";
            }

            return maskStr.repeat(value.length);
        }
    }
}
</script>

<style lang="scss" scoped>

</style>