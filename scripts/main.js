import { setupHandTracking } from './hand-tracking.js';
import { setupSurfaceDetection } from './surface-detection.js';
import { load3DObjects } from './3d-objects.js';

// Initialize the AR application
document.addEventListener('DOMContentLoaded', () => {
  setupHandTracking();
  setupSurfaceDetection();
  load3DObjects();
  
  // Add reset button functionality
  const resetButton = document.createElement('button');
  resetButton.innerText = 'Reset';
  resetButton.className = 'reset-button';
  document.body.appendChild(resetButton);

  resetButton.addEventListener('click', () => {
    location.reload(); // Simple page reload to reset the AR scene
  });
});
