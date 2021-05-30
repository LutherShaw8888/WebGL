var scene, camera, renderer, mixer, clock;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 18, 20);
camera.lookAt(new THREE.Vector3(0, 0, 0));
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xeeeeee);
document.body.appendChild(renderer.domElement);

// grid
var ground = new THREE.GridHelper(100, 100);
scene.add(ground);

// orbit
var orbit = new THREE.OrbitControls(camera,renderer.domElement);
orbit.autoRotate = false;
orbit.enableDamp = true;
orbit.autoRotateSpeed = 0.1;

// stats
var stats = new Stats();
stats.setMode(0);
stats.domElement.style.width = '100px';
stats.domElement.style.height = '100px';
stats.domElement.style.border = "solid 2px red";
document.body.appendChild(stats.domElement);

// 窗口变动触发的方法
window.addEventListener('resize', onResize, { passive: true });
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// HemisphereLight
let hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 1);
scene.add(hemiLight);

clock = new THREE.Clock();
mixer = null;


// 1.obj loader
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
    scene.add(obj);
});

// 2.gltf loader
new THREE.GLTFLoader().load('res/models/phoenix/scene.gltf', gltf => {
    model = gltf.scene.children[0];
    model.position.set(0, -2, -2);
    model.scale.multiplyScalar(0.05);
    // model.material.map=new THREE.MeshLambetMaterial();
    // model.material=new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('res/models/phoenix/textures/MatI_Ride_FengHuang_01a_baseColor.png')});
    model.traverse(n => {
        if (n.isMesh) {
            // console.log(n);
            n.castShadow = true;
            n.receiveShadow = true;
            // n.material.wireframe = true;
            n.material.emissiveMap = new THREE.TextureLoader().load('res/models/phoenix/textures/MatI_Ride_FengHuang_01a_baseColor.png');
            if (n.material.map) {
                n.material.map.anisotropy = 16;
            }
        }
    });
    // scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    if (gltf.animations[0]) {
        let animationAction = mixer.clipAction(gltf.animations[0]);
        animationAction.play();
    }
});


// 3.fbx loader + animation loader



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