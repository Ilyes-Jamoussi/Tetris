/**
 * TETRIS GAME - RENDERER
 * Gestion de l'affichage
 */

import { GAME_CONFIG, COLORS } from './constants.js';

export class Renderer {
    constructor(mainCanvas, nextCanvas) {
        this.mainCanvas = mainCanvas;
        this.mainCtx = mainCanvas.getContext('2d');
        this.nextCanvas = nextCanvas;
        this.nextCtx = nextCanvas.getContext('2d');
    }

    drawBlock(x, y, color, ctx = this.mainCtx) {
        const [r, g, b] = color;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(
            x * GAME_CONFIG.BLOCK_SIZE, 
            y * GAME_CONFIG.BLOCK_SIZE, 
            GAME_CONFIG.BLOCK_SIZE, 
            GAME_CONFIG.BLOCK_SIZE
        );
        ctx.strokeStyle = COLORS.BLOCK_BORDER;
        ctx.lineWidth = 1;
        ctx.strokeRect(
            x * GAME_CONFIG.BLOCK_SIZE, 
            y * GAME_CONFIG.BLOCK_SIZE, 
            GAME_CONFIG.BLOCK_SIZE, 
            GAME_CONFIG.BLOCK_SIZE
        );
    }

    drawGrid() {
        this.mainCtx.strokeStyle = COLORS.GRID_LINE;
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
        this.mainCtx.fillStyle = '#000';
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

    drawCurrentPiece(positions, color) {
        positions.forEach(pos => {
            if (pos.y >= 0) {
                this.drawBlock(pos.x, pos.y, color);
            }
        });
    }

    drawNextPiece(piece) {
        this.nextCtx.fillStyle = '#000';
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

    render(grid, currentPiecePositions, currentPieceColor) {
        this.clearCanvas();
        this.drawGrid();
        this.drawGameGrid(grid);
        if (currentPiecePositions && currentPieceColor) {
            this.drawCurrentPiece(currentPiecePositions, currentPieceColor);
        }
    }
}
