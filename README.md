# Tetris - Modern Web Implementation

A professional implementation of the classic Tetris game featuring modern web technologies, clean architecture, and advanced gameplay features. Built with vanilla JavaScript ES6 modules and deployed on GitHub Pages.

**[Live Demo](https://ilyes-jamoussi.github.io/Tetris/)**

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Game Controls](#game-controls)
- [Installation](#installation)
- [Project Structure](#project-structure)

---

## Features

### Game Modes
- **Modern Mode**: Enhanced gameplay with hold piece system and ghost piece preview
- **Classic Mode**: Traditional Tetris experience
- Independent leaderboards for each mode (top 10 scores per mode)

### Audio System
- Background music with Tetris theme melody (Web Audio API synthesis)
- Context-aware sound effects (piece landing, line clear, game over)
- Separate volume controls for music and sound effects
- Persistent audio preferences via localStorage

### User Interface
- Cyberpunk-inspired design with neon effects and gradients
- Responsive canvas with dynamic sizing
- Real-time score tracking and statistics
- Smooth animations and particle effects
- Symmetric layout with professional spacing

### Tutorial System
- Interactive 7-step tutorial (Modern) / 6-step tutorial (Classic)
- Adaptive content based on selected game mode
- Smart positioning with spotlight highlighting
- Manual activation via dedicated button

### State Management
- Clean state machine: MENU → PLAYING → PAUSED → GAME_OVER
- Proper state transitions with UI synchronization
- Pause functionality with visual overlay

### Settings & Persistence
- Sound effects toggle
- Background music toggle
- Volume control (0-100%)
- Ghost piece toggle
- All preferences saved to localStorage
- Mode-specific score persistence

---

## Technologies

### Core Technologies
- **HTML5 Canvas** - Game rendering and graphics
- **CSS3** - Custom properties, animations, gradients, flexbox
- **JavaScript ES6** - Modules, classes, async/await
- **Web Audio API** - Real-time audio synthesis for music and sound effects

### Development Practices
- Modular architecture with separation of concerns
- ES6 module system for code organization
- Event-driven programming
- State management pattern
- LocalStorage for data persistence

### Deployment
- **GitHub Pages** - Static site hosting
- **Git** - Version control

---

## Architecture

### Module Structure

```
docs/
├── index.html                  # Main HTML structure
├── favicon.svg                 # Application icon
├── css/
│   └── styles.css             # Complete styling (~1200 lines)
└── js/
    ├── main.js                # Game controller and orchestration
    ├── constants.js           # Game configuration constants
    ├── gridManager.js         # Grid logic and collision detection
    ├── pieceManager.js        # Tetromino management and hold system
    ├── renderer.js            # Canvas rendering and animations
    ├── scoreManager.js        # Score tracking and localStorage
    ├── uiManager.js           # UI updates and animations
    ├── audioManager.js        # Audio synthesis and playback
    ├── tutorialManager.js     # Interactive tutorial system
    ├── settingsManager.js     # User preferences management
    └── gameStateManager.js    # State machine implementation
```

### Design Patterns
- **State Pattern**: Game state management (MENU, PLAYING, PAUSED, GAME_OVER)
- **Module Pattern**: ES6 modules for encapsulation
- **Observer Pattern**: Event-driven UI updates
- **Strategy Pattern**: Mode-specific behavior (Modern vs Classic)

### Key Implementation Details
- **Collision Detection**: Grid-based validation system
- **Rendering Pipeline**: Optimized canvas drawing with requestAnimationFrame
- **Audio Synthesis**: Web Audio API oscillators for dynamic sound generation
- **Responsive Design**: Dynamic canvas sizing with viewport calculations
- **Data Persistence**: Structured localStorage with mode-specific keys

---

## Game Controls

| Key | Action |
|-----|--------|
| `←` `→` | Move piece horizontally |
| `↑` | Rotate piece clockwise |
| `↓` | Soft drop (accelerated fall) |
| `SPACE` | Hard drop (instant placement) |
| `C` | Hold piece (Modern mode only) |
| `P` | Pause/Resume game |

---

## Installation

### Web Version (Recommended)

Access the live version at: [https://ilyes-jamoussi.github.io/Tetris/](https://ilyes-jamoussi.github.io/Tetris/)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Ilyes-Jamoussi/Tetris.git
cd Tetris/docs
```

2. Start a local server:
```bash
python3 -m http.server 8080
```

3. Open browser:
```
http://localhost:8080
```

### Python Desktop Version

**Prerequisites:**
- Python 3.6+
- pip package manager

**Installation:**

Windows:
```bash
python -m pip install pygame numpy
python main.py
```

macOS/Linux:
```bash
python3 -m venv venv
source venv/bin/activate
pip install pygame numpy
python main.py
```

**Run Tests:**
```bash
python testTetris.py
```

---

## Project Structure

### Code Organization

**Total Lines of Code:** ~1,500 JavaScript, ~1,200 CSS

**Module Breakdown:**
- `main.js` (300 lines) - Game loop, event handling, orchestration
- `gameStateManager.js` (100 lines) - State machine implementation
- `audioManager.js` (150 lines) - Audio synthesis and music generation
- `tutorialManager.js` (200 lines) - Interactive tutorial with smart positioning
- `settingsManager.js` (100 lines) - User preferences and persistence
- `scoreManager.js` (80 lines) - Score tracking and leaderboards
- `pieceManager.js` (150 lines) - Tetromino logic and hold system
- `gridManager.js` (120 lines) - Collision detection and line clearing
- `renderer.js` (200 lines) - Canvas rendering and animations
- `uiManager.js` (100 lines) - DOM updates and UI animations

### Performance Optimizations
- RequestAnimationFrame for smooth 60 FPS rendering
- Efficient collision detection with grid-based checks
- Minimal DOM manipulation with cached element references
- Optimized canvas drawing with layered rendering

---

## License

This project is available for educational and portfolio purposes.

---

## Author

**Ilyes Jamoussi**

- GitHub: [@Ilyes-Jamoussi](https://github.com/Ilyes-Jamoussi)
- Project Link: [https://github.com/Ilyes-Jamoussi/Tetris](https://github.com/Ilyes-Jamoussi/Tetris)

