<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>README - Projet Tâches</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            line-height: 1.6;
        }
        h1, h2, h3 {
            color: #00008B;
        }
        code {
            background: #f4f4f4;
            padding: 5px;
            border-radius: 5px;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        .highlight {
            background: yellow;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>📖 Description</h1>
    <p>Ce projet est une application mobile développée avec <strong>React Native (Expo)</strong> et un backend en <strong>Node.js avec Express</strong>. Il permet aux utilisateurs de gérer leurs tâches, de suivre leur progression hebdomadaire et de mettre à jour leur statut en temps réel.</p>
    
    <h2>📂 Structure du projet</h2>
    <pre>
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
    </pre>
    
    <h2>🚀 Installation et lancement</h2>
    <h3>1️⃣ Prérequis</h3>
    <ul>
        <li>Node.js (≥ 16.x) : <a href="https://nodejs.org/">Télécharger Node.js</a></li>
        <li>Expo CLI : <code>npm install -g expo-cli</code></li>
        <li>MongoDB (local ou MongoDB Atlas)</li>
    </ul>
    
    <h3>2️⃣ Backend - Installation et démarrage</h3>
    <pre>
📍 Se déplacer dans le dossier backend :
cd backend

📍 Installer les dépendances :
npm install

📍 Créer un fichier .env :
touch .env

📍 Ajouter les variables d'environnement :
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
JWT_SECRET=your_secret_key

📍 Lancer le serveur :
node server.js

📍 Réponse attendue :
Server running on port 5000
    </pre>
    
    <h3>3️⃣ Frontend - Installation et démarrage</h3>
    <pre>
📍 Se déplacer dans le dossier frontend :
cd ../frontend

📍 Installer les dépendances :
npm install
    </pre>
    
    <h3>📍 Configurer l'URL de l'API dans .env</h3>
    <p>Récupérer l'adresse IP locale de ton PC :</p>
    <ul>
        <li><strong>Windows :</strong> Ouvre un terminal CMD et tape la commande : <code>ipconfig</code></li>
        <li><strong>Mac/Linux :</strong> Ouvre un terminal et tape la commande : <code>ifconfig | grep "inet " | grep -v 127.0.0.1</code></li>
    </ul>
    <p>Modifier <code>.env</code> avec cette IP :</p>
    <pre>
API_URL=http://192.168.x.x:5000/api
    </pre>
    <p class="highlight">⚠️ Remplace <code>192.168.x.x</code> par ton IPv4 !</p>
    
    <h3>📍 Lancer l'application mobile :</h3>
    <pre>
npx expo start
    </pre>
    <p>Un QR code s'affichera. Scanne-le avec l'application <strong>Expo Go</strong> sur ton téléphone 📱.</p>
    
    <h2>📌 Utilisation</h2>
    <ol>
        <li>Créer un compte ou se connecter</li>
        <li>Ajouter des tâches et suivre leur progression</li>
        <li>Changer le statut des tâches et voir la progression hebdomadaire mise à jour automatiquement</li>
    </ol>
    
    <h2>🛠 Technologies utilisées</h2>
    <h3>Backend</h3>
    <ul>
        <li>Node.js avec Express.js</li>
        <li>MongoDB avec Mongoose</li>
        <li>JWT (JSON Web Token) pour l’authentification</li>
        <li>Cron jobs pour la mise à jour automatique de la progression hebdomadaire</li>
    </ul>
    
    <h3>Frontend</h3>
    <ul>
        <li>React Native avec Expo</li>
        <li>React Navigation pour la navigation entre les écrans</li>
        <li>Axios pour les appels API</li>
        <li>Context API pour la gestion de l’état global</li>
        <li>React Native Paper pour les composants UI</li>
    </ul>
    
    <h2>🚀 Fonctionnalités</h2>
    <ul>
        <li>✅ Système de gestion de tâches : Ajouter, modifier, supprimer des tâches</li>
        <li>✅ Suivi de la progression : Barre de progression hebdomadaire mise à jour dynamiquement</li>
        <li>✅ Mise à jour automatique : Un cron job met à jour le statut des tâches chaque jour</li>
        <li>✅ Interface moderne : Utilisation de React Native Paper pour une UI fluide</li>
        <li>✅ Stockage des utilisateurs : Authentification via JWT</li>
    </ul>
    
    <h2>🔥 Maintenant, tout est prêt pour démarrer ton projet ! 🚀</h2>
</body>
</html>