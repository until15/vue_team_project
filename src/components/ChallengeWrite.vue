<template>
    <div>
    
        <!--  // form-data : "chgtitle":"aaa", "chgintro" : "bbb", "chgcontent" : "ccc", "chglevel" : 1,
    // "chgend" : yyyy-mm-dd 00:00:00, "recruitend" : yyyy-mm-dd 00:00:00, "chfee" : 10000 -->

        <!-- v-model="state.userid" ref="userid" -->
        <el-card shadow="always">
            <h3>챌린지 생성</h3>
            <hr />
            <el-form :inline="true" class="demo-form-inline" style="margin-bottom:-20px">
                <el-form-item label="제목" label-width="120px">
                    <el-input placeholder="제목" style="width:300px"></el-input>
                </el-form-item><br />

                <el-form-item label="소개" label-width="120px">
                    <el-input placeholder="소개" style="width:300px"></el-input>
                </el-form-item><br />

                <el-form-item label="내용" label-width="120px">
                    <el-input type="textarea" placeholder="내용" style="width:300px" />
                </el-form-item><br />

                <el-form-item label="난이도" label-width="120px">
                    <el-select v-model="value" class="m-2" placeholder="난이도" style="width:300px">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>         
                </el-form-item>
            </el-form>

        </el-card>

    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>