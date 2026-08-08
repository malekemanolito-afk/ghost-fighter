export class HUD {
  constructor(game) {
    this.game = game;
    this.fontSize = 12;
  }

  draw(renderer) {
    const player = this.game.player;

    // HP Bar
    const hpBarX = 10;
    const hpBarY = 10;
    const hpBarWidth = 150;
    const hpBarHeight = 8;

    renderer.drawOutlineRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight, '#16c784', 1);
    const hpPercent = Math.max(0, player.hp / player.maxHP);
    renderer.drawRect(hpBarX + 1, hpBarY + 1, (hpBarWidth - 2) * hpPercent, hpBarHeight - 2, '#ff4444');
    renderer.drawPixelText(`HP ${Math.floor(player.hp)}/${player.maxHP}`, hpBarX, hpBarY - 12, '#16c784', 10);

    // Energy Bar
    const energyBarY = hpBarY + 25;
    renderer.drawOutlineRect(hpBarX, energyBarY, hpBarWidth, hpBarHeight, '#4a90e2', 1);
    const energyPercent = player.energy / player.maxEnergy;
    renderer.drawRect(hpBarX + 1, energyBarY + 1, (hpBarWidth - 2) * energyPercent, hpBarHeight - 2, '#4a90e2');
    renderer.drawPixelText(`ENERGY ${Math.floor(player.energy)}`, hpBarX, energyBarY - 12, '#4a90e2', 10);

    // Level and XP
    const levelY = energyBarY + 25;
    renderer.drawPixelText(`LEVEL ${player.level}`, hpBarX, levelY, '#f4a460', 10);
    renderer.drawOutlineRect(hpBarX, levelY + 12, hpBarWidth, 4, '#f4a460', 1);
    const xpPercent = player.xp / player.xpToLevel;
    renderer.drawRect(hpBarX + 1, levelY + 13, (hpBarWidth - 2) * xpPercent, 2, '#f4a460');

    // Combo Counter
    if (player.comboCounter > 0) {
      renderer.drawPixelText(`${player.comboCounter} HIT COMBO!`, renderer.width - 150, 10, '#ffff00', 14);
    }

    // Wave Info
    renderer.drawPixelText(`WAVE ${this.game.currentWave}`, renderer.width / 2 - 30, 10, '#ff6b6b', 12);

    // Score
    const scoreText = `SCORE ${String(player.score).padStart(8, '0')}`;
    renderer.drawPixelText(scoreText, renderer.width - 180, renderer.height - 20, '#16c784', 10);

    // Attack cooldown indicators
    const indicatorY = renderer.height - 30;
    const spacing = 40;
    this.drawCooldownIndicator(renderer, 10, indicatorY, player.attackCooldown, player.basicAttackCooldownTime, 'J', '#4a90e2');
    this.drawCooldownIndicator(renderer, 10 + spacing, indicatorY, player.heavyAttackCooldown, player.heavyAttackCooldownTime, 'K', '#ff4444');
    this.drawCooldownIndicator(renderer, 10 + spacing * 2, indicatorY, player.specialAttackCooldown, player.specialAttackCooldownTime, 'L', '#f4a460');
    this.drawCooldownIndicator(renderer, 10 + spacing * 3, indicatorY, player.dashCooldown, player.dashCooldownTime, 'SPACE', '#16c784');
  }

  drawCooldownIndicator(renderer, x, y, current, max, label, color) {
    const size = 20;
    renderer.drawOutlineRect(x, y, size, size, color, 1);
    if (current <= 0) {
      renderer.drawRect(x + 1, y + 1, size - 2, size - 2, color);
    } else {
      const percent = current / max;
      renderer.drawRect(x + 1, y + 1, (size - 2) * (1 - percent), size - 2, color);
    }
    renderer.drawPixelText(label, x - 5, y + 25, color, 8);
  }
}
