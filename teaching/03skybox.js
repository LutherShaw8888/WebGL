var scene,camera,renderer;

scene =new THREE.Scene();
camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,10,10);
camera.lookAt(scene.position);
renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

var controller=new THREE.OrbitControls(camera,renderer.domElement);
var ground=new THREE.GridHelper(100,100);
scene.add(ground);

// 1.基于球体渲染
var sphere=new THREE.SphereGeometry(20,20,20);
var texLoader=new THREE.TextureLoader();
var texture=texLoader.load("res/pano.jpg");
var smat=new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide});
var smesh=new THREE.Mesh(sphere,smat);
scene.add(smesh);

// 2.基于六面体渲染

function init(){
    renderer.render(scene,camera);
    requestAnimationFrame(init);
    controller.update();
}

init();