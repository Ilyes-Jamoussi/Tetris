/**
 * TETRIS GAME - CONSTANTS
 * Configuration et constantes du jeu
 */

export const GAME_CONFIG = {
    GRID_WIDTH: 10,
    GRID_HEIGHT: 20,
    BLOCK_SIZE: 30,
    INITIAL_DROP_INTERVAL: 500,
    MIN_DROP_INTERVAL: 100,
    SPEED_INCREASE_LINES: 10,
    SPEED_DECREASE: 50
};

export const PIECES = {
    S: { 
        color: [0, 255, 0], 
        shape: [['.', '0', '0'], ['0', '0', '.']] 
    },
    Z: { 
        color: [255, 0, 0], 
        shape: [['0', '0', '.'], ['.', '0', '0']] 
    },
    I: { 
        color: [0, 255, 255], 
        shape: [['0'], ['0'], ['0'], ['0']] 
    },
    O: { 
        color: [255, 255, 0], 
        shape: [['0', '0'], ['0', '0']] 
    },
    J: { 
        color: [255, 165, 0], 
        shape: [['0', '.', '.'], ['0', '0', '0']] 
    },
    L: { 
        color: [0, 0, 255], 
        shape: [['.', '.', '0'], ['0', '0', '0']] 
    },
    T: { 
        color: [128, 0, 128], 
        shape: [['.', '0', '.'], ['0', '0', '0']] 
    }
};

export const COLORS = {
    EMPTY: [0, 0, 0],
    GRID_LINE: '#444',
    BLOCK_BORDER: '#333'
};

export const SCORES = {
    LINE_CLEAR: 100,
    SOFT_DROP: 1,
    HARD_DROP: 2
};
