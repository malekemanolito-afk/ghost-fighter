# Ghost Fighter - COMPLETE GAME

A fully playable 2D pixel-art arcade fighting game built with vanilla JavaScript and HTML5 Canvas.

## 🎮 Play Now

The game is ready to play! Follow the installation steps below.

## 📋 Features

✅ **Complete Gameplay**
- Main menu with animated background
- 5 waves of progressively difficult enemies
- Boss fight with The Soul Reaper
- Multiple attack types (basic, heavy, special)
- Dash ability with cooldown

✅ **Combat System**
- Combo counter and scoring
- Hit detection and knockback
- Energy management for special attacks
- Boss health bar
- Particle effects on hits

✅ **Enemy Types**
- Lost Soul (basic melee)
- Shadow Ghost (fast mobile)
- Spirit Archer (ranged)
- The Soul Reaper (boss)

✅ **Progression**
- XP and level system
- Stat upgrades on level up
- Wave completion rewards
- High score tracking

✅ **UI & Polish**
- Pixel-art style HUD
- Pause menu
- Game over screen
- Victory screen
- Settings menu (framework)
- Debug mode (F3)

✅ **Visual Effects**
- Screen shake
- Particle bursts
- Camera system
- Animated backgrounds
- Glow effects

## 🎮 Controls

```
Movement:        A/← D/→        (Left/Right)
                 W/↑            (Jump)

Attacks:         J/Z            (Basic Attack)
                 K/X            (Heavy Attack)
                 L/C            (Special Attack - Spirit Blast)
                 SPACE          (Dash)

Menu:            ESC            (Pause/Unpause)
                 Arrow Keys     (Menu Navigation)
                 ENTER/SPACE    (Confirm)

Debug:           F3             (Toggle Debug Info)
```

## 🚀 Installation & Running

### Prerequisites
- Node.js 16+ and npm

### Setup
```bash
# Clone the repository
git clone https://github.com/malekemanolito-afk/ghost-fighter.git
cd ghost-fighter

# Install dependencies
npm install

# Run development server
npm run dev
```

The game will open automatically at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

Output files will be in `dist/` directory.

## 📁 Project Structure

```
src/
├── main.js                 # Entry point and game loop
├── game/
│   ├── Game.js            # Main game class
│   ├── GameState.js       # State management
│   ├── Input.js           # Input handling
│   ├── Renderer.js        # Canvas rendering
│   ├── Camera.js          # Camera system
│   └── Collision.js       # Collision detection
├── entities/
│   ├── Player.js          # Player character
│   ├── Enemy.js           # Enemy types
│   ├── Boss.js            # Boss entity
│   ├── Projectile.js      # Projectile system
│   └── Particle.js        # Particle effects
├── systems/
│   ├── CombatSystem.js    # Combat logic
│   ├── EnemySpawner.js    # Wave spawning
│   ├── ParticleSystem.js  # Particle management
│   └── AudioSystem.js     # Audio framework
├── ui/
│   ├── HUD.js             # In-game HUD
│   ├── MainMenu.js        # Main menu
│   ├── PauseMenu.js       # Pause screen
│   ├── GameOver.js        # Game over screen
│   └── Victory.js         # Victory screen
└── styles/
    └── main.css           # Styling
```

## 🎯 Gameplay

### Objective
Defeat 5 waves of enemies and survive the boss encounter to win!

### Waves
- **Wave 1**: 3 Lost Souls (tutorial)
- **Wave 2**: 5 Lost Souls + 1 Shadow Ghost
- **Wave 3**: 4 Lost Souls + 2 Shadow Ghosts + 1 Spirit Archer
- **Wave 4**: 6 mixed enemies
- **Wave 5**: The Soul Reaper (Boss)

### Boss Mechanics
The Soul Reaper has 4 phases:
- **Phase 1** (75% HP): Melee attacks
- **Phase 2** (50% HP): Melee + Ranged attacks
- **Phase 3** (25% HP): All attack types
- **Phase 4** (0-25% HP): Rapid melee attacks

### Scoring
- Enemy kill: 50-200 points (by type)
- Combo bonus: 10 points per hit
- Wave clear: 500 points
- Boss damage: 10 points per damage
- No damage bonus: 100 points per wave

## ⚙️ Technical Details

### Performance
- Target: 60 FPS
- Resolution: 960×540 (scales to fit screen)
- Optimized rendering with delta-time updates
- Object pooling for particles
- No memory leaks

### Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Game designed for desktop, mobile view shows recommendation

### Technology Stack
- **Engine**: Vanilla JavaScript ES6+
- **Graphics**: HTML5 Canvas
- **Build**: Vite
- **Styling**: CSS3
- **Storage**: localStorage (high scores, settings)

## 🎨 Art Style

- 16-bit pixel-art aesthetic
- High contrast color palette
- Limited color palette per entity
- Glowing effects for supernatural theme
- Arcade-style UI

## 🔊 Audio

The game includes an audio system framework. Sound effects are triggered but require:
- Audio files to be added to `public/assets/audio/`
- Web Audio API implementation or HTML5 Audio elements

### Planned SFX
- Attack hit
- Heavy attack
- Special attack
- Enemy death
- Dash
- Level up
- Boss appearance
- Game over

## 💾 Save System

The game automatically saves:
- **High Score**: Best score achieved
- **Settings**: Audio, screen shake preferences

Data is stored in localStorage and persists across sessions.

## 🐛 Debug Mode

Press `F3` to toggle debug mode which displays:
- Current FPS
- Player position
- Enemy count
- Current wave
- Projectile count

## 📚 Code Quality

- Modular architecture with single-responsibility principle
- Clear entity-component pattern
- Comprehensive comments on complex logic
- No global variables (only module scope)
- Proper error handling
- Consistent naming conventions

## 🚀 Performance Optimizations

- Delta-time based updates (independent of frame rate)
- Object pooling for particles
- Culled off-screen rendering
- Efficient collision detection
- Canvas context reuse
- Event listener cleanup

## 🎓 Learning

This project demonstrates:
- Game loop architecture
- Entity-component system design
- State machine implementation
- Collision detection
- Particle effects
- Camera systems
- Input handling
- Canvas API usage
- Game balance
- Performance optimization

## 📄 License

MIT License - feel free to use this code for learning or as a base for your own games.

## 👤 Author

Ghost Fighter Dev Team

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

## 🗺️ Roadmap

See [ROADMAP.md](ROADMAP.md) for planned features.

---

**Enjoy the game! Happy fighting! 👻⚔️**
