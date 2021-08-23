

import './style.css'
import init from './init'
import { slice } from './utils'
import {rotateY} from './animate'
import { loadOBJ } from './io'

import { CSG } from 'three-csg-ts';

import * as THREE from 'three'

const SOURCE_URL = 'http://127.0.0.1:8887/model.obj'



	// DEFAULT MESHES PARAMS
		const m = new THREE.MeshPhongMaterial
		({
			color: 0xFFFFFF,    // red (can also use a CSS color string here)
			flatShading: true,
		});
		m.side = THREE.DoubleSide;
		const r = new THREE.MeshPhongMaterial
		({
			color: 0xFF0000,    // red (can also use a CSS color string here)
			flatShading: true,
		});
		r.side = THREE.DoubleSide;

	// INIT SETTINGS

const view = init()
const  { scene, renderer, camera, controls } = view;

var arm;

 loadOBJ(SOURCE_URL, (object) => {
	 arm = object;
	 scene.add(object);
	 object.translateX(-0.5)

	 rotateY(object,view)
})

var mold;

document.getElementById("slice").addEventListener('click', () => {

	let objectGeometry = arm.children[0].geometry;


	let sliced = slice(objectGeometry, 0.02, -0.2);


	/* Hand Mold */ 
	let moldGeometry = sliced.section;


	mold = new THREE.Mesh(moldGeometry, m)
	
	scene.add(mold)

})


document.getElementById("engrave").addEventListener('click', () => {
	
	
	/* Cylinder */
	
	let cylinderG = new THREE.CylinderBufferGeometry(0.07, 0.04, 0.19, 100, 10, false);
	
	let cylinder = new THREE.Mesh(cylinderG, m);

	cylinder.translateOnAxis(new THREE.Vector3(0,-1,0),0.09)
	cylinder.translateOnAxis(new THREE.Vector3(0,0,-1),0.02)

	scene.add(cylinder)


	cylinder.updateMatrix();
	mold.updateMatrix();


	//SUBSTRACTION CSG	
	var final = CSG.subtract(cylinder, mold);
	final.translateX(0.5)
	scene.add(final)

	console.log('rendered')
	
})



 