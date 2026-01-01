/**
 * GAME STATE MANAGER
 * Gère les états du jeu (MENU, PLAYING, PAUSED, GAME_OVER)
 */

export const GAME_STATES = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'game_over'
};

export class GameStateManager {
    constructor() {
        this.currentState = GAME_STATES.MENU;
        this.gameMode = localStorage.getItem('tetris_game_mode') || 'modern';
    }

    setState(newState) {
        this.currentState = newState;
        this.updateUI();
    }

    getState() {
        return this.currentState;
    }

    setGameMode(mode) {
        this.gameMode = mode;
        localStorage.setItem('tetris_game_mode', mode);
    }

    getGameMode() {
        return this.gameMode;
    }

    isPlaying() {
        return this.currentState === GAME_STATES.PLAYING;
    }

    isPaused() {
        return this.currentState === GAME_STATES.PAUSED;
    }

    isMenu() {
        return this.currentState === GAME_STATES.MENU;
    }

    updateUI() {
        const startBtn = document.getElementById('startBtn');
        const modeSelector = document.querySelector('.mode-selector');
        const holdBox = document.querySelector('.hold-piece-box');
        const pauseOverlay = document.querySelector('.paused-overlay');

        switch (this.currentState) {
            case GAME_STATES.MENU:
                startBtn.style.display = 'block';
                startBtn.textContent = 'START GAME';
                if (modeSelector) modeSelector.style.display = 'block';
                if (holdBox) holdBox.style.display = this.gameMode === 'modern' ? 'block' : 'none';
                if (pauseOverlay) pauseOverlay.remove();
                break;

            case GAME_STATES.PLAYING:
                startBtn.style.display = 'none';
                if (modeSelector) modeSelector.style.display = 'none';
                if (holdBox) holdBox.style.display = this.gameMode === 'modern' ? 'block' : 'none';
                if (pauseOverlay) pauseOverlay.remove();
                break;

            case GAME_STATES.PAUSED:
                this.showPauseOverlay();
                break;

            case GAME_STATES.GAME_OVER:
                startBtn.style.display = 'none';
                if (modeSelector) modeSelector.style.display = 'none';
                if (pauseOverlay) pauseOverlay.remove();
                break;
        }
    }

    showPauseOverlay() {
        let overlay = document.querySelector('.paused-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'paused-overlay';
            overlay.innerHTML = '<div class="pause-content"><h2>PAUSED</h2><p>Press P to resume</p></div>';
            document.getElementById('canvasWrapper').appendChild(overlay);
        }
    }
}
