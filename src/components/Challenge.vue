<template>
    <div>
        <h3>챌린지</h3>
        <router-link to="/challengewrite">생성</router-link>
        <hr />

        
        <div>
            <table border="1">
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>참가비</th>
                    <th>참가인원</th>
                    <th>좋아요</th>
                    <th>작성일</th>
                </tr>


            </table>
        </div>

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