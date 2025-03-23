# 📖 Description

Ce projet est une application mobile d'agenda et gestion de tâches développée avec **React Native (Expo)** pour le front-end et **Node.js avec Express** pour le back-end.

Il permet aux utilisateurs de **gérer leurs tâches**, de **suivre leur progression hebdomadaire** et de **mettre à jour leur statut en temps réel**.

---

## 📂 Structure du projet

```
📦 project-root
 ┣ 📂 backend        # API backend en Node.js
 ┃ ┣ 📂 models      # Modèles Mongoose pour MongoDB
 ┃ ┣ 📂 routes      # Définition des routes API
 ┃ ┣ 📂 controllers # Logique métier pour les routes
 ┃ ┣ 📂 middlewares # Middleware d'authentification
 ┃ ┣ 📂 cronjob     # Scripts de tâches planifiées (cron)
 ┃ ┣ 📜 server.js   # Point d'entrée du backend
 ┃ ┣ 📜 .env        # Variables d'environnement
 ┃ ┗ 📜 package.json # Dépendances backend
 ┃
 ┣ 📂 frontend       # Application mobile avec Expo (React Native)
 ┃ ┣ 📂 components  # Composants réutilisables
 ┃ ┣ 📂 screens     # Écrans principaux de l'application
 ┃ ┣ 📂 context     # Gestion du contexte (auth, état global)
 ┃ ┣ 📂 assets      # Images, icônes, etc.
 ┃ ┣ 📜 App.js      # Point d'entrée du frontend
 ┃ ┣ 📜 .env        # Variables d'environnement pour l'API
 ┃ ┗ 📜 package.json # Dépendances frontend
 ┃
 ┗ 📜 README.md      # Documentation du projet
```

---

## 🚀 Installation et lancement

### 1️⃣ Prérequis
Avant de commencer, assure-toi d'avoir installé :

- **Node.js (≥ 16.x)** → [Télécharger Node.js](https://nodejs.org/)
- **Expo CLI** → Installer avec :
  ```sh
  npm install -g expo-cli
  ```
- **MongoDB** (local ou [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **L'application Expo Go** sur ton téléphone 📱

---

### 2️⃣ Backend - Installation et démarrage

📍 **Se déplacer dans le dossier backend** :
```sh
cd backend
```

📍 **Installer les dépendances** :
```sh
npm install
```

📍 **Créer un fichier `.env`** :
```sh
touch .env
```
📍 **Remplir le fichier `.env`** :
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_secret_key
```
📍 **Lancer le serveur** :
```sh
node server.js
```
✅ **Réponse attendue** : `Server running on port 5000`

---

### 3️⃣ Frontend - Installation et démarrage

📍 **Se déplacer dans le dossier frontend** :
```sh
cd ../frontend
```

📍 **Installer les dépendances** :
```sh
npm install
```

📍 **Configurer l'URL de l'API dans `.env`** :

🔍 **Trouver l'adresse IP locale de ton PC**

👉 **Sur Windows** :
```sh
ipconfig
```
👉 **Sur Mac/Linux** :
```sh
ifconfig | grep "inet " | grep -v 127.0.0.1
```
📍 **Modifier `.env` avec cette IP** :
```env
API_URL=http://192.168.x.x:5000/api
```
⚠️ **Remplace `192.168.x.x` par ton IPv4 !** ⚠️

📍 **Lancer l'application mobile** :
```sh
npx expo start
```
✅ **Scanner le QR code** avec **Expo Go** sur ton téléphone 📱.

---

## 📌 Utilisation

1. **Créer un compte** ou **se connecter** 🔑
2. **Ajouter des tâches** et **suivre leur progression** 📊
3. **Changer le statut des tâches** et voir la **progression hebdomadaire** mise à jour automatiquement ✅

---

## 🛠 Technologies utilisées

### **Backend**
- **Node.js** avec **Express.js**
- **MongoDB** avec **Mongoose**
- **JWT (JSON Web Token)** pour l’authentification
- **Cron jobs** pour la mise à jour automatique de la progression hebdomadaire

### **Frontend**
- **React Native** avec **Expo**
- **React Navigation** pour la navigation entre les écrans
- **Axios** pour les appels API
- **Context API** pour la gestion de l’état global
- **React Native Paper** pour les composants UI

---

## 🚀 Fonctionnalités

✅ **Système de gestion de tâches** : Ajouter, modifier, supprimer des tâches 📝
✅ **Suivi de la progression** : Barre de progression hebdomadaire mise à jour dynamiquement 📊
✅ **Mise à jour automatique** : Un cron job met à jour le statut des tâches chaque jour ⏳
✅ **Interface moderne** : Utilisation de **React Native Paper** pour une UI fluide 🎨
✅ **Stockage des utilisateurs** : Authentification sécurisée via JWT 🔐

🔥 **Maintenant, tout est prêt pour démarrer ton projet ! 🚀**

