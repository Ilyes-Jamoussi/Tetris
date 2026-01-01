/**
 * TETRIS GAME - UI MANAGER
 * Gestion de l'interface utilisateur
 */

export class UIManager {
    constructor(scoreManager) {
        this.scoreManager = scoreManager;
        this.elements = {
            score: document.getElementById('score'),
            highScore: document.getElementById('highScore'),
            lines: document.getElementById('lines'),
            finalScore: document.getElementById('finalScore'),
            scoresList: document.getElementById('scoresList'),
            gameOver: document.getElementById('gameOver'),
            startBtn: document.getElementById('startBtn')
        };
    }

    updateScore() {
        this.elements.score.textContent = this.scoreManager.getScore();
    }

    updateLines() {
        this.elements.lines.textContent = this.scoreManager.getLines();
    }

    updateHighScore() {
        this.elements.highScore.textContent = this.scoreManager.getHighScore();
    }

    showGameOver(finalScore) {
        this.elements.finalScore.textContent = finalScore;
        this.displayTopScores();
        this.elements.gameOver.style.display = 'block';
        this.elements.gameOver.setAttribute('aria-hidden', 'false');
    }

    hideGameOver() {
        this.elements.gameOver.style.display = 'none';
        this.elements.gameOver.setAttribute('aria-hidden', 'true');
    }

    displayTopScores() {
        const scores = this.scoreManager.getTopScores();
        this.elements.scoresList.innerHTML = '';
        
        scores.forEach(scoreData => {
            const li = document.createElement('li');
            li.textContent = `${scoreData.score} points - ${scoreData.date}`;
            this.elements.scoresList.appendChild(li);
        });
    }

    reset() {
        this.updateScore();
        this.updateLines();
        this.elements.startBtn.textContent = 'REDÉMARRER';
    }
}
