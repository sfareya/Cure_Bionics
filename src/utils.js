import * as THREE from 'three'
export function slice(geometry, UyPlane , LyPlane ) {
        const g = new THREE.BufferGeometry();
   
			let vertices = geometry.attributes.position.array.slice(0, 6025571);

	let Uedge = [];
	let Ledge = [];
			let filtered = []
			for (let i = 0; i < vertices.length; i++) {
				let index = i * 9
				if (Math.abs(vertices[index + 1]- UyPlane) < 0.0005 ) {
					vertices[index + 1] = UyPlane
					vertices[index+4] = UyPlane
					vertices[index+7] = UyPlane

					filtered.push(...vertices.slice(index, index + 9))
					Uedge.push(...vertices.slice(index, index + 9));
				}
				else if ((vertices[index + 1] > LyPlane - 0.0005) & (vertices[index + 1] < LyPlane)) {
					vertices[index+1] = LyPlane
					vertices[index+4] = LyPlane
					vertices[index+7] = LyPlane
					
					filtered.push(...vertices.slice(index, index + 9))
					Ledge.push(...vertices.slice(index, index + 9));
				}

				else if ((vertices[index + 1] > LyPlane) && (vertices [index+1] < UyPlane)){
					filtered.push(...vertices.slice(index, index + 9))
				}
			
			}

			g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(filtered), 3));

	return {
		section: g,
		Uedge: Uedge,
		Ledge: Ledge,
	}
}