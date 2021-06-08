var scene, camera, renderer, mixer, clock, guiData, gui, avatar;
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

var progress = gui.add(guiData, "资源已加载", 0, 100).min(0).max(100);
gui.add(guiData, "hemiLightZ", -5, 5, 0.01);
gui.add(guiData, "Y轴旋转", -36, 36, 0.01);

let guiFolder = gui.addFolder('音频控制');
guiFolder.add(guiData, "audioPlay");
guiFolder.add(guiData, "音量", 0, 2, 0.01);


var statesFolder = gui.addFolder('角色动画');
var dropdown = { 状态: '' };
var states = ['walk', 'idle', 'Kick'];
var clipCtrl = statesFolder.add(dropdown, '状态').options(states);
// clipCtrl.onChange(function (res) {
//     aniState=res;
//     // console.log(res);
// });

progress.onChange(val => {
    console.log("onChange:" + val);
})


var clock = new THREE.Clock(), mixer = null;
function fbxWithTex() {
    new THREE.FBXLoader().load('res/models/fbx/AlitaAnis.fbx', fbx => {
        fbx.scale.multiplyScalar(0.02);
        fbx.position.set(0, 2, 0);
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
        avatar = fbx;
        mixer = new THREE.AnimationMixer(fbx);
        if (fbx.animations[0]) {
            // console.log(fbx.animations[0].name, fbx.animations[1].name, fbx.animations[2].name);

            clipCtrl.onChange(function (res) {
                // console.log(res);
                for (let i = 0; i < fbx.animations.length; i++) {
                    if (fbx.animations[i].name == res) {
                        animationAction = mixer.clipAction(fbx.animations[i]);
                        animationAction.play();
                    } else {
                        mixer.clipAction(fbx.animations[i]).stop();
                    }
                }
            });

        }
    }, onProgress);
    function onProgress(progress) {
        console.log('资源已加载：' + Math.floor(progress.loaded / progress.total * 100) + '%');
        myProgress = Math.floor(progress.loaded / progress.total * 100) + '%';

        document.getElementById('fg-bar').style.width = progress.loaded / progress.total;
        document.getElementById('fg-bar').innerHTML = myProgress;

        // var ss = document.styleSheets[0];
        // ss.insertRule("@keyframes progress-animation {0% { width: 0%; opacity: 1; }  100%{ width: " + Math.floor(progress.loaded / progress.total*100) + "%; opacity: 0; }}",3);


        // document.getElementById('input').value=progress.loaded / progress.total;
        // if(document.getElementById('input').value==1){
        //     setTimeout(() => {                
        //         document.getElementById('progressID').style.display='none';
        //     }, 1000);
        // }
    }
}
fbxWithTex();

var i = 0, j = 1, k = 2;
//click intersects
window.addEventListener("click", event => {
    event.preventDefault();
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;//threejs坐标点的标准化
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    let intersects = raycaster.intersectObject(avatar, true);
    intersects.forEach(child => {
        if (child.object instanceof THREE.Mesh) {
            console.log('aaaaa', child.object);
            mixer.clipAction(child.object.parent.animations[i % 3]).play();
            i++;
            mixer.clipAction(child.object.parent.animations[j % 3]).stop();
            j++;
            mixer.clipAction(child.object.parent.animations[k % 3]).stop();
            k++;
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


function init() {
    renderer.render(scene, camera);
    orbit.update();
    if (avatar) {
        avatar.rotation.y = guiData.Y轴旋转;
    }
    hemiLight.position.z = guiData.hemiLightZ;
    if (mixer !== null) {
        mixer.update(clock.getDelta());
    }
    requestAnimationFrame(init);
}
init();