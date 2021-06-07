var scene, camera, renderer, mixer, clock, guiData, gui, myProgress;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.set(0, 18, 50);
// camera.lookAt(new THREE.Vector3(0, -800, 80));
// camera.rotation.set(1.16, -0.12, 0.27);
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xeeeeee);
renderer.shadowMap.enabled = true;//开启阴影渲染模式
document.body.appendChild(renderer.domElement);

// ground
var ground = new THREE.GridHelper(100, 100);
scene.add(ground);

// orbit
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.autoRotate = false;
orbit.enableDamp = true;
orbit.autoRotateSpeed = 0.1;
orbit.target = new THREE.Vector3(0, 18, 0);

// Lights
let hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
scene.add(hemiLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

// 窗口变动触发的方法
window.addEventListener('resize', onResize, false);
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//GUI
guiData = {
    资源已加载: 0,
    hemiLightZ: 0, //灯光y轴的位置
    Y轴旋转: 0, //球的x轴的位置
    audioPlay: false,
    音量: 0.3
};

gui = new dat.GUI();

var progress = gui.add(guiData, "资源已加载",0,100).min(0).max(100);
gui.add(guiData, "hemiLightZ", -5, 5, 0.01);
gui.add(guiData, "Y轴旋转", -36, 36, 0.01);

let guiFolder = gui.addFolder('音频控制');
guiFolder.add(guiData, "audioPlay");
guiFolder.add(guiData, "音量", 0, 2, 0.01);


var statesFolder = gui.addFolder('动画');
var dropdown = { 状态: '' };
var states = ['move', 'Rotate'];
var clipCtrl = statesFolder.add(dropdown, '状态').options(states);
// clipCtrl.onChange(function (res) {
//     aniState=res;
//     // console.log(res);
// });

progress.onChange(val => {

    console.log("onChange:" + val);

})


var clock = new THREE.Clock(), mixer = null;
function fbxWithoutTex() {
    new THREE.FBXLoader().load('res/models/breath_of_the_wild/Zelda.fbx', fbx => {
        fbx.scale.multiplyScalar(0.2);
        fbx.position.set(0, 0, 0);
        fbx.traverse(child => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                // console.log(child);
            }
        });
        scene.add(fbx);
    }, onProgress);
    function onProgress(progress) {
        console.log('资源已加载：' + Math.floor(progress.loaded / progress.total * 100) + '%');
        myProgress = Math.floor(progress.loaded / progress.total * 100) + '%';
        document.getElementById('bg-frame').style.width=progress.loaded / progress.total;
        document.getElementById('input').value=myProgress; 
    }
}
fbxWithoutTex();

function init() {
    renderer.render(scene, camera);
    orbit.update();
    if (mixer !== null) {
        mixer.update(clock.getDelta());
    }
    // guiData.资源已加载 = myProgress;
    requestAnimationFrame(init);
}
init();