/**
 * TETRIS GAME - GRID MANAGER
 * Gestion de la grille de jeu
 */

import { GAME_CONFIG, COLORS } from './constants.js';

export class GridManager {
    constructor() {
        this.grid = this.initialize();
    }

    initialize() {
        return Array(GAME_CONFIG.GRID_HEIGHT)
            .fill()
            .map(() => Array(GAME_CONFIG.GRID_WIDTH).fill(null).map(() => [...COLORS.EMPTY]));
    }

    reset() {
        this.grid = this.initialize();
    }

    isValidPosition(positions) {
        return positions.every(pos => {
            if (pos.x < 0 || pos.x >= GAME_CONFIG.GRID_WIDTH || pos.y >= GAME_CONFIG.GRID_HEIGHT) {
                return false;
            }
            if (pos.y >= 0 && !this.isCellEmpty(pos.x, pos.y)) {
                return false;
            }
            return true;
        });
    }

    isCellEmpty(x, y) {
        const cell = this.grid[y][x];
        return cell[0] === 0 && cell[1] === 0 && cell[2] === 0;
    }

    placePiece(positions, color) {
        positions.forEach(pos => {
            if (pos.y >= 0) {
                this.grid[pos.y][pos.x] = color;
            }
        });
    }

    clearFullLines() {
        let linesCleared = 0;
        
        for (let y = GAME_CONFIG.GRID_HEIGHT - 1; y >= 0; y--) {
            if (this.isLineFull(y)) {
                this.grid.splice(y, 1);
                this.grid.unshift(Array(GAME_CONFIG.GRID_WIDTH).fill(null).map(() => [...COLORS.EMPTY]));
                linesCleared++;
                y++;
            }
        }
        
        return linesCleared;
    }

    isLineFull(y) {
        return this.grid[y].every(cell => !this.isCellEmptyByValue(cell));
    }

    isCellEmptyByValue(cell) {
        return cell[0] === 0 && cell[1] === 0 && cell[2] === 0;
    }

    isGameOver() {
        return this.grid[0].some(cell => !this.isCellEmptyByValue(cell));
    }

    getGrid() {
        return this.grid;
    }
}
