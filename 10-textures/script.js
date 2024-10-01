import './../style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Textures
const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = () => {
//   console.log('onStart');
// }
// loadingManager.onLoad = () => {
//   console.log('onLoad');
// }
// loadingManager.onProgress = () => {
//   console.log('onProgress');
// }
// loadingManager.onError = () => {
//   console.log('onError');
// }


const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load('/textures/minecraft.png');
const alphaTexture = textureLoader.load('/textures/Door_Wood_001_opacity.jpg');
const heightTexture = textureLoader.load('/textures/Door_Wood_001_height.png');
const normalTexture = textureLoader.load('/textures/Door_Wood_001_normal.jpg');
const ambientOcclusionTexture = textureLoader.load('/textures/Door_Wood_001_ambientOcclusion.jpg');
const metalnessTexture = textureLoader.load('/textures/Door_Wood_001_metallic.jpg');
const roughnessTexture = textureLoader.load('/textures/Door_Wood_001_roughness.jpg');
// Textures used as map and matcap are supposed to be encoded in sRGB.
// In the latest versions of Three.js we need to specify it by setting
// their colorSpace to THREE.SRGBColorSpace:
colorTexture.colorSpace = THREE.SRGBColorSpace;

// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI/4;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

// BASE
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({map: colorTexture});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {width: window.innerWidth, height: window.innerHeight};
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;

  if(!fullscreenElement) {
    if(canvas.requestFullscreen){
      canvas.requestFullscreen();
    } else if(canvas.webkitRequestFullscreen){
      canvas.webkitRequestFullscreen()
    }
  } else {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// Camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
camera.position.z = -3;
camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const animate = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

animate();