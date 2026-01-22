# Argent Bank – Application bancaire avec React & Redux

---

## Contexte
Argent Bank est un projet réalisé dans le cadre de la formation Intégrateur Web OpenClassrooms..  
L’objectif était de développer une application bancaire front-end complète en React, connectée à une API REST, avec gestion de l’authentification et de l’état global via Redux..

---

## Objectifs pédagogiques
- Structurer une application React complexe
- Mettre en place un store Redux pour l’état global
- Gérer l’authentification utilisateur
- Interagir avec une API REST sécurisée
- Implémenter des actions asynchrones
- Concevoir une architecture maintenable et évolutive

---

## Technologies utilisées
- HTML5
- CSS3
- JavaScript
- React
- Redux Toolkit
- API REST

---

## Fonctionnalités principales
- Authentification utilisateur sécurisée
- Gestion de la session via token
- Affichage des informations du profil utilisateur
- Modification du nom d’utilisateur
- Architecture prête à accueillir les fonctionnalités bancaires (comptes, transactions)

---

## Contraintes du projet
- Utilisation obligatoire de Redux pour l’état global
- Communication avec une API existante
- Gestion des actions asynchrones
- Respect des bonnes pratiques React
- Compatibilité avec les navigateurs modernes

---

## Choix techniques
- Utilisation de Redux Toolkit pour réduire le boilerplate
- Mise en place d’async thunks pour gérer les appels API
- Centralisation de l’état d’authentification (token, user, status, error)
- Stockage du token en session pour persister la session utilisateur
- Séparation claire entre logique métier et composants UI

---

## Architecture de l’état
- Store Redux centralisé
- Slice d’authentification dédiée
- Gestion explicite des états loading / success / error
- Composants connectés via `useSelector` et `useDispatch`

---

## Installation et lancement
Ce projet est structuré sous forme de **monorepo**, contenant un backend et un frontend React..

### Prérequis
- Node.js
- Git
- MongoDB *(ou Docker si une image MongoDB est utilisée)*

### Démarrer le backend
```
bash
cd backend
npm install
npm run dev:server
```
API disponible sur http://localhost:3001
Base API : http://localhost:3001/api/v1

Démarrer le frontend
```
bash
Copier le code
cd ../frontend
npm install
npm run dev
```
Application disponible sur http://localhost:5173

Swagger
Le fichier backend/swagger.yaml peut être ouvert dans Swagger Editor :
https://editor.swagger.io/

---

### Points forts

Architecture React / Redux claire et robuste
Gestion propre de l’authentification
Actions asynchrones maîtrisées
Code structuré et maintenable
Application évolutive et réaliste

---

### Liens

Dépôt GitHub : https://github.com/Chupaella/OC-P10
