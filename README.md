# OC-P10 - ArgentBank Monorepo

Ce monorepo contient le backend et le frontend React pour le projet OpenClassrooms P10 (ArgentBank).

## Prerequis
- Node.js
- MongoDB (ou Docker si vous utilisez une image Mongo)
- Git

## Demarrer le backend
```bash
cd backend
npm install
npm run dev:server
```
API disponible sur http://localhost:3001
Base API: http://localhost:3001/api/v1

## Demarrer le frontend
```bash
cd ../frontend
npm install
npm run dev
```
Front disponible sur http://localhost:5173

## Swagger
- Le fichier `backend/swagger.yaml` peut etre ouvert dans Swagger Editor.

## Notes OC
- Identifiants de test: voir la base de donnees seed (scripts backend).
