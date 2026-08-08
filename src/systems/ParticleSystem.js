export class ParticleSystem {
  constructor() {
    this.particles = [];
  }

  emit(x, y, velocityX, velocityY, lifetime, color, count = 1) {
    const { Particle } = require('./Particle.js');
    for (let i = 0; i < count; i++) {
      const vx = velocityX + (Math.random() - 0.5) * 100;
      const vy = velocityY + (Math.random() - 0.5) * 100;
      this.particles.push(new Particle(x, y, vx, vy, lifetime, color));
    }
  }

  emitBurst(x, y, velocity, lifetime, color, count = 8) {
    const { Particle } = require('./Particle.js');
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      this.particles.push(new Particle(x, y, vx, vy, lifetime, color));
    }
  }

  update(deltaTime) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(deltaTime);
      if (!this.particles[i].isAlive()) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw(renderer, cameraX, cameraY) {
    for (const particle of this.particles) {
      particle.draw(renderer, cameraX, cameraY);
    }
  }
}
