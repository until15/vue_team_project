<template>
    <div class="padding-tb">
        <div class="container px-4 px-lg-5 mt-5 mb-6">
            <div class="text-center">
                <h3 class="display-4 fw-bolder text-tb">내 활동</h3>
            </div>
            <div>
                <el-tabs v-model="state.menu" class="demo-tabs">
                    
                    <!-- 내 첼린지 -->
                    <el-tab-pane label="내 첼린지" name="1">
                        <my-challenge></my-challenge>
                    </el-tab-pane>

                    <!-- 내 인증 -->
                    <el-tab-pane label="내 인증" name="2">
                        <my-confirm></my-confirm>
                    </el-tab-pane>

                    <!-- 찜 목록 -->
                    <el-tab-pane label="찜 목록" name="3">
                        <my-bookmark></my-bookmark>
                    </el-tab-pane>

                    <!-- 좋아요 목록 -->
                    <el-tab-pane label="좋아요 목록" name="4">
                        <my-like></my-like>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from '@vue/reactivity';
import myChallenge from './challenge/MyChallenge.vue';
import myConfirm from './Confirm/MyConfirm.vue';
import myBookmark from './mypage/MyBookmarkList.vue';
import myLike from './mypage/MyLikeList.vue';
import { ref } from 'vue'

export default {
    components : {
        myChallenge,
        myConfirm,
        myBookmark,
        myLike
    },

    setup () {
        const state = reactive({
            menu : ref('1'),
        });

        return {
            state,
        }
    }
}
</script>

<style lang="scss" scoped>

</style>