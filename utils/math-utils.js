export function calculateDistance(point1, point2) {
    return Math.hypot(point2[0] - point1[0], point2[1] - point1[1]);
  }
  
  export function normalizeVector(vector) {
    const length = Math.hypot(vector.x, vector.y, vector.z);
    return { x: vector.x / length, y: vector.y / length, z: vector.z / length };
  }
  