import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useAuth } from "../context/AuthContext"; // Import du contexte d'authentification

export default function Header() {
  const { user } = useAuth(); 
  const username = user?.username || "User"; 
  const profilePic = user?.profile_pic || "https://via.placeholder.com/100"; 

  return (
    <View style={styles.container}>
      {/* 📌 Photo de profil */}
      <Image
        source={{ uri: profilePic }}
        style={styles.profileImage}
      />

      {/* 📌 Message de bienvenue */}
      <Text style={styles.welcomeText}>Hello, {username} 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: "100%",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Cercle
    borderWidth: 2, // ✅ Bordure ajoutée
    borderColor: "#00008B", // ✅ Couleur bleue
    marginRight: 15,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
