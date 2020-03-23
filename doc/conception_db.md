# conception de la bdd

on utilise la méthode merise et respecter cette suite d'étapes

- analyse des entités et de leurs attribus/propriétés
- analyse des relations
- dessin du mcd
- mise en place du mld

## analyse des entités

- quiz
  - title
  - description
- question
  - question
  - anecdote
- answer
  - answer
- tag (category? subject? theme?)
  - name
  - color
- level
  - title
  - color (facile: vert, moyen: orange, difficile: rouge)
- user (pour les auteurs on se servira de l'entité user)
  - last_name
  - first_name
  - email
  - password
  - avatar (?)

## analyse des associations entre entités

[mocodo](http://mocodo.wingi.net/)
*les cardinalités sont le maximum de chaque relation*, on dira aussi que c'est une "relation de type..."

### quiz <-> user

un utilisateur **est l'auteur** d'un quiz

- verbe: ECRIRE
- cardinalité:
  - user > quiz: un utilisateur peut avoir écrit au minimum *0* quiz, et au maximum *N* quiz
  - quiz > user: un quiz peut avoir été écrit par *1* auteur au minimum, et *1* au maximum
- relation de type `1:N`

### quiz <-> tag

un tag **définit** un quiz

- verbe: DEFINIR
- cardinalité:
  - quiz > tag: un quiz peut avoir *0* tag au minimum, et *N* au maximum
  - tag > quiz: un tag peut définir *0* quiz au minimum, et *N* au maximum
- relation de type `N:M` (on dira "N pour M" pour préciser que ce sont deux N différents)

### quiz <-> question

un quiz **contient** une question

- verbe: CONTENIR
- cardinalité:
  - quiz > question: un quiz contient *0* questions au minimum, et *N* au maximum
  - question > quiz: une question est contenue par *1* quiz au minimum, et *1* au maximum
- relation de type `1:N`

### question <-> level

un level **classe** une question

- verbe: CLASSER
- cardinalité:
  - question > level: une question est classée par *1* level au minimum, et *1* au maximum
  - level > question: un level classe *0* question au minimum, et *N* au maximum
- relation de type `1:N`

### question <-> answer

*ATTENTION* il existe 2 associations entre ces entités

1. les réponses possibles
2. la bonne réponse

#### les réponses possibles

une question **possède** une réponse possible

- verbe: POSSEDER
- cardinalité:
  - question > answer: une question possède *1* réponse au minimum, et *N* au maximum
  - answer > question: une réponse est possédée par *1* question au minimum, et *1* au maximum
- relation de type `1:N`

#### la bonne réponse

une question **a** une bonne réponse

- verbe: AVOIR
- cardinalité:
  - question > answer: une question a *1* réponse au minimum, et *1* au maximum
  - answer > question: une réponse peut être la bonne réponse de *0* question au minimum, et *1* au maximum
- relation de type `1:1`
