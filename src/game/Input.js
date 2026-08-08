export class Input {
  constructor() {
    this.keys = {};
    this.keyJustPressed = {};
    this.keyJustReleased = {};

    this.setupListeners();
  }

  setupListeners() {
    // KeyDown event with capture phase
    window.addEventListener('keydown', (e) => {
      const key = e.key.toLowerCase();
      
      // Set key as pressed
      if (!this.keys[key]) {
        this.keyJustPressed[key] = true;
      }
      this.keys[key] = true;

      // Prevent default for game keys
      if (['w', 'arrowup', 'a', 'arrowleft', 'd', 'arrowright', 's', 'arrowdown', ' ', 'enter'].includes(key)) {
        e.preventDefault();
      }
    }, true);

    // KeyUp event with capture phase
    window.addEventListener('keyup', (e) => {
      const key = e.key.toLowerCase();
      this.keys[key] = false;
      this.keyJustReleased[key] = true;
    }, true);

    // Handle visibility to reset keys when window loses focus
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.keys = {};
        this.keyJustPressed = {};
        this.keyJustReleased = {};
      }
    });

    // Reset keys when window loses focus
    window.addEventListener('blur', () => {
      this.keys = {};
      this.keyJustPressed = {};
      this.keyJustReleased = {};
    });
  }

  isKeyDown(key) {
    return this.keys[key.toLowerCase()] || false;
  }

  isKeyPressed(key) {
    const keyLower = key.toLowerCase();
    const result = this.keyJustPressed[keyLower] || false;
    this.keyJustPressed[keyLower] = false;
    return result;
  }

  isKeyReleased(key) {
    const keyLower = key.toLowerCase();
    const result = this.keyJustReleased[keyLower] || false;
    this.keyJustReleased[keyLower] = false;
    return result;
  }

  clear() {
    this.keyJustPressed = {};
    this.keyJustReleased = {};
  }
}
