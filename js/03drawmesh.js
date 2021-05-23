let scene, camera, renderer, linemesh;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
camera.position.set(50, 60, 30);
camera.lookAt(scene.position);
renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xdddddd);
document.body.appendChild(renderer.domElement);

// gird
let grid = new THREE.GridHelper(1000, 100, 0xff0000);
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);

// axesHelper
let axes = new THREE.AxesHelper(500);
axes.material.opacity = 0.2;
axes.material.transparent = true;
scene.add(axes);

// orbitcontrols
let orbitcontrols = new THREE.OrbitControls(camera, renderer.domElement);

// let point_1 = new THREE.Vector3(0, 1, 5);
// let point_2 = new THREE.Vector3(1, 3, 7);
// let point_3 = new THREE.Vector3(5, 8, 0);
// go.vertices.push(point_1, point_2, point_3);
// go.colors.push(
//     new THREE.Color(0xff0000),
//     new THREE.Color(0x00ff00),
//     new THREE.Color(0x0000ff)
//     )

var rectLength = 120,
	rectWidth = 40;

var rectShape = new THREE.Shape();
rectShape.moveTo(0, 0);
rectShape.lineTo(0, rectWidth);
rectShape.lineTo(rectLength, rectWidth);
rectShape.lineTo(rectLength, 0);
rectShape.lineTo(0, 0);
var geometry = new THREE.ShapeGeometry(rectShape);
var material = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide });
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let light = new THREE.DirectionalLight(0x0000ff, 1.0, 0);
light.position.set(100, 100, 200);
scene.add(light);

function animate() {
	renderer.render(scene, camera);
	orbitcontrols.update();

	requestAnimationFrame(animate);
}
animate();