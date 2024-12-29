import random
import numpy as np
from consts import COULEUR_VIDE, LARGEUR_GRILLE, HAUTEUR_GRILLE, PIECES, NOMBRE_MAX_ROTATIONS
from typing import Dict, List, Tuple, NoReturn

def obtenirPositionsPiece(baseShape, rotation, shapePosX, shapePosY):
    positions = []
    baseShape = faireTournerPiece(baseShape, rotation)

    for i, row in enumerate(baseShape):
        for j, column in enumerate(row):
            if column == '0':
                positions.append((shapePosX + j, shapePosY + i))

    for i, pos in enumerate(positions):
        positions[i] = (pos[0] - 2, pos[1] - 2)

    return positions


def estPositionValide(baseShape, rotation, shapePosX, shapePosY, grid):
    accepted_pos = [[(j, i) for j in range(10) if grid[i][j] == [0, 0, 0]] for i in range(20)]
    accepted_pos = [j for sub in accepted_pos for j in sub]

    formatted = obtenirPositionsPiece(baseShape, rotation, shapePosX, shapePosY)

    for pos in formatted:
        if pos not in accepted_pos:
            if pos[1] >= 0:
                return False

    return True


def tournerTableau90Droite(tableau : List[List]) -> List:
    npArray = np.array(tableau)
    npArray90Deg = np.rot90(npArray, axes=(1, 0))
    return npArray90Deg.tolist()


# Initialiser la grille de jeu avec la valeur de la couleur par défaut
def initialiserGrille():
    GRILLE = [[COULEUR_VIDE] * LARGEUR_GRILLE for ligne in range(HAUTEUR_GRILLE)]
    return GRILLE


# Remplir la grille avec les pièces déjà placées, utiliser la fonction initialiserGrille()
def remplirGrille(positionsConfirmees):
    Grille = initialiserGrille()
    for position in positionsConfirmees:
        Grille[position["ligne"]][position["colonne"]] = position["couleur"]
    return Grille


# Retourner une pièce aléatoire de la liste des pièces PIECES
def obtenirPieceAleatoire():
    return PIECES[random.choice(list(PIECES.keys()))]


# Utiliser la fonction 'tournerTableau90Droite' pour obtenir la pièce tournée rotation nombre de fois
def faireTournerPiece(piece, rotation):
    for i in range(rotation):
        piece = tournerTableau90Droite(piece)
    return piece


# Vérifier si la partie est perdue (si une position confirmée est à la première ligne de la grille)
def estPartiePerdue(positionsConfirmees):
    for position in positionsConfirmees:
        if position["ligne"] == 0:
            return True
    return False


# Enlever les lignes complétées des positionsConfirmées
def enleverLignesPleines(grille, positionsConfirmees):
    score = 0
    lignesASupprimer = []

    # Trouver les lignes complètes
    for i in range(len(grille)):
        if grille[i].count(COULEUR_VIDE) == 0:
            lignesASupprimer.append(i)
            score += 10

    # Supprimer les positions des lignes complètes
    positionsConfirmees = [position for position in positionsConfirmees if position["ligne"] not in lignesASupprimer]

    # Décaler les positions des lignes restantes
    for ligne in lignesASupprimer:
        for position in positionsConfirmees:
            if position["ligne"] < ligne:
                position["ligne"] += 1

    return [score, positionsConfirmees]


# Obtenir le score maximal de toutes les parties précédentes. Si aucun meilleur score, retourner 0
def obtenirMeilleurDernierScore() -> int:
    with open("scores.txt") as fichier_scores:
            scores = fichier_scores.readlines()
            scores =[0]+[int(score.strip()) for score in scores]
            meilleur_score = max(scores)
    return meilleur_score


# Sauvegarder le nouveau score s'il n'est pas égal à 0
def sauvegarderNouveauScore(nouveauScore):
    if nouveauScore > 0:
        open('scores.txt', 'a').write(str(nouveauScore) + '\n')




