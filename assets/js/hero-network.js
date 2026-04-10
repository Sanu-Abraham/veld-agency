// ================================
// VELD - HERO NETWORK BACKGROUND
// Option B: Particle + Connection Lines
// Requires: assets/js/libs/three.module.js
// ================================

import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const canvas = document.getElementById("hero-network");

if (canvas) {
  // Disable heavy animation on small devices (optional but recommended)
  if (window.innerWidth < 768) {
    canvas.style.display = "none";
  } else {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particlesCount = 140;
    const positions = new Float32Array(particlesCount * 3);

    const particleData = [];

    for (let i = 0; i < particlesCount; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 8;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particleData.push({
        velocityX: (Math.random() - 0.5) * 0.01,
        velocityY: (Math.random() - 0.5) * 0.01,
        velocityZ: (Math.random() - 0.5) * 0.01
      });
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x5eead4,
      size: 0.035,
      transparent: true,
      opacity: 0.75
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lines geometry
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5eead4,
      transparent: true,
      opacity: 0.12
    });

    let linesMesh;

    function createLines() {
      const linePositions = [];
      const posArray = particlesGeometry.attributes.position.array;

      for (let i = 0; i < particlesCount; i++) {
        for (let j = i + 1; j < particlesCount; j++) {
          const ix = posArray[i * 3];
          const iy = posArray[i * 3 + 1];
          const iz = posArray[i * 3 + 2];

          const jx = posArray[j * 3];
          const jy = posArray[j * 3 + 1];
          const jz = posArray[j * 3 + 2];

          const dx = ix - jx;
          const dy = iy - jy;
          const dz = iz - jz;

          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 1.4) {
            linePositions.push(ix, iy, iz);
            linePositions.push(jx, jy, jz);
          }
        }
      }

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );

      if (linesMesh) scene.remove(linesMesh);

      linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(linesMesh);
    }

    createLines();

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      const posArray = particlesGeometry.attributes.position.array;

      for (let i = 0; i < particlesCount; i++) {
        posArray[i * 3] += particleData[i].velocityX;
        posArray[i * 3 + 1] += particleData[i].velocityY;
        posArray[i * 3 + 2] += particleData[i].velocityZ;

        // Bounce effect boundaries
        if (posArray[i * 3] > 5 || posArray[i * 3] < -5) {
          particleData[i].velocityX *= -1;
        }

        if (posArray[i * 3 + 1] > 3 || posArray[i * 3 + 1] < -3) {
          particleData[i].velocityY *= -1;
        }

        if (posArray[i * 3 + 2] > 4 || posArray[i * 3 + 2] < -4) {
          particleData[i].velocityZ *= -1;
        }
      }

      particlesGeometry.attributes.position.needsUpdate = true;

      // Slowly rotate entire scene
      scene.rotation.y += 0.0009;
      scene.rotation.x += 0.0003;

      // Recalculate lines occasionally for performance
      if (Math.random() < 0.08) {
        createLines();
      }

      renderer.render(scene, camera);
    }

    animate();

    // Resize
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }
}