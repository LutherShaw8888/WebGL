let scene, camera, renderer, linemesh;
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

// draw lines
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
	let num = Math.sin(3 * i) * 111 + Math.pow(i, 3) / 3333;

	// let num=Math.cos(i)*4-Math.cos(i*2);
	// let num=Math.abs(Math.cos(i*2))*2+Math.abs(Math.cos(i*4));
	for (let j = 100; j > 0; j--) {
		go.vertices.push(
			new THREE.Vector3(
				Math.sin((180 / Math.PI) * i),
				Math.sin((180 / Math.PI) * i),
				Math.sin((180 / Math.PI) * i)
			)
		);

		go.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
		// go.vertices.push(new THREE.Vector3(j, num, 0));
	}
	go.vertices.push(new THREE.Vector3(num, i, 0));
	go.colors.push(new THREE.Color(Math.random(), Math.random(), Math.random()));
}
let linemat = new THREE.LineBasicMaterial({ vertexColors: true });
linemesh = new THREE.Line(go, linemat);
scene.add(linemesh);

//create dashline
function createDashline() {
	let geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(15, 15, 0));
	geometry.vertices.push(new THREE.Vector3(-15, 2, 0));
	geometry.vertices.push(new THREE.Vector3(5, 20, 10));
	geometry.vertices.push(new THREE.Vector3(-5, 12, 8));

	// let material = new THREE.LineBasicMaterial({
	// 	color: 0xff0000 * Math.random(),
	// });
	// let line = new THREE.Line(geometry, material);
	// let line = new THREE.LineLoop(geometry, material);

	let material = new THREE.LineDashedMaterial({
		color: 0xff0000 * Math.random(),
		dashSize: 2,
		gapSize: 2,
	});
	let line = new THREE.LineSegments(geometry, material);
	line.computeLineDistances();
	scene.add(line);
}
// createDashline();

function animate() {
	renderer.render(scene, camera);
	orbitcontrols.update();

	requestAnimationFrame(animate);
}
animate();