import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const cursor = { x: 0, y: 0 };
window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = -(e.clientY / sizes.height - 0.5);
});

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = { width: 800, height: 600 };

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;

camera.lookAt(mesh.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1;
// controls.update();

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

const tick = () => {
  const elpasedTime = clock.getElapsedTime();

  //mesh.rotation.y = elpasedTime;

  // Update cmaera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(mesh.position);

  // Update controls
  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}


tick();