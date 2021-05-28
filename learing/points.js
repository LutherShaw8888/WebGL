var scene, camera, renderer, particles, windowWidth, windowHeight;

windowWidth = window.innerWidth;
windowHeight = window.innerHeight;

// 场景
scene = new THREE.Scene();
// 相机
camera = new THREE.PerspectiveCamera(45, windowWidth / windowHeight, 0.1, 1000);
camera.position.set(0, 10, 10);
camera.lookAt(scene.position);
// 渲染器
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x999999);
renderer.setSize(windowWidth, windowHeight);
document.body.appendChild(renderer.domElement);

// 地面网格
var ground = new THREE.GridHelper(100, 100);
scene.add(ground);

// 控制器
var controller = new THREE.OrbitControls(camera, renderer.domElement);

// 坐标轴
var axis = new THREE.AxesHelper(100);
scene.add(axis);


var geo = new THREE.Geometry();
// 粒子系统，基于线性函数
for (let i = 0; i < 400; i++) {
    var hanshu = Math.sin(i) + Math.cos(2 * i);
    var p1 = new THREE.Vector3(i, hanshu, 0);
    var p2 = new THREE.Vector3(i, 0, 2*i);

    var c1 = new THREE.Color(0xffffff * Math.random());
    var c2 = new THREE.Color(0xffff00 * Math.random());

    p1.velocity = 0;
    p2.velocity = 0;

    geo.vertices.push(p1,p2);
    geo.colors.push(c1,c2);

}

geo.morphAttributes = {};
var pmat = new THREE.PointsMaterial({ size: 1, vertexColors: true });
var pmesh = new THREE.Points(geo, pmat);
pmesh.position.setX(-50);
scene.add(pmesh);


// 渲染三原色粒子
function triPoints() {
    var p1 = new THREE.Vector3(1, 2, 3);
    var p2 = new THREE.Vector3(4, 5, 6);
    var p3 = new THREE.Vector3(7, 8, 9);
    var col1 = new THREE.Color(0xff0000);
    var col2 = new THREE.Color(0x00ff00);
    var col3 = new THREE.Color(0x0000ff);
    geo.vertices.push(p1, p2, p3);
    geo.colors.push(col1, col2, col3);
    geo.morphAttributes = {};
    var pmat = new THREE.PointsMaterial({ size: 3, vertexColors: true });
    var pmesh = new THREE.Points(geo, pmat);
    scene.add(pmesh);
}



function init() {
    renderer.render(scene, camera);
    controller.update();
    requestAnimationFrame(init);

    geo.vertices.forEach(child => {
        child.velocity -= 0.01 + Math.random()*0.01;
        child.y += child.velocity;
        child.z += child.velocity;
        if (child.y < 10) {
            child.velocity += 0.01 + Math.random()*0.01;
            child.y += child.velocity;
            child.z += child.velocity;
        }

    });
    geo.verticesNeedUpdate = true;

}
init();