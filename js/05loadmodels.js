var scene, camera, renderer, mixer, clock;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000);
camera.position.set(0, 50, 50);
camera.lookAt(new THREE.Vector3(0, 0, 0));
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xeeeeee);
renderer.shadowMap.enabled = true;//开启阴影渲染模式
document.body.appendChild(renderer.domElement);

// ground
var ground = new THREE.GridHelper(100, 100);
// scene.add(ground);

let plane = new THREE.PlaneBufferGeometry(100, 100, 100, 100);
let planeMat = new THREE.MeshStandardMaterial({ color: 0x999999 });
let planeMesh = new THREE.Mesh(plane, planeMat);
planeMesh.rotation.set(-Math.PI / 2, 0, 0);
planeMesh.castShadow = true;
planeMesh.receiveShadow = true;
scene.add(planeMesh);

// orbit
var orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.autoRotate = false;
orbit.enableDamp = true;
orbit.autoRotateSpeed = 0.1;

// stats
var stats = new Stats();
stats.setMode(2);
stats.domElement.style.width = '100px';
stats.domElement.style.height = '100px';
stats.domElement.style.border = "solid 2px red";
document.body.appendChild(stats.domElement);

// 窗口变动触发的方法
window.addEventListener('resize', onResize, false);
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Lights
let hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
scene.add(hemiLight);
scene.add(new THREE.AmbientLight(0xffffff, 1));

let spotLight = new THREE.SpotLight(0xffffff, 0.8);
spotLight.position.set(0, 50, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = 0.004;//影子的偏移距离
spotLight.shadow.mapSize.width = 1024 * 4;//影子的清晰度
spotLight.shadow.mapSize.height = 1024 * 4;
scene.add(spotLight);

// bgmusic
let audioListerner = new THREE.AudioListener();
let audio = new THREE.Audio(audioListerner);
new THREE.AudioLoader().load("res/audio/windchimes.mp3", audioClip => {
    audio.setBuffer(audioClip);
    audio.setLoop(true);
    audio.play();
})

clock = new THREE.Clock();
mixer = null;

// 1.obj loader
function loadObj() {
    new THREE.OBJLoader().load('res/models/obj/JadeToad.obj', obj => {
        obj.position.set(0, 0, 0);
        obj.scale.multiplyScalar(0.1);
        // obj.traverse(n => {
        //     if (n.isMesh) {
        //         // console.log(n);
        //         n.castShadow = true;
        //         n.receiveShadow = true;
        //         // n.material.wireframe = true;
        //         n.material.map = new THREE.TextureLoader().load('res/models/phoenix/textures/MatI_Ride_FengHuang_01a_baseColor.png');
        //         if (n.material.map) {
        //             n.material.map.anisotropy = 16;
        //         }
        //     }
        // });
        // scene.add(obj);
    });
}
// loadObj();

// 2.gltf loader
function loadGLTF() {
    new THREE.GLTFLoader().load('res/models/island/scene.gltf', gltf => {
        model = gltf.scene.children[0];
        model.position.set(0, 11, -2);
        model.scale.multiplyScalar(5);
        model.traverse(child => {
            if (child.isMesh) {
                // console.log(child);
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.map = new THREE.TextureLoader().load('res/models/island/textures/Material_baseColor.png');
                // console.log(child.material);
                // child.material.wireframe = true;     
            }
        });
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
        if (gltf.animations[0]) {
            let animationAction = mixer.clipAction(gltf.animations[0]);
            animationAction.play();
        }
    });
}
// loadGLTF();

// 3.fbx loader + animation loader
function fbxWithTex() {
    new THREE.FBXLoader().load('res/models/fbx/AlitaDance.fbx', fbx => {
        fbx.scale.multiplyScalar(0.02);
        fbx.position.set(0, 0, 0);
        fbx.traverse(child => {
            if (child.isMesh) {
                // child.material.emissive = new THREE.Color(1, 1, 1);
                // child.material.emissiveIntensity = 0.25;
                // child.material.map = new THREE.TextureLoader().load(fbxTex);
                child.castShadow = true;
                child.receiveShadow = true;
                // console.log(child);
            }
        });
        scene.add(fbx);
        mixer = new THREE.AnimationMixer(fbx);
        if (fbx.animations[0]) {
            let animationAction = mixer.clipAction(fbx.animations[0]);
            animationAction.play();
        }
    }, onProgress);
    function onProgress(progress) {
        console.log('资源已加载：' + Math.floor(progress.loaded / progress.total * 100) + '%');
    }
}
fbxWithTex();

function fbxWithoutTex() {
    let fbxTex = 'res/models/breath_of_the_wild/textures/mat_link_baseColor.png';
    new THREE.FBXLoader().load('res/models/breath_of_the_wild/Zelda02.fbx', fbx => {
        fbx.scale.multiplyScalar(0.02);
        fbx.position.set(0, 0, 0);
        fbx.traverse(child => {
            if (child.isMesh) {
                // child.material.emissive = new THREE.Color(1, 1, 1);
                // child.material.emissiveIntensity = 0.25;
                child.material.map = new THREE.TextureLoader().load(fbxTex);
                child.castShadow = true;
                child.receiveShadow = true;
                // console.log(child);
            }
        });
        scene.add(fbx);
    });
}
// fbxWithoutTex();

function init() {
    renderer.render(scene, camera);
    orbit.update();
    stats.update();
    if (mixer !== null) {
        mixer.update(clock.getDelta());
    }
    requestAnimationFrame(init);
}
init();