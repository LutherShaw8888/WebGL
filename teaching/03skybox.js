var scene, camera, renderer;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 10);
camera.lookAt(scene.position);
renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xeeeeee);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controller = new THREE.OrbitControls(camera, renderer.domElement);
var ground = new THREE.GridHelper(100, 100);
// scene.add(ground);

// 1.基于球体渲染
function sphereMode() {
    var sphere = new THREE.SphereGeometry(20, 200, 200);
    var texLoader = new THREE.TextureLoader();
    var texture = texLoader.load("../res/pano.jpg");
    var smat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    var smesh = new THREE.Mesh(sphere, smat);
    smesh.geometry.scale(-1, 1, 1);
    scene.add(smesh);
}
// sphereMode();

//非极点球
function noPolarBall() {
    var objLoader = new THREE.OBJLoader();
    objLoader.load('res/models/obj/ball.obj', obj => {
        obj.traverse(child => {
            child.material.map = new THREE.TextureLoader().load('../res/pano.jpg');
        })
        obj.geometry.scale(-1, 1, 1);
        scene.add(obj);
    })
}
// noPolarBall();

// 2.基于六面体渲染
function sixsideMode() {
    var texLoader = new THREE.TextureLoader();
    var imgSrc = ['../res/sixSides/right.jpg', '../res/sixSides/left.jpg', '../res/sixSides/up.jpg', '../res/sixSides/bottom.jpg', '../res/sixSides/front.jpg', '../res/sixSides/back.jpg',];//右左上下前后
    var imgMat = [];
    for (var i = 0; i < imgSrc.length; i++) {
        var tex = texLoader.load(imgSrc[i]);
        var mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
        imgMat.push(mat);
    }
    var cube = new THREE.BoxGeometry(100, 100, 100);
    var cmesh = new THREE.Mesh(cube, imgMat);
    cmesh.geometry.scale(-1, 1, 1);
    scene.add(cmesh);
}
// sixsideMode();
//add BGM
function bgm() {
    var audioListener = new THREE.AudioListener();
    var audioSource = new THREE.Audio(audioListener);
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load('res/audio/tea.mp3', audioClip => {
        playAudio(audioClip);
    });
    function playAudio(audioClip) {
        audioSource.setBuffer(audioClip);
        audioSource.setLoop(true);
        audioSource.play();
    }
}

//pano video
videoNode = document.createElement('video');
videoNode.src = "../res/video/video01.mp4";
videoNode.autoplay = true;
videoNode.loop = true;
videoNode.preload = "auto";
videoNode.autoload = true;
videoTexture = new THREE.VideoTexture(videoNode);

var sphere = new THREE.SphereBufferGeometry(50, 20, 20);
var mat = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide });
var mesh = new THREE.Mesh(sphere, mat);
mesh.position.set(0, 0, 0);
// scene.add(mesh);



function init() {
    renderer.render(scene, camera);
    requestAnimationFrame(init);
    controller.update();
}

init();