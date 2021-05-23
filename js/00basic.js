let scene, camera, renderer;

function init() {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.set(0, 18, 50);

	scene.add(
		new THREE.Mesh(
			new THREE.BoxGeometry(10, 10, 10),
			new THREE.MeshBasicMaterial({ color: 0xffe500 })
		)
	);

	renderer = new THREE.WebGLRenderer({ antilias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xa5a5a5);

	scene.fog = new THREE.FogExp2(0xcc0000, 0.001);
	scene.fog = new THREE.Fog(0xcc0000, 1, 1000);

	document.body.appendChild(renderer.domElement);
	render();
}

function render() {
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
init();