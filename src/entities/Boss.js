export class Boss {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 48;
    this.height = 56;
    this.facing = -1;

    // Stats
    this.maxHP = 1000;
    this.hp = this.maxHP;
    this.damage = 25;
    this.speed = 100;
    this.xpReward = 500;

    // Movement
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 800;
    this.isGrounded = true;

    // Combat
    this.state = 'idle'; // idle, chase, melee_attack, ranged_attack, enraged, hurt, dead
    this.stateTime = 0;
    this.attackCooldown = 0;
    this.phase = 1; // 1-4
    this.updatePhase();

    // Special attacks
    this.projectiles = [];
  }

  updatePhase() {
    const healthPercent = this.hp / this.maxHP;
    if (healthPercent > 0.75) {
      this.phase = 1;
    } else if (healthPercent > 0.5) {
      this.phase = 2;
    } else if (healthPercent > 0.25) {
      this.phase = 3;
    } else {
      this.phase = 4;
    }
  }

  update(deltaTime, player, worldWidth, worldHeight) {
    this.attackCooldown = Math.max(0, this.attackCooldown - deltaTime);
    this.stateTime += deltaTime;

    this.updatePhase();

    if (this.hp <= 0) {
      this.state = 'dead';
      return;
    }

    const dx = player.x - this.x;
    const distance = Math.abs(dx);

    // Update facing
    if (dx > 0) {
      this.facing = 1;
    } else if (dx < 0) {
      this.facing = -1;
    }

    // Boss behavior based on phase
    if (distance < 200) {
      if (this.attackCooldown <= 0) {
        if (this.phase === 1) {
          this.state = 'melee_attack';
          this.attackCooldown = 2;
        } else if (this.phase === 2) {
          this.state = this.stateTime % 2 < 1 ? 'melee_attack' : 'ranged_attack';
          this.attackCooldown = 1.5;
        } else if (this.phase === 3) {
          const choice = Math.random();
          if (choice < 0.4) this.state = 'melee_attack';
          else if (choice < 0.8) this.state = 'ranged_attack';
          else this.state = 'ranged_attack'; // summon equivalent
          this.attackCooldown = 1;
        } else {
          this.state = 'melee_attack';
          this.attackCooldown = 0.8;
        }
      } else {
        this.state = 'chase';
      }
      this.velocityX = this.facing * this.speed;
    } else {
      this.state = 'chase';
      this.velocityX = this.facing * this.speed;
    }

    // Gravity
    this.velocityY += this.gravity * deltaTime;
    this.velocityY = Math.min(this.velocityY, 600);

    // Update position
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;

    // Bounds
    if (this.x < 100) this.x = 100;
    if (this.x + this.width > worldWidth - 100) this.x = worldWidth - 100 - this.width;

    // Ground
    if (this.y + this.height >= worldHeight - 50) {
      this.y = worldHeight - 50 - this.height;
      this.velocityY = 0;
      this.isGrounded = true;
    } else {
      this.isGrounded = false;
    }
  }

  takeDamage(damage) {
    this.hp -= damage;
    this.state = 'hurt';
    this.stateTime = 0.2;
  }

  canAttack() {
    return this.attackCooldown <= 0;
  }

  getAttack() {
    if (this.state === 'melee_attack') {
      return {
        type: 'melee',
        damage: this.damage,
        knockback: 300,
      };
    }
    if (this.state === 'ranged_attack') {
      return {
        type: 'ranged',
        damage: Math.floor(this.damage * 0.8),
        knockback: 200,
      };
    }
    return null;
  }

  draw(renderer, cameraX, cameraY) {
    if (this.hp <= 0) return;

    const screenX = this.x - cameraX;
    const screenY = this.y - cameraY;

    // Main body (dark red/purple)
    renderer.drawRect(screenX, screenY, this.width, this.height, '#8b1a1a');

    // Head
    renderer.drawRect(screenX + 8, screenY + 4, 32, 16, '#a02a2a');

    // Glowing eyes
    renderer.drawCircle(screenX + 16, screenY + 10, 3, '#ff4444');
    renderer.drawCircle(screenX + 32, screenY + 10, 3, '#ff4444');

    // HP bar (large, at top)
    const barWidth = 100;
    const barHeight = 6;
    renderer.drawRect(screenX - 26, screenY - 15, barWidth, barHeight, '#333');
    const healthPercent = this.hp / this.maxHP;
    renderer.drawRect(screenX - 26, screenY - 15, barWidth * healthPercent, barHeight, '#ff2222');

    // Phase indicator
    renderer.drawPixelText(`PHASE ${this.phase}`, screenX - 26, screenY - 8, '#ff4444', 8);
  }
}
