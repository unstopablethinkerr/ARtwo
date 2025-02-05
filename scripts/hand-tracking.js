import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

export async function setupHandTracking() {
  const model = await handpose.load();
  const video = document.createElement('video');
  video.setAttribute('autoplay', '');
  video.setAttribute('playsinline', '');
  document.body.appendChild(video);

  // Get user media
  navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
    video.play();
  });

  async function detectHands() {
    const predictions = await model.estimateHands(video);
    if (predictions.length > 0) {
      const landmarks = predictions[0].landmarks;
      processGesture(landmarks);
    }
    requestAnimationFrame(detectHands);
  }

  function processGesture(landmarks) {
    // Example: Detect a simple open-hand gesture
    const palmBase = landmarks[0];
    const fingerTip = landmarks[8];

    const distance = Math.hypot(
      fingerTip[0] - palmBase[0],
      fingerTip[1] - palmBase[1]
    );

    if (distance > 50) {
      console.log('Open hand detected');
    } else {
      console.log('Closed hand detected');
    }
  }

  detectHands();
}
