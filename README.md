# 👻 GHOST FIGHTER - Complete Playable Game

A fully functional 2D pixel-art arcade fighting game built with vanilla JavaScript and HTML5 Canvas.

![Status](https://img.shields.io/badge/Status-Complete-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎮 Play Now!

The game is **fully playable and ready to run!**

### Quick Start
```bash
npm install
npm run dev
```

Game opens at `http://localhost:3000`

---

## ✨ Features

### Complete Gameplay Experience
- ✅ Animated main menu with background effects
- ✅ 5 progressive waves of enemies
- ✅ Boss fight: The Soul Reaper (4 phases)
- ✅ 3 attack types: Basic, Heavy, Special (Spirit Blast)
- ✅ Dash ability with cooldown management
- ✅ Energy system for special attacks
- ✅ Combo counter and score system
- ✅ XP and leveling system with stat upgrades

### Enemy Types
- **Lost Soul** (40 HP, 8 dmg) - Basic melee
- **Shadow Ghost** (60 HP, 12 dmg) - Fast and mobile
- **Spirit Archer** (50 HP, 15 dmg) - Ranged attacks
- **The Soul Reaper** (1000 HP, 25 dmg) - Multi-phase boss

### UI & Screens
- ✅ Main Menu with navigation
- ✅ In-game HUD (HP, Energy, Level, XP, Score, Combo)
- ✅ Pause Menu
- ✅ Game Over Screen with stats
- ✅ Victory Screen with final score
- ✅ Settings framework
- ✅ Debug mode (Press F3)

### Visual Effects
- ✅ Screen shake on hits
- ✅ Particle burst effects
- ✅ Animated backgrounds
- ✅ Glow effects
- ✅ Camera follow system
- ✅ Pixel-art aesthetic

---

## 🎮 Controls

```
MOVEMENT
  A / ← Arrow      Move Left
  D / → Arrow      Move Right
  W / ↑ Arrow      Jump
  S / ↓ Arrow      Crouch

ATTACKS
  J / Z            Basic Attack (Quick, Combo)
  K / X            Heavy Attack (Slow, High Damage)
  L / C            Special Attack (Spirit Blast - Uses Energy)
  SPACE            Dash (Cooldown: 1.2s)

MENU & SYSTEM
  ESC              Pause / Unpause
  ↑ / ↓            Navigate Menus
  ENTER / SPACE    Confirm Selection
  F3               Toggle Debug Info
```

---

## 🚀 Installation & Setup

### Requirements
- Node.js 16+ and npm

### Development
```bash
# Clone repository
git clone https://github.com/malekemanolito-afk/ghost-fighter.git
cd ghost-fighter

# Install dependencies
npm install

# Start dev server (auto-opens browser)
npm run dev

# Build for production
npm run build
```

---

## 🎯 Gameplay Guide

### Objective
Defeat 5 waves of enemies and survive the boss encounter to achieve victory!

### Wave Progression
| Wave | Enemies | Difficulty |
|------|---------|-----------|
| 1 | 3 Lost Souls | Easy - Tutorial |
| 2 | 5 Lost Souls + 1 Shadow Ghost | Medium |
| 3 | 4 Lost Souls + 2 Shadow Ghosts + 1 Spirit Archer | Medium-Hard |
| 4 | 6 mixed enemies | Hard |
| 5 | The Soul Reaper (Boss) | Extreme |

### Combat System

**Basic Attack** (J/Z)
- Fast, combos on rapid hits
- Damage: 12-15
- Cooldown: 0.3s

**Heavy Attack** (K/X)
- Slow but powerful
- Damage: 30
- Cooldown: 0.8s

**Special Attack** (L/C) - Spirit Blast
- Energy projectile
- Damage: 50
- Energy Cost: 30
- Cooldown: 2s

**Dash** (SPACE)
- Instant movement
- Grants invulnerability (0.2s)
- Cooldown: 1.2s

### Scoring
- Enemy kills: 50-200 points
- Combo bonus: 10 per hit
- Wave clear: 500 points
- Boss defeated: 5000+ points

---

## 📁 Project Structure

```
src/
├── main.js              # Entry point & game loop
├── game/
│   ├── Game.js          # Main game controller
│   ├── GameState.js     # State management
│   ├── Input.js         # Input handling
│   ├── Renderer.js      # Canvas rendering
│   ├── Camera.js        # Camera system
│   └── Collision.js     # Collision detection
├── entities/
│   ├── Player.js        # Player character
│   ├── Enemy.js         # Enemy types
│   ├── Boss.js          # Boss entity
│   ├── Projectile.js    # Projectiles
│   └── Particle.js      # Particles
├── systems/
│   ├── CombatSystem.js  # Combat logic
│   ├── EnemySpawner.js  # Wave spawning
│   ├── ParticleSystem.js # Particle management
│   └── AudioSystem.js    # Audio framework
├── ui/
│   ├── HUD.js           # In-game HUD
│   ├── MainMenu.js      # Main menu
│   ├── PauseMenu.js     # Pause screen
│   ├── GameOver.js      # Game over
│   └── Victory.js       # Victory screen
└── styles/
    └── main.css         # Styling
```

---

## ⚙️ Technical Details

### Architecture
- **Game Loop**: RequestAnimationFrame with delta-time
- **Entity System**: Object-based entities with update/render
- **State Machine**: Game states (Menu, Playing, Paused, GameOver, Victory)
- **Performance**: Target 60 FPS, optimized rendering
- **No Dependencies**: Pure vanilla JavaScript

### Browser Support
- Chrome ✅
- Firefox ✅
- Safari ✅
- Edge ✅

---

## 🐛 Debug Mode

Press **F3** to toggle debug overlay showing:
- Current FPS
- Player position
- Enemy count
- Current wave
- Projectile count

---

## 💾 Save System

Automatic saves via localStorage:
- High score tracking
- Settings persistence
- Data persists after page reload

---

## 📊 Game Features Checklist

- ✅ Main menu functional
- ✅ Player movement (WASD/Arrows)
- ✅ Player attacks (J, K, L keys)
- ✅ Player dash (Space)
- ✅ HP system
- ✅ Energy system
- ✅ Enemy AI and movement
- ✅ Enemy attacks and death
- ✅ Combat hit effects
- ✅ Combo system
- ✅ Wave system (5 waves)
- ✅ XP and leveling
- ✅ Boss fight (The Soul Reaper)
- ✅ Boss health bar
- ✅ Game over screen
- ✅ Victory screen
- ✅ Pause functionality
- ✅ High score saving
- ✅ No console errors
- ✅ 60 FPS performance

---

## 📝 Additional Documentation

- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[ROADMAP.md](ROADMAP.md)** - Planned features

---

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

## 🎉 Ready to Play!

Start the game with:
```bash
npm install && npm run dev
```

**Defeat the Soul Reaper and become the ultimate Ghost Fighter! 👻⚔️**

