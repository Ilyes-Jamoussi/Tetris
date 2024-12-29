#from tetris_corrige.fonctions import faireTournerPiece, initialiserGrille
from fonctions import *
import json


def testInitialiserGrille(cheminFichier: str) -> bool:
    # Lire le fichier passé en paramètre, et comparer le résultat des tests avec le résultats de la fonction initialiserGrille
    f = open(cheminFichier)
    data = json.load(f)
    
    return initialiserGrille() == data["tests"][0]["attendu"]


def testRemplirGrille(cheminFichier: str) -> bool:
    # Lire le fichier passé en paramètre, et comparer le résultat des tests avec le résultats de la fonction remplirGrille
    f = open(cheminFichier)
    data = json.load(f)
    booleen =  remplirGrille(data['tests'][0]["operandes"]['positionsConfirmees']) == data["tests"][0]["attendu"]\
        and remplirGrille(data['tests'][1]["operandes"]['positionsConfirmees']) == data["tests"][1]["attendu"]\
        and remplirGrille(data['tests'][2]["operandes"]['positionsConfirmees']) == data["tests"][2]["attendu"]

    return booleen


def testFaireTournerPiece(cheminFichier: str) -> bool:
    # Lire le fichier passé en paramètre, et comparer le résultat des tests avec le résultats de la fonction faireTournerPiece
    f = open(cheminFichier)
    data = json.load(f)
    for i in range(len(data["tests"])):
        if (faireTournerPiece(data["tests"][i]["operandes"]["piece"] , data["tests"][i]["operandes"]["rotation"]) != data["tests"][i]["attendu"]):
            return False
    return True


def testEstPartiePerdue(cheminFichier: str) -> bool:
    # Lire le fichier passé en paramètre, et comparer le résultat des tests avec le résultats de la fonction testEstPartiePerdue
    f = open(cheminFichier)
    data = json.load(f)
    for i in range(len(data["tests"])):
        if (estPartiePerdue(data["tests"][i]["operandes"]["positionsConfirmees"]) != data["tests"][i]["attendu"]):
            return False
    return True


def testEnleverLignesPleines(cheminFichier: str) -> bool:
    # Lire le fichier passé en paramètre, et comparer le résultat des tests avec le résultats de la fonction enleverLignesPleines
    f = open(cheminFichier)
    data = json.load(f)
    for i in range(len(data["tests"])):
        if (enleverLignesPleines(data["tests"][i]["operandes"]["grille"] , data["tests"][i]["operandes"]["positionsConfirmees"]) != data["tests"][i]["attendu"]):
            return False
    return True


if __name__ == "__main__":
    #  Remplacer les lignes suivantes et appeller les fonctions définies pour tester le fichier fonctions.py
    initialiserGrilleSucces = testInitialiserGrille("resultatsTests/initialiserGrille.json")
    remplirGrilleSucces = testRemplirGrille("resultatsTests/remplirGrille.json")
    faireTournerPieceSucces = testFaireTournerPiece("resultatsTests/faireTournerPiece.json")
    estPartiePerdueSucces = testEstPartiePerdue("resultatsTests/estPartiePerdue.json")
    enleverLignesPleinesSucces = testEnleverLignesPleines("resultatsTests/enleverLignesPleines.json")

    # Affichage des résultats
    if initialiserGrilleSucces:
        print("Tests initialiserGrille succès :)")
    else:
        print("Tests initialiserGrille échec :(")


    if remplirGrilleSucces:
        print("Tests remplirGrille succès :)")
    else:
        print("Tests remplirGrille échec :(")


    if faireTournerPieceSucces:
        print("Tests faireTournerPiece succès :)")
    else:
        print("Tests faireTournerPiece échec :(")


    if estPartiePerdueSucces:
        print("Tests estPartiePerdue succès :)")
    else:
        print("Tests estPartiePerdue échec :(")


    if enleverLignesPleinesSucces:
        print("Tests enleverLignesPleines succès :)")
    else:
        print("Tests enleverLignesPleines échec :(")