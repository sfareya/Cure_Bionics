//SET AND FORGET
import * as dat from 'dat.gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default function init() {


    // Canvas
    const canvas = document.querySelector('canvas.webgl')
    const scene = new THREE.Scene();

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4

    const pointLightBack = new THREE.PointLight(0xffffff, 1)
    pointLightBack.position.x = -2
    pointLightBack.position.y = -3
    pointLightBack.position.z = -4

    const ambientlLight = new THREE.AmbientLight(0x404040); // soft white light
    
    scene.add(ambientlLight);
    scene.add(pointLightBack)
    scene.add(pointLight)

    // HANDLE WINDOW RESIZE
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


    // CAMERA
    const camera = new THREE.PerspectiveCamera( 36, sizes.width / sizes.height, 0.25, 16 );
    camera.position.set( 0, 0, 11 );
    scene.add(camera)


    // RENDERER
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    

    renderer.localClippingEnabled = true;
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // CONTROLS 
    const controls = new OrbitControls( camera, renderer.domElement );

    const gui = new dat.GUI()
    const lighFolder = gui.addFolder('Point Light')
    lighFolder.add(pointLight.position, 'x', -10, 10)
    lighFolder.add(pointLight.position, 'y', -10,  10)
    lighFolder.add(pointLight.position, 'z', -10, 10)
    lighFolder.add(pointLight,'intensity', 0,1)
    lighFolder.open()

    
    return {
        scene: scene,
        renderer: renderer,
        camera: camera,
        controls : controls,
        }
    }