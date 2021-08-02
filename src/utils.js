import * as THREE from 'three'
export function slice(geometry, UyPlane , LyPlane ) {
        const g = new THREE.BufferGeometry();
        const m = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,    // red (can also use a CSS color string here)
            flatShading: true,
        });
        m.side = THREE.DoubleSide; 

			let vertices = geometry.attributes.position.array.slice(0, 6025571);


			let filtered = []
			for (let i = 0; i < vertices.length; i++) {
				let index = i * 9
				if ((vertices[index + 1] > LyPlane) && (vertices [index+1] < UyPlane)){
					filtered.push(...vertices.slice(index, index + 9))
				}
			}

			g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(filtered), 3));


			const mesh = new THREE.Mesh(g, m);
			mesh.scale.multiplyScalar(10);		
    return mesh;
}