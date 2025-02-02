import './../style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';

/**
 * Debug
 */
const gui = new GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textures = new THREE.TextureLoader();

/**
 * Object
 */
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);

scene.add(cube);

/**
 * Sizes
 */
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

/**
 * Camera
 */
// Base Camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // call animate again on the next frame
  window.requestAnimationFrame(animate);
}

/**
 * Fullscreen
 */
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

animate();