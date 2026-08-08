export class EnemySpawner {
  constructor() {
    this.wave = 0;
    this.waveEnemies = [];
    this.enemyQueue = [];
    this.waveActive = false;
    this.waveTimer = 0;
    this.waveDelay = 2; // Delay before next wave
  }

  getWaveConfig(waveNumber) {
    const configs = [
      {
        number: 1,
        enemies: [
          { type: 'lost_soul', count: 3 },
        ],
      },
      {
        number: 2,
        enemies: [
          { type: 'lost_soul', count: 5 },
          { type: 'shadow_ghost', count: 1 },
        ],
      },
      {
        number: 3,
        enemies: [
          { type: 'lost_soul', count: 4 },
          { type: 'shadow_ghost', count: 2 },
          { type: 'spirit_archer', count: 1 },
        ],
      },
      {
        number: 4,
        enemies: [
          { type: 'lost_soul', count: 3 },
          { type: 'shadow_ghost', count: 2 },
          { type: 'spirit_archer', count: 2 },
        ],
      },
      {
        number: 5,
        enemies: [
          { type: 'boss', count: 1 },
        ],
      },
    ];

    return configs[Math.min(waveNumber - 1, configs.length - 1)];
  }

  startWave(waveNumber) {
    this.wave = waveNumber;
    this.waveActive = true;
    this.waveTimer = 0;
    this.enemyQueue = [];
    this.waveEnemies = [];

    const config = this.getWaveConfig(waveNumber);

    for (const enemyConfig of config.enemies) {
      for (let i = 0; i < enemyConfig.count; i++) {
        this.enemyQueue.push({
          type: enemyConfig.type,
          delay: i * 0.5, // Spawn with delay
        });
      }
    }
  }

  update(deltaTime) {
    this.waveTimer += deltaTime;

    // Spawn queued enemies
    for (let i = this.enemyQueue.length - 1; i >= 0; i--) {
      if (this.waveTimer >= this.enemyQueue[i].delay) {
        this.waveEnemies.push(this.enemyQueue[i]);
        this.enemyQueue.splice(i, 1);
      }
    }
  }

  getNextEnemyToSpawn() {
    if (this.waveEnemies.length > 0) {
      return this.waveEnemies.shift();
    }
    return null;
  }

  isWaveComplete(activeEnemies) {
    return this.enemyQueue.length === 0 && this.waveEnemies.length === 0 && activeEnemies.length === 0;
  }
}
