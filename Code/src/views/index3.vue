<template>
    <div class="wrap">
        <div class="webglDom" ref="webglDom"></div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
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
            this.scene.fog = new THREE.Fog(0x005577, 1, 2800)
            // this.scene.background = new THREE.Color( 0x000000 );
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            this.dummy = new THREE.Object3D();
        },
        // 相机
        initCamera(){
            this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.01, 10000);
            this.camera.position.set(0,0,500);
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
			amdLight.position.set( 500, 500, 800 )
			dirLight.position.set( 500, 500, 800 )
			this.add(amdLight);				// 环境光
			this.add(ponLight);			// 点光源
			this.add(dirLight);		// 方向光 类似太阳的光源
        },
        // 渲染器
        initRenderer(){
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            })
            // this.renderer.setClearColor(0x4682B4,1.0);
            this.renderer.setClearAlpha(0);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.setSize(this.width, this.height);
            // 开启阴影支持
            this.renderer.shadowMap.enabled = true;
            // 阴影类型
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            document.querySelector(".webglDom").appendChild(this.renderer.domElement);
            this.render();
        },
        initBSP(l, h, w, x, y, z){
            let geometry = new THREE.BoxGeometry(l, h, w);
            let mesh = new THREE.Mesh(geometry)
            mesh.position.set(x, y, z)
            return new ThreeBSP(mesh);
        },
        initDoor(){
            let frameBSP = this.initBSP(150, 230, 6, 0, 0, 0)   // 门框
            let doorBSP = this.initBSP(130, 220, 6, 0, -5, 0)   // 门占位
            let resultBSP = frameBSP.subtract(doorBSP); // 取交集
            let result = resultBSP.toMesh();        // 相交部分转换为mesh
            let boxGeometry = result.geometry;      // 转成geometry
            let boxMaterial = new THREE.MeshLambertMaterial ({     // 添加材质
                color: '#999'
            });
            let wallMesh = new THREE.Mesh(boxGeometry,boxMaterial);
            this.add(wallMesh);

            let img = require('../assets/img/4.jpg')
            let loader = new THREE.TextureLoader();
            loader.load(img,(texture) => {
                // 模型的长、宽、高
                const geometry = new THREE.BoxGeometry(100, 100, 100);
                // 模型的材质
                const material = new THREE.MeshLambertMaterial ({
                    color: '#999',
                    map: texture
                });
                // 生成一个 Mesh
                const mesh = new THREE.Mesh(geometry, material);
                // 位置
                mesh.position.set(0, 0, 0);
                this.add(mesh)
                window.addEventListener("click", this.onClick, false);
            })
            
        },
        onClick(event){
            event.preventDefault();
            // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            var intersects = this.raycaster.intersectObjects(this.scene.children, true);
            console.log(intersects)
            if (intersects.length > 0) {
                if(this.isOpenDoor){
                    this.dummy.rotation.y -= 0.25*Math.PI;
                    this.isOpenDoor = false;
                }else{      		
                    this.dummy.rotation.y += 0.25*Math.PI;
                    this.isOpenDoor = true;
                }
            }
        },
        addBox (chang, gao, kuan, color, x, y, z) {
            const geometry = new THREE.BoxGeometry(chang, gao, kuan);
            const material = new THREE.MeshLambertMaterial ({
                color: color
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
        background: url('../assets/img/5.jpg') no-repeat;
        background-size: 100% 100%;
        .webglDom{
            width: 100%;
            height: 100%;
        }
    }
</style>