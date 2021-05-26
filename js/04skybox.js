var scene, camera, renderer;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 2);
camera.lookAt(new THREE.Vector3(0, 0, 0));
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xeeeeee);
document.body.appendChild(renderer.domElement);

// sphere mode
function sphereMode() {
    var loader = new THREE.TextureLoader();
    var tex = loader.load("res/pano.jpg");
    var sphere = new THREE.SphereGeometry(10, 10, 10);
    var mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(sphere, mat);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
}
// sphereMode();


// box mode
function boxMode() {
    let loader = new THREE.TextureLoader();
    let imgSrc = ['res/sixSides/right.jpg', 'res/sixSides/left.jpg', 'res/sixSides/up.jpg', 'res/sixSides/bottom.jpg', 'res/sixSides/front.jpg', 'res/sixSides/back.jpg'];
    let mats = [];
    for (let i = 0; i < imgSrc.length; i++) {
        let tex = loader.load(imgSrc[i]);
        let mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
        mats.push(mat);
    }
    let cube = new THREE.BoxGeometry(100, 100, 100);
    let mesh = new THREE.Mesh(cube, mats);
    mesh.geometry.scale(-1, 1, 1);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
}
// boxMode();

// bgm
function bgMusic() {
    let listerner = new THREE.AudioListener();
    let audio = new THREE.Audio(listerner);
    let audioLoader = new THREE.AudioLoader();
    audioLoader.load('res/audio/tea.mp3', audioClip => {
        audio.setBuffer(audioClip);
        audio.setLoop(true);
        audio.play();
    });
}
// bgMusic();

// pano video
// sphere mode
function panoVideoMode() {
    // let videoNode = document.getElementById('video');
    let videoNode = document.createElement('video');
    videoNode.src="res/video/video01.mp4";
    videoNode.autoplay = true;
    videoNode.loop = true;
    let videoTexture = new THREE.VideoTexture(videoNode);
 
    var sphere = new THREE.SphereGeometry(10, 10, 10);
    var mat = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(sphere, mat);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
}
panoVideoMode();




// grid
var liyangground = new THREE.GridHelper(100, 100);
// scene.add(liyangground);

// orbit
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.autoRotate = true;
orbit.enableDamp = true;
orbit.autoRotateSpeed = 0.1;


function init() {
    renderer.render(scene, camera);
    orbit.update();
    requestAnimationFrame(init);
}
init();