var scene, camera, renderer;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 10);
camera.lookAt(scene.position);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x999999);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 控制器
var controller = new THREE.OrbitControls(camera, renderer.domElement);


// 天空盒
var sphere=new THREE.SphereGeometry(20,20,20);

// 加载纹理
var txloader=new THREE.TextureLoader();
var texture=txloader.load("../res/pano.jpg");

// map接收纹理
var smat=new THREE.MeshBasicMaterial({map: texture,side:THREE.DoubleSide});
var smesh=new THREE.Mesh(sphere,smat);
scene.add(smesh);

// var cube =new THREE.BoxBufferGeometry(5,5,5);
// var cmat=new THREE.MeshBasicMaterial({color:0xff0000});
// var cmesh=new THREE.Mesh(cube,cmat);
// scene.add(cmesh);


function init() {
    renderer.render(scene, camera);
    requestAnimationFrame(init);
    controller.update();

}
init();