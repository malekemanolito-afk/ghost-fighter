import { Renderer } from '../game/Renderer.js';
import { Input } from '../game/Input.js';
import { GameState } from '../game/GameState.js';
import { Camera } from '../game/Camera.js';
import { Collision } from '../game/Collision.js';
import { Player } from '../entities/Player.js';
import { Enemy } from '../entities/Enemy.js';
import { Boss } from '../entities/Boss.js';
import { Projectile } from '../entities/Projectile.js';
import { Particle } from '../entities/Particle.js';
import { CombatSystem } from '../systems/CombatSystem.js';
import { EnemySpawner } from '../systems/EnemySpawner.js';
import { ParticleSystem } from '../systems/ParticleSystem.js';
import { AudioSystem } from '../systems/AudioSystem.js';
import { HUD } from '../ui/HUD.js';
import { MainMenu } from '../ui/MainMenu.js';
import { PauseMenu } from '../ui/PauseMenu.js';
import { GameOverScreen } from '../ui/GameOver.js';

export class Game {
  constructor() {
    const canvas = document.getElementById('gameCanvas');
    this.renderer = new Renderer(canvas);
    this.input = new Input();
    this.gameState = new GameState();
    this.camera = new Camera(this.renderer.width, this.renderer.height);
    this.audioSystem = new AudioSystem();

    // Game world
    this.worldWidth = 960;
    this.worldHeight = 540;

    // Entities
    this.player = null;
    this.enemies = [];
    this.boss = null;
    this.projectiles = [];

    // Systems
    this.combatSystem = new CombatSystem();
    this.enemySpawner = new EnemySpawner();
    this.particleSystem = new ParticleSystem();

    // Game state
    this.currentWave = 0;
    this.waveTransitionTimer = 0;
    this.waveTransitionDuration = 2;
    this.screenShakeIntensity = 0;
    this.screenShakeDuration = 0;
    this.screenShakeTime = 0;

    // UI
    this.hud = null;
    this.mainMenu = new MainMenu();
    this.pauseMenu = null;
    this.gameOverScreen = null;

    // Settings
    this.showScreenShake = true;
    this.debugMode = false;

    this.loadSettings();
    this.init();
  }

  init() {
    this.gameState.setState('MENU');
  }

  startGame() {
    this.player = new Player(this.worldWidth / 2, this.worldHeight - 100);
    this.enemies = [];
    this.projectiles = [];
    this.currentWave = 0;
    this.bossFight = false;
    this.gameState.setState('PLAYING');
    this.hud = new HUD(this);
    this.startNextWave();
  }

  startNextWave() {
    this.currentWave++;
    this.enemySpawner.startWave(this.currentWave);
    if (this.currentWave === 5) {
      this.bossFight = true;
    }
  }

  update(deltaTime) {
    this.input.clear();

    switch (this.gameState.state) {
      case 'MENU':
        this.updateMenu(deltaTime);
        break;
      case 'PLAYING':
        this.updatePlaying(deltaTime);
        break;
      case 'PAUSED':
        this.updatePaused(deltaTime);
        break;
      case 'GAME_OVER':
        this.updateGameOver(deltaTime);
        break;
    }
  }

  updateMenu(deltaTime) {
    this.mainMenu.update(deltaTime, this.input);

    if (this.input.isKeyPressed('enter') || this.input.isKeyPressed(' ')) {
      if (this.mainMenu.selectedIndex === 0) {
        this.startGame();
      }
    }
  }

  updatePlaying(deltaTime) {
    if (this.input.isKeyPressed('escape')) {
      this.gameState.setState('PAUSED');
      this.pauseMenu = new PauseMenu();
      return;
    }

    // Toggle debug mode
    if (this.input.isKeyPressed('f3')) {
      this.debugMode = !this.debugMode;
    }

    // Update player
    this.player.update(deltaTime, this.input, this.worldWidth, this.worldHeight);

    // Handle player attacks
    if (this.input.isKeyPressed('j') || this.input.isKeyPressed('z')) {
      const attack = this.player.attack('basic');
      if (attack) {
        this.combatSystem.createAttackHitbox(this.player, attack);
        this.audioSystem.play('attack');
        this.createHitParticles(this.player);
      }
    }

    if (this.input.isKeyPressed('k') || this.input.isKeyPressed('x')) {
      const attack = this.player.attack('heavy');
      if (attack) {
        this.combatSystem.createAttackHitbox(this.player, attack);
        this.audioSystem.play('heavy_attack');
        this.createHitParticles(this.player, 12);
        this.screenShake(15, 0.2);
      }
    }

    if (this.input.isKeyPressed('l') || this.input.isKeyPressed('c')) {
      const attack = this.player.attack('special');
      if (attack) {
        // Create projectile
        const projectile = new Projectile(
          this.player.x + this.player.width / 2,
          this.player.y + this.player.height / 2,
          this.player.facing * 400,
          0,
          attack.damage,
          'player',
          4
        );
        this.projectiles.push(projectile);
        this.audioSystem.play('special_attack');
        this.createHitParticles(this.player, 20);
        this.screenShake(10, 0.3);
      }
    }

    // Check combat
    const hitResults = this.combatSystem.checkCollisions(this.enemies);
    for (const hit of hitResults) {
      if (hit.target.hp > 0) {
        hit.target.takeDamage(hit.damage);
        hit.target.velocityX = this.player.facing * hit.knockback * 0.5;
        this.createHitParticles(hit.target, 8);
        this.audioSystem.play('hit');
        this.screenShake(5, 0.1);
        this.player.score += Math.floor(hit.damage * 5);
      }
    }

    // Combat with boss
    if (this.boss) {
      const bossHits = this.combatSystem.checkCollisions([this.boss]);
      for (const hit of bossHits) {
        this.boss.takeDamage(hit.damage);
        this.boss.velocityX = this.player.facing * hit.knockback * 0.5;
        this.createHitParticles(this.boss, 12);
        this.audioSystem.play('hit');
        this.screenShake(8, 0.15);
        this.player.score += Math.floor(hit.damage * 10);
      }
    }

    this.combatSystem.clear();

    // Update enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update(deltaTime, this.player, this.worldWidth, this.worldHeight);

      if (enemy.hp <= 0) {
        this.player.gainXP(enemy.xpReward);
        this.createDeathParticles(enemy);
        this.audioSystem.play('enemy_death');
        this.enemies.splice(i, 1);
        continue;
      }

      // Enemy attacks player
      const enemyAttack = enemy.getAttack();
      if (enemyAttack && Collision.checkRect(
        { x: enemy.x, y: enemy.y, width: enemy.width, height: enemy.height },
        { x: this.player.x, y: this.player.y, width: this.player.width, height: this.player.height }
      )) {
        this.player.takeDamage(enemyAttack.damage);
        this.player.velocityX = (enemy.x > this.player.x ? -1 : 1) * enemyAttack.knockback * 0.3;
        this.audioSystem.play('damage');
        this.screenShake(8, 0.2);
      }
    }

    // Update boss
    if (this.boss) {
      this.boss.update(deltaTime, this.player, this.worldWidth, this.worldHeight);

      if (this.boss.hp <= 0) {
        this.player.gainXP(this.boss.xpReward);
        this.createDeathParticles(this.boss);
        this.audioSystem.play('boss_death');
        this.gameState.setState('VICTORY');
        this.boss = null;
        return;
      }

      // Boss attacks player
      const bossAttack = this.boss.getAttack();
      if (bossAttack && Collision.checkRect(
        { x: this.boss.x, y: this.boss.y, width: this.boss.width, height: this.boss.height },
        { x: this.player.x, y: this.player.y, width: this.player.width, height: this.player.height }
      )) {
        this.player.takeDamage(bossAttack.damage);
        this.player.velocityX = (this.boss.x > this.player.x ? -1 : 1) * bossAttack.knockback * 0.3;
        this.audioSystem.play('damage');
        this.screenShake(12, 0.3);
      }
    }

    // Update projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];
      projectile.update(deltaTime);

      if (!projectile.isAlive()) {
        this.projectiles.splice(i, 1);
        continue;
      }

      // Check collision with enemies
      for (const enemy of this.enemies) {
        if (Collision.checkCircle(
          { x: projectile.x, y: projectile.y, radius: projectile.radius },
          { x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height / 2, radius: enemy.width / 2 }
        )) {
          projectile.hasHit = true;
          enemy.takeDamage(projectile.damage);
          this.createHitParticles(enemy, 10);
          this.audioSystem.play('hit');
          this.player.score += Math.floor(projectile.damage * 8);
          break;
        }
      }

      // Check collision with boss
      if (this.boss && Collision.checkCircle(
        { x: projectile.x, y: projectile.y, radius: projectile.radius },
        { x: this.boss.x + this.boss.width / 2, y: this.boss.y + this.boss.height / 2, radius: this.boss.width / 2 }
      )) {
        projectile.hasHit = true;
        this.boss.takeDamage(projectile.damage);
        this.createHitParticles(this.boss, 15);
        this.audioSystem.play('hit');
        this.player.score += Math.floor(projectile.damage * 12);
      }
    }

    // Spawn enemies
    this.enemySpawner.update(deltaTime);
    const nextEnemyToSpawn = this.enemySpawner.getNextEnemyToSpawn();
    if (nextEnemyToSpawn) {
      if (nextEnemyToSpawn.type === 'boss') {
        this.boss = new Boss(this.worldWidth / 2, 100);
        this.audioSystem.play('boss_appear');
        this.screenShake(20, 0.5);
      } else {
        const spawnX = Math.random() > 0.5 ? 50 : this.worldWidth - 50;
        const enemy = new Enemy(spawnX, 50, nextEnemyToSpawn.type);
        this.enemies.push(enemy);
        this.audioSystem.play('enemy_spawn');
      }
    }

    // Wave complete
    if (this.enemySpawner.isWaveComplete(this.enemies) && !this.boss) {
      this.waveTransitionTimer += deltaTime;
      if (this.waveTransitionTimer >= this.waveTransitionDuration) {
        this.waveTransitionTimer = 0;
        if (this.currentWave < 5) {
          this.startNextWave();
        }
      }
    }

    // Player dead
    if (this.player.hp <= 0) {
      this.gameState.setState('GAME_OVER');
      this.gameOverScreen = new GameOverScreen(this.player, this.currentWave);
      this.audioSystem.play('game_over');
    }

    // Update systems
    this.particleSystem.update(deltaTime);
    this.camera.update(deltaTime);
    this.camera.follow(this.player, this.worldWidth, this.worldHeight);

    // Screen shake
    if (this.screenShakeDuration > 0) {
      this.screenShakeTime += deltaTime;
      if (this.screenShakeTime >= this.screenShakeDuration) {
        this.screenShakeDuration = 0;
        this.screenShakeTime = 0;
      }
    }
  }

  updatePaused(deltaTime) {
    this.pauseMenu.update(this.input);

    if (this.input.isKeyPressed('escape')) {
      this.gameState.setState('PLAYING');
      this.pauseMenu = null;
      return;
    }

    if (this.input.isKeyPressed('enter') || this.input.isKeyPressed(' ')) {
      if (this.pauseMenu.selectedIndex === 0) {
        this.gameState.setState('PLAYING');
        this.pauseMenu = null;
      } else if (this.pauseMenu.selectedIndex === 1) {
        this.startGame();
      } else if (this.pauseMenu.selectedIndex === 2) {
        this.gameState.setState('MENU');
        this.pauseMenu = null;
      }
    }
  }

  updateGameOver(deltaTime) {
    this.gameOverScreen.update(this.input);

    if (this.input.isKeyPressed('enter') || this.input.isKeyPressed(' ')) {
      if (this.gameOverScreen.selectedIndex === 0) {
        this.startGame();
      } else if (this.gameOverScreen.selectedIndex === 1) {
        this.gameState.setState('MENU');
      }
    }
  }

  render() {
    this.renderer.clear();

    const shake = this.showScreenShake ? this.camera.getShake() : { x: 0, y: 0 };

    switch (this.gameState.state) {
      case 'MENU':
        this.mainMenu.draw(this.renderer);
        break;
      case 'PLAYING':
      case 'PAUSED':
        this.renderGameplay(shake);
        if (this.gameState.state === 'PAUSED') {
          this.pauseMenu.draw(this.renderer);
        }
        break;
      case 'GAME_OVER':
        this.renderGameplay(shake);
        this.gameOverScreen.draw(this.renderer);
        break;
      case 'VICTORY':
        this.renderGameplay(shake);
        this.renderVictoryScreen();
        break;
    }
  }

  renderGameplay(shake) {
    const offsetX = this.camera.x - shake.x;
    const offsetY = this.camera.y - shake.y;

    // Background
    this.renderBackground(offsetX, offsetY);

    // Draw enemies
    for (const enemy of this.enemies) {
      enemy.draw(this.renderer, offsetX, offsetY);
    }

    // Draw boss
    if (this.boss) {
      this.boss.draw(this.renderer, offsetX, offsetY);
    }

    // Draw projectiles
    for (const projectile of this.projectiles) {
      projectile.draw(this.renderer, offsetX, offsetY);
    }

    // Draw player
    this.player.draw(this.renderer, offsetX, offsetY);

    // Draw particles
    this.particleSystem.draw(this.renderer, offsetX, offsetY);

    // Draw HUD
    if (this.hud) {
      this.hud.draw(this.renderer);
    }

    // Debug info
    if (this.debugMode) {
      this.renderDebugInfo();
    }
  }

  renderBackground(offsetX, offsetY) {
    // Night sky
    this.renderer.drawRect(0, 0, this.renderer.width, this.renderer.height, '#0a0e27');

    // Moon
    this.renderer.drawCircle(100 - offsetX * 0.1, 50 - offsetY * 0.1, 30, 'rgba(200, 200, 200, 0.3)');

    // Ground
    this.renderer.drawRect(0 - offsetX, this.worldHeight - 50 - offsetY, this.worldWidth, 50, '#1a3a1a');
    this.renderer.drawOutlineRect(0 - offsetX, this.worldHeight - 50 - offsetY, this.worldWidth, 50, '#16c784', 2);
  }

  renderVictoryScreen() {
    // Semi-transparent overlay
    this.renderer.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.renderer.ctx.fillRect(0, 0, this.renderer.width, this.renderer.height);

    // Victory text
    this.renderer.drawPixelText('SOUL REAPER DEFEATED!', this.renderer.width / 2 - 100, this.renderer.height / 3, '#16c784', 20);
    this.renderer.drawPixelText('YOU WIN!', this.renderer.width / 2 - 50, this.renderer.height / 3 + 50, '#ffff00', 24);

    // Stats
    const statsY = this.renderer.height / 2 + 30;
    this.renderer.drawPixelText(`FINAL SCORE: ${String(this.player.score).padStart(8, '0')}`, this.renderer.width / 2 - 100, statsY, '#16c784', 12);
    this.renderer.drawPixelText(`LEVEL REACHED: ${this.player.level}`, this.renderer.width / 2 - 100, statsY + 30, '#16c784', 12);

    // Menu
    this.renderer.drawPixelText('Press SPACE or ENTER to continue', this.renderer.width / 2 - 120, this.renderer.height - 50, '#888', 10);
  }

  renderDebugInfo() {
    const debugY = 100;
    const debugX = 10;
    this.renderer.drawPixelText(`FPS: ${Math.round(1 / (this.lastDeltaTime || 0.016))}`, debugX, debugY, '#00ff00', 10);
    this.renderer.drawPixelText(`Player: ${Math.round(this.player.x)}, ${Math.round(this.player.y)}`, debugX, debugY + 20, '#00ff00', 10);
    this.renderer.drawPixelText(`Enemies: ${this.enemies.length}`, debugX, debugY + 40, '#00ff00', 10);
    this.renderer.drawPixelText(`Wave: ${this.currentWave}`, debugX, debugY + 60, '#00ff00', 10);
    this.renderer.drawPixelText(`Projectiles: ${this.projectiles.length}`, debugX, debugY + 80, '#00ff00', 10);
  }

  createHitParticles(target, count = 8) {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = 150;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      this.particleSystem.emit(target.x + target.width / 2, target.y + target.height / 2, vx, vy, 0.5, 'rgba(255, 100, 100, 0.8)', 1);
    }
  }

  createDeathParticles(target) {
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 200 + Math.random() * 100;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      this.particleSystem.emit(target.x + target.width / 2, target.y + target.height / 2, vx, vy, 1, 'rgba(200, 100, 255, 0.8)', 1);
    }
  }

  screenShake(intensity, duration) {
    if (!this.showScreenShake) return;
    this.screenShakeIntensity = intensity;
    this.screenShakeDuration = duration;
    this.screenShakeTime = 0;
    this.camera.shake(intensity, duration);
  }

  saveSettings() {
    localStorage.setItem('ghostFighterSettings', JSON.stringify({
      audioEnabled: this.audioSystem.enabled,
      sfxEnabled: this.audioSystem.sfxEnabled,
      musicEnabled: this.audioSystem.musicEnabled,
      screenShakeEnabled: this.showScreenShake,
    }));
  }

  loadSettings() {
    const settings = localStorage.getItem('ghostFighterSettings');
    if (settings) {
      const parsed = JSON.parse(settings);
      this.audioSystem.enabled = parsed.audioEnabled ?? true;
      this.audioSystem.sfxEnabled = parsed.sfxEnabled ?? true;
      this.audioSystem.musicEnabled = parsed.musicEnabled ?? true;
      this.showScreenShake = parsed.screenShakeEnabled ?? true;
    }
  }

  saveHighScore() {
    const highScore = localStorage.getItem('ghostFighterHighScore') || 0;
    if (this.player.score > highScore) {
      localStorage.setItem('ghostFighterHighScore', this.player.score);
    }
  }
}
