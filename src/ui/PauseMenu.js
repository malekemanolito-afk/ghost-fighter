export class PauseMenu {
  constructor() {
    this.selectedIndex = 0;
    this.options = ['RESUME', 'RESTART', 'MAIN MENU'];
  }

  update(input) {
    if (input.isKeyPressed('arrowup') || input.isKeyPressed('w')) {
      this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length;
    }
    if (input.isKeyPressed('arrowdown') || input.isKeyPressed('s')) {
      this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
    }
  }

  draw(renderer) {
    // Semi-transparent overlay
    renderer.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    renderer.ctx.fillRect(0, 0, renderer.width, renderer.height);

    // Panel
    const panelWidth = 300;
    const panelHeight = 200;
    const panelX = (renderer.width - panelWidth) / 2;
    const panelY = (renderer.height - panelHeight) / 2;

    renderer.drawOutlineRect(panelX, panelY, panelWidth, panelHeight, '#16c784', 2);
    renderer.drawRect(panelX + 1, panelY + 1, panelWidth - 2, panelHeight - 2, '#0a0e27');

    // Title
    renderer.drawPixelText('PAUSED', panelX + 120, panelY + 20, '#16c784', 16);

    // Options
    const optionStartY = panelY + 60;
    const optionSpacing = 40;

    for (let i = 0; i < this.options.length; i++) {
      const y = optionStartY + i * optionSpacing;
      const isSelected = i === this.selectedIndex;
      const color = isSelected ? '#ffff00' : '#16c784';
      const prefix = isSelected ? '> ' : '  ';

      renderer.drawPixelText(prefix + this.options[i], panelX + 30 + (isSelected ? 5 : 0), y, color, 12);
    }
  }
}
