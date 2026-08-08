export class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = 960;
    this.height = 540;

    this.handleResize();
    window.addEventListener('resize', () => this.handleResize());
  }

  handleResize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Calculate scale
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scaleX = windowWidth / this.width;
    const scaleY = windowHeight / this.height;
    const scale = Math.min(scaleX, scaleY, 3); // Max scale 3x

    this.canvas.width = this.width * scale * dpr;
    this.canvas.height = this.height * scale * dpr;
    this.canvas.style.width = this.width * scale + 'px';
    this.canvas.style.height = this.height * scale + 'px';

    this.ctx.scale(scale * dpr, scale * dpr);
    this.scale = scale;
  }

  clear() {
    this.ctx.fillStyle = '#0a0e27';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawRect(x, y, width, height, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
  }

  drawOutlineRect(x, y, width, height, color, lineWidth = 1) {
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeRect(x, y, width, height);
  }

  drawCircle(x, y, radius, color) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawSprite(sprite, x, y, width, height, opacity = 1) {
    if (!sprite) return;
    this.ctx.globalAlpha = opacity;
    this.ctx.drawImage(sprite, x, y, width, height);
    this.ctx.globalAlpha = 1;
  }

  drawText(text, x, y, color = '#fff', align = 'left', size = 12, font = 'Arial') {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size}px ${font}`;
    this.ctx.textAlign = align;
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y);
  }

  drawPixelText(text, x, y, color = '#0f0', pixelSize = 8) {
    this.ctx.fillStyle = color;
    this.ctx.font = `bold ${pixelSize}px monospace`;
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(text, x, y);
  }
}
