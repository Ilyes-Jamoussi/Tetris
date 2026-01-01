# Tetris

<div align="center">
  
  [<img src="https://img.shields.io/badge/-English-blue?style=for-the-badge">](#overview)
  [<img src="https://img.shields.io/badge/-Français-green?style=for-the-badge">](#aperçu)

</div>

---

## Overview

A modern implementation of the classic Tetris game featuring a sleek cyberpunk design, smooth animations, and responsive gameplay. Built with vanilla JavaScript and deployed on Netlify.

### [▶️ Play Now](https://tetris-game-project.netlify.app)

### Features

- Modern cyberpunk-inspired UI with neon effects
- Particle system for line clear animations
- Real-time score tracking with localStorage
- Responsive design (desktop & mobile)
- Smooth animations and transitions
- Next piece preview
- Pause functionality

### Controls

| Key | Action |
|-----|--------|
| ← → | Move piece |
| ↑ | Rotate |
| ↓ | Soft drop |
| SPACE | Hard drop |
| P | Pause |

---

## Web Version

### Tech Stack
- HTML5 Canvas for game rendering
- CSS3 with custom properties and animations
- JavaScript ES6 modules
- Modular architecture (7 independent modules)

### Project Structure
```
web/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── main.js           # Game controller
    ├── constants.js      # Configuration
    ├── gridManager.js    # Grid logic
    ├── pieceManager.js   # Piece management
    ├── renderer.js       # Canvas rendering
    ├── scoreManager.js   # Score & localStorage
    └── uiManager.js      # UI updates
```

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

Une implémentation moderne du jeu Tetris classique avec un design cyberpunk élégant, des animations fluides et un gameplay réactif. Développé en JavaScript vanilla et déployé sur Netlify.

### [▶️ Jouer Maintenant](https://tetris-game-project.netlify.app)

### Fonctionnalités

- Interface moderne inspirée cyberpunk avec effets néon
- Système de particules pour les animations
- Suivi des scores en temps réel avec localStorage
- Design responsive (desktop & mobile)
- Animations et transitions fluides
- Aperçu de la prochaine pièce
- Fonction pause

### Contrôles

| Touche | Action |
|--------|--------|
| ← → | Déplacer |
| ↑ | Rotation |
| ↓ | Descente rapide |
| ESPACE | Chute instantanée |
| P | Pause |

---

## Version Web

### Stack Technique
- HTML5 Canvas pour le rendu du jeu
- CSS3 avec propriétés personnalisées et animations
- Modules JavaScript ES6
- Architecture modulaire (7 modules indépendants)

### Structure du Projet
```
web/
├── index.html
├── css/
│   └── styles.css
└── js/
    ├── main.js           # Contrôleur du jeu
    ├── constants.js      # Configuration
    ├── gridManager.js    # Logique de la grille
    ├── pieceManager.js   # Gestion des pièces
    ├── renderer.js       # Rendu Canvas
    ├── scoreManager.js   # Score & localStorage
    └── uiManager.js      # Mises à jour UI
```

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

