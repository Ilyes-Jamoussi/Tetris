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

### Web Version
- **JavaScript** - ES6 modules, classes, and modern syntax for game logic
- **HTML5** - Canvas API for game rendering and graphics
- **CSS3** - Custom properties, animations, gradients, and flexbox layout
- **Web Audio API** - Real-time audio synthesis for background music and sound effects
- **LocalStorage** - Client-side data persistence for scores and settings

### Python Desktop Version
- **Python** - Core game logic and application structure
- **Pygame** - Graphics rendering and game loop management
- **NumPy** - Numerical computations and array operations

### Development Practices
- Modular architecture with separation of concerns
- ES6 module system for code organization
- Event-driven programming
- State management pattern
- Design patterns (State, Module, Observer, Strategy)

### Deployment
- **GitHub Pages** - Static site hosting for web version
- **Git** - Version control and collaboration

---

## Architecture

### Module Structure

```
docs/
├── index.html                  # Main HTML structure
├── favicon.svg                 # Application icon
├── css/
│   └── styles.css             # Complete styling
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

**Module Breakdown:**
- `main.js` - Game loop, event handling, orchestration
- `gameStateManager.js` - State machine implementation
- `audioManager.js` - Audio synthesis and music generation
- `tutorialManager.js` - Interactive tutorial with smart positioning
- `settingsManager.js` - User preferences and persistence
- `scoreManager.js` - Score tracking and leaderboards
- `pieceManager.js` - Tetromino logic and hold system
- `gridManager.js` - Collision detection and line clearing
- `renderer.js` - Canvas rendering and animations
- `uiManager.js` - DOM updates and UI animations

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

