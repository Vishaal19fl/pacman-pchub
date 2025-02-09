import * as THREE from "three";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";
import { OBJLoader } from 'jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';



// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5); // Move camera higher and slightly backward
camera.lookAt(0, 1, 0); // Make camera look at the table

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("tableContainer").appendChild(renderer.domElement);

// Create the cuboid (wall-mounted slab)
const geometry = new THREE.BoxGeometry(8, 0.2, 1); // Wide, thin cuboid
const material = new THREE.MeshStandardMaterial({ color: 0x777777, metalness: 0.5, roughness: 0.7 });
const table = new THREE.Mesh(geometry, material);
scene.add(table);

const table2 = new THREE.Mesh(geometry, material);
scene.add(table2);
table2.scale.set(0,0,0);

// Position the table
table.position.set(0, 0.1, 0); // Raise the table higher
table2.position.set(0, 2.6, 0)

// Load Gaming Chair Models
const loader = new GLTFLoader();
const objLoader = new OBJLoader();
const textureLoader = new THREE.TextureLoader();
let chair1, chair2, chair3; // Variables to store the chair models
let pcModel, monitorModel, headsetModel, monitorModel2, monitorModel3; 
let pcModel1, pcModel2, pcModel3, pcWhite2, pcWhite1, pcWhite3;
// Get the hero section

// Load gaming chair models
objLoader.load('models/chair.obj', function (obj) {
    // First chair (center)
    const chairTexture = textureLoader.load('textures/chair_diffuse.png'); 
    chairTexture.colorSpace = THREE.SRGBColorSpace;

    chair1 = obj.clone();
    chair1.scale.set(0.1, 0.1, 0.1);
    chair1.position.set(0, 0.5, 2);
    chair1.rotation.y = Math.PI;
    scene.add(chair1);

    chair1.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: chairTexture,
            });
        }
    });





    // Second chair (left)
    chair2 = obj.clone();
    chair2.scale.set(0.1, 0.1, 0.02);
    chair2.position.set(-2.6, 0.5, 2); // Position to the left
    chair2.rotation.y = Math.PI;
    chair2.scale.set(0, 0, 0); // Start with scale 0 (hidden)
    scene.add(chair2);

    chair2.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: chairTexture,
            });
        }
    });

    // Third chair (right)
    chair3 = obj.clone();
    chair3.scale.set(0.1, 0.1, 0.02);
    chair3.position.set(2.6, 0.5, 2); // Position to the right
    chair3.rotation.y = Math.PI;
    chair3.scale.set(0, 0, 0); // Start with scale 0 (hidden)
    scene.add(chair3);

    chair3.traverse((child) => {
        if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
                map: chairTexture,
            });
        }
    });
}, undefined, function (error) {
    console.error("Error loading model:", error);
});

// Load PC and monitor models
loader.load('models/black_pc.glb', function (gltf) {
    pcModel = gltf.scene.clone();
    pcModel.scale.set(0,0,0);
    pcModel.rotation.set(0,0,0)
    pcModel.position.set(-2, 0.2, 0.1); // Position the PC on the left side of the table
    scene.add(pcModel);

    
    pcModel1 = gltf.scene.clone();
    pcModel1.scale.set(0,0,0);
    pcModel1.rotation.set(0,4.7,0)
    pcModel1.position.set(3,2.6,0); // Position the PC on the left side of the table
    scene.add(pcModel1);
    
    pcModel2 = gltf.scene.clone();
    pcModel2.scale.set(0,0,0);
    pcModel2.rotation.set(0,4.7,0)
    pcModel2.position.set(-3,2.6,0); // Position the PC on the left side of the table
    scene.add(pcModel2);

    pcModel3 = gltf.scene.clone();
    pcModel3.scale.set(0,0,0);
    pcModel3.rotation.set(0,4.7,0)
    pcModel3.position.set(0,2.6,0); // Position the PC on the left side of the table
    scene.add(pcModel3);



});
loader.load('models/pc3.glb', function (gltf) {
    pcWhite1 = gltf.scene.clone();
    pcWhite1.scale.set(0,0,0);
    pcWhite1.rotation.set(0,1.6,0)
    pcWhite1.position.set(3,2.6,0); // Position the PC on the left side of the table
    scene.add(pcWhite1);

    pcWhite2 = gltf.scene.clone();
    pcWhite2.scale.set(-6,0,0);
    pcWhite2.rotation.set(0,1.6,0);
    pcWhite2.position.set(-3,2.6,0); // Position the PC on the left side of the table
    scene.add(pcWhite2);

    pcWhite3 = gltf.scene.clone();
    pcWhite3.scale.set(0,0,0);
    pcWhite3.rotation.set(0,1.6,0)
    pcWhite3.position.set(0,2.6,0); // Position the PC on the left side of the table
    scene.add(pcWhite3);

});
loader.load('models/monitor.glb', function (gltf) {
    // Monitor Model 1
    monitorModel = gltf.scene.clone();
    monitorModel.scale.set(0, 0, 0);
    monitorModel.rotation.set(0, 4.76, 0);
    monitorModel.position.set(0.2, 0.5, 0.1); // Position the monitor on the right side of the table
    scene.add(monitorModel);

    // Monitor Model 2 (with left tilt)
    monitorModel2 = gltf.scene.clone();
    monitorModel2.scale.set(0, 0, 0);
    monitorModel2.rotation.set(-0.1, 4.85, -0.05); // Left tilt (negative X rotation)
    monitorModel2.position.set(-0.2, 0.5, 0.3); // Position the monitor on the left side of the table
    scene.add(monitorModel2);

    // Monitor Model 3 (with right tilt)
    monitorModel3 = gltf.scene.clone();
    monitorModel3.scale.set(0, 0, 0);
    monitorModel3.rotation.set(-0.1, 4.55, -0.05); // Right tilt (positive X rotation)
    monitorModel3.position.set(0.2, 0.5, 0.3); // Position the monitor further to the right
    scene.add(monitorModel3);
});

loader.load('models/headset.glb', function (gltf) {
    headsetModel = gltf.scene;
    headsetModel.scale.set(0, 0, 0);
    headsetModel.rotation.set(0,1,0)
    headsetModel.position.set(2.4, 0.2, 0.2); // Position the headset on the right side of the table
    scene.add(headsetModel);
});

// Helper function to apply material to a chair or model
function delete_old_material(object) {
    const material = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.7, metalness: 0.3 });
    object.traverse((child) => {
        if (child.isMesh) {
            child.material = material;
        }
    });
}

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x444444);
scene.add(ambientLight);

// Resize Handling
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});



// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();


const hexagonGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 6); // Hexagon shape
const hexagonMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.7, metalness: 0.3 });
const hexagons = [];

// Create hexagon 1
const hexagon1 = new THREE.Mesh(hexagonGeometry, hexagonMaterial);
hexagon1.position.set(3.5, 2, -6.5);  
hexagon1.rotation.x = Math.PI / 2; // Rotate 90 degrees around the X-axis
hexagon1.scale.set(0, 0, 0);    
scene.add(hexagon1);
hexagons.push(hexagon1);

// Create hexagon 2
const hexagon2 = new THREE.Mesh(hexagonGeometry, hexagonMaterial);
hexagon2.position.set(-3.5, 2, -6.5);  
hexagon2.rotation.x = Math.PI / 2; // Rotate 90 degrees around the X-axis
hexagon2.scale.set(0, 0, 0);    
scene.add(hexagon2);
hexagons.push(hexagon2);

// Create hexagon 3
const hexagon3 = new THREE.Mesh(hexagonGeometry, hexagonMaterial);
hexagon3.position.set(0, 2, -4.5);  
hexagon3.rotation.x = Math.PI / 2; // Rotate 90 degrees around the X-axis
hexagon3.scale.set(0, 0, 0);    
scene.add(hexagon3);
hexagons.push(hexagon3);

// GSAP Animation for Table, Chairs, Hexagons, and Models
const textRight = document.querySelector('.text-right');
const textLeft = document.querySelector('.text-left');
const heroSection = document.querySelector('.hero'); // Select the hero section

// Right-side hover (chair animations + background change)
// Right-side hover (chair animations + background change)
textRight.addEventListener('mouseenter', () => {
    // GSAP animations for table scaling
    gsap.to(table.scale, { duration: 0.5, x: 1.45, ease: "power2.out" });

    // Scale and position monitorModel
    gsap.to(monitorModel.scale, { duration: 0.5, x: 0.0035, y: 0.0035, z: 0.0035, ease: "power2.out" });

    // Slide in monitorModel2 from the left and place it on the table
    gsap.fromTo(monitorModel2.position, { x: -5 }, { duration: 0.5, x: -3.1, ease: "power2.out" }); // Adjust x position as needed
    gsap.to(monitorModel2.scale, { duration: 0.5, x: 0.0035, y: 0.0035, z: 0.0035, ease: "power2.out" });

    // Slide in monitorModel3 from the right and place it on the table
    gsap.fromTo(monitorModel3.position, { x: 5 }, { duration: 0.5, x: 3.5, ease: "power2.out" }); // Adjust x position as needed
    gsap.to(monitorModel3.scale, { duration: 0.5, x: 0.0035, y: 0.0035, z: 0.0035, ease: "power2.out" });

    // Slide in the left chair (chair2)
    gsap.to(chair2.position, { duration: 0.5, x: -2.6, ease: "power2.out" });
    gsap.to(chair2.scale, { duration: 0.5, x: 0.1, y: 0.1, z: 0.1, ease: "power2.out" });

    // Slide in the right chair (chair3)
    gsap.to(chair3.position, { duration: 0.5, x: 2.6, ease: "power2.out" });
    gsap.to(chair3.scale, { duration: 0.5, x: 0.1, y: 0.1, z: 0.1, ease: "power2.out" });

    
    gsap.to(pcWhite1.scale, { duration: 0.5, x: 0.5, y: 0.5, z: 0.5, ease: "power2.out" });
    gsap.to(pcWhite2.scale, { duration: 0.5, x: 0.5, y: 0.5, z: 0.5, ease: "power2.out" });
    gsap.to(pcWhite3.scale, { duration: 0.5, x: 0.5, y: 0.5, z: 0.5, ease: "power2.out" });

    gsap.to(table2.scale, { duration: 0.5, x: 1.2, y: 0.8, z: 1, ease: "power2.out" });

    // Background transition effect
    heroSection.classList.add('pacman-hover');
});

textRight.addEventListener('mouseleave', () => {
    // Reset GSAP animations for table scaling
    gsap.to(table.scale, { duration: 0.5, x: 1, ease: "power2.out" });

    // Slide out monitorModel2 to the left
    gsap.to(monitorModel2.position, { duration: 0.5, x: -5, ease: "power2.out" });
    gsap.to(monitorModel2.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });

    // Slide out monitorModel3 to the right
    gsap.to(monitorModel3.position, { duration: 0.5, x: 5, ease: "power2.out" });
    gsap.to(monitorModel3.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });

    // Slide out the left chair (chair2)
    gsap.to(chair2.position, { duration: 0.5, x: -5, ease: "power2.out" });
    gsap.to(chair2.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });

    // Slide out the right chair (chair3)
    gsap.to(chair3.position, { duration: 0.5, x: 5, ease: "power2.out" });
    gsap.to(chair3.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });

    // Reset monitorModel scale
    gsap.to(monitorModel.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });

    gsap.to(pcWhite1.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });
    gsap.to(pcWhite2.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });
    gsap.to(pcWhite3.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });

    gsap.to(table2.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });


    // Remove background transition effect
    heroSection.classList.remove('pacman-hover');
});

// Left-side hover (hexagons and new models animations)
textLeft.addEventListener('mouseenter', () => {
    // Animate hexagons to appear
    gsap.to(table.scale, { duration: 0.5, x: 0.85, ease: "power2.out" });
    gsap.to(hexagons[0].position, { duration: 0.5, x: 6, ease: "power2.out" });
    gsap.to(hexagons[0].scale, { duration: 0.5, x: 2.7, y: 3.2, z: 3.2, ease: "power2.out" });
    gsap.to(hexagons[1].scale, { duration: 0.5, x: 2.7, y: 3.2, z: 3.2, ease: "power2.out" });
    gsap.to(hexagons[2].scale, { duration: 0.5, x: 3.2, y: 3.2, z: 3.2, ease: "power2.out" });
    gsap.to(hexagons[1].position, { duration: 0.5, x: -6, ease: "power2.out" });
    heroSection.classList.add('home-hover');
    // Animate PC and monitor to appear
    gsap.to(pcModel.scale, { duration: 0.5, x: 2, y: 2, z: 2, ease: "power2.out" });
    gsap.to(monitorModel.scale, { duration: 0.5, x: 0.0035, y: 0.0035, z: 0.0035, ease: "power2.out" });
    gsap.to(headsetModel.scale, { duration: 0.5, x: 4.8, y: 4.8, z: 4.8, ease: "power2.out" });

    //image
    heroSection.style.backgroundImage = "url('/images/background/color_city.png')";
});

textLeft.addEventListener('mouseleave', () => {
    // Animate hexagons to disappear
    gsap.to(table.scale, { duration: 0.5, x: 1, ease: "power2.out" });
    gsap.to(hexagons[0].scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });
    gsap.to(hexagons[1].scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });
    gsap.to(hexagons[2].scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });
    heroSection.classList.remove('home-hover');
    // Animate PC and monitor to disappear
    gsap.to(pcModel.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });
    gsap.to(monitorModel.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });
    gsap.to(headsetModel.scale, { duration: 0.5, x: 0, y: 0, z: 0, ease: "power2.out" });

    //image
    heroSection.style.backgroundImage = "url('/images/background/grey_city.png')";
});
