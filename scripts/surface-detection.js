export function setupSurfaceDetection() {
    const scene = document.querySelector('a-scene');
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
  
    window.addEventListener('click', (event) => {
      // Convert click position to normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
      raycaster.setFromCamera(mouse, scene.camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
  
      if (intersects.length > 0) {
        const surface = intersects[0].point;
        place3DObject(surface);
      }
    });
  }
  
  function place3DObject(position) {
    const scene = document.querySelector('a-scene');
    const box = document.createElement('a-box');
  
    box.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
    box.setAttribute('scale', '0.2 0.2 0.2');
    box.setAttribute('color', 'blue');
  
    scene.appendChild(box);
  }
  