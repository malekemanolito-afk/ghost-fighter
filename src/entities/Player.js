export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 24;
    this.height = 32;

    // Stats
    this.maxHP = 100;
    this.hp = this.maxHP;
    this.maxEnergy = 100;
    this.energy = this.maxEnergy;
    this.xp = 0;
    this.level = 1;
    this.xpToLevel = 100;
    this.score = 0;
    this.comboCounter = 0;
    this.comboResetTime = 0;

    // Movement
    this.velocityX = 0;
    this.velocityY = 0;
    this.speed = 200;
    this.jumpPower = 500;
    this.isGrounded = true;
    this.gravity = 1000;

    // Combat
    this.attackCooldown = 0;
    this.heavyAttackCooldown = 0;
    this.specialAttackCooldown = 0;
    this.dashCooldown = 0;
    this.invulnerability = 0;
    this.facing = 1; // 1 for right, -1 for left

    // Attack properties
    this.basicAttackDamage = 12;
    this.heavyAttackDamage = 30;
    this.specialAttackDamage = 50;
    this.basicAttackRange = 30;
    this.basicAttackCooldownTime = 0.3;
    this.heavyAttackCooldownTime = 0.8;
    this.specialAttackCooldownTime = 2;
    this.dashCooldownTime = 1.2;
    this.dashDuration = 0.2;
    this.dashSpeed = 600;
    this.isDashing = false;
    this.dashTime = 0;

    // Special attack
    this.specialEnergyCost = 30;

    // Animation
    this.animationState = 'idle';
    this.animationFrame = 0;
    this.animationSpeed = 0.1;
  }

  update(deltaTime, input, worldWidth, worldHeight) {
    // Update cooldowns
    this.attackCooldown = Math.max(0, this.attackCooldown - deltaTime);
    this.heavyAttackCooldown = Math.max(0, this.heavyAttackCooldown - deltaTime);
    this.specialAttackCooldown = Math.max(0, this.specialAttackCooldown - deltaTime);
    this.dashCooldown = Math.max(0, this.dashCooldown - deltaTime);
    this.invulnerability = Math.max(0, this.invulnerability - deltaTime);
    this.comboResetTime = Math.max(0, this.comboResetTime - deltaTime);

    // Combo reset
    if (this.comboResetTime <= 0) {
      this.comboCounter = 0;
    }

    // Energy regeneration
    if (this.energy < this.maxEnergy) {
      this.energy = Math.min(this.maxEnergy, this.energy + 10 * deltaTime);
    }

    // Dash logic
    if (this.isDashing) {
      this.dashTime += deltaTime;
      if (this.dashTime >= this.dashDuration) {
        this.isDashing = false;
        this.dashTime = 0;
      }
      this.velocityX = this.facing * this.dashSpeed;
    } else {
      // Horizontal movement
      let moveX = 0;
      if (input.isKeyDown('a') || input.isKeyDown('arrowleft')) {
        moveX = -this.speed;
        this.facing = -1;
      }
      if (input.isKeyDown('d') || input.isKeyDown('arrowright')) {
        moveX = this.speed;
        this.facing = 1;
      }

      this.velocityX = moveX;
    }

    // Gravity
    this.velocityY += this.gravity * deltaTime;
    this.velocityY = Math.min(this.velocityY, 800); // Terminal velocity

    // Update position
    this.x += this.velocityX * deltaTime;
    this.y += this.velocityY * deltaTime;

    // Collision with world bounds
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > worldWidth) this.x = worldWidth - this.width;

    // Ground collision (simple)
    if (this.y + this.height >= worldHeight - 50) {
      this.y = worldHeight - 50 - this.height;
      this.velocityY = 0;
      this.isGrounded = true;
    } else {
      this.isGrounded = false;
    }

    // Jump
    if (input.isKeyPressed('w') || input.isKeyPressed('arrowup')) {
      if (this.isGrounded) {
        this.velocityY = -this.jumpPower;
        this.isGrounded = false;
      }
    }

    // Dash
    if (input.isKeyPressed(' ')) {
      if (this.dashCooldown <= 0) {
        this.isDashing = true;
        this.dashTime = 0;
        this.dashCooldown = this.dashCooldownTime;
      }
    }
  }

  attack(type = 'basic') {
    if (type === 'basic' && this.attackCooldown <= 0) {
      this.attackCooldown = this.basicAttackCooldownTime;
      this.comboCounter++;
      this.comboResetTime = 0.8;
      return {
        type: 'basic',
        damage: this.basicAttackDamage,
        range: this.basicAttackRange,
        knockback: 200,
      };
    }
    if (type === 'heavy' && this.heavyAttackCooldown <= 0) {
      this.heavyAttackCooldown = this.heavyAttackCooldownTime;
      this.comboCounter = 0;
      return {
        type: 'heavy',
        damage: this.heavyAttackDamage,
        range: this.basicAttackRange + 10,
        knockback: 400,
      };
    }
    if (type === 'special' && this.specialAttackCooldown <= 0 && this.energy >= this.specialEnergyCost) {
      this.specialAttackCooldown = this.specialAttackCooldownTime;
      this.energy -= this.specialEnergyCost;
      this.comboCounter = 0;
      return {
        type: 'special',
        damage: this.specialAttackDamage,
        range: 200,
        knockback: 300,
      };
    }
    return null;
  }

  takeDamage(damage) {
    if (this.invulnerability > 0) return;
    this.hp -= damage;
    this.invulnerability = 0.5;
  }

  heal(amount) {
    this.hp = Math.min(this.maxHP, this.hp + amount);
  }

  gainXP(amount) {
    this.xp += amount;
    this.score += Math.floor(amount * 10);

    while (this.xp >= this.xpToLevel) {
      this.xp -= this.xpToLevel;
      this.levelUp();
    }
  }

  levelUp() {
    this.level++;
    this.xpToLevel = Math.floor(this.xpToLevel * 1.1);
    this.maxHP = Math.floor(this.maxHP * 1.1);
    this.hp = this.maxHP;
    this.basicAttackDamage = Math.floor(this.basicAttackDamage * 1.1);
    this.score += 500;
  }

  draw(renderer, cameraX, cameraY) {
    const screenX = this.x - cameraX;
    const screenY = this.y - cameraY;

    // Flash if invulnerable
    if (this.invulnerability > 0 && Math.floor(this.invulnerability * 10) % 2 === 0) {
      return;
    }

    // Player body
    renderer.drawRect(screenX, screenY, this.width, this.height, '#4a90e2');

    // Eyes
    const eyeY = screenY + 8;
    renderer.drawRect(screenX + 6, eyeY, 3, 3, '#fff');
    renderer.drawRect(screenX + 15, eyeY, 3, 3, '#fff');

    // Aura
    renderer.drawCircle(screenX + this.width / 2, screenY + this.height / 2, 20, 'rgba(74, 144, 226, 0.2)');
  }
}
