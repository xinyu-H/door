<template>
    <div class="wrap">
        <div class="webglDom" ref="webglDom"></div>
        <div class="operateArea">
            <div class="area-top">
                <div class="area-top-screen">
                    <div></div>
                </div>
                <div class="area-top-seat">
                    <div class="seat" v-for="(v, i) in seatNum" :key="i" :class="{'activeColor': active == i}" @click="toLocation(v, i)"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import TWEEN from "tween.js";
const ThreeBSP = require('three-js-csg')(THREE)

export default {
    name: 'Cinema',
    data(){
        return {
            width: 0,
            height: 0,
            scene: null,
            camera: null,
            controls: null,
            renderer: null,
            isOpenDoor: true,
            // 鼠标位置
            raycaster: '',
            mouse: '',
            dummy: '',

            seatNum: 60,
            rowNum: 9,
            active: 0,
            centerPoint: 0
        }
    },
    methods: {
        toLocation(val, index) {
            let _this = this
            let door = this.scene.getObjectByName('door');
            let position = door.rotation;                   // 获取上一次物体的 x, y, z
            let cameraPosition = this.camera.position       // 获取上一次相机的 x, y, z
            let row = Math.ceil(val / this.rowNum);         // 点击位置的排
            let col = val % this.rowNum === 0 ? this.rowNum : val % this.rowNum;        // 点击位置的列
            let centerPointRow = Math.ceil(this.centerPoint / this.rowNum);             // 中心点的排
            let centerPointCol = this.centerPoint % this.rowNum === 0 ? this.rowNum : this.centerPoint % this.rowNum;   // 中心点的列
            // 物体要改变的值
            let x = 0;
            let y = 0;
            let z = 0;
            // 相机要改变的值
            let cX = cameraPosition.x
            let cY = cameraPosition.y
            let cZ = cameraPosition.z
            if(val === this.centerPoint) {
                x = 0;
                y = 0;
                z = 0;
                cX = 0;
                cY = 30;
                cZ = 800;
            } else {
                if(row < centerPointRow) {
                    x = (centerPointRow - row) * -.1
                    cY = (centerPointRow - row) * -40
                    // cZ = 500 - ((centerPointRow - row) * 40)
                } else {
                    x = (row - centerPointRow) * .1
                    cY = (row - centerPointRow) * 40
                    // cZ = 500 + ((row - centerPointRow) * 40)
                }

                if(col < centerPointCol) {
                    y = (centerPointCol - col) * .1
                    cX = (centerPointCol - col) * 30
                } else {
                    y = (col - centerPointCol) * -.1
                    cX = (col - centerPointCol) * -30
                }
                // cZ = 500 + ((row - centerPointRow) * 100)
            }
            console.log(cX, cY, cZ)
            // console.log(val, this.centerPoint , row+'排', col+'列', centerPointRow+'排', centerPointCol+'列')
            
            // 对物体进行旋转
            let openDoor = new TWEEN.Tween({
                x: position.x,
                y: position.y,
                z: position.z
            }).to({ x, y, z }, 500).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                door.rotation.set(this.x, this.y, this.z);
            }).start();
            // 对相机进行旋转
            let openCamera = new TWEEN.Tween({
                cX: cameraPosition.x,
                cY: cameraPosition.y,
                cZ: cameraPosition.z
            }).to({ cX, cY, cZ }, 500).easing(TWEEN.Easing.Linear.None).onUpdate(function () {
                _this.camera.position.set(this.cX, this.cY, this.cZ);
            }).start();

            this.active = index
        },
        // 场景
        initScene(){
            // 初始化画布宽高
            const container = this.$refs.webglDom;
            this.width = container.offsetWidth;
            this.height = container.offsetHeight;
            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.Fog(0x005577, 1, 2800)
            this.scene.background = new THREE.Color( 0x000000 );
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            this.dummy = new THREE.Object3D();
        },
        // 相机
        initCamera(){
            this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.01, 10000);
            this.camera.position.set(0,30,800);
            this.add(this.camera);
            this.camera.lookAt(this.scene.position);
        },
        // 控制器
        initControls(){
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        },
        // 添加灯光
        initLight(){
            var amdLight = new THREE.AmbientLight('#fff');
			var dirLight = new THREE.DirectionalLight('#eee')
			var ponLight = new THREE.PointLight('#eee')
			// amdLight.castShadow = true
			amdLight.position.set( 500, 500, 800 )
			dirLight.position.set( 500, 500, 800 )
			this.add(amdLight);				// 环境光
			this.add(ponLight);			// 点光源
			this.add(dirLight);		// 方向光
        },
        // 渲染器
        initRenderer(){
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            })
            this.renderer.setClearColor(0x4682B4,1.0);
            this.renderer.setClearAlpha(0);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.setSize(this.width, this.height);
            // 开启阴影支持
            this.renderer.shadowMap.enabled = true;
            // 阴影类型
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.$refs.webglDom.appendChild(this.renderer.domElement);
            this.render();
        },
        // 创建屏幕
        initScreen(){
            let _this = this;
            let img = require('../assets/img/8.jpg')
            let loader = new THREE.TextureLoader();
            loader.load(img,function(texture){
                const geometry = new THREE.BoxGeometry(1400, 800, 2);
                const material = new THREE.MeshLambertMaterial ({
                    color: '#ccc',
                    map: texture
                });
                material.transparent = true;
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(-65, -5, -2);
                _this.dummy.add(mesh)
                _this.dummy.position.set(65, -30, -800);
                _this.dummy.name = 'door'
                _this.add(_this.dummy);
                // window.addEventListener("click", _this.onClick, false);
            })
        },
        // 物体点击事件
        onClick(event){
            event.preventDefault();
            let _this = this;
            // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.camera);
            let  intersects = this.raycaster.intersectObjects(this.scene.children, true);
            let door = this.scene.getObjectByName('door')
            if (intersects.length > 0) {
                if(this.isOpenDoor){
                    console.log(door)
                    // door.rotation.y -= 0.25*Math.PI;
                    let openDoor = new TWEEN.Tween({y: 0})
                    openDoor.to({y: -0.25*Math.PI}, 1000);
                    openDoor.easing(TWEEN.Easing.Elastic.Out);
                    openDoor.onUpdate(function () {
                        door.rotation.set(0, this.y , 0);
                    }).start();
                    this.isOpenDoor = false;
                } else {      		
                    // door.rotation.y += 0.25*Math.PI;
                    let closeDoor = new TWEEN.Tween({y: -0.25*Math.PI})
                    closeDoor.to({y: 0},1000);
                    closeDoor.easing(TWEEN.Easing.Elastic.Out);
                    closeDoor.onUpdate(function () {
                        door.rotation.set(0, this.y, 0);
                    }).start();
                    this.isOpenDoor = true;
                }
            }
        },
        // 创建物体
        addBox (chang, gao, kuan, color, x, y, z) {
            const geometry = new THREE.BoxGeometry(chang, gao, kuan);
            const material = new THREE.MeshLambertMaterial ({
                color: color
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            this.add(mesh);
        },
        // 添加物体
        add (obj) {
            this.scene.add(obj);
        },
        render () {
            this.renderer.render(this.scene, this.camera);
            TWEEN.update();
            requestAnimationFrame(this.render);
        },
        init () {
            this.initScene()
            this.initCamera()
            this.initRenderer()
            // this.initControls()
            this.initLight()
            this.initScreen()
        }
    },
    mounted(){
        let middle = Math.floor(this.rowNum / 2)
        let row = Math.floor(this.seatNum / this.rowNum) / 2
        this.active = Math.ceil(middle + (row * this.rowNum))
        this.centerPoint = Math.ceil(middle + (row * this.rowNum)) + 1
        this.$nextTick(this.init);
    }
}
</script>

<style lang="scss">
    .wrap {
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
        display: flex;
        .webglDom {
            width: 80%;
            height: 100%;
            // background: url('../assets/img/7.jpg') no-repeat;
            background-size: 100% 100%;
            canvas {
                width: 100%;
            }
        }
        .operateArea {
            width: 20%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            box-shadow: 0px 0px 2px 5px #333;
            padding: 20px 10px;
            .area-top {
                width: 100%;
                height: auto;
                // justify-content: space-around;
                .area-top-screen {
                    width: 100%;
                    height: 20px;
                    display: flex;
                    justify-content: space-around;
                    >div {
                        width: 70%;
                        height: 20px;
                        border-radius: 6px;
                        border: 2px solid rgb(206, 206, 206);
                    }
                }
                .area-top-seat {
                    width: 100%;
                    height: auto;
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 30px;
                    >.seat {
                        width: 8.5%;
                        height: 26px;
                        border-radius: 6px;
                        border: 2px solid rgb(206, 206, 206);
                        margin: 4px;
                    }
                    .activeColor {
                        border: 2px solid rgb(25, 112, 199);
                        background-color: #39f;
                    }
                }
            }
        }
    }
</style>