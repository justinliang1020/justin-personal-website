import './style.css'

//import from cdn

import * as THREE from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

//objects

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( {color: 0x89CFF0});
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

const catTexture = new THREE.TextureLoader().load('assets/nyancat.jpg');
const cat = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial( {map: catTexture})
);

scene.add(cat)

const moonTexture = new THREE.TextureLoader().load('assets/obama.png');
const moonNormalTexture = new THREE.TextureLoader().load('assets/moon_normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32 , 32),
  new THREE.MeshBasicMaterial( {
    map: moonTexture,
    normalMap: moonNormalTexture
  })
);
moon.position.set(0, 15, 15);
scene.add(moon);

// lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// helpers

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);

// controls

const controls = new OrbitControls(camera, renderer.domElement);

// actions

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh( geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar)

// background

const spaceTexture = new THREE.TextureLoader().load('assets/space.jpeg');
scene.background = spaceTexture;

// animation

function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  cat.rotation.y += 0.01

  controls.update()

  renderer.render( scene, camera );
}

animate()