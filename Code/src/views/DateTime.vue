<template>
    <div class="DateTime">
        <div class="app-top">
            <div class="app-title">
                1. 输入两个时间计算相差时间<br>
                2. 输入一个过去时间计算距今时间<br>
                3. 输入一个未来时间可以进行倒计时<br>
                4. 输入格式 2000/01/01 或 2000/01/01 00:00:00 
            </div>
            <div class="app-content">
                <div class="content-left">
                    <p>请输入开始时间</p>
                    <van-field v-model="startDate" class="input" :class="{'color':startDate}" placeholder="开始时间" />
                </div>
                <div>--</div>
                <div class="content-right">
                    <p>请输入截止时间</p>
                    <van-field v-model="endDate" class="input" :class="{'color':endDate}" placeholder="截止时间" />
                </div>
                <p>{{ timeStr }}</p>
                <van-button type="info" class="confirmbtn" :class="{'showWidth': showReckonTime}" @click="clickBtn()" :disabled="disabled">确定</van-button>
                <van-button type="info" class="confirmbtn showWidth" @click="clickBtn('1')" v-if="showReckonTime">倒计时</van-button>
                <van-button type="danger" class="delbtn" @click="empty()" v-if="timeStr">清空</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DateTime',
    data () {
        return {
            startDate: '',
            endDate: '',
            timeStr: '',
            run: null,
        }
    },
    computed: {
        disabled () {
            if(this.startDate.trim() || this.endDate.trim()) return false;
            return true;
        },
        showReckonTime () {
            if(this.startDate.trim() && this.endDate.trim()) {
                return false;
            } else {
                let time = this.startDate.trim() || this.endDate.trim()
                return new Date(time).getTime() > Date.now()
            }
        }
    },
    methods: {
        clickBtn(val) {
            // 两个时间都输入了
            if(this.startDate.trim() && this.endDate.trim()) {
                if(!this.checkDate(this.startDate.trim()) || !this.checkDate(this.endDate.trim())) {
                    return vant.Toast('你输入的时间格式不对')
                }
                this.getDateTime(this.startDate, this.endDate)
            } else {
                if(!this.checkDate(this.startDate.trim() || this.endDate.trim())) {
                    return vant.Toast('你输入的时间格式不对')
                }
                this.getDateTime(this.startDate || this.endDate)
                if(val) {
                    this.run = setInterval(() => {
                        this.getDateTime(this.startDate || this.endDate)
                    }, 1000)
                    return
                }
            }
        },
        getDateTime(start, end = new Date()) {
            let sD = new Date(start).getTime()
            let eD = new Date(end).getTime()
            if(this.showReckonTime) [sD, eD] = [eD, sD];
            let diff = (eD - sD) / 1000
            if (diff <= 0) clearInterval(this.run);
            let d = this.patch(diff / (24 * 3600));
            let h = this.patch(diff / 3600 % 24);
            let m = this.patch(diff % 3600 / 60);
            let s = this.patch(diff % 60);
            this.timeStr = `${d}天${h}时${m}分${s}秒`
        },
        empty() {
            this.startDate = ''
            this.endDate = ''
            this.timeStr = ''
            clearInterval(this.run)
        },
        patch(str){
            str = parseInt(str)
            return +str <= 0 ? '00' : +str < 10 ? '0' + str : str;
        },
        checkDate(str) {
            return /^\d{4}\/\d{2}\/\d{2}$/i.test(str) || /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2}$/i.test(str)
        }
    },
    mounted () {
        
    }
}
</script>

<style lang="scss" scoped>
    .DateTime {
        width: 100%;
        height: 100%;
        padding: .1rem;
    }
    .app-title {
        width: 100%;
        height: auto;
        border-bottom: 1px dashed #aaa;
        padding-bottom: .1rem;
        font-size: .15rem;
    }
    .app-top {
        width: 100%;
        padding: .1rem;
        box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(150, 150, 150, 0.6);
        border-radius: .1rem;
    }
    .app-top .app-content {
        width: 100%;
        text-align: center;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .app-top .app-content > p {
        width: 100%;
        margin: .1rem 0;
    }
    .app-top .app-content>div {
        position: relative;
        width: 47%;
        height: 1rem;
        padding-top: .2rem;
        text-align: center;
        float: left;
    }
    .app-top .app-content>div:nth-child(2) {
        width: 5%;
    }
    .app-top >div .input{
        width: 100%;
        position: absolute;
        left: 50%;top: 70%;
        transform: translate(-50%, -50%);
        padding: .05rem .08rem;
        border-radius: .05rem;
        box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(150, 150, 150, 0.6);
    }
    .app-top >div .color{
        box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }
    .app-top .app-content >.confirmbtn {
        width: 80%;
        border-radius: .06rem;
        box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
    }
    .app-top .app-content >.showWidth {
        width: 40%;
    }
    .app-top .app-content >.delbtn {
        border-radius: .06rem;
    }
</style>