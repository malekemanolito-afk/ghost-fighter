export class MainMenu {
  constructor() {
    this.selectedIndex = 0;
    this.options = ['START', 'HOW TO PLAY', 'SETTINGS'];
    this.animationTime = 0;
  }

  update(deltaTime, input) {
    this.animationTime += deltaTime;

    if (input.isKeyPressed('arrowup') || input.isKeyPressed('w')) {
      this.selectedIndex = (this.selectedIndex - 1 + this.options.length) % this.options.length;
    }
    if (input.isKeyPressed('arrowdown') || input.isKeyPressed('s')) {
      this.selectedIndex = (this.selectedIndex + 1) % this.options.length;
    }
  }

  draw(renderer) {
    // Background
    renderer.drawRect(0, 0, renderer.width, renderer.height, '#0a0e27');

    // Animated background elements
    const ghostY = Math.sin(this.animationTime * 1.5) * 20;
    renderer.drawCircle(renderer.width / 4, renderer.height / 3 + ghostY, 25, 'rgba(232, 160, 232, 0.3)');
    renderer.drawCircle(renderer.width * 3 / 4, renderer.height / 2.5 + ghostY * 0.7, 20, 'rgba(107, 76, 154, 0.2)');

    // Title
    const titleGlow = Math.sin(this.animationTime * 2) * 10;
    renderer.drawPixelText('GHOST FIGHTER', renderer.width / 2 - 60, renderer.height / 4 - 20, '#16c784', 20);

    // Menu options
    const menuStartY = renderer.height / 2 + 20;
    const optionSpacing = 50;

    for (let i = 0; i < this.options.length; i++) {
      const y = menuStartY + i * optionSpacing;
      const isSelected = i === this.selectedIndex;
      const color = isSelected ? '#ffff00' : '#16c784';
      const prefix = isSelected ? '> ' : '  ';
      const glow = isSelected ? Math.sin(this.animationTime * 5) * 3 : 0;

      renderer.drawPixelText(prefix + this.options[i], renderer.width / 2 - 40 + glow, y, color, 14);
    }

    // Instructions
    renderer.drawPixelText('Arrow Keys/WASD to Select', renderer.width / 2 - 80, renderer.height - 60, '#888', 10);
    renderer.drawPixelText('Enter or Space to Confirm', renderer.width / 2 - 80, renderer.height - 40, '#888', 10);
  }
}
