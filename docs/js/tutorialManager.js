/**
 * TETRIS GAME - TUTORIAL MANAGER
 * Gestion du tutoriel interactif
 */

export class TutorialManager {
    constructor() {
        this.currentStep = 0;
        this.isActive = false;
        this.allSteps = [
            {
                target: '[data-tutorial="game"]',
                title: 'Welcome to Tetris!',
                text: 'This is the game board where pieces fall. Stack them to clear lines and score points!',
                modes: ['modern', 'classic']
            },
            {
                target: '[data-tutorial="score"]',
                title: 'Score Tracking',
                text: 'Your current score. Clear lines to earn points: 1 line = 100, 2 lines = 300, 3 lines = 500, 4 lines = 800!',
                modes: ['modern', 'classic']
            },
            {
                target: '[data-tutorial="mode"]',
                title: 'Game Modes',
                text: 'Modern mode includes Hold piece and Ghost guide. Classic mode is traditional Tetris without these features.',
                modes: ['modern', 'classic']
            },
            {
                target: '[data-tutorial="hold"]',
                title: 'Hold Piece',
                text: 'Press C to save the current piece for later. Strategic players use this to wait for the perfect moment!',
                modes: ['modern']
            },
            {
                target: '[data-tutorial="next"]',
                title: 'Next Piece',
                text: 'Preview the next piece to plan your strategy ahead of time.',
                modes: ['modern', 'classic']
            },
            {
                target: '[data-tutorial="controls"]',
                title: 'Controls',
                text: 'Use arrow keys to move and rotate. Space for instant drop. Master these for high scores!',
                modes: ['modern', 'classic']
            },
            {
                target: '#startBtn',
                title: 'Ready to Play?',
                text: 'Click START GAME to begin. Good luck and have fun!',
                modes: ['modern', 'classic']
            }
        ];
        
        this.steps = [];
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
    }

    attachEvents() {
        this.nextBtn.addEventListener('click', () => this.next());
        this.skipBtn.addEventListener('click', () => this.end());
    }

    start() {
        // Get current game mode
        const gameMode = document.getElementById('gameMode').value;
        
        // Filter steps based on game mode
        this.steps = this.allSteps.filter(step => step.modes.includes(gameMode));
        
        this.currentStep = 0;
        this.isActive = true;
        this.totalEl.textContent = this.steps.length;
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
        
        // For canvas wrapper, use the canvas itself for better fit
        let spotlightRect = rect;
        if (step.target === '[data-tutorial="game"]') {
            const canvas = document.getElementById('mainCanvas');
            if (canvas) {
                spotlightRect = canvas.getBoundingClientRect();
            }
        }
        
        this.spotlight.style.width = `${spotlightRect.width + 20}px`;
        this.spotlight.style.height = `${spotlightRect.height + 20}px`;
        this.spotlight.style.left = `${spotlightRect.left - 10}px`;
        this.spotlight.style.top = `${spotlightRect.top - 10}px`;
        
        // Position tooltip intelligently
        let tooltipX, tooltipY, transform;
        
        // For game canvas, place tooltip to the right
        if (step.target === '[data-tutorial="game"]') {
            tooltipX = spotlightRect.right + 30;
            tooltipY = spotlightRect.top + spotlightRect.height / 2;
            transform = 'translateY(-50%)';
            
            // If would go off right, place to the left
            if (tooltipX + 420 > window.innerWidth) {
                tooltipX = spotlightRect.left - 30;
                transform = 'translateX(-100%) translateY(-50%)';
            }
        } else {
            // Default positioning for other steps
            tooltipX = spotlightRect.left + spotlightRect.width / 2;
            tooltipY = spotlightRect.bottom + 30;
            transform = 'translateX(-50%)';
            
            // If tooltip would go off bottom, place it above
            if (tooltipY + 250 > window.innerHeight) {
                tooltipY = spotlightRect.top - 30;
                transform = 'translateX(-50%) translateY(-100%)';
            }
            
            // Ensure tooltip is at least 20px from top
            if (tooltipY < 20) {
                tooltipY = 20;
                transform = 'translateX(-50%)';
            }
            
            // If tooltip would go off right, adjust
            if (tooltipX + 210 > window.innerWidth) {
                this.tooltip.style.left = `${window.innerWidth - 230}px`;
                this.tooltip.style.top = `${tooltipY}px`;
                this.tooltip.style.transform = 'none';
                this.nextBtn.textContent = this.currentStep === this.steps.length - 1 ? 'Finish' : 'Next';
                return;
            } else if (tooltipX - 210 < 0) {
                this.tooltip.style.left = '20px';
                this.tooltip.style.top = `${tooltipY}px`;
                this.tooltip.style.transform = 'none';
                this.nextBtn.textContent = this.currentStep === this.steps.length - 1 ? 'Finish' : 'Next';
                return;
            }
        }
        
        this.tooltip.style.left = `${tooltipX}px`;
        this.tooltip.style.top = `${tooltipY}px`;
        this.tooltip.style.transform = transform;
        
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
