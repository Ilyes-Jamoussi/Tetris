/**
 * TETRIS GAME - UI MANAGER
 * Gestion de l'interface utilisateur avec animations
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
        this.previousScore = 0;
        this.previousLines = 0;
    }

    animateNumber(element, from, to, duration = 500) {
        const start = performance.now();
        const diff = to - from;
        
        const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function pour animation fluide
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(from + diff * easeOut);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    updateScore() {
        const newScore = this.scoreManager.getScore();
        this.animateNumber(this.elements.score, this.previousScore, newScore);
        this.previousScore = newScore;
        
        // Effet de pulse sur le score
        this.elements.score.parentElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.elements.score.parentElement.style.transform = 'scale(1)';
        }, 200);
    }

    updateLines() {
        const newLines = this.scoreManager.getLines();
        this.animateNumber(this.elements.lines, this.previousLines, newLines);
        this.previousLines = newLines;
        
        // Effet de pulse sur les lignes
        this.elements.lines.parentElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.elements.lines.parentElement.style.transform = 'scale(1)';
        }, 200);
    }

    updateHighScore() {
        this.elements.highScore.textContent = this.scoreManager.getHighScore();
    }

    showGameOver(finalScore) {
        this.elements.finalScore.textContent = finalScore;
        this.displayTopScores();
        this.elements.gameOver.setAttribute('aria-hidden', 'false');
        
        // Animation d'entrée
        this.elements.gameOver.style.animation = 'none';
        setTimeout(() => {
            this.elements.gameOver.style.animation = '';
        }, 10);
    }

    hideGameOver() {
        this.elements.gameOver.setAttribute('aria-hidden', 'true');
    }

    displayTopScores() {
        const scores = this.scoreManager.getTopScores();
        this.elements.scoresList.innerHTML = '';
        
        scores.forEach((scoreData, index) => {
            const li = document.createElement('li');
            li.textContent = `${scoreData.score} points - ${scoreData.date}`;
            li.style.animationDelay = `${index * 0.1}s`;
            li.style.animation = 'fadeInUp 0.4s ease-out forwards';
            li.style.opacity = '0';
            this.elements.scoresList.appendChild(li);
        });
    }

    reset() {
        this.previousScore = 0;
        this.previousLines = 0;
        this.updateScore();
        this.updateLines();
        this.elements.startBtn.textContent = 'RESTART';
    }
}
