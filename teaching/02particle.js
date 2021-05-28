var scene,camera,renderer;

scene=new THREE.Scene();
camera=new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.set(0,10,10);
camera.lookAt(scene.position);

renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(0x999999);
document.body.appendChild(renderer.domElement);

function init() {
    renderer.render(scene,camera);
    requestAnimationFrame(init);
}
init();