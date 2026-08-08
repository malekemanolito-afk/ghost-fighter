export class Input {
  constructor() {
    this.keys = {};
    this.keyJustPressed = {};
    this.keyJustReleased = {};

    this.setupListeners();
  }

  setupListeners() {
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      if (!this.keys[key]) {
        this.keyJustPressed[key] = true;
      }
      this.keys[key] = true;

      // Prevent default for game keys
      if (['w', 'arrowup', 'a', 'arrowleft', 'd', 'arrowright', 's', 'arrowdown', ' '].includes(key)) {
        e.preventDefault();
      }
    });

    window.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();
      this.keys[key] = false;
      this.keyJustReleased[key] = true;
    });
  }

  isKeyDown(key) {
    return this.keys[key.toLowerCase()] || false;
  }

  isKeyPressed(key) {
    const result = this.keyJustPressed[key.toLowerCase()] || false;
    this.keyJustPressed[key.toLowerCase()] = false;
    return result;
  }

  isKeyReleased(key) {
    const result = this.keyJustReleased[key.toLowerCase()] || false;
    this.keyJustReleased[key.toLowerCase()] = false;
    return result;
  }

  clear() {
    this.keyJustPressed = {};
    this.keyJustReleased = {};
  }
}
