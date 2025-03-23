import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
}

export default function TaskCard({ title, description, status }: TaskCardProps) {
  // 📌 Limiter la description à 50 caractères max
  const shortDescription = description.length > 50 ? description.substring(0, 50) + "..." : description;

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {/* ✅ Titre de la tâche */}
        <Text style={styles.title}>{title}</Text>
        
        {/* ✅ Début de la description */}
        <Text style={styles.description}>{shortDescription}</Text>
      </View>

      {/* 📌 Badge de statut (In Progress, Completed...) */}
      <View style={[styles.statusBadge, getStatusStyle(status)]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
  );
}

// 🎨 Fonction pour changer la couleur du badge selon le statut
const getStatusStyle = (status: string) => {
  switch (status) {
    case "Not started":
      return { backgroundColor: "#FFD700" }; // Jaune
    case "In progress":
      return { backgroundColor: "#FFA500" }; // Orange
    case "Completed":
      return { backgroundColor: "#4CAF50" }; // Vert
    default:
      return { backgroundColor: "#D3D3D3" }; // Gris clair
  }
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1, // Prend tout l'espace sauf le badge
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15, // ✅ Arrondi comme sur l'image
    alignSelf: "center",
  },
  statusText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});

