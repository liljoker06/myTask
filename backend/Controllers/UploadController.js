const path = require("path");
const fs = require("fs");

uploadImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Aucun fichier envoyé" });
      }
  
      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.user.id}/${req.file.filename}`;
  
      // Mise à jour du profil utilisateur avec la nouvelle image
      await User.findByIdAndUpdate(req.user.id, { profile_pic: fileUrl });
  
      res.json({ message: "Image uploadée et profil mis à jour", url: fileUrl });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de l'upload", error: error.message });
    }
  };

module.exports = {
    uploadImage
};


