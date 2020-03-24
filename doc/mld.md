# MLD

les id sont la *primary key* de nos entités. traditionnellement on la souligne. (mais on peut pas souligner en md oups)  
pour utiliser une *foreign key* on écrira #entité(key)

- quiz (id, title, description, #user(id))
- question (id, question, anecdote, #quiz(id), #level(id), #answer(id))
- answer (id, answer, #question(id))
- user (id, last_name, first_name, email, password)
- tag (id, name, color)
- level (id, title, color)
- quiz_has_tag (#quiz(id), #tag(id))

## comment utiliser les tables de liaison

### quiz

| id | title |
|---|---|
| 1 | quiz super |
| 2 | quiz dragons |

### tag

| id | title |
|---|---|
| 11 | amusant |
| 25 | dev |

### quiz_has_tag

| id_quiz | id_tag |
|---|---|
| 1 | 11 |
| 1 | 25 |
| 2 | 11 |
