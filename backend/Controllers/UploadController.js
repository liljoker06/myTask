const path = require("path");
const fs = require("fs");
const User = require("../models/User");

const uploadImage = async (req, res) => {
  console.log("📌 Requête reçue :", req.file);
  console.log("📌 Utilisateur authentifié :", req.user);

  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier envoyé" });
    }

    // Récupérer l'utilisateur depuis la BDD
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const uploadDir = path.join(__dirname, "../uploads", req.user.id.toString());

    // Vérifier si l'utilisateur a une ancienne image (et qu'elle n'est pas l'image par défaut)
    if (user.profile_pic && !user.profile_pic.includes("default-profile")) {
      const oldImagePath = path.join(uploadDir, path.basename(user.profile_pic));

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Supprime l'ancienne image
        console.log("🗑️ Ancienne image supprimée :", oldImagePath);
      }
    }

    // Nouvelle URL de l'image
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.user.id}/${req.file.filename}`;

    // Mettre à jour le profil utilisateur avec la nouvelle image
    await User.findByIdAndUpdate(req.user.id, { profile_pic: fileUrl });

    res.json({ message: "Image uploadée et profil mis à jour", url: fileUrl });

  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'upload", error: error.message });
  }
};

module.exports = {
  uploadImage
};
