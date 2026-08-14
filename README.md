# wordle-ligue1

Un Wordle quotidien sur les joueurs de **Ligue 1** : chaque jour, une grille par longueur de mot
(4 à 8 lettres), la même pour tout le monde. Gratuit, sans compte, sans base de données — la
progression est stockée dans le navigateur.

## Prérequis

- **Node.js 24** — version épinglée dans [`.nvmrc`](.nvmrc). Avec `nvm` : `nvm use`.
- **npm** (livré avec Node).

## Démarrage

```bash
npm install      # installe les dépendances
npm run dev      # serveur de dev → http://localhost:3000
```

La page se recharge automatiquement à chaque modification.

## Scripts

| Commande               | Rôle                                               |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Serveur de développement (Turbopack)               |
| `npm run build`        | Build de production                                |
| `npm start`            | Sert le build de production                        |
| `npm run lint`         | ESLint                                             |
| `npm run typecheck`    | Vérification TypeScript (sans émettre de fichiers) |
| `npm run format`       | Formate tout le code (Prettier)                    |
| `npm run format:check` | Vérifie le formatage sans modifier                 |
| `npm test`             | Lance les tests une fois (Vitest)                  |
| `npm run test:watch`   | Tests en mode watch                                |

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Vitest** + **Testing Library** pour les tests
- **ESLint** + **Prettier** pour la qualité et le formatage

## Structure

```
app/page.tsx            # le jeu (page racine)
app/layout.tsx          # layout racine : polices, métadonnées, styles globaux
app/api/game/route.ts   # GET /api/game?length=N → mot du jour
app/data/ligue1/        # wordle.json : les noms de joueurs, groupés par longueur
components/             # WordleGame, WordleGrid, Keyboard, Score, Hint, Countdown, DevSolution
lib/                    # logique pure : comparaison, mot du jour, score, sauvegarde
public/                 # assets statiques
```

## Fonctionnement

- **Mot du jour** — il n'est pas tiré au hasard : `lib/daily.ts` le calcule à partir de la date
  (fuseau `Europe/Paris`), donc tous les joueurs ont la même grille le même jour. Le serveur le
  sert via `/api/game?length=N`.
- **Comparaison** — `lib/compare.ts` évalue un essai lettre par lettre en deux passages
  (vert d'abord, puis jaune) pour ne pas compter deux fois une même lettre.
- **Score** — `lib/scoring.ts` : 100 points pour une victoire, bonus par essai restant et par
  lettre au-delà de 4, malus par indice utilisé.
- **Sauvegarde** — `lib/sauvegarde.ts` écrit dans le `localStorage` : grilles du jour, historique
  des scores et stats globales. Une sauvegarde datée d'un autre jour est ignorée.

## Conventions

- **Alias d'import** : `@/` pointe sur la racine du projet (ex. `import x from "@/lib/x"`).
- **Tests** : à côté du code testé, en `*.test.ts` / `*.test.tsx`
  (ex. `lib/compare.ts` → `lib/compare.test.ts`). Le runner est prêt, à toi d'écrire les tests.
- **Contenu data-driven** : les mots vivent dans `app/data/ligue1/wordle.json`, sous la forme
  `{ "words": { "4": [...], "5": [...], ... } }`. Ajouter des joueurs = éditer ce fichier,
  pas le code.
- **Pas de `fetch` pour la donnée locale** : on `import` le JSON du repo.
- **Formatage** : ne te bats pas avec le style — `npm run format`, ou active _format on save_
  (config VS Code fournie dans [`.vscode/`](.vscode/)).
