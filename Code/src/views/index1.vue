<template>
    <div class="wrap">
        <div class="webglDom" ref="webglDom"></div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import TWEEN from "tween.js";
const ThreeBSP = require('three-js-csg')(THREE)

export default {
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
        }
    },
    methods: {
        // 场景
        initScene(){
            // 初始化画布宽高
            const container = this.$refs.webglDom;
            this.width = container.offsetWidth;
            this.height = container.offsetHeight;
            this.scene = new THREE.Scene();
            // this.scene.fog = new THREE.Fog(0x005577, 1, 2800)
            // this.scene.background = new THREE.Color( 0x000000 );
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            this.dummy = new THREE.Object3D();
        },
        // 相机
        initCamera(){
            this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.01, 10000);
            this.camera.position.set(0,1000,1800);
            this.camera.lookAt(this.scene.position);
            this.add(this.camera);
        },
        // 控制器
        initControls(){
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        },
        // 添加灯光
        initLight(){
            // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不同	
            // A start, 第二个参数是光源强度
            var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5);//模拟远处类似太阳的光源
            directionalLight.position.set( 0, 100, 0).normalize();
            this.add( directionalLight );
            //A end
            var ambient = new THREE.AmbientLight( 0xffffff, 0.9); //AmbientLight,影响整个场景的光源
            ambient.position.set(0,0,0);
            this.add( ambient );	   	
            //var pointlight = new THREE.PointLight(0x000000,1.5,2000);
            //scene.add(pointlight);	
        },
        // 渲染器
        initRenderer(){
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            })
            this.renderer.setClearColor(0x4682B4,1.0);
            // this.renderer.setClearAlpha(0);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.setSize(this.width, this.height);
            // 开启阴影支持
            this.renderer.shadowMap.enabled = true;
            // 阴影类型
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            this.$refs.webglDom.appendChild(this.renderer.domElement);
            this.render();
        },
        initBSP(l, h, w, x, y, z){
            let geometry = new THREE.BoxGeometry(l, h, w);
            let mesh = new THREE.Mesh(geometry)
            mesh.position.set(x, y, z)
            return new ThreeBSP(mesh);
        },
        initDoor(){
            // 地板
            let img = require('../assets/img/floor.jpg')
            let loader = new THREE.TextureLoader();
            loader.load(img, (texture) => {
                this.addBox(1000, 2, 1000, '#ddd', 0, 0, 0, texture)
            })
            // 墙
            this.addBox(1000, 200, 10, '#ddd', 0, 100, -495)
            this.addBox(1000, 200, 10, '#ddd', 0, 100, 495)
            this.addBox(10, 200, 1000, '#ddd', -495, 100, 0)
            this.addBox(10, 200, 1000, '#ddd', 495, 100, 0)
            
            // window.addEventListener("click", _this.onClick, false);
        },
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
        addBox (chang, gao, kuan, color, x, y, z, texture) {
            if(texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
                texture.repeat.set( 10, 10 );
            }
            const geometry = new THREE.BoxGeometry(chang, gao, kuan);
            const material = new THREE.MeshLambertMaterial ({
                color: color,
                map: texture ? texture : null
            });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(x, y, z);
            this.add(mesh);
        },
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
            this.initControls()
            this.initLight()
            this.initDoor()
        }
    },
    mounted(){
        this.$nextTick(this.init);
    }
}
</script>

<style lang="scss">
    .wrap{
        width: 100%;
        height: 100%;
        // background: url('../assets/img/5.jpg') no-repeat;
        background-size: 100% 100%;
        .webglDom{
            width: 100%;
            height: 100%;
        }
    }
</style>