/**
 * TETRIS GAME - MAIN CONTROLLER
 * Contrôleur principal du jeu
 */

import { GAME_CONFIG } from './constants.js';
import { GridManager } from './gridManager.js';
import { PieceManager } from './pieceManager.js';
import { Renderer } from './renderer.js';
import { ScoreManager } from './scoreManager.js';
import { UIManager } from './uiManager.js';

class TetrisGame {
    constructor() {
        this.gridManager = new GridManager();
        this.pieceManager = new PieceManager();
        this.scoreManager = new ScoreManager();
        
        const mainCanvas = document.getElementById('mainCanvas');
        const nextCanvas = document.getElementById('nextPieceCanvas');
        this.renderer = new Renderer(mainCanvas, nextCanvas);
        
        this.uiManager = new UIManager(this.scoreManager);
        
        this.gameRunning = false;
        this.gamePaused = false;
        this.dropTime = 0;
        this.dropInterval = GAME_CONFIG.INITIAL_DROP_INTERVAL;
        this.animationId = null;
        
        this.initializeControls();
        this.initializeUI();
    }

    initializeControls() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('restartBtn').addEventListener('click', () => this.start());
    }

    initializeUI() {
        this.uiManager.updateHighScore();
        this.renderer.render(this.gridManager.getGrid(), null, null);
    }

    handleKeyPress(event) {
        if (!this.gameRunning) return;
        
        if (event.code === 'KeyP') {
            this.togglePause();
            this.highlightKey('P');
            return;
        }
        
        if (this.gamePaused) return;
        
        const actions = {
            'ArrowLeft': () => this.movePiece('left'),
            'ArrowRight': () => this.movePiece('right'),
            'ArrowDown': () => this.softDrop(),
            'ArrowUp': () => this.rotatePiece(),
            'Space': () => this.hardDrop()
        };
        
        const action = actions[event.code];
        if (action) {
            event.preventDefault();
            action();
            this.render();
            
            // Highlight de la touche pressée
            const keyMap = {
                'ArrowLeft': '←',
                'ArrowRight': '→',
                'ArrowDown': '↓',
                'ArrowUp': '↑',
                'Space': 'ESPACE'
            };
            this.highlightKey(keyMap[event.code]);
        }
    }

    highlightKey(keyText) {
        const keyIcons = document.querySelectorAll('.key-icon');
        keyIcons.forEach(icon => {
            if (icon.textContent === keyText) {
                icon.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
                icon.style.transform = 'scale(0.95)';
                icon.style.boxShadow = '0 0 30px var(--primary)';
                
                setTimeout(() => {
                    icon.style.background = '';
                    icon.style.transform = '';
                    icon.style.boxShadow = '';
                }, 150);
            }
        });
    }

    movePiece(direction) {
        const moveActions = {
            'left': () => this.pieceManager.moveLeft(),
            'right': () => this.pieceManager.moveRight(),
            'down': () => this.pieceManager.moveDown()
        };
        
        moveActions[direction]();
        
        const positions = this.pieceManager.getPositions();
        if (!this.gridManager.isValidPosition(positions)) {
            this.pieceManager.undoMove(direction);
        }
    }

    softDrop() {
        this.movePiece('down');
        const positions = this.pieceManager.getPositions();
        if (this.gridManager.isValidPosition(positions)) {
            this.scoreManager.addSoftDropScore();
            this.uiManager.updateScore();
        }
    }

    hardDrop() {
        let moved = false;
        while (true) {
            this.pieceManager.moveDown();
            const positions = this.pieceManager.getPositions();
            if (!this.gridManager.isValidPosition(positions)) {
                this.pieceManager.undoMove('down');
                break;
            }
            this.scoreManager.addHardDropScore();
            moved = true;
        }
        if (moved) {
            this.uiManager.updateScore();
        }
    }

    rotatePiece() {
        const rotatedShape = this.pieceManager.rotatePiece();
        const positions = this.pieceManager.getPositions(rotatedShape);
        
        if (this.gridManager.isValidPosition(positions)) {
            this.pieceManager.currentPiece.shape = rotatedShape;
        }
    }

    togglePause() {
        this.gamePaused = !this.gamePaused;
        
        // Afficher/masquer l'indicateur de pause
        let pauseOverlay = document.querySelector('.paused-overlay');
        
        if (this.gamePaused) {
            if (!pauseOverlay) {
                pauseOverlay = document.createElement('div');
                pauseOverlay.className = 'paused-overlay';
                pauseOverlay.textContent = 'PAUSE';
                document.getElementById('gameArea').style.position = 'relative';
                document.getElementById('gameArea').appendChild(pauseOverlay);
            }
        } else {
            if (pauseOverlay) {
                pauseOverlay.remove();
            }
        }
    }

    update(deltaTime) {
        if (!this.gameRunning || this.gamePaused) return;
        
        this.dropTime += deltaTime;
        
        if (this.dropTime >= this.dropInterval) {
            this.pieceManager.moveDown();
            const positions = this.pieceManager.getPositions();
            
            if (!this.gridManager.isValidPosition(positions)) {
                this.pieceManager.undoMove('down');
                this.lockPiece();
            }
            
            this.dropTime = 0;
        }
    }

    lockPiece() {
        const positions = this.pieceManager.getPositions();
        const color = this.pieceManager.getCurrentPiece().color;
        
        this.gridManager.placePiece(positions, color);
        
        const linesCleared = this.gridManager.clearFullLines();
        if (linesCleared > 0) {
            // Effet visuel pour les lignes complétées
            this.showLineClearEffect(linesCleared);
            
            this.scoreManager.addLineScore(linesCleared);
            this.uiManager.updateScore();
            this.uiManager.updateLines();
            this.updateSpeed();
        }
        
        if (this.gridManager.isGameOver()) {
            this.gameOver();
        } else {
            this.pieceManager.spawnPiece();
            this.renderer.drawNextPiece(this.pieceManager.getNextPiece());
        }
    }

    showLineClearEffect(linesCleared) {
        // Animation flash pour les lignes complétées
        const canvas = document.getElementById('mainCanvas');
        canvas.style.boxShadow = '0 0 50px #00ff88, 0 0 100px #00ff88';
        
        setTimeout(() => {
            canvas.style.boxShadow = '0 0 20px var(--primary), 0 0 40px var(--primary)';
        }, 200);
        
        // Effet de particules
        for (let i = 0; i < linesCleared; i++) {
            this.renderer.createLineParticles(i);
        }
    }

    updateSpeed() {
        const lines = this.scoreManager.getLines();
        if (lines % GAME_CONFIG.SPEED_INCREASE_LINES === 0) {
            this.dropInterval = Math.max(
                GAME_CONFIG.MIN_DROP_INTERVAL,
                this.dropInterval - GAME_CONFIG.SPEED_DECREASE
            );
        }
    }

    render() {
        const grid = this.gridManager.getGrid();
        const positions = this.pieceManager.getPositions();
        const color = this.pieceManager.getCurrentPiece()?.color;
        
        this.renderer.render(grid, positions, color);
    }

    gameLoop(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        this.render();
        
        if (this.gameRunning) {
            this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
        }
    }

    start() {
        this.gridManager.reset();
        this.scoreManager.reset();
        this.dropInterval = GAME_CONFIG.INITIAL_DROP_INTERVAL;
        this.dropTime = 0;
        this.gameRunning = true;
        this.gamePaused = false;
        
        this.uiManager.reset();
        this.uiManager.hideGameOver();
        
        this.pieceManager.spawnPiece();
        this.renderer.drawNextPiece(this.pieceManager.getNextPiece());
        
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }

    gameOver() {
        this.gameRunning = false;
        cancelAnimationFrame(this.animationId);
        
        this.scoreManager.saveScore();
        this.uiManager.showGameOver(this.scoreManager.getScore());
        this.uiManager.updateHighScore();
    }
}

// Initialiser le jeu au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new TetrisGame();
});
