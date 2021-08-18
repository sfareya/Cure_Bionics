

import './style.css'
import init from './init'
import { slice } from './utils'
import {rotateY} from './animate'
import { loadOBJ } from './io'


import * as THREE from 'three'
import { BufferGeometry, BufferGeometryUtils, CylinderGeometry, TetrahedronGeometry, WrapAroundEnding } from 'three'
const SOURCE_URL = 'http://127.0.0.1:8887/model.obj'

	// INIT SETTINGS

const view = init()
const  { scene, renderer, camera, controls } = view;

var arm;

 loadOBJ(SOURCE_URL, (object) => {
	 arm = object;
	arm.translateX(0.2)
	 scene.add(object);
	 rotateY(object,view)
})



document.getElementById("slice").addEventListener('click', () => {
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



	let objectGeometry = arm.children[0].geometry;

	let sliced = slice(objectGeometry, 0.02, -0.2);

	/* Prostetic */ 
	let prosteticGeometry = sliced.section;
	const prostetic = new THREE.Mesh(prosteticGeometry, m)
	//prostetic.scale.multiplyScalar(10)
	scene.add(prostetic)

	

	/* Lower and Upper Edges to link with cylider */
	let Uedge = sliced.Uedge;
	let Ledge = sliced.Ledge;
	let g = new THREE.BufferGeometry();
	let l = new THREE.BufferGeometry();

	g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(Uedge), 3))
	l.setAttribute('position', new THREE.BufferAttribute(new Float32Array(Ledge), 3))

	let edgeU = new THREE.Mesh(g, r);
	//edgeU.scale.multiplyScalar(10);

	let edgeL = new THREE.Mesh(l, m);
	//edgeL.scale.multiplyScalar(10);
	Uedge = g.getAttribute('position').array
	Ledge = l.getAttribute('position').array

	scene.add(edgeL);
	scene.add(edgeU);

	/* Cylinder */
	
	let cylinderG = new THREE.CylinderBufferGeometry(0.07, 0.04, 0.28, 100, 10, true);
	
	let cylinder = new THREE.Mesh(cylinderG, m);
	cylinder.translateOnAxis(new THREE.Vector3(0,-1,0),0.09)
	cylinder.translateOnAxis(new THREE.Vector3(0,0,-1),0.02)

	scene.add(cylinder)


	let pos = []
	cylinderG.getAttribute('position').array.forEach((e) => {
		pos.push(e)
	});
	pos = translateArray(pos ,[0, -0.09, 0]);
	pos= translateArray(pos ,[0, 0, -0.02]);
	console.log(pos)

	for (let i = 0; i < pos.length / 3; i = i + 3) {
		for ( let j = i + 3 ; j < pos.length / 3; j=j+3){
			if (pos[i + 1] < pos[j + 1]){
				[pos[i + 1],pos[j + 1]] = [pos[j + 1],pos[i + 1]]
			}
		}
	}

	pos = pos.slice(0, 96);
	let link = [];
	console.log(Uedge.length);
	let offset = 0
	for (let i = 0; i < Uedge.length; i= i+3) {
	
	}


	let final = new THREE.BufferGeometry();
	final.setAttribute('position', new THREE.BufferAttribute(new Float32Array(link), 3));
	let finalM = new THREE.Mesh(final, r);

	scene.add(finalM);


	

	renderer.render(scene, camera)

})



function translateArray(arr,v) {
	for (let i = 0; i < arr.length ; i= i + 3) {
		arr[i]+= v[0]
		arr[i+1]+= v[1]
		arr[i+2]+= v[2]

	}
	return arr;
}




 