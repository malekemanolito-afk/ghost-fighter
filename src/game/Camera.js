export class Camera {
  constructor(width, height) {
    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.targetX = 0;
    this.targetY = 0;
    this.smoothness = 0.1;
  }

  follow(target, worldWidth, worldHeight) {
    // Center camera on target
    this.targetX = target.x - this.width / 2;
    this.targetY = target.y - this.height / 2;

    // Clamp to world bounds
    this.targetX = Math.max(0, Math.min(this.targetX, worldWidth - this.width));
    this.targetY = Math.max(0, Math.min(this.targetY, worldHeight - this.height));

    // Smooth movement
    this.x += (this.targetX - this.x) * this.smoothness;
    this.y += (this.targetY - this.y) * this.smoothness;
  }

  shake(intensity, duration) {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
    this.shakeTime = 0;
  }

  update(deltaTime) {
    if (this.shakeDuration && this.shakeTime < this.shakeDuration) {
      this.shakeTime += deltaTime;
    } else {
      this.shakeIntensity = 0;
      this.shakeDuration = 0;
      this.shakeTime = 0;
    }
  }

  getShake() {
    if (!this.shakeIntensity) return { x: 0, y: 0 };
    const progress = this.shakeTime / this.shakeDuration;
    const intensity = this.shakeIntensity * (1 - progress);
    return {
      x: (Math.random() - 0.5) * intensity * 2,
      y: (Math.random() - 0.5) * intensity * 2,
    };
  }
}
