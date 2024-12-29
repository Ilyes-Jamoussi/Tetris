# PAS TOUCHER À CE FICHIER

import pygame

from consts import *
from fonctions import *
from utils.piece import Piece
from utils.uiConsts import *

pygame.font.init()

# ================================================ DRAW FUNCTIONS ================================================
def drawTextMiddle(surface, text, size, color):
    font = pygame.font.SysFont("comicsans", size, bold=True)
    label = font.render(text, 1, color)

    surface.blit(label, (HAUT_GAUCHE_X + LARGEUR_GRILLE_PIXEL /2 - (label.get_width()/2), HAUT_GAUCHE_Y + HAUTEUR_GRILLE_PIXEL/2 - label.get_height()/2))


def drawGrid(surface, grid):
    sx = HAUT_GAUCHE_X
    sy = HAUT_GAUCHE_Y

    for i in range(len(grid)):
        pygame.draw.line(surface, (128,128,128), (sx, sy + i*TAILLE_BLOC), (sx+LARGEUR_GRILLE_PIXEL, sy+ i*TAILLE_BLOC))
        for j in range(len(grid[i])):
            pygame.draw.line(surface, (128, 128, 128), (sx + j*TAILLE_BLOC, sy),(sx + j*TAILLE_BLOC, sy + HAUTEUR_GRILLE_PIXEL))


def drawNextShape(shape, surface):
    font = pygame.font.SysFont('comicsans', 30)
    label = font.render('Next Shape', 1, (255,255,255))

    sx = HAUT_GAUCHE_X + LARGEUR_GRILLE_PIXEL + 50
    sy = HAUT_GAUCHE_Y + HAUTEUR_GRILLE_PIXEL/2 - 100
    format = shape.shape

    figure_sx = sx + 50
    figure_sy = sy + 35

    for i, line in enumerate(format):
        row = list(line)
        for j, column in enumerate(row):
            if column == '0':
                pygame.draw.rect(surface, shape.color, (figure_sx + j*TAILLE_BLOC, figure_sy + i*TAILLE_BLOC, TAILLE_BLOC, TAILLE_BLOC), 0)

    surface.blit(label, (sx + 10, sy - 30))


def drawWindow(surface, grid, score=0, last_score = 0):
    surface.fill((0, 0, 0))

    pygame.font.init()
    font = pygame.font.SysFont('comicsans', 60)
    label = font.render('Tetris', 1, (255, 255, 255))

    surface.blit(label, (HAUT_GAUCHE_X + LARGEUR_GRILLE_PIXEL / 2 - (label.get_width() / 2), 30))

    # current score
    font = pygame.font.SysFont('comicsans', 30)
    label = font.render(f'Score: {str(score)}', 1, (255,255,255))

    sx = HAUT_GAUCHE_X + LARGEUR_GRILLE_PIXEL + 50
    sy = HAUT_GAUCHE_Y + HAUTEUR_GRILLE_PIXEL/2 - 100

    surface.blit(label, (sx + 20, sy + 160))
    # last score
    label = font.render(f'High Score: {last_score}', 1, (255,255,255))

    sx = HAUT_GAUCHE_X - 250
    sy = HAUT_GAUCHE_Y + 200

    surface.blit(label, (sx + 20, sy + 160))

    for i in range(len(grid)):
        for j in range(len(grid[i])):
            pygame.draw.rect(surface, grid[i][j], (HAUT_GAUCHE_X + j*TAILLE_BLOC, HAUT_GAUCHE_Y + i*TAILLE_BLOC, TAILLE_BLOC, TAILLE_BLOC), 0)

    pygame.draw.rect(surface, (255, 0, 0), (HAUT_GAUCHE_X, HAUT_GAUCHE_Y, LARGEUR_GRILLE_PIXEL, HAUTEUR_GRILLE_PIXEL), 5)

    drawGrid(surface, grid)


def drawMainMenu(win):
    run = True
    while run:
        win.fill((0,0,0))
        drawTextMiddle(win, 'Press any key to play!', 30, (255,255,255))
        pygame.display.update()
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            if event.type == pygame.KEYDOWN:
                main(win)

    pygame.display.quit()


# ================================================ MAIN ================================================
def main(window):

    # initialisation des variables
    doitGenererNouvellePiece = False
    run = True
    tempsDeTombee = 0
    vitesseDeTombee = 0.27
    score = 0

    # PositionsConfirmées représente les positions des pièces qui ne peuvent plus bouger, et leur couleur
    positionsConfirmees = []

    clock = pygame.time.Clock()

    #  Assigner à la variable meilleurDernierScore le meilleur dernier score obtenu
    meilleurDernierScore = obtenirMeilleurDernierScore()

    # Assigner à la variable descrPieceCourante une piece aleatoire
    descrPieceCourante = obtenirPieceAleatoire()

    # Assigner à la variable descrProchainePiece une piece aleatoire
    descrProchainePiece = obtenirPieceAleatoire()


    pieceCourante = Piece(LARGEUR_GRILLE / 2, 0, descrPieceCourante)
    prochainePiece = Piece(LARGEUR_GRILLE / 2, 0, descrPieceCourante)

    # boucle de jeu
    while run:

        #  Au début de la boucle, replir la variable grille avec les positionsConfirmees
        grille = remplirGrille(positionsConfirmees)

        # On calcule le temps écoulé
        tempsDeTombee += clock.get_rawtime()
        clock.tick()

         # On calcule la position de la pièce selon le temps écoulé
        if tempsDeTombee / 1000 > vitesseDeTombee:
            tempsDeTombee = 0
            pieceCourante.y += 1

            # Si ce n'est pas une position valide, on cancelle le mouvement et on génère une nouvelle pièce parce que
            # notre pièce courante est placée
            if not(estPositionValide(pieceCourante.shape, pieceCourante.rotation, pieceCourante.x, pieceCourante.y, grille)) and pieceCourante.y > 0:
                pieceCourante.y -= 1
                doitGenererNouvellePiece = True

        # Lecture des entrées (clavier, souris)
        for event in pygame.event.get():
            # si on clique sur le X de la fenêtre, on ferme le jeu
            if event.type == pygame.QUIT:
                run = False
                pygame.display.quit()
                exit()

            # si on appuie sur la fleche de gauche, on veut bouger la piece à gauche
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    pieceCourante.x -= 1
                    if not(estPositionValide(pieceCourante.shape, pieceCourante.rotation, pieceCourante.x, pieceCourante.y, grille)):
                        pieceCourante.x += 1

                # si on appuie sur la fleche de droite, on veut bouger la piece à droite
                elif event.key == pygame.K_RIGHT:
                    pieceCourante.x += 1
                    if not(estPositionValide(pieceCourante.shape, pieceCourante.rotation, pieceCourante.x, pieceCourante.y, grille)):
                        pieceCourante.x -= 1

                # si on appuie sur la fleche du bas, on veut descendre la piece
                elif event.key == pygame.K_DOWN:
                    pieceCourante.y += 1
                    if not(estPositionValide(pieceCourante.shape, pieceCourante.rotation, pieceCourante.x, pieceCourante.y, grille)):
                        pieceCourante.y -= 1

                # si on appuie sur la fleche du haut, on veut tourner la pièce vers la droite
                elif event.key == pygame.K_UP:
                    pieceCourante.rotation += 1
                    if not(estPositionValide(pieceCourante.shape, pieceCourante.rotation, pieceCourante.x, pieceCourante.y, grille)):
                        pieceCourante.rotation -= 1

        # on obtient les positions de la grille occupées par la pièce courante
        shapePositions = obtenirPositionsPiece(pieceCourante.shape, pieceCourante.rotation, pieceCourante.x, pieceCourante.y)

        # POUR L'AFFICHAGE: on ajoute temporairement les couleurs de la pièce courante (qui peut encore bouger) à la grille
        for i in range(len(shapePositions)):
            col, row = shapePositions[i]

            if row >= 0:
                grille[int(row)][int(col)] = pieceCourante.color

        # Si notre pièce courante est placée (elle ne peut plus bouger), on veut générer une nouvelle pièce
        if doitGenererNouvellePiece:

            # On doit enregistrer la position courante de la pièce qui bougeait dans la grille
            for pos in shapePositions:
                positionsConfirmees.append({"colonne": int(pos[0]), "ligne": int(pos[1]), "couleur": pieceCourante.color})

            # La prochaine pièce devient la pièce courante, et on veut générer une nouvelle pièce courante
            pieceCourante = prochainePiece

            #  Assigner à la variable descrProchainePiece une piece aleatoire
            descrProchainePiece = obtenirPieceAleatoire()

            prochainePiece = Piece(5, 0, descrProchainePiece)
            doitGenererNouvellePiece = False

            #  Appeller la fonction enleverLignesPleines avec la grille et les positionsConfirmées afin de mettre
            # à jour le score et les positionsConfirmees
            points, positionsConfirmees = enleverLignesPleines(grille, positionsConfirmees)

            score += points


        # POUR L'AFFICHAGE: on affiche la grille de couleurs et les scores
        drawWindow(window, grille, score, meilleurDernierScore)
        drawNextShape(prochainePiece, window)
        pygame.display.update()

        # Assigner a la variable partiePerdue le resultat du predicat estPartiePerdue
        partiePerdue = estPartiePerdue(positionsConfirmees)

        if partiePerdue:
            #  Sauvegarder le nouveau score contenu dans la variable score
            sauvegarderNouveauScore(score)

            # POUR L'AFFICHAGE: On dit à l'utilisateur qu'il a perdu
            drawTextMiddle(window, "You lost!", 80, (255,255,255))
            pygame.display.update()
            pygame.time.delay(1500)
            run = False




if __name__ == "__main__":
    win = pygame.display.set_mode((LARGEUR_ECRAN, HAUTEUR_ECRAN))
    pygame.display.set_caption('Tetris')
    drawMainMenu(win)