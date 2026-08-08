import { Game } from './game/Game.js';

let game;
let lastTime = 0;
const targetFPS = 60;
const frameDuration = 1 / targetFPS;
let deltaTimeAccumulator = 0;

function gameLoop(currentTime) {
  const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.05); // Cap at 0.05s
  lastTime = currentTime;

  // Fixed timestep
  game.update(deltaTime);
  game.render();
  game.lastDeltaTime = deltaTime;

  requestAnimationFrame(gameLoop);
}

function init() {
  game = new Game();
  requestAnimationFrame(gameLoop);
}

// Start game when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
