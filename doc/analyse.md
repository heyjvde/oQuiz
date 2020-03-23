# Analyse du besoin

## ce que ça fait

- quizzes
  - titre
  - thématique: finalement le client n'en veut plus
  - sujets
  - auteur
  - chaque question a un niveau de difficulté
- les quizzes sont des qcm
  - chaque quiz possède plusieurs questions
  - une question possède plusieurs choix de réponse
  - une question n'a qu'une seule bonne réponse
- l'application permet de répondre aux questions d'un quiz et d'obtenir un score avec un récap
- on répond à toutes les questions d'un quiz d'un coup sur une même page
- gestion de l'authentification (s'inscrire et se connecter)

## ce que ça ne fait pas (sert à poser les limites)

- les quizzes n'ont pas de niveau
- on ne conserve pas les réponses et les scores des utilisateurs
- ajouter ou modifier des quizzes dans une interface admin (pas de backoffice)

## la méthode

une fois la 1ère analyse terminée, on va **dans l'ordre**:

- découpage en **use cases**: découper l'application en fonctionnalités "atomiques" (le plus petit possible)
- formation de **sprints**: regrouper les use cases en "sprints" (groupes de fonctionnalités) et au besoin rajouter des sprints para-développement ("mise en place", "test", etc.) et les ranger par ordre de dépendance (ex: sprint 2 a besoin des fonctionnalités du sprint 1 pour être implémenté)
- **wireframing** (attention à l'utilisation du mot maquette, le client peut s'attendre à une maquette graphique)
- concevoir la **bdd** (on utilisera la méthode *merise*)
