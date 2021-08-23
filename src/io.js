import { OBJLoader } from 'three/examples/jsm/Loaders/OBJLoader.js'

// OBJ FILE URL

// instantiate a loader
const loader = new OBJLoader();
const status = document.getElementById('status')
console.log(status)

export async function loadOBJ(SOURCE_URL,callback) {
    // load a resource
    loader.load(
        // resource URL
        SOURCE_URL,

        // called when resource is loaded
        function (object) {
                callback(object)            
            },
	
        // called when loading is in progresses
        function (xhr) {
            status.textContent = (xhr.loaded / xhr.total * 100).toFixed(1)

        },

        // called when loading has errors
        function (error) {
            console.log(error);
            console.trace(error);
		
        }
    )
}


