webpackJsonp([4],{"+vB+":function(e,t){},ASex:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("Ml+6"),s=i("BMSc"),r=i("vy4U"),a=i.n(r),o=(i("C+g1")(n),{name:"Cinema",data:function(){return{width:0,height:0,scene:null,camera:null,controls:null,renderer:null,isOpenDoor:!0,raycaster:"",mouse:"",dummy:"",seatNum:60,rowNum:9,active:0,centerPoint:0}},methods:{toLocation:function(e,t){var i=this,n=this.scene.getObjectByName("door"),s=n.rotation,r=this.camera.position,o=Math.ceil(e/this.rowNum),h=e%this.rowNum==0?this.rowNum:e%this.rowNum,c=Math.ceil(this.centerPoint/this.rowNum),d=this.centerPoint%this.rowNum==0?this.rowNum:this.centerPoint%this.rowNum,u=0,m=0,l=0,w=r.x,f=r.y,p=r.z;e===this.centerPoint?(u=0,m=0,l=0,w=0,f=50,p=600):(o<c?(u=-.1*(c-o),f=-40*(c-o)):(u=.1*(o-c),f=40*(o-c)),h<d?(m=.1*(d-h),w=30*(d-h)):(m=-.1*(h-d),w=-30*(h-d)));new a.a.Tween({x:s.x,y:s.y,z:s.z}).to({x:u,y:m,z:l},500).easing(a.a.Easing.Linear.None).onUpdate(function(){n.rotation.set(this.x,this.y,this.z)}).start(),new a.a.Tween({cX:r.x,cY:r.y,cZ:r.z}).to({cX:w,cY:f,cZ:p},500).easing(a.a.Easing.Linear.None).onUpdate(function(){i.camera.position.set(this.cX,this.cY,this.cZ)}).start();this.active=t},initScene:function(){var e=this.$refs.webglDom;this.width=e.offsetWidth,this.height=e.offsetHeight,this.scene=new n.Scene,this.scene.fog=new n.Fog(21879,1,2800),this.scene.background=new n.Color(0),this.raycaster=new n.Raycaster,this.mouse=new n.Vector2,this.dummy=new n.Object3D},initCamera:function(){this.camera=new n.PerspectiveCamera(45,this.width/this.height,.01,1e4),this.camera.position.set(0,50,600),this.add(this.camera),this.camera.lookAt(this.scene.position)},initControls:function(){this.controls=new s.a(this.camera,this.renderer.domElement)},initLight:function(){var e=new n.AmbientLight("#fff"),t=new n.DirectionalLight("#eee"),i=new n.PointLight("#eee");e.position.set(500,500,800),t.position.set(500,500,800),this.add(e),this.add(i),this.add(t)},initRenderer:function(){this.renderer=new n.WebGLRenderer({antialias:!0,alpha:!0}),this.renderer.setClearColor(4620980,1),this.renderer.setClearAlpha(0),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.setSize(this.width,this.height),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=n.PCFSoftShadowMap,this.$refs.webglDom.appendChild(this.renderer.domElement),this.render()},initScreen:function(){var e=this,t=i("MNtS");(new n.TextureLoader).load(t,function(t){var i=new n.BoxGeometry(1400,800,2),s=new n.MeshLambertMaterial({color:"#ccc",map:t});s.transparent=!0;var r=new n.Mesh(i,s);r.position.set(-65,-5,-2),e.dummy.add(r),e.dummy.position.set(65,-30,-800),e.dummy.name="door",e.add(e.dummy)})},onClick:function(e){e.preventDefault();this.mouse.x=e.clientX/window.innerWidth*2-1,this.mouse.y=-e.clientY/window.innerHeight*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);var t=this.raycaster.intersectObjects(this.scene.children,!0),i=this.scene.getObjectByName("door");if(t.length>0)if(this.isOpenDoor){console.log(i);var n=new a.a.Tween({y:0});n.to({y:-.25*Math.PI},1e3),n.easing(a.a.Easing.Elastic.Out),n.onUpdate(function(){i.rotation.set(0,this.y,0)}).start(),this.isOpenDoor=!1}else{var s=new a.a.Tween({y:-.25*Math.PI});s.to({y:0},1e3),s.easing(a.a.Easing.Elastic.Out),s.onUpdate(function(){i.rotation.set(0,this.y,0)}).start(),this.isOpenDoor=!0}},addBox:function(e,t,i,s,r,a,o){var h=new n.BoxGeometry(e,t,i),c=new n.MeshLambertMaterial({color:s}),d=new n.Mesh(h,c);d.position.set(r,a,o),this.add(d)},add:function(e){this.scene.add(e)},render:function(){this.renderer.render(this.scene,this.camera),a.a.update(),requestAnimationFrame(this.render)},init:function(){this.initScene(),this.initCamera(),this.initRenderer(),this.initLight(),this.initScreen()}},mounted:function(){var e=Math.floor(this.rowNum/2),t=Math.floor(this.seatNum/this.rowNum)/2;this.active=Math.ceil(e+t*this.rowNum),this.centerPoint=Math.ceil(e+t*this.rowNum)+1,this.$nextTick(this.init)}}),h={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"wrap"},[i("div",{ref:"webglDom",staticClass:"webglDom"}),e._v(" "),i("div",{staticClass:"operateArea"},[i("div",{staticClass:"area-top"},e._l(e.seatNum,function(t,n){return i("div",{key:n,class:{activeColor:e.active==n},on:{click:function(i){return e.toLocation(t,n)}}})}),0)])])},staticRenderFns:[]};var c=i("VU/8")(o,h,!1,function(e){i("+vB+")},null,null);t.default=c.exports},MNtS:function(e,t,i){e.exports=i.p+"static/img/8.cba89fc.jpg"}});
//# sourceMappingURL=4.91dbcf91c8711af0d5fd.js.map