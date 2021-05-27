var scene, camera, renderer,videoNode,videoTexture;
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
     videoNode = document.createElement('video');
    videoNode.src = "../res/video/video01.mp4";
    videoNode.autoplay = true;
    videoNode.loop = true;
    videoNode.preload = "auto";
    videoNode.autoload = true;
     videoTexture = new THREE.VideoTexture(videoNode);

    var sphere = new THREE.SphereGeometry(10, 10, 10);
    var mat = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide });
    var mesh = new THREE.Mesh(sphere, mat);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
}
panoVideoMode();




// click to change video
function changeVideo(src) {
    videoNode.src = src;
	videoTexture = new THREE.VideoTexture(videoNode);
	videoTexture.needsUpdate = true;
}



// grid
var liyangground = new THREE.GridHelper(100, 100);
// scene.add(liyangground);

// orbit
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.autoRotate = true;
orbit.enableDamp = true;
orbit.autoRotateSpeed = 0.1;


// add sprite
let uiTex_1 = new THREE.TextureLoader().load('../res/ui/LuBiao.png');
let uiMat_1 = new THREE.SpriteMaterial({
	map: uiTex_1
});
let ui_1 = new THREE.Sprite(uiMat_1);
ui_1.name="btn";
ui_1.position.set(5, 1, 0);
scene.add(ui_1);


window.addEventListener("click", event => {
    event.preventDefault();
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;//threejs坐标点的标准化
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObjects(scene.children);
    intersects.forEach(child=>{
        if(child.object instanceof THREE.Sprite){
            console.log('aaaaa',child.object.name);
            // changeVideo('../res/video/video02.mp4');
	}
	})


	// if (intersects.length > 0) {
	// 	let this_sel = intersects[0];
	// 	if (this_sel.object.type == 'Sprite') {
	// 		console.log('aaaaa')
	// 		window.open('https:720yun.com');
    //         changeVideo('../res/video/video02.mp4');
    //         console.log("clientX:" + event.clientX);
    //         console.log("clientY:" + event.clientY);
	// 	}
	// }

}, false);



// 窗口变动触发的方法
window.addEventListener('resize', onResize, false);
function onResize() {
    console.log('窗口缩放');
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function init() {
    renderer.render(scene, camera);
    orbit.update();
    requestAnimationFrame(init);
}
init();