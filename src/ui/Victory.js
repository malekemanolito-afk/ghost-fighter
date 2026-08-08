export class VictoryScreen {
  constructor(player) {
    this.player = player;
    this.selectedIndex = 0;
    this.options = ['PLAY AGAIN', 'MAIN MENU'];
    this.animationTime = 0;
  }

  update(deltaTime, input) {
    this.animationTime += deltaTime;

    if (input.isKeyPressed('arrowleft') || input.isKeyPressed('a')) {
      this.selectedIndex = 0;
    }
    if (input.isKeyPressed('arrowright') || input.isKeyPressed('d')) {
      this.selectedIndex = 1;
    }
  }

  draw(renderer) {
    // Semi-transparent overlay
    renderer.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    renderer.ctx.fillRect(0, 0, renderer.width, renderer.height);

    // Glow effect
    const glow = Math.sin(this.animationTime * 3) * 5;

    // Victory title
    renderer.drawPixelText('SOUL REAPER DEFEATED!', renderer.width / 2 - 110, renderer.height / 4, '#16c784', 20);
    renderer.drawPixelText('YOU WIN!', renderer.width / 2 - 40, renderer.height / 4 + 50, '#ffff00', 28);

    // Stats
    const statsStartY = renderer.height / 2 - 20;
    renderer.drawPixelText(`FINAL SCORE`, renderer.width / 2 - 50, statsStartY, '#16c784', 12);
    renderer.drawPixelText(String(this.player.score).padStart(8, '0'), renderer.width / 2 - 60, statsStartY + 20, '#ffff00', 16);

    renderer.drawPixelText(`LEVEL REACHED`, renderer.width / 2 - 50, statsStartY + 50, '#16c784', 12);
    renderer.drawPixelText(`${this.player.level}`, renderer.width / 2 - 60, statsStartY + 70, '#ffff00', 16);

    // Options
    const optionY = renderer.height * 2 / 3 + 20;
    const optionSpacing = 180;

    for (let i = 0; i < this.options.length; i++) {
      const x = renderer.width / 2 - 100 + i * optionSpacing;
      const isSelected = i === this.selectedIndex;
      const color = isSelected ? '#ffff00' : '#16c784';
      const borderColor = isSelected ? '#ffff00' : '#16c784';

      renderer.drawOutlineRect(x - 20, optionY - 8, 120, 35, borderColor, 2);
      if (isSelected) {
        renderer.drawRect(x - 18, optionY - 6, 116, 31, 'rgba(255, 255, 0, 0.1)');
      }
      renderer.drawPixelText(this.options[i], x - 15, optionY, color, 12);
    }
  }
}
