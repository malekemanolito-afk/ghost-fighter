export class Enemy {
  constructor(x, y, type = 'lost_soul') {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 28;
    this.type = type;
    this.facing = -1;

    // Set properties based on type
    switch (type) {
      case 'lost_soul':
        this.maxHP = 40;
        this.damage = 8;
        this.speed = 80;
        this.attackRange = 20;
        this.color = '#e8a0e8';
        this.xpReward = 20;
        break;
      case 'shadow_ghost':
        this.maxHP = 60;
        this.damage = 12;
        this.speed = 150;
        this.attackRange = 20;
        this.color = '#6b4c9a';
        this.xpReward = 35;
        break;
      case 'spirit_archer':
        this.maxHP = 50;
        this.damage = 15;
        this.speed = 100;
        this.attackRange = 150;
        this.color = '#f4a460';
        this.xpReward = 40;
        break;
      default:
        this.maxHP = 40;
        this.damage = 8;
        this.speed = 80;
        this.attackRange = 20;
        this.color = '#e8a0e8';
        this.xpReward = 20;
    }

    this.hp = this.maxHP;

    // Movement
    this.velocityX = 0;
    this.velocityY = 0;
    this.gravity = 1000;
    this.isGrounded = true;

    // Combat
    this.attackCooldown = 0;
    this.state = 'idle'; // idle, patrol, chase, attack, hurt, dead
    this.stateTime = 0;
    this.seenPlayerTime = 0;
  }

  update(deltaTime, player, worldWidth, worldHeight) {
    // Update cooldowns
    this.attackCooldown = Math.max(0, this.attackCooldown - deltaTime);
    this.stateTime += deltaTime;

    // Check distance to player
    const dx = player.x - this.x;
    const distance = Math.abs(dx);
    const canSeePlayer = distance < 300;

    // Update state
    if (this.hp <= 0) {
      this.state = 'dead';
    } else if (canSeePlayer) {
      this.seenPlayerTime = 1;
      this.state = 'chase';
    } else if (this.seenPlayerTime > 0) {
      this.seenPlayerTime -= deltaTime;
      this.state = 'chase';
    } else {
      this.state = 'patrol';
    }

    // Update facing
    if (dx > 0) {
      this.facing = 1;
    } else if (dx < 0) {
      this.facing = -1;
    }

    // Behavior based on state
    switch (this.state) {
      case 'chase':
        this.velocityX = this.facing * this.speed;
        if (distance < this.attackRange) {
          this.state = 'attack';
          this.velocityX = 0;
        }
        break;
      case 'attack':
        this.velocityX = 0;
        break;
      case 'patrol':
        if (this.isGrounded) {
          if (Math.random() > 0.99) {
            this.facing *= -1;
          }
        }
        this.velocityX = this.facing * this.speed * 0.5;
        break;
    }

    // Gravity
    this.velocityY += this.gravity * deltaTime;
    this.velocityY = Math.min(this.velocityY, 800);

    // Update position
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;

    // Collision with world bounds
    if (this.x < 0 || this.x + this.width > worldWidth) {
      this.facing *= -1;
      this.x = Math.max(0, Math.min(this.x, worldWidth - this.width));
    }

    // Ground collision
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
    return this.attackCooldown <= 0 && this.state === 'attack';
  }

  getAttack() {
    if (this.canAttack()) {
      this.attackCooldown = 1.0;
      return {
        damage: this.damage,
        knockback: 150,
      };
    }
    return null;
  }

  draw(renderer, cameraX, cameraY) {
    if (this.hp <= 0) return;

    const screenX = this.x - cameraX;
    const screenY = this.y - cameraY;

    // Body
    renderer.drawRect(screenX, screenY, this.width, this.height, this.color);

    // Eyes (white glow)
    renderer.drawRect(screenX + 4, screenY + 6, 3, 3, '#fff');
    renderer.drawRect(screenX + 13, screenY + 6, 3, 3, '#fff');

    // HP bar
    const barWidth = this.width;
    const barHeight = 2;
    renderer.drawRect(screenX, screenY - 5, barWidth, barHeight, '#333');
    const healthPercent = this.hp / this.maxHP;
    renderer.drawRect(screenX, screenY - 5, barWidth * healthPercent, barHeight, '#ff4444');
  }
}
