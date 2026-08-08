export class GameState {
  constructor() {
    this.state = 'MENU'; // MENU, PLAYING, PAUSED, LEVEL_UP, BOSS, GAME_OVER, VICTORY
    this.isPaused = false;
  }

  setState(newState) {
    this.state = newState;
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }
}
