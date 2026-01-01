/**
 * TETRIS GAME - RENDERER
 * Gestion de l'affichage avec effets visuels
 */

import { GAME_CONFIG, COLORS } from './constants.js';

export class Renderer {
    constructor(mainCanvas, nextCanvas) {
        this.mainCanvas = mainCanvas;
        this.mainCtx = mainCanvas.getContext('2d');
        this.nextCanvas = nextCanvas;
        this.nextCtx = nextCanvas.getContext('2d');
        this.particles = [];
    }

    drawBlock(x, y, color, ctx = this.mainCtx) {
        const [r, g, b] = color;
        const blockX = x * GAME_CONFIG.BLOCK_SIZE;
        const blockY = y * GAME_CONFIG.BLOCK_SIZE;
        
        // Gradient pour effet 3D
        const gradient = ctx.createLinearGradient(
            blockX, blockY, 
            blockX + GAME_CONFIG.BLOCK_SIZE, 
            blockY + GAME_CONFIG.BLOCK_SIZE
        );
        gradient.addColorStop(0, `rgba(${r + 40}, ${g + 40}, ${b + 40}, 1)`);
        gradient.addColorStop(1, `rgb(${r}, ${g}, ${b})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(blockX, blockY, GAME_CONFIG.BLOCK_SIZE, GAME_CONFIG.BLOCK_SIZE);
        
        // Bordure avec effet néon
        ctx.strokeStyle = `rgba(${r + 80}, ${g + 80}, ${b + 80}, 0.8)`;
        ctx.lineWidth = 2;
        ctx.strokeRect(blockX + 1, blockY + 1, GAME_CONFIG.BLOCK_SIZE - 2, GAME_CONFIG.BLOCK_SIZE - 2);
        
        // Highlight pour effet brillant
        ctx.fillStyle = `rgba(255, 255, 255, 0.2)`;
        ctx.fillRect(blockX + 2, blockY + 2, GAME_CONFIG.BLOCK_SIZE - 10, 3);
    }

    drawGrid() {
        this.mainCtx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
        this.mainCtx.lineWidth = 1;
        
        // Lignes verticales
        for (let x = 0; x <= GAME_CONFIG.GRID_WIDTH; x++) {
            this.mainCtx.beginPath();
            this.mainCtx.moveTo(x * GAME_CONFIG.BLOCK_SIZE, 0);
            this.mainCtx.lineTo(x * GAME_CONFIG.BLOCK_SIZE, GAME_CONFIG.GRID_HEIGHT * GAME_CONFIG.BLOCK_SIZE);
            this.mainCtx.stroke();
        }
        
        // Lignes horizontales
        for (let y = 0; y <= GAME_CONFIG.GRID_HEIGHT; y++) {
            this.mainCtx.beginPath();
            this.mainCtx.moveTo(0, y * GAME_CONFIG.BLOCK_SIZE);
            this.mainCtx.lineTo(GAME_CONFIG.GRID_WIDTH * GAME_CONFIG.BLOCK_SIZE, y * GAME_CONFIG.BLOCK_SIZE);
            this.mainCtx.stroke();
        }
    }

    clearCanvas() {
        // Fond avec gradient
        const gradient = this.mainCtx.createLinearGradient(0, 0, 0, this.mainCanvas.height);
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#0a0a0a');
        this.mainCtx.fillStyle = gradient;
        this.mainCtx.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
    }

    drawGameGrid(grid) {
        for (let y = 0; y < GAME_CONFIG.GRID_HEIGHT; y++) {
            for (let x = 0; x < GAME_CONFIG.GRID_WIDTH; x++) {
                const cell = grid[y][x];
                if (cell[0] !== 0 || cell[1] !== 0 || cell[2] !== 0) {
                    this.drawBlock(x, y, cell);
                }
            }
        }
    }

    drawGhostPiece(positions, color) {
        const [r, g, b] = color;
        positions.forEach(pos => {
            if (pos.y >= 0) {
                const blockX = pos.x * GAME_CONFIG.BLOCK_SIZE;
                const blockY = pos.y * GAME_CONFIG.BLOCK_SIZE;
                
                this.mainCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.3)`;
                this.mainCtx.lineWidth = 2;
                this.mainCtx.strokeRect(blockX + 2, blockY + 2, GAME_CONFIG.BLOCK_SIZE - 4, GAME_CONFIG.BLOCK_SIZE - 4);
            }
        });
    }

    drawCurrentPiece(positions, color) {
        positions.forEach(pos => {
            if (pos.y >= 0) {
                this.drawBlock(pos.x, pos.y, color);
            }
        });
    }

    drawNextPiece(piece) {
        // Fond avec gradient
        const gradient = this.nextCtx.createRadialGradient(60, 60, 0, 60, 60, 60);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#000000');
        this.nextCtx.fillStyle = gradient;
        this.nextCtx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);
        
        if (!piece) return;
        
        const offsetX = (4 - piece.shape[0].length) / 2;
        const offsetY = (4 - piece.shape.length) / 2;
        
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < piece.shape[i].length; j++) {
                if (piece.shape[i][j] === '0') {
                    this.drawBlock(j + offsetX, i + offsetY, piece.color, this.nextCtx);
                }
            }
        }
    }

    drawHoldPiece(piece, holdCanvas) {
        const holdCtx = holdCanvas.getContext('2d');
        
        // Fond avec gradient
        const gradient = holdCtx.createRadialGradient(60, 60, 0, 60, 60, 60);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#000000');
        holdCtx.fillStyle = gradient;
        holdCtx.fillRect(0, 0, holdCanvas.width, holdCanvas.height);
        
        if (!piece) return;
        
        const offsetX = (4 - piece.shape[0].length) / 2;
        const offsetY = (4 - piece.shape.length) / 2;
        
        for (let i = 0; i < piece.shape.length; i++) {
            for (let j = 0; j < piece.shape[i].length; j++) {
                if (piece.shape[i][j] === '0') {
                    this.drawBlock(j + offsetX, i + offsetY, piece.color, holdCtx);
                }
            }
        }
    }

    // Effet de particules pour les lignes complétées
    createLineParticles(lineY) {
        for (let x = 0; x < GAME_CONFIG.GRID_WIDTH; x++) {
            for (let i = 0; i < 3; i++) {
                this.particles.push({
                    x: x * GAME_CONFIG.BLOCK_SIZE + Math.random() * GAME_CONFIG.BLOCK_SIZE,
                    y: lineY * GAME_CONFIG.BLOCK_SIZE + Math.random() * GAME_CONFIG.BLOCK_SIZE,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    life: 1,
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`
                });
            }
        }
    }

    updateParticles() {
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            
            if (p.life > 0) {
                this.mainCtx.globalAlpha = p.life;
                this.mainCtx.fillStyle = p.color;
                this.mainCtx.fillRect(p.x, p.y, 3, 3);
                this.mainCtx.globalAlpha = 1;
                return true;
            }
            return false;
        });
    }

    render(grid, currentPiecePositions, currentPieceColor, ghostPositions, holdPiece, holdCanvas) {
        this.clearCanvas();
        this.drawGrid();
        this.drawGameGrid(grid);
        if (ghostPositions && currentPieceColor) {
            this.drawGhostPiece(ghostPositions, currentPieceColor);
        }
        if (currentPiecePositions && currentPieceColor) {
            this.drawCurrentPiece(currentPiecePositions, currentPieceColor);
        }
        if (holdCanvas) {
            this.drawHoldPiece(holdPiece, holdCanvas);
        }
        this.updateParticles();
    }
}
