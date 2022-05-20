<template>
    <div>
        <!-- Header-->
        <header class="py-5 bg-dark" >
        <div class="container px-4 px-lg-5 my-5 bg-white">
            <div class="text-center fonts">
                <h1 class="display-4 fw-bolder tracking-in-expand-fwd" style="font-size:6rem;">Health Challenge!!</h1>
                <p class="lead fw-normal mb-0">운동하자!!</p>
            </div>
        </div>
        </header>

        
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="css" scoped>

@-webkit-keyframes tracking-in-expand-fwd{0%{letter-spacing:-.5em;-webkit-transform:translateZ(-700px);transform:translateZ(-700px);opacity:0}40%{opacity:.6}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}@keyframes tracking-in-expand-fwd{0%{letter-spacing:-.5em;-webkit-transform:translateZ(-700px);transform:translateZ(-700px);opacity:0}40%{opacity:.6}100%{-webkit-transform:translateZ(0);transform:translateZ(0);opacity:1}}

.fonts {
    font-family: 'Do Hyeon', sans-serif;
}

.tracking-in-expand-fwd{
    -webkit-animation:tracking-in-expand-fwd 2s cubic-bezier(.215,.61,.355,1.000) both;animation:tracking-in-expand-fwd 2s cubic-bezier(.215,.61,.355,1.000) both
}
</style>