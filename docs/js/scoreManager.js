/**
 * TETRIS GAME - SCORE MANAGER
 * Gestion des scores et du localStorage
 */

import { SCORES } from './constants.js';

export class ScoreManager {
    constructor() {
        this.score = 0;
        this.lines = 0;
        this.gameMode = 'modern';
        this.storageKeyModern = 'tetrisScores_modern';
        this.storageKeyClassic = 'tetrisScores_classic';
    }

    setGameMode(mode) {
        this.gameMode = mode;
    }

    getStorageKey() {
        return this.gameMode === 'modern' ? this.storageKeyModern : this.storageKeyClassic;
    }

    reset() {
        this.score = 0;
        this.lines = 0;
    }

    addLineScore(linesCleared) {
        this.lines += linesCleared;
        this.score += linesCleared * SCORES.LINE_CLEAR;
    }

    addSoftDropScore() {
        this.score += SCORES.SOFT_DROP;
    }

    addHardDropScore() {
        this.score += SCORES.HARD_DROP;
    }

    getScore() {
        return this.score;
    }

    getLines() {
        return this.lines;
    }

    saveScore() {
        if (this.score === 0) return;
        
        const storageKey = this.getStorageKey();
        const scores = this.getAllScores();
        scores.push({
            score: this.score,
            date: new Date().toLocaleDateString('en-US'),
            mode: this.gameMode
        });
        
        scores.sort((a, b) => b.score - a.score);
        const topScores = scores.slice(0, 10);
        
        localStorage.setItem(storageKey, JSON.stringify(topScores));
    }

    getAllScores() {
        try {
            const storageKey = this.getStorageKey();
            const scores = localStorage.getItem(storageKey);
            return scores ? JSON.parse(scores) : [];
        } catch (error) {
            console.error('Error loading scores:', error);
            return [];
        }
    }

    getHighScore() {
        const scores = this.getAllScores();
        return scores.length > 0 ? scores[0].score : 0;
    }

    getTopScores(limit = 5) {
        return this.getAllScores().slice(0, limit);
    }
}
