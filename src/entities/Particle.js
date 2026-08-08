export class Particle {
  constructor(x, y, velocityX, velocityY, lifetime, color) {
    this.x = x;
    this.y = y;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.lifetime = lifetime;
    this.currentLifetime = 0;
    this.color = color;
    this.size = 3;
  }

  update(deltaTime) {
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;
    this.currentLifetime += deltaTime;
    this.velocityY += 400 * deltaTime; // Gravity
  }

  isAlive() {
    return this.currentLifetime < this.lifetime;
  }

  draw(renderer, cameraX, cameraY) {
    const screenX = this.x - cameraX;
    const screenY = this.y - cameraY;
    const alpha = 1 - this.currentLifetime / this.lifetime;

    this.color = this.color.replace(/[\d.]+\)$/, alpha + ')');
    renderer.drawRect(screenX - this.size / 2, screenY - this.size / 2, this.size, this.size, this.color);
  }
}
