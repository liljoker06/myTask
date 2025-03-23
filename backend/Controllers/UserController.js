const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();
const log = require('../consoleLog');



const register = async (req, res) => {
    const { username, email, password } = req.body;

    log.info("Tentative d'inscription", { username, email, password });

    try {
        // Vérifier si le username ou l'email existent déjà
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            log.error("Échec de l'inscription : email ou username déjà utilisé", { email, username });
            return res.status(400).json({ message: "Username ou email déjà utilisé" });
        }

        // Vérifier si les valeurs reçues sont correctes
        console.log("🔍 Données reçues:", req.body);

        // Vérifier si username est bien une string et pas le mot de passe
        if (!username || !email || !password || typeof username !== "string") {
            log.error("Données invalides reçues lors de l'inscription", { username, email, password });
            return res.status(400).json({ message: "Données invalides. Vérifiez votre requête." });
        }

        const user = await User.create({ username, email, password });

        log.info("Utilisateur inscrit avec succès", { userId: user._id });
        res.status(201).json({ user });

    } catch (error) {
        log.error("Erreur lors de l'inscription", error.message);
        res.status(500).json({ message: error.message });
    }
};



const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        log.info("Tentative de connexion", { email });

        const user = await User.findOne({ $or: [{ email }, { username: email }] }).exec();
        if (!user) {
            log.error("Échec de connexion : utilisateur introuvable", { email });
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("🔍 Mot de passe entré :", password);
        console.log("🔒 Mot de passe en base :", user.password);

        console.log("📌 Type du mot de passe reçu :", typeof password);
        console.log("📌 Valeur du mot de passe reçu :", password);
        console.log("📌 Type du mot de passe stocké :", typeof user.password);
        console.log("📌 Valeur du mot de passe stocké :", user.password);


        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("✅ Résultat de la comparaison :", isPasswordValid);

        if (!isPasswordValid) {
            log.error("Échec de connexion : mot de passe invalide", { email });
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        log.info("Connexion réussie", { userId: user._id });

        res.status(200).json({ user, token });
    } catch (error) {
        log.error("Erreur lors de la connexion", error.message);
        res.status(500).json({ message: error.message });
    }
};

const getme = async (req, res) => {
    try {
        res.status(200).json(req.user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updateProfile = async (req, res) => {
    try {
      const { username, email, profile_pic } = req.body;
  
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
  
      user.username = username || user.username;
      user.email = email || user.email;
      user.profilePic = profilePic || user.profile_pic;
  
      await user.save();
  
      res.status(200).json({ message: "Profil mis à jour", user });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
    }
  };


module.exports = { 
    register,
    login,
    getme,
    updateProfileasync
};