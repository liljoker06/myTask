const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = await User.findById(decoded.id).select("-password"); 
        if (!req.user) {
            return res.status(401).json({ message: "Utilisateur non trouvé." });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide." });
    }
};

module.exports = authMiddleware;
