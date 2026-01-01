# Tetris

<div align="center">
  
  [<img src="https://img.shields.io/badge/-English-blue?style=for-the-badge">](#overview)
  [<img src="https://img.shields.io/badge/-Français-green?style=for-the-badge">](#aperçu)

</div>

---

## Overview

A modern, feature-rich implementation of the classic Tetris game with a sleek cyberpunk design, smooth animations, and professional gameplay. Built with vanilla JavaScript ES6 modules and deployed on GitHub Pages.

### [▶️ Play Now](https://ilyes-jamoussi.github.io/Tetris/)

### Controls

| Key | Action |
|-----|--------|
| ← → | Move piece left/right |
| ↑ | Rotate piece |
| ↓ | Soft drop |
| SPACE | Hard drop (instant) |
| C | Hold piece (Modern mode) |
| P | Pause/Resume |

### Features

#### 🎮 Game Modes
- **Modern Mode**: Includes hold piece system and ghost piece preview
- **Classic Mode**: Traditional Tetris experience without modern features
- Separate high score leaderboards for each mode

#### 🎨 Visual & UX
- Cyberpunk-inspired UI with neon effects and gradients
- **Ghost piece** for precise placement visualization
- **Hold piece system** for strategic gameplay (Modern mode)
- Smooth animations and particle effects on line clears
- Responsive design (desktop & mobile)
- Dynamic layout with centered game area
- Professional symmetric spacing

#### 🎵 Audio System
- **Background music**: Tetris theme melody (looping)
- **Sound effects**: Piece landing, line clear, game over
- Separate toggles for music and SFX
- Volume control (0-100%)
- All audio settings saved to localStorage

#### 📚 Tutorial System
- Interactive 7-step tutorial (Modern) / 6-step (Classic)
- Smart positioning with spotlight highlighting
- Adapts to selected game mode
- Manual activation via "?" button

#### ⚙️ Settings
- Sound effects toggle
- Background music toggle
- Volume slider
- Ghost piece toggle
- All preferences saved to localStorage

#### 📊 Score System
- Real-time score tracking
- Separate high scores per game mode
- Top 10 scores saved locally
- Line clear bonuses (1-4 lines)
- Soft drop and hard drop scoring

---

## Web Version

### Tech Stack
- HTML5 Canvas for game rendering
- CSS3 with custom properties, animations, and gradients
- JavaScript ES6 modules
- Web Audio API for sound synthesis
- LocalStorage for persistence

### Architecture
```
docs/
├── index.html
├── favicon.svg
├── css/
│   └── styles.css          (~1200 lines)
└── js/
    ├── main.js             # Game controller & state management
    ├── constants.js        # Game configuration
    ├── gridManager.js      # Grid logic & collision detection
    ├── pieceManager.js     # Piece management & hold system
    ├── renderer.js         # Canvas rendering & animations
    ├── scoreManager.js     # Score tracking & localStorage
    ├── uiManager.js        # UI updates & animations
    ├── audioManager.js     # Music & sound effects
    ├── tutorialManager.js  # Interactive tutorial
    ├── settingsManager.js  # User preferences
    └── gameStateManager.js # Game state (MENU/PLAYING/PAUSED/GAME_OVER)
```

### Key Features Implementation
- **State Management**: Clean state machine (MENU → PLAYING → PAUSED → GAME_OVER)
- **Modular Architecture**: 11 independent ES6 modules (~1500 lines total)
- **Responsive Canvas**: Dynamic sizing with synchronized side panels
- **Audio Synthesis**: Web Audio API for music and SFX generation
- **Tutorial System**: Context-aware with smart tooltip positioning
- **Persistence**: Settings and scores saved to localStorage per mode

---

## Python Desktop Version

Classic pygame implementation for offline play.

### Prerequisites
- Python 3.6+
- pip

### Installation

**Windows:**
```bash
python -m pip install pygame numpy
```

**macOS:**
```bash
python3 -m venv venv
source venv/bin/activate
pip install pygame numpy
```

### Run
```bash
python main.py
```

### Tests
```bash
python testTetris.py
```

---

<br>

## Aperçu

Une implémentation moderne et complète du jeu Tetris classique avec un design cyberpunk élégant, des animations fluides et un gameplay professionnel. Développé en JavaScript vanilla avec modules ES6 et déployé sur GitHub Pages.

### [▶️ Jouer Maintenant](https://ilyes-jamoussi.github.io/Tetris/)

### Contrôles

| Touche | Action |
|--------|--------|
| ← → | Déplacer gauche/droite |
| ↑ | Rotation |
| ↓ | Descente rapide |
| ESPACE | Chute instantanée |
| C | Réserve (mode Modern) |
| P | Pause/Reprendre |

### Fonctionnalités

#### 🎮 Modes de Jeu
- **Mode Modern**: Inclut système de réserve et aperçu fantôme
- **Mode Classic**: Expérience Tetris traditionnelle sans fonctionnalités modernes
- Classements séparés pour chaque mode

#### 🎨 Visuel & UX
- Interface cyberpunk avec effets néon et dégradés
- **Pièce fantôme** pour placement précis
- **Système de réserve** pour gameplay stratégique (mode Modern)
- Animations fluides et effets de particules
- Design responsive (desktop & mobile)
- Layout dynamique avec zone de jeu centrée
- Espacement symétrique professionnel

#### 🎵 Système Audio
- **Musique de fond**: Thème Tetris en boucle
- **Effets sonores**: Atterrissage, lignes complétées, game over
- Contrôles séparés pour musique et SFX
- Contrôle du volume (0-100%)
- Tous les paramètres audio sauvegardés

#### 📚 Système de Tutoriel
- Tutoriel interactif 7 étapes (Modern) / 6 étapes (Classic)
- Positionnement intelligent avec mise en évidence
- S'adapte au mode de jeu sélectionné
- Activation manuelle via bouton "?"

#### ⚙️ Paramètres
- Toggle effets sonores
- Toggle musique de fond
- Curseur de volume
- Toggle pièce fantôme
- Toutes les préférences sauvegardées

#### 📊 Système de Score
- Suivi des scores en temps réel
- High scores séparés par mode de jeu
- Top 10 scores sauvegardés localement
- Bonus lignes complétées (1-4 lignes)
- Scoring descente rapide et instantanée

---

## Version Web

### Stack Technique
- HTML5 Canvas pour le rendu du jeu
- CSS3 avec propriétés personnalisées, animations et dégradés
- Modules JavaScript ES6
- Web Audio API pour synthèse sonore
- LocalStorage pour la persistance

### Architecture
```
docs/
├── index.html
├── favicon.svg
├── css/
│   └── styles.css          (~1200 lignes)
└── js/
    ├── main.js             # Contrôleur & gestion d'états
    ├── constants.js        # Configuration du jeu
    ├── gridManager.js      # Logique grille & collisions
    ├── pieceManager.js     # Gestion pièces & réserve
    ├── renderer.js         # Rendu Canvas & animations
    ├── scoreManager.js     # Scores & localStorage
    ├── uiManager.js        # Mises à jour UI & animations
    ├── audioManager.js     # Musique & effets sonores
    ├── tutorialManager.js  # Tutoriel interactif
    ├── settingsManager.js  # Préférences utilisateur
    └── gameStateManager.js # États du jeu
```

### Implémentation Clés
- **Gestion d'États**: Machine à états propre (MENU → PLAYING → PAUSED → GAME_OVER)
- **Architecture Modulaire**: 11 modules ES6 indépendants (~1500 lignes total)
- **Canvas Responsive**: Dimensionnement dynamique avec panneaux synchronisés
- **Synthèse Audio**: Web Audio API pour génération musique et SFX
- **Système Tutoriel**: Contextuel avec positionnement intelligent
- **Persistance**: Paramètres et scores sauvegardés par mode

---

## Version Desktop Python

Implémentation pygame classique pour jouer hors ligne.

### Prérequis
- Python 3.6+
- pip

### Installation

**Windows :**
```bash
python -m pip install pygame numpy
```

**macOS :**
```bash
python3 -m venv venv
source venv/bin/activate
pip install pygame numpy
```

### Exécution
```bash
python main.py
```

### Tests
```bash
python testTetris.py
```

