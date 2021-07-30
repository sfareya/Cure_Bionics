

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { OBJLoader } from 'three/examples/jsm/Loaders/OBJLoader.js'
import Slicer from 'threejs-slice-geometry/src/slice.js'
import { BufferGeometry,Float32BufferAttribute } from 'three'
			const ZOOM_RATE = 0.5
// Debug
const gui = new dat.GUI()
// Canvas
const canvas = document.querySelector('canvas.webgl')


const scene = new THREE.Scene();

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
const pointLightBack = new THREE.PointLight(0xffffff, 1)
pointLightBack.position.x = -2
pointLightBack.position.y = -3
pointLightBack.position.z = -4
scene.add(pointLightBack)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera


const camera = new THREE.PerspectiveCamera( 36, sizes.width / sizes.height, 0.25, 16 );
camera.position.set( 0, 0, 11 );
scene.add(camera)


// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.localClippingEnabled = true;

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


const controls = new OrbitControls( camera, renderer.domElement );




// instantiate a loader
const loader = new OBJLoader();
let status = document.getElementById("status");
// load a resource


loader.load(
	// resource URL
	'http://127.0.0.1:8887/model.obj',
	// called when resource is loaded
	
	function (object) {
		let objectGeometry = object.children[0].geometry;
		console.log(objectGeometry)
		const g = new THREE.BufferGeometry();
	
		
		let vertices = objectGeometry.attributes.position.array.slice(0, 6025571)
		console.log(vertices.length);
		let filtered = []
		for (let i = 0; i < vertices.length; i++) {
			let index = i * 9
			if ((vertices[index + 1] > -0.2) && (vertices [index+1] < 0.02)){
				filtered.push(...vertices.slice(index, index + 9))
			}
		}

		g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(filtered), 3));

		const m = new THREE.MeshPhongMaterial({
			color: 0xFFFFFF,    // red (can also use a CSS color string here)
			flatShading: true,
		});
		const mesh = new THREE.Mesh(g, m);
		mesh.scale.multiplyScalar(10);
		scene.add(mesh)
		renderer.render(scene,camera)
		

	
			
		object.scale.multiplyScalar(10);
		object.translateX(2)
		scene.add(object)
		let prostetic ; 
		let demo ;

			renderer.render(scene,camera);
			function tick(){
					const elapsedTime = clock.getElapsedTime()

					// Update objects
					object.rotation.y = .5 * elapsedTime
					if( prostetic){
						prostetic.rotation.y =  .5 * elapsedTime ;
					}
					// Update Orbital Controls
					 controls.update()

					// Render
					renderer.render(scene, camera)

					// Call tick again on the next frame
					window.requestAnimationFrame(tick)
			}
			tick();

		document.getElementById("fit").addEventListener('click', () => {
				
			object.rotation.y = 0
			
				prostetic = object.clone();
			   var Uplane = new THREE.Plane(new THREE.Vector3(0,-1,0), 0.3)
			   var Dplane = new THREE.Plane(new THREE.Vector3(0,1,0), 1.9)
			prostetic.scale.multiplyScalar(1.1)
			
				   let prosteticMaterial = new THREE.MeshPhongMaterial({
					   color : (0x67C1E8),
					   clippingPlanes: [Dplane,Uplane],
					   clipShadows: true
				   })
				   prostetic.traverse((child)=>{
					   if(child instanceof THREE.Mesh){
						   child.material = prosteticMaterial
					   }
				   })
					demo = prostetic.clone();
				   demo.translateX(3)
			scene.add(demo);
			console.log(prostetic.children[0].geometry.attributes.position.array.length)
				   scene.add(prostetic)
				   renderer.render(scene,camera);
		   })
		   
		tick();

	},	
	// called when loading is in progresses
	function ( xhr ) {
		status.textContent = (xhr.loaded / xhr.total * 100 ).toFixed(1)

	},
	// called when loading has errors
	function ( error ) {

		console.log( error );

	}
);

const clock = new THREE.Clock()




function events() {
	document.getElementById("zoomIn").addEventListener('click',(e)=>{
		camera.position.z -= ZOOM_RATE;
		renderer.render(scene,camera)

	})
	document.getElementById("zoomOut").addEventListener('click',(e)=>{
		camera.position.z += ZOOM_RATE ;
		renderer.render(scene,camera)

	})
	document.getElementById("left").addEventListener('click',(e)=>{
		camera.position.x -= ZOOM_RATE ;
		renderer.render(scene,camera)

	})
	document.getElementById("right").addEventListener('click',(e)=>{
		camera.position.x += ZOOM_RATE ;
		renderer.render(scene,camera)

	})
	document.getElementById("up").addEventListener('click',(e)=>{
		camera.position.y += ZOOM_RATE ;
		renderer.render(scene,camera)

	})
	document.getElementById("down").addEventListener('click',(e)=>{
		camera.position.y -= ZOOM_RATE ;
		renderer.render(scene,camera)
	})

}

events();

