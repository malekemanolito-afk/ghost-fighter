export class Projectile {
  constructor(x, y, velocityX, velocityY, damage, owner = 'player', lifetime = 5) {
    this.x = x;
    this.y = y;
    this.radius = 4;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.damage = damage;
    this.owner = owner;
    this.lifetime = lifetime;
    this.currentLifetime = 0;
    this.hasHit = false;
  }

  update(deltaTime) {
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;
    this.currentLifetime += deltaTime;
  }

  isAlive() {
    return this.currentLifetime < this.lifetime && !this.hasHit;
  }

  draw(renderer, cameraX, cameraY) {
    const screenX = this.x - cameraX;
    const screenY = this.y - cameraY;

    // Glowing projectile
    renderer.drawCircle(screenX, screenY, this.radius + 1, 'rgba(100, 200, 255, 0.3)');
    renderer.drawCircle(screenX, screenY, this.radius, '#64c8ff');
  }
}
