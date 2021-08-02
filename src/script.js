

import './style.css'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/Loaders/OBJLoader.js'
import Slicer from 'threejs-slice-geometry/src/slice.js'
import { BufferGeometry, Curve, Float32BufferAttribute, Vector2, Vector3 } from 'three'
import init from './init'
import { slice } from './utils'
import {rotateY} from './animate'
	


	// INIT SETTINGS
const view = init()
const  { scene, renderer, camera, controls } = view;

const status = document.getElementById("status")

// instantiate a loader
const loader = new OBJLoader();


// load a resource
loader.load(
	// resource URL
	'http://127.0.0.1:8887/model.obj',

	// called when resource is loaded
	function (object) {
		
		object.scale.multiplyScalar(10);
		scene.add(object)
		rotateY(object, view);

		document.getElementById("ClipMesh").addEventListener('click', () => {
			let objectGeometry = object.children[0].geometry;

			let prostetic = slice(objectGeometry, 0.02, -0.2)

			prostetic.translateX(2)
			scene.add(prostetic);
			renderer.render(scene,camera)
		})

	},
	
	// called when loading is in progresses
	function ( xhr ) {
		status.textContent = (xhr.loaded / xhr.total * 100 ).toFixed(1)

	},

	// called when loading has errors
	function (error) {
		console.log(error);
		console.trace(error);
		
	}
);






