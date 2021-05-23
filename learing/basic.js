var yangzhouscene,jiangchencamera,liuaorender;
yangzhouscene=new THREE.Scene();
jiangchencamera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
jiangchencamera.position.set(0,110,200);
jiangchencamera.lookAt(new THREE.Vector3(0,0,0));
liuaorender=new THREE.WebGLRenderer();
liuaorender.setSize(window.innerWidth,window.innerHeight);
liuaorender.setClearColor(0xeeeeee);
document.body.appendChild(liuaorender.domElement);


var cube=new THREE.BoxGeometry(100,100,100);
var mat=new THREE.MeshBasicMaterial({color:0xffffff*Math.random(),side:THREE.DoubleSide});
var mesh=new THREE.Mesh(cube,mat);
mesh.position.set(0,0,0);
yangzhouscene.add(mesh);

var liyangground=new THREE.GridHelper(100,100);
yangzhouscene.add(liyangground);

// orbit
var orbit=new THREE.OrbitControls(jiangchencamera,liuaorender.domElement);
orbit.autoRotate=true;
orbit.enableDamp=true;



function gantianyiinit(){
    liuaorender.render(yangzhouscene,jiangchencamera);
    orbit.update();
    requestAnimationFrame(gantianyiinit);
}
gantianyiinit();