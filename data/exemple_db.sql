--? on commencera toujours un fichier sql par un commentaire qui vient décrire le fichier
-- fichier de création pour la bdd oquiz

--* on crée une transaction
-- c'est un bloc indivisible d'instructions (si tout va bien, ça ne sert pas, mais si une instruction échoue alors tout le bloc est invalidé)
BEGIN TRANSACTION;

-- en premier on drop toutes les tables pour être sûr qu'elles n'existent pas et ne provoque pas d'erreur
DROP TABLE IF EXISTS "quiz", "question", "answer", "user", "tag", "level", "quiz_has_tag";

-- on commence par créer les tables les moins référencées
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY, -- pas besoin de préciser NOT NULL pour SERIAL puisqu'il est NOT NULL de base
    "last_name" TEXT NOT NULL, -- on préfèrera TEXT à VARCHAR, mais dans le cas où on utiliserait VARCHAR on y associera toujours un multiple de 8
    "first_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

CREATE TABLE "tag" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL -- comme il y a plusieurs formats possibles pour écrire une couleur, on ne mettra pas de limite de caractères
);

CREATE TABLE "level" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

CREATE TABLE "quiz" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT, -- on peut choisir d'autoriser un quiz qui n'a pas de description
    "user_id" INT NOT NULL REFERENCES "user"("id") --! maintenant qu'on a nommé une foreign key table_key, on nommera toutes les autres de la même manière
    -- on peut référencer directement notre foreign key plutôt que le faire en plusieurs lignes
);

CREATE TABLE "question" (
    "id" SERIAL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "anecdote" TEXT,
    "quiz_id" INT NOT NULL REFERENCES "quiz"("id"),
    "level_id" INT NOT NULL REFERENCES "level"("id"),
    "answer_id" INT NOT NULL --! comme la table "answer" n'a pas encore été créée, on ne peut pas la référencer ici, on modifiera la table "question" après
);

CREATE TABLE "answer" (
    "id" SERIAL PRIMARY KEY,
    "answer" TEXT NOT NULL,
    "question_id" INT NOT NULL REFERENCES "question"("id")
);

-- maintenant que la table "answer" est créée, je peux modifier "answer_id" dans la table "question" pour qu'elle devienne une foreign key
ALTER TABLE "question"
ADD FOREIGN KEY "answer_id" REFERENCES "answer"("id");

CREATE TABLE "quiz_has_tag" (
    "quiz_id" INT NOT NULL REFERENCES "quiz"("id"),
    "tag_id" INT NOT NULL REFERENCES "tag"("id"),
    PRIMARY KEY("quiz_id", "tag_id") -- on peut définir un tuple comme PRIMARY KEY, ce qui nous assure que tous les couples sont uniques
);

--* on termine la transaction
COMMIT;