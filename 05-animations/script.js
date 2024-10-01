import * as THREE from 'three';
import gsap from 'gsap';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color: 'blue'});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = { width: 800, height: 600 };

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({canvas: canvas});
renderer.setSize(sizes.width,sizes.height);

//const clock = new THREE.Clock();

gsap.to(mesh.position, {duration: 1, delay: 1, x: 2});
gsap.to(mesh.position, {duration: 1, delay: 2, x: 0});

const tick = () => {
    // Clock
    //const elapsedTime = clock.getElapsedTime();

    // update objects
    //mesh.rotation.y = elpasedTime * Math.PI * 2; // 1 rps

    // mesh.position.y = Math.sin(elpasedTime)
    // mesh.position.x = Math.cos(elpasedTime);

    // camera.position.y = Math.sin(elpasedTime)
    // camera.position.x = Math.cos(elpasedTime);
    // camera.lookAt(mesh.position)

    // update the renderer
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick)
}

tick();