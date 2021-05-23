let scene, camera, renderer, popos, points;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
camera.position.set(0, 10, 20);
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

// draw points
let go = new THREE.Geometry();
// let point_1 = new THREE.Vector3(0, 1, 5);
// let point_2 = new THREE.Vector3(1, 3, 7);
// let point_3 = new THREE.Vector3(5, 8, 0);
// go.vertices.push(point_1, point_2, point_3);
// go.colors.push(
//     new THREE.Color(0xff0000),
//     new THREE.Color(0x00ff00),
//     new THREE.Color(0x0000ff)
//     )

for (let i = 0; i < 200; i++) {
	// go.vertices.push(new THREE.Vector3(Math.sin(i * 30)*6, Math.cos(i * 60)*6, Math.sin(i * 90)*6));
	let num = Math.sin(3 * i) * 111 + Math.pow(i, 3) / 3333;
	popos = new THREE.Vector3(i, num / 100, 0);
	popos.velocity = 0;
	go.vertices.push(popos);
	go.colors.push(
		new THREE.Color(0xffffff * Math.random()),
		new THREE.Color(0x9cec44 * Math.random()),
		new THREE.Color(0x0000ff * Math.random())
	);
}
let pointmat = new THREE.PointsMaterial({ size: 2, vertexColors: true });
go.morphAttributes = {}; //必须添加morphAttributes变体属性
points = new THREE.Points(go, pointmat);
points.position.setX(-10);
scene.add(points);

function animate() {
	renderer.render(scene, camera);
	orbitcontrols.update();
	go.vertices.forEach((p) => {
		p.velocity -= 0.01 + Math.random() * 0.01;
		p.y += p.velocity;
		if (p.y < 100) {
			p.velocity += 0.01 + Math.random() * 0.01;
			p.y += p.velocity;
		}
	});
	go.verticesNeedUpdate = true;
	requestAnimationFrame(animate);
}
animate();