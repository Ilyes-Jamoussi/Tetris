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
import { AudioManager } from './audioManager.js';
import { TutorialManager } from './tutorialManager.js';
import { SettingsManager } from './settingsManager.js';
import { GameStateManager, GAME_STATES } from './gameStateManager.js';

class TetrisGame {
    constructor() {
        this.stateManager = new GameStateManager();
        this.gridManager = new GridManager();
        this.pieceManager = new PieceManager();
        this.scoreManager = new ScoreManager();
        this.audioManager = new AudioManager();
        this.tutorialManager = new TutorialManager();
        this.settingsManager = new SettingsManager(this.audioManager);
        
        const mainCanvas = document.getElementById('mainCanvas');
        const nextCanvas = document.getElementById('nextPieceCanvas');
        this.renderer = new Renderer(mainCanvas, nextCanvas);
        
        this.uiManager = new UIManager(this.scoreManager);
        
        this.dropTime = 0;
        this.dropInterval = GAME_CONFIG.INITIAL_DROP_INTERVAL;
        this.animationId = null;
        
        this.initializeControls();
        this.initializeUI();
        this.checkFirstVisit();
    }

    initializeControls() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('restartBtn').addEventListener('click', () => this.backToMenu());
        document.getElementById('tutorialBtn').addEventListener('click', () => this.tutorialManager.start());
        document.getElementById('gameMode').addEventListener('change', (e) => {
            this.stateManager.setGameMode(e.target.value);
            this.stateManager.updateUI();
        });
    }

    initializeUI() {
        this.uiManager.updateHighScore();
        this.renderer.render(this.gridManager.getGrid(), null, null);
        
        document.getElementById('gameMode').value = this.stateManager.getGameMode();
        this.stateManager.updateUI();
    }

    checkFirstVisit() {
        if (this.tutorialManager.shouldShowOnLoad()) {
            setTimeout(() => this.tutorialManager.start(), 1000);
        }
    }

    handleKeyPress(event) {
        if (!this.stateManager.isPlaying() && !this.stateManager.isPaused()) return;
        
        if (event.code === 'KeyP') {
            this.togglePause();
            return;
        }
        
        if (this.stateManager.isPaused()) return;
        
        const actions = {
            'ArrowLeft': () => this.movePiece('left'),
            'ArrowRight': () => this.movePiece('right'),
            'ArrowDown': () => this.softDrop(),
            'ArrowUp': () => this.rotatePiece(),
            'Space': () => this.hardDrop(),
            'KeyC': () => this.holdPiece()
        };
        
        const action = actions[event.code];
        if (action) {
            event.preventDefault();
            action();
            this.render();
        }
    }

    movePiece(direction) {
        const moveActions = {
            'left': () => this.pieceManager.moveLeft(),
            'right': () => this.pieceManager.moveRight(),
            'down': () => this.pieceManager.moveDown()
        };
        
        moveActions[direction]();
        
        if (!this.gridManager.isValidPosition(this.pieceManager.getPositions())) {
            this.pieceManager.undoMove(direction);
        } else {
            this.audioManager.play('move');
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
            this.audioManager.play('drop');
            this.uiManager.updateScore();
            this.lockPiece();
        }
    }

    rotatePiece() {
        const rotatedShape = this.pieceManager.rotatePiece();
        const positions = this.pieceManager.getPositions(rotatedShape);
        
        if (this.gridManager.isValidPosition(positions)) {
            this.pieceManager.currentPiece.shape = rotatedShape;
            this.audioManager.play('rotate');
        }
    }

    holdPiece() {
        if (this.stateManager.getGameMode() === 'classic') return;
        
        if (this.pieceManager.holdCurrentPiece()) {
            if (!this.gridManager.isValidPosition(this.pieceManager.getPositions())) {
                this.gameOver();
            }
            this.audioManager.play('rotate');
        }
    }

    togglePause() {
        if (this.stateManager.isPlaying()) {
            this.stateManager.setState(GAME_STATES.PAUSED);
        } else if (this.stateManager.isPaused()) {
            this.stateManager.setState(GAME_STATES.PLAYING);
        }
    }

    update(deltaTime) {
        if (!this.stateManager.isPlaying()) return;
        
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
            this.audioManager.play('line');
            
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
        
        let ghostPositions = null;
        if (this.stateManager.getGameMode() === 'modern' && this.settingsManager.isGhostEnabled()) {
            const ghostY = this.pieceManager.getGhostPosition(this.gridManager);
            ghostPositions = this.pieceManager.getPositions(
                this.pieceManager.getCurrentPiece().shape,
                { x: this.pieceManager.position.x, y: ghostY }
            );
        }
        
        const holdPiece = this.stateManager.getGameMode() === 'modern' ? this.pieceManager.getHoldPiece() : null;
        const holdCanvas = document.getElementById('holdPieceCanvas');
        
        this.renderer.render(grid, positions, color, ghostPositions, holdPiece, holdCanvas);
    }

    gameLoop(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        this.render();
        
        if (this.stateManager.isPlaying() || this.stateManager.isPaused()) {
            this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
        }
    }

    start() {
        this.gridManager.reset();
        this.scoreManager.reset();
        this.dropInterval = GAME_CONFIG.INITIAL_DROP_INTERVAL;
        this.dropTime = 0;
        
        this.uiManager.reset();
        this.uiManager.hideGameOver();
        
        this.pieceManager.spawnPiece();
        this.renderer.drawNextPiece(this.pieceManager.getNextPiece());
        
        this.stateManager.setState(GAME_STATES.PLAYING);
        
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
    }

    backToMenu() {
        this.uiManager.hideGameOver();
        this.gridManager.reset();
        this.scoreManager.reset();
        this.renderer.render(this.gridManager.getGrid(), null, null);
        this.stateManager.setState(GAME_STATES.MENU);
    }

    gameOver() {
        this.stateManager.setState(GAME_STATES.GAME_OVER);
        cancelAnimationFrame(this.animationId);
        
        this.audioManager.play('gameOver');
        this.scoreManager.saveScore();
        this.uiManager.showGameOver(this.scoreManager.getScore());
        this.uiManager.updateHighScore();
    }
}

// Initialiser le jeu au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new TetrisGame();
});
