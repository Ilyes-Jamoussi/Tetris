/**
 * TETRIS GAME - TUTORIAL MANAGER
 * Gestion du tutoriel interactif
 */

export class TutorialManager {
    constructor() {
        this.currentStep = 0;
        this.isActive = false;
        this.steps = [
            {
                target: '[data-tutorial="game"]',
                title: 'Welcome to Tetris!',
                text: 'This is the game board where pieces fall. Stack them to clear lines and score points!'
            },
            {
                target: '[data-tutorial="score"]',
                title: 'Score Tracking',
                text: 'Your current score. Clear lines to earn points: 1 line = 100, 2 lines = 300, 3 lines = 500, 4 lines = 800!'
            },
            {
                target: '[data-tutorial="mode"]',
                title: 'Game Modes',
                text: 'Modern mode includes Hold piece and Ghost guide. Classic mode is traditional Tetris without these features.'
            },
            {
                target: '[data-tutorial="hold"]',
                title: 'Hold Piece',
                text: 'Press C to save the current piece for later. Strategic players use this to wait for the perfect moment!'
            },
            {
                target: '[data-tutorial="next"]',
                title: 'Next Piece',
                text: 'Preview the next piece to plan your strategy ahead of time.'
            },
            {
                target: '[data-tutorial="controls"]',
                title: 'Controls',
                text: 'Use arrow keys to move and rotate. Space for instant drop. Master these for high scores!'
            },
            {
                target: '#startBtn',
                title: 'Ready to Play?',
                text: 'Click START GAME to begin. Good luck and have fun!'
            }
        ];
        
        this.initElements();
        this.attachEvents();
    }

    initElements() {
        this.overlay = document.getElementById('tutorialOverlay');
        this.spotlight = this.overlay.querySelector('.tutorial-spotlight');
        this.tooltip = this.overlay.querySelector('.tutorial-tooltip');
        this.title = document.getElementById('tutorialTitle');
        this.text = document.getElementById('tutorialText');
        this.stepEl = document.getElementById('tutorialStep');
        this.totalEl = document.getElementById('tutorialTotal');
        this.nextBtn = document.getElementById('tutorialNext');
        this.skipBtn = document.getElementById('tutorialSkip');
        
        this.totalEl.textContent = this.steps.length;
    }

    attachEvents() {
        this.nextBtn.addEventListener('click', () => this.next());
        this.skipBtn.addEventListener('click', () => this.end());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.end();
        });
    }

    start() {
        this.currentStep = 0;
        this.isActive = true;
        this.overlay.setAttribute('aria-hidden', 'false');
        this.overlay.style.display = 'flex';
        this.showStep();
    }

    showStep() {
        const step = this.steps[this.currentStep];
        const target = document.querySelector(step.target);
        
        if (!target) return;
        
        this.title.textContent = step.title;
        this.text.textContent = step.text;
        this.stepEl.textContent = this.currentStep + 1;
        
        const rect = target.getBoundingClientRect();
        this.spotlight.style.width = `${rect.width + 20}px`;
        this.spotlight.style.height = `${rect.height + 20}px`;
        this.spotlight.style.left = `${rect.left - 10}px`;
        this.spotlight.style.top = `${rect.top - 10}px`;
        
        const tooltipX = rect.left + rect.width / 2;
        const tooltipY = rect.bottom + 20;
        this.tooltip.style.left = `${tooltipX}px`;
        this.tooltip.style.top = `${tooltipY}px`;
        this.tooltip.style.transform = 'translateX(-50%)';
        
        this.nextBtn.textContent = this.currentStep === this.steps.length - 1 ? 'Finish' : 'Next';
    }

    next() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.showStep();
        } else {
            this.end();
        }
    }

    end() {
        this.isActive = false;
        this.overlay.setAttribute('aria-hidden', 'true');
        this.overlay.style.display = 'none';
        localStorage.setItem('tetris_tutorial_completed', 'true');
    }

    shouldShowOnLoad() {
        return !localStorage.getItem('tetris_tutorial_completed');
    }
}
