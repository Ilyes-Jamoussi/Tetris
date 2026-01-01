// Tetris Game - Version Web Complète
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const nextCanvas = document.getElementById('nextPieceCanvas');
const nextCtx = nextCanvas.getContext('2d');

// Constantes du jeu
const GRID_WIDTH = 10;
const GRID_HEIGHT = 20;
const BLOCK_SIZE = 30;

// Pièces Tetris (basées sur votre consts.py)
const PIECES = {
    S: { color: [0, 255, 0], shape: [['.', '0', '0'], ['0', '0', '.']] },
    Z: { color: [255, 0, 0], shape: [['0', '0', '.'], ['.', '0', '0']] },
    I: { color: [0, 255, 255], shape: [['0'], ['0'], ['0'], ['0']] },
    O: { color: [255, 255, 0], shape: [['0', '0'], ['0', '0']] },
    J: { color: [255, 165, 0], shape: [['0', '.', '.'], ['0', '0', '0']] },
    L: { color: [0, 0, 255], shape: [['.', '.', '0'], ['0', '0', '0']] },
    T: { color: [128, 0, 128], shape: [['.', '0', '.'], ['0', '0', '0']] }
};

// État du jeu
let grid = [];
let score = 0;
let lines = 0;
let gameRunning = false;
let gamePaused = false;
let currentPiece = null;
let nextPiece = null;
let pieceX = 0;
let pieceY = 0;
let pieceRotation = 0;
let dropTime = 0;
let dropInterval = 500;
let animationId = null;

// Initialiser la grille
function initialiserGrille() {
    return Array(GRID_HEIGHT).fill().map(() => Array(GRID_WIDTH).fill([0, 0, 0]));
}

// Obtenir une pièce aléatoire
function obtenirPieceAleatoire() {
    const keys = Object.keys(PIECES);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return {
        type: randomKey,
        color: PIECES[randomKey].color,
        shape: PIECES[randomKey].shape.map(row => [...row])
    };
}

// Tourner une pièce (basé sur votre fonction tournerTableau90Droite)
function tournerPiece(shape) {
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

// Obtenir les positions d'une pièce
function obtenirPositionsPiece(shape, x, y) {
    const positions = [];
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] === '0') {
                positions.push({ x: x + j - 1, y: y + i - 1 });
            }
        }
    }
    return positions;
}

// Vérifier si une position est valide
function estPositionValide(shape, x, y) {
    const positions = obtenirPositionsPiece(shape, x, y);
    
    for (let pos of positions) {
        if (pos.x < 0 || pos.x >= GRID_WIDTH || pos.y >= GRID_HEIGHT) {
            return false;
        }
        if (pos.y >= 0 && grid[pos.y][pos.x][0] !== 0) {
            return false;
        }
    }
    return true;
}

// Placer la pièce dans la grille
function placerPiece() {
    const positions = obtenirPositionsPiece(currentPiece.shape, pieceX, pieceY);
    
    for (let pos of positions) {
        if (pos.y >= 0) {
            grid[pos.y][pos.x] = currentPiece.color;
        }
    }
}

// Enlever les lignes pleines
function enleverLignesPleines() {
    let linesCleared = 0;
    
    for (let y = GRID_HEIGHT - 1; y >= 0; y--) {
        if (grid[y].every(cell => cell[0] !== 0 || cell[1] !== 0 || cell[2] !== 0)) {
            grid.splice(y, 1);
            grid.unshift(Array(GRID_WIDTH).fill([0, 0, 0]));
            linesCleared++;
            y++;
        }
    }
    
    if (linesCleared > 0) {
        lines += linesCleared;
        score += linesCleared * 100;
        document.getElementById('score').textContent = score;
        document.getElementById('lines').textContent = lines;
        
        // Augmenter la vitesse
        if (lines % 10 === 0) {
            dropInterval = Math.max(100, dropInterval - 50);
        }
    }
}

// Vérifier si la partie est perdue
function estPartiePerdue() {
    return grid[0].some(cell => cell[0] !== 0 || cell[1] !== 0 || cell[2] !== 0);
}

// Générer une nouvelle pièce
function genererNouvellePiece() {
    currentPiece = nextPiece || obtenirPieceAleatoire();
    nextPiece = obtenirPieceAleatoire();
    pieceX = Math.floor(GRID_WIDTH / 2);
    pieceY = 0;
    pieceRotation = 0;
    
    drawNextPiece();
    
    if (!estPositionValide(currentPiece.shape, pieceX, pieceY)) {
        gameOver();
    }
}

// Dessiner un bloc
function drawBlock(x, y, color, context = ctx) {
    const [r, g, b] = color;
    context.fillStyle = `rgb(${r}, ${g}, ${b})`;
    context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    context.strokeStyle = '#333';
    context.lineWidth = 1;
    context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

// Dessiner la grille
function drawGrid() {
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= GRID_WIDTH; x++) {
        ctx.beginPath();
        ctx.moveTo(x * BLOCK_SIZE, 0);
        ctx.lineTo(x * BLOCK_SIZE, GRID_HEIGHT * BLOCK_SIZE);
        ctx.stroke();
    }
    
    for (let y = 0; y <= GRID_HEIGHT; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * BLOCK_SIZE);
        ctx.lineTo(GRID_WIDTH * BLOCK_SIZE, y * BLOCK_SIZE);
        ctx.stroke();
    }
}

// Dessiner la prochaine pièce
function drawNextPiece() {
    nextCtx.fillStyle = '#000';
    nextCtx.fillRect(0, 0, nextCanvas.width, nextCanvas.height);
    
    if (!nextPiece) return;
    
    const offsetX = (4 - nextPiece.shape[0].length) / 2;
    const offsetY = (4 - nextPiece.shape.length) / 2;
    
    for (let i = 0; i < nextPiece.shape.length; i++) {
        for (let j = 0; j < nextPiece.shape[i].length; j++) {
            if (nextPiece.shape[i][j] === '0') {
                drawBlock(j + offsetX, i + offsetY, nextPiece.color, nextCtx);
            }
        }
    }
}

// Dessiner tout
function draw() {
    // Effacer le canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner la grille
    drawGrid();
    
    // Dessiner les pièces placées
    for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            if (grid[y][x][0] !== 0 || grid[y][x][1] !== 0 || grid[y][x][2] !== 0) {
                drawBlock(x, y, grid[y][x]);
            }
        }
    }
    
    // Dessiner la pièce courante
    if (currentPiece) {
        const positions = obtenirPositionsPiece(currentPiece.shape, pieceX, pieceY);
        for (let pos of positions) {
            if (pos.y >= 0) {
                drawBlock(pos.x, pos.y, currentPiece.color);
            }
        }
    }
}

// Mise à jour du jeu
function update(deltaTime) {
    if (!gameRunning || gamePaused || !currentPiece) return;
    
    dropTime += deltaTime;
    
    if (dropTime >= dropInterval) {
        if (estPositionValide(currentPiece.shape, pieceX, pieceY + 1)) {
            pieceY++;
        } else {
            placerPiece();
            enleverLignesPleines();
            
            if (estPartiePerdue()) {
                gameOver();
            } else {
                genererNouvellePiece();
            }
        }
        dropTime = 0;
    }
}

// Boucle de jeu
let lastTime = 0;
function gameLoop(currentTime) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    
    update(deltaTime);
    draw();
    
    if (gameRunning) {
        animationId = requestAnimationFrame(gameLoop);
    }
}

// Contrôles
document.addEventListener('keydown', (e) => {
    if (!gameRunning || !currentPiece) return;
    
    if (e.code === 'KeyP') {
        gamePaused = !gamePaused;
        return;
    }
    
    if (gamePaused) return;
    
    switch (e.code) {
        case 'ArrowLeft':
            if (estPositionValide(currentPiece.shape, pieceX - 1, pieceY)) {
                pieceX--;
            }
            break;
            
        case 'ArrowRight':
            if (estPositionValide(currentPiece.shape, pieceX + 1, pieceY)) {
                pieceX++;
            }
            break;
            
        case 'ArrowDown':
            if (estPositionValide(currentPiece.shape, pieceX, pieceY + 1)) {
                pieceY++;
                score += 1;
                document.getElementById('score').textContent = score;
            }
            break;
            
        case 'ArrowUp':
            const rotated = tournerPiece(currentPiece.shape);
            if (estPositionValide(rotated, pieceX, pieceY)) {
                currentPiece.shape = rotated;
            }
            break;
            
        case 'Space':
            while (estPositionValide(currentPiece.shape, pieceX, pieceY + 1)) {
                pieceY++;
                score += 2;
            }
            document.getElementById('score').textContent = score;
            break;
    }
    
    draw();
});

// Gestion des scores
function sauvegarderScore(score) {
    let scores = JSON.parse(localStorage.getItem('tetrisScores') || '[]');
    scores.push({ score, date: new Date().toLocaleDateString() });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 10);
    localStorage.setItem('tetrisScores', JSON.stringify(scores));
    return scores;
}

function obtenirMeilleurScore() {
    const scores = JSON.parse(localStorage.getItem('tetrisScores') || '[]');
    return scores.length > 0 ? scores[0].score : 0;
}

function afficherScores() {
    const scores = JSON.parse(localStorage.getItem('tetrisScores') || '[]');
    const scoresList = document.getElementById('scoresList');
    scoresList.innerHTML = '';
    
    scores.slice(0, 5).forEach((s, i) => {
        const li = document.createElement('li');
        li.textContent = `${s.score} points - ${s.date}`;
        scoresList.appendChild(li);
    });
}

// Game Over
function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animationId);
    
    document.getElementById('finalScore').textContent = score;
    sauvegarderScore(score);
    afficherScores();
    
    const highScore = obtenirMeilleurScore();
    document.getElementById('highScore').textContent = highScore;
    
    document.getElementById('gameOver').style.display = 'block';
}

// Démarrer le jeu
function startGame() {
    grid = initialiserGrille();
    score = 0;
    lines = 0;
    dropInterval = 500;
    dropTime = 0;
    gameRunning = true;
    gamePaused = false;
    
    document.getElementById('score').textContent = score;
    document.getElementById('lines').textContent = lines;
    document.getElementById('highScore').textContent = obtenirMeilleurScore();
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('startBtn').textContent = 'REDÉMARRER';
    
    nextPiece = obtenirPieceAleatoire();
    genererNouvellePiece();
    
    lastTime = performance.now();
    gameLoop(lastTime);
}

// Boutons
document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', startGame);

// Initialisation
document.getElementById('highScore').textContent = obtenirMeilleurScore();
draw();
