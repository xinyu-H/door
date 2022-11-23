<template>
    <div class="wrap">
        <button @click="back">返回</button>
        <p>{{btnText}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            btnText: '测试',
            timer: null,
            timer2: null,
        }
    },
    methods: {
        back(){
            clearTimeout(this.timer)
            clearTimeout(this.timer2)

            this.timer2 = setTimeout(() => {
                this.btnText = this.btnText +1
            },10000)
        }
    },
    mounted(){
        this.timer = setTimeout(() => {
            this.btnText = this.btnText +1
        },10000)
    }
}
</script>

<style>

</style>