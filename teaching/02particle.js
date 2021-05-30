// 字段
var scene, camera, renderer;

// 场景
scene = new THREE.Scene();

// 相机
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 10);
camera.lookAt(scene.position);

// 渲染器
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x999999);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 控制器
var controller = new THREE.OrbitControls(camera, renderer.domElement);

// 地面
var ground = new THREE.GridHelper(100, 100);
scene.add(ground);

// 坐标轴
var axis = new THREE.AxesHelper(10);
scene.add(axis);

// 点，矩阵
var pContainer = new THREE.Geometry();
for (let i = 0; i < 200; i++) {
    var biaodashi = Math.sin(3 * i) * 111 + Math.pow(i, 3) / 3333;
    var p = new THREE.Vector3(i, biaodashi / 200, 0);
    var c = new THREE.Color(0xffffff * Math.random());
    p.velocity = 0;
    pContainer.vertices.push(p);
    pContainer.colors.push(c);
}
pContainer.morphAttributes = {};
// 6.实例化顶点类型材质球
var pmat = new THREE.PointsMaterial({ size: 1, vertexColors: true });
// 7.实例化顶点类型网格
var pmesh = new THREE.Points(pContainer, pmat);
pmesh.position.setX(-50);
// 8.把顶点网格放入场景中
scene.add(pmesh);

// 帧动画
function init() {
    renderer.render(scene, camera);
    requestAnimationFrame(init);
    controller.update();

    // 顶点运动
    pContainer.vertices.forEach(element => {
        element.velocity -= 0.05 + Math.random() * 0.05;
        element.y += element.velocity;
        element.x += element.velocity;
        element.z += element.velocity;

        if (element.y < 50 &&element.y>-50) {
            element.velocity += 0.05 + Math.random() * 0.05;
            element.y += element.velocity;
        }else{
            element.y=0;
        }

    });
    // 更新顶点位置
    pContainer.verticesNeedUpdate = true;
}







// 方法调用

// 点，三原色
function triPoints() {
    // 1.实例化点容器
    var pointContainer = new THREE.Geometry();
    // 2.实例化顶点位置
    var p1 = new THREE.Vector3(1, 2, 3);
    var p2 = new THREE.Vector3(4, 5, 6);
    var p3 = new THREE.Vector3(7, 8, 9);
    // 3.实例化顶点颜色
    var c1 = new THREE.Color(0xff0000);
    var c2 = new THREE.Color(0x00ff00);
    var c3 = new THREE.Color(0x0000ff);
    // 4.把顶点位置和颜色装进容器
    pointContainer.vertices.push(p1, p2, p3);
    pointContainer.colors.push(c1, c2, c3);
    // 5.开启morph属性
    pointContainer.morphAttributes = {};
    // 6.实例化顶点类型材质球
    var pmat = new THREE.PointsMaterial({ size: 4, vertexColors: true });
    // 7.实例化顶点类型网格
    var pmesh = new THREE.Points(pointContainer, pmat);
    // 8.把顶点网格放入场景中
    scene.add(pmesh);
}

init();