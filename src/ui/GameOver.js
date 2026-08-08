export class GameOverScreen {
  constructor(player, wave) {
    this.player = player;
    this.wave = wave;
    this.selectedIndex = 0;
    this.options = ['RETRY', 'MAIN MENU'];
  }

  update(input) {
    if (input.isKeyPressed('arrowleft') || input.isKeyPressed('a')) {
      this.selectedIndex = 0;
    }
    if (input.isKeyPressed('arrowright') || input.isKeyPressed('d')) {
      this.selectedIndex = 1;
    }
  }

  draw(renderer) {
    // Background
    renderer.drawRect(0, 0, renderer.width, renderer.height, '#1a0000');

    // Title
    renderer.drawPixelText('GAME OVER', renderer.width / 2 - 60, renderer.height / 3 - 40, '#ff4444', 24);

    // Stats
    const statsY = renderer.height / 3 + 20;
    renderer.drawPixelText(`SCORE: ${String(this.player.score).padStart(8, '0')}`, renderer.width / 2 - 80, statsY, '#16c784', 12);
    renderer.drawPixelText(`LEVEL: ${this.player.level}`, renderer.width / 2 - 80, statsY + 30, '#16c784', 12);
    renderer.drawPixelText(`WAVE: ${this.wave}`, renderer.width / 2 - 80, statsY + 60, '#16c784', 12);

    // Options
    const optionY = renderer.height * 2 / 3 + 20;
    const optionSpacing = 120;

    for (let i = 0; i < this.options.length; i++) {
      const x = renderer.width / 2 - 80 + i * optionSpacing;
      const isSelected = i === this.selectedIndex;
      const color = isSelected ? '#ffff00' : '#16c784';
      const borderColor = isSelected ? '#ffff00' : '#16c784';

      renderer.drawOutlineRect(x - 10, optionY - 5, 100, 30, borderColor, 1);
      if (isSelected) {
        renderer.drawRect(x - 9, optionY - 4, 98, 28, 'rgba(255, 255, 0, 0.1)');
      }
      renderer.drawPixelText(this.options[i], x, optionY, color, 12);
    }
  }
}
