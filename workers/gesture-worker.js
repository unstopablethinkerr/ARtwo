self.onmessage = (event) => {
    const landmarks = event.data.landmarks;
  
    if (!landmarks || landmarks.length < 8) {
      self.postMessage({ gesture: 'unknown' });
      return;
    }
  
    const palmBase = landmarks[0];
    const fingerTip = landmarks[8];
  
    const distance = Math.hypot(
      fingerTip[0] - palmBase[0],
      fingerTip[1] - palmBase[1]
    );
  
    let gesture = 'unknown';
    if (distance > 50) {
      gesture = 'open-hand';
    } else {
      gesture = 'closed-hand';
    }
  
    self.postMessage({ gesture });
  };
  