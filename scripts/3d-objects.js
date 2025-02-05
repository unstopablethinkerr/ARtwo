export function load3DObjects() {
    const scene = document.querySelector('a-scene');
  
    const objectEntity = document.createElement('a-entity');
    objectEntity.setAttribute('gltf-model', 'assets/models/treasure_box.glb');
    objectEntity.setAttribute('position', '0 1 -3');
    objectEntity.setAttribute('scale', '0.5 0.5 0.5');
    objectEntity.setAttribute('animation-mixer', '');
  
    scene.appendChild(objectEntity);
  }
  