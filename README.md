# Ghost Fighter

A 2D pixel-art arcade fighting game with supernatural theme.

## Overview

Ghost Fighter is a retro-inspired action arcade game where you control a supernatural fighter battling against ghosts and demons. Face waves of increasingly difficult enemies, defeat powerful bosses, and progress through an escalating challenge.

## Features

- **Pixel-Art Aesthetic**: 16-bit style 2D graphics with arcade vibes
- **Fast-Paced Combat**: Multiple attack types with combo system
- **Wave-Based Progression**: Challenging enemy waves leading to boss fights
- **XP & Leveling**: Gain experience and upgrade your abilities
- **Special Abilities**: Use energy-based attacks like Spirit Blast
- **Multiple Enemy Types**: Face unique supernatural enemies with different behaviors
- **Boss Battles**: Defeat powerful bosses with multiple attack phases
- **High Score Tracking**: Compete for the highest score
- **Responsive Controls**: Smooth and responsive keyboard controls

## Controls

```
A / ← Arrow        - Move Left
D / → Arrow        - Move Right
W / ↑ Arrow        - Jump
S / ↓ Arrow        - Crouch
J / Z              - Basic Attack
K / X              - Heavy Attack
L / C              - Special Attack (Spirit Blast)
SPACE              - Dash
ESC                - Pause
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Development

Run the development server:
```bash
npm run dev
```

The game will open at `http://localhost:3000`

## Build

Build for production:
```bash
npm run build
```

Output files will be in the `dist/` directory.

## Project Structure

```
ghost-fighter/
├── public/
│   └── assets/
│       ├─�� sprites/
│       ├── backgrounds/
│       └── audio/
├── src/
│   ├── main.js
│   ├── game/
│   │   ├── Game.js
│   │   ├── GameState.js
│   │   ├── Input.js
│   │   ├── Renderer.js
│   │   ├── Camera.js
│   │   └── Collision.js
│   ├── entities/
│   │   ├── Player.js
│   │   ├── Enemy.js
│   │   ├── Boss.js
│   │   ├── Projectile.js
│   │   └── Particle.js
│   ├── systems/
│   │   ├── CombatSystem.js
│   │   ├── EnemySpawner.js
│   │   ├── ParticleSystem.js
│   │   └── AudioSystem.js
│   ├── ui/
│   │   ├── HUD.js
│   │   ├── MainMenu.js
│   │   ├── PauseMenu.js
│   │   └── GameOver.js
│   └── styles/
│       └── main.css
└── index.html
```

## Gameplay

### Waves
- **Wave 1-3**: Introduction to basic enemies
- **Wave 4**: Mixed enemy types
- **Wave 5**: Boss encounter

### Enemy Types
- **Lost Soul**: Basic melee enemy (40 HP, 8 dmg)
- **Shadow Ghost**: Fast enemy (60 HP, 12 dmg)
- **Spirit Archer**: Ranged enemy (50 HP, 15 dmg)

### Boss
- **The Soul Reaper**: Multi-phase boss with escalating attacks

### Player Stats
- **HP**: Health points
- **Energy**: Used for special attacks
- **XP**: Experience for leveling up
- **Level**: Unlocks upgrades

## Performance

- Target: 60 FPS
- Resolution: 960×540 (scaled to fit)
- Optimized rendering with delta-time based updates

## Credits

Developed as a pixel-art arcade game project.

## License

MIT
