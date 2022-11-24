<template>
    <div class="wrap">
        <div class="webglDom" ref="webglDom"></div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

import TWEEN from "tween.js";
const ThreeBSP = require('three-js-csg')(THREE)

export default {
    name: 'RunBox',
    data(){
        return {
            width: 0,
            height: 0,
            scene: null,
            camera: null,
            controls: null,
            renderer: null,
            isOpenDoor: true,
            amdLight: null,
            dirLight: null,
            ponLight: null,
            formControls: null,
            line: null,
            // 鼠标位置
            raycaster: '',
            mouse: '',
            dummy: '',

            curve: null,
            loopTime: 10 * 1000,
            runBox: null,
            cubeList: [],
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
            this.scene.background = new THREE.Color( 0x000000 );
            this.raycaster = new THREE.Raycaster();
            this.mouse = new THREE.Vector2();
            this.dummy = new THREE.Object3D();
        },
        // 相机
        initCamera(){
            this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.01, 10000);
            this.camera.position.set(0, 0, 800);
            this.add(this.camera);
            this.camera.lookAt(this.scene.position);
        },
        // 控制器
        initControls(){
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        },
        // 添加灯光
        initLight(){
            this.amdLight = new THREE.AmbientLight('#aaa');
			this.dirLight = new THREE.DirectionalLight('#aaa')
			this.ponLight = new THREE.PointLight('#aaa')
			this.amdLight.position.set( 0, 0, 0 )
			this.dirLight.position.set( 0, 0, 0 )
            this.ponLight.position.set( 0, 0, 0 )
			this.add(this.amdLight);		    // 环境光
			this.add(this.dirLight);		    // 方向光
			this.add(this.ponLight);			// 点光源
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

            // 
            this.formControls = new TransformControls(this.camera, this.renderer.domElement)
            const mouse = new THREE.Vector2();
            this.renderer.domElement.addEventListener('click', (event) => {
                mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            }, false);

            // 方块点击检测
            const rayCaster = new THREE.Raycaster();
            rayCaster.setFromCamera(mouse, this.camera);
            const intersects = rayCaster.intersectObjects(this.cubeList);
            console.log(intersects)
            if (intersects.length) {
                intersects.forEach(v => {
                    this.formControls.attach(v.object); // 绑定controls和方块
                    this.add(this.formControls);
                })
                // const target = intersects[0].object;
            }

            // 修改曲线后同步修改实体线条
            this.formControls.addEventListener('dragging-changed', (event) => {
                if (!event.value) {
                    const points = this.curve.getPoints(50);
                    this.line.geometry.setFromPoints(points);
                }
            });

            this.render();
        },
        // 创建模型
        initScreen(){
            const initialPoints = [
                { x: 100, y: 50, z: -100 },
                { x: 100, y: -50, z: 100 },
                { x: -100, y: 0, z: 100 },
                { x: -100, y: 0, z: -100 }
            ];
            this.cubeList = initialPoints.map(v => {
                return this.addBox(10, 10, 10, '#fff', v.x, v.y, v.z);
            });
            this.curve = new THREE.CatmullRomCurve3(
                this.cubeList.map((cube) => cube.position) // 直接绑定方块的position以便后续用方块调整曲线
            );
            this.curve.curveType = 'chordal'; // 曲线类型
            this.curve.closed = true; // 曲线是否闭合
            const points = this.curve.getPoints(50); // 50等分获取曲线点数组
            this.line = new THREE.LineLoop(
                new THREE.BufferGeometry().setFromPoints(points),
                new THREE.LineBasicMaterial({ color: 0x00ff00 })
            ); // 绘制实体线条，仅用于示意曲线，后面的向量线条同理，相关代码就省略了

            this.runBox = this.addBox(10, 10, 10, '#fff', 0, 0, 0)
            this.add(this.line);
        },
        changePosition (t) {
            const position = this.curve.getPointAt(t); // t: 当前点在线条上的位置百分比，后面计算
            this.runBox.position.copy(position);
        },
        changeLookAt (t) {
            const tangent = this.curve.getTangentAt(t);
            const lookAtVec = tangent.add(this.runBox.position); // 位置向量和切线向量相加即为所需朝向的点向量
            this.runBox.lookAt(lookAtVec);
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
            return mesh
        },
        // 添加物体
        add (obj) {
            this.scene.add(obj);
        },
        render () {
            let time = Date.now();
            let t = (time % this.loopTime) / this.loopTime; // 计算当前时间进度百分比
            this.changePosition(t);
            this.changeLookAt(t);
            // 光处理 实时改变光源位置
            let vector = this.camera.position.clone();
            this.ponLight.position.set(vector.x,vector.y,vector.z); //点光源位置
            this.renderer.render(this.scene, this.camera);
            TWEEN.update();
            requestAnimationFrame(this.render);
        },
        init () {
            this.initScene()
            this.initCamera()
            this.initLight()
            this.initScreen()
            this.initRenderer()
            this.initControls()
        }
    },
    mounted(){
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
    }
</style>