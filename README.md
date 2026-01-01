# Tetris

<div align="center">
  
  [<img src="https://img.shields.io/badge/-English-blue?style=for-the-badge">](#overview)
  [<img src="https://img.shields.io/badge/-Français-green?style=for-the-badge">](#aperçu)

</div>

## Overview
Welcome to the Tetris game project! This project includes both a Python desktop version and a modern web version of the classic Tetris game.

<div align="center">
    <img src="TetrisGame.gif" alt="Tetris Game Demo" width="450"><br><br>
</div>

### 🎮 Web Version (Recommended)
A complete HTML5/JavaScript implementation ready for deployment:
- **Location:** `/web` directory
- **Features:** Full Tetris gameplay, score saving, responsive design
- **Play Online:** [Deploy on Netlify](https://netlify.com)

### 🐍 Python Desktop Version
Original pygame implementation for local play:
- **Location:** Root directory
- **Features:** Classic Tetris with pygame graphics

---

## Web Version Setup

The web version is production-ready and requires no installation:

```bash
# Simply open web/index.html in a browser
# Or deploy to Netlify using the netlify.toml configuration
```

**Deployment:** The project is configured for automatic deployment on Netlify. Just connect your repository!

---

## Python Desktop Version Setup

### Prerequisites
- **Python 3.6 or later**
- **pip** (Python's package manager)

### Installation

#### Windows
```bash
python -m pip install pygame numpy
```

#### MacOS
```bash
python3 -m venv venv
source venv/bin/activate
pip install pygame numpy
```

### Run the Game
```bash
python main.py
```

### Run Tests
```bash
python testTetris.py
```

---

## Project Structure

```
Tetris/
├── web/                    # Web version (HTML5/JS)
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       ├── constants.js
│       ├── gridManager.js
│       ├── pieceManager.js
│       ├── renderer.js
│       ├── scoreManager.js
│       └── uiManager.js
├── main.py                 # Python desktop version
├── fonctions.py
├── consts.py
├── utils/
└── netlify.toml           # Deployment configuration
```

---

<br><br><br>

---

## Aperçu
Bienvenue dans le projet de jeu Tetris ! Ce projet comprend une version desktop Python et une version web moderne du jeu classique Tetris.

<div align="center">
    <img src="TetrisGame.gif" alt="Tetris Game Demo" width="450"><br><br>
</div>

### 🎮 Version Web (Recommandée)
Une implémentation complète HTML5/JavaScript prête pour le déploiement :
- **Emplacement :** Répertoire `/web`
- **Fonctionnalités :** Gameplay Tetris complet, sauvegarde des scores, design responsive
- **Jouer en ligne :** [Déployer sur Netlify](https://netlify.com)

### 🐍 Version Desktop Python
Implémentation pygame originale pour jouer localement :
- **Emplacement :** Répertoire racine
- **Fonctionnalités :** Tetris classique avec graphiques pygame

---

## Configuration Version Web

La version web est prête pour la production et ne nécessite aucune installation :

```bash
# Ouvrez simplement web/index.html dans un navigateur
# Ou déployez sur Netlify en utilisant la configuration netlify.toml
```

**Déploiement :** Le projet est configuré pour un déploiement automatique sur Netlify. Connectez simplement votre dépôt !

---

## Configuration Version Desktop Python

### Prérequis
- **Python 3.6 ou plus récent**
- **pip** (gestionnaire de packages Python)

### Installation

#### Windows
```bash
python -m pip install pygame numpy
```

#### MacOS
```bash
python3 -m venv venv
source venv/bin/activate
pip install pygame numpy
```

### Lancer le jeu
```bash
python main.py
```

### Lancer les tests
```bash
python testTetris.py
```

---

## Structure du Projet

```
Tetris/
├── web/                    # Version web (HTML5/JS)
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       ├── constants.js
│       ├── gridManager.js
│       ├── pieceManager.js
│       ├── renderer.js
│       ├── scoreManager.js
│       └── uiManager.js
├── main.py                 # Version desktop Python
├── fonctions.py
├── consts.py
├── utils/
└── netlify.toml           # Configuration de déploiement
```



