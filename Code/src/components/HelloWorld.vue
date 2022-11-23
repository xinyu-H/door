<template>
    <div class="wrap">
        <iframe :src="src" frameborder="0"></iframe>
        <div v-for="(v,i) in divList" :key="i" :class="'div'+(i+1)" :style="{'background':v.color}">
            <span>div {{i+1}}</span>
        </div>
        <input
            class="upload-file-img"
            type="file"
            name="file"
            id="personsFile"
            multiple="multiple"
            accept="image/*"
            @change="uploadImg()"
        />
        <!-- <img :src="imgBase64" alt=""> -->
        <!-- <div class="div">3</div> -->
    </div>
</template>

<script>
    export default {
        data(){
            return {
                src: "https://www.baidu.com",
                divList: [{
                    color: 'tan'
                },{
                    color: 'tomato'
                },{
                    color: 'skyblue'
                },{
                    color: 'pink'
                },{
                    color: '#39f'
                },{
                    color: '#910'
                }],
                zIndex: 1,
                imgBase64: '',
            }
        },
        watch: {
            imgBase64(newVal){
                document.querySelector('.wrap').style.background = `url(${newVal})`;
                document.querySelector('.wrap').style.backgroundSize = `100% 100%`;
            }
        },
        methods: {
            // 上传照片的格式。
            uploadImg() {
                var  _fileName, personsFile
                personsFile = document.getElementById('personsFile').value;

                _fileName = personsFile.substring(personsFile.lastIndexOf('.') + 1).toLowerCase()
                if (
                    _fileName !== 'png' &&
                    _fileName !== 'jpg' &&
                    _fileName !== ''
                ) {
                    this.$message.error('上传图片格式不正确，请重新上传')
                    return
                }

                if (_fileName == '') {
                    return
                }
                var event = event || window.event
                
                let file0 = '';
                if(event.target.files[0]) file0 = event.target.files[0];this.getImgFile(file0)
            },
            getImgFile(file){
                var _this = this
                var reader = new FileReader()
                //转base64
                reader.onload = function(e) {
                    _this.imgBase64 = e.target.result
                }
                
                reader.readAsDataURL(file)
                var img = new Image()
                img.src = _this.imgBase64
                // let that = this;
                img.onload = function (){
                    _this.imgBase64 = _this.$Utils.Tools.image2Base64(img)
                    _this.imgBase64 = ''
                }
            },
            
            /**
             * 拖拽
             */
            drag(id) {
                let _this = this
                let odiv = document.querySelector(id)
                odiv.onmousedown = function(ev) {
                    this.style.zIndex = _this.zIndex ++;
                    var ev = ev || event;
                    let disX = ev.clientX - odiv.offsetLeft;
                    let disY = ev.clientY - odiv.offsetTop;
                    document.onmousemove = function(ev2) {
                        var ev2 = ev2 || event;
                        let left = ev2.clientX - disX;
                        let top = ev2.clientY - disY;
                        let w = document.documentElement.clientWidth || document.body.clientWidth;
                        let h = document.documentElement.clientHeight || document.body.clientHeight;
                        if(left > w - odiv.offsetWidth) {
                            left = w - odiv.offsetWidth
                        }
                        if(left < 0) {
                            left = 0;
                        }
                        if(top < 0) {
                            top = 0;
                        }
                        if(top > h - odiv.offsetHeight) {
                            top = h - odiv.offsetHeight
                        }
                        odiv.style.left = left + "px";
                        odiv.style.top = top + "px"
                    }
                    document.onmouseup = function(ev2) {
                        console.log(odiv.style.left.slice(0,-2), odiv.style.top.slice(0,-2))
                        document.onmousemove = null
                    }
                }
            }
        },
        mounted(){
            this.divList.forEach((v,i) => {
                this.drag('.div'+(i+1))
            });
            // this.$Api.Home.getData1({num: 3})
        }
    }
</script>

<style lang="scss" scoped>
    .wrap{
        width: 100%;
        height: 100%;
        div{
            position: absolute;
            width: 100px;
            height: 100px;
            line-height: 100px;
            font-weight: 800;
            font-size: 20px;
            text-align: center;
            span{
                color: #333;
            }
        }
    }
    
</style>
