/**
 * TETRIS GAME - PIECE MANAGER
 * Gestion des pièces Tetris
 */

import { PIECES, GAME_CONFIG } from './constants.js';

export class PieceManager {
    constructor() {
        this.currentPiece = null;
        this.nextPiece = null;
        this.position = { x: 0, y: 0 };
    }

    getRandomPiece() {
        const keys = Object.keys(PIECES);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return {
            type: randomKey,
            color: PIECES[randomKey].color,
            shape: PIECES[randomKey].shape.map(row => [...row])
        };
    }

    spawnPiece() {
        this.currentPiece = this.nextPiece || this.getRandomPiece();
        this.nextPiece = this.getRandomPiece();
        this.position = {
            x: Math.floor(GAME_CONFIG.GRID_WIDTH / 2),
            y: 0
        };
    }

    rotatePiece() {
        const shape = this.currentPiece.shape;
        const rows = shape.length;
        const cols = shape[0].length;
        const rotated = Array(cols).fill().map(() => Array(rows).fill('.'));
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                rotated[j][rows - 1 - i] = shape[i][j];
            }
        }
        
        return rotated;
    }

    getPositions(shape = this.currentPiece.shape, pos = this.position) {
        const positions = [];
        
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j] === '0') {
                    positions.push({
                        x: pos.x + j - 1,
                        y: pos.y + i - 1
                    });
                }
            }
        }
        
        return positions;
    }

    moveLeft() {
        this.position.x--;
    }

    moveRight() {
        this.position.x++;
    }

    moveDown() {
        this.position.y++;
    }

    undoMove(direction) {
        switch(direction) {
            case 'left':
                this.position.x++;
                break;
            case 'right':
                this.position.x--;
                break;
            case 'down':
                this.position.y--;
                break;
        }
    }

    getCurrentPiece() {
        return this.currentPiece;
    }

    getNextPiece() {
        return this.nextPiece;
    }

    getPosition() {
        return this.position;
    }
}
