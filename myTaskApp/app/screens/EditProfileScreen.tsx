import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { API_URL } from "@env";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen() {
  const { user, authState } = useAuth();
  const navigation = useNavigation();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profile_pic, setProfile_pic] = useState(user?.profile_pic || "https://i.postimg.cc/g0Jb3QbC/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg");
  const [loading, setLoading] = useState(false);

  // 🔹 Sélectionner une image depuis la galerie
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Requise", "Vous devez autoriser l'accès à la galerie.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfile_pic(result.assets[0].uri);
    }
  };

  // 🔹 Upload de l'image et mise à jour du profil
  const handleSave = async () => {
    try {
      setLoading(true);
      let imageUrl = profile_pic;

      // 🔹 Si l'image a changé, on l'upload
      if (profile_pic !== user?.profile_pic) {
        const formData = new FormData();

        // 🔹 Convertir l'image URI en `Blob`
        const response = await fetch(profile_pic);
        const blob = await response.blob();

        // 🔹 Ajouter l'image à `FormData()`
        formData.append("file", {
          uri: profile_pic,
          type: "image/jpeg",
          name: `profile_${user?.id}.jpg`,
        });

        const uploadResponse = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authState.token}`, // Envoi du token
          },
        });

        imageUrl = uploadResponse.data.url;
      }

      // 🔹 Envoyer les nouvelles informations à l'API
      await axios.put(
        `${API_URL}/user/update`,
        { username, email, profile_pic: imageUrl },
        {
          headers: { Authorization: `Bearer ${authState.token}` }, // Envoi du token
        }
      );

      Alert.alert("Succès", "Profil mis à jour avec succès !");
      navigation.goBack();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      Alert.alert("Erreur", "Impossible de mettre à jour le profil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Bouton retour */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#00008B" />
      </TouchableOpacity>

      {/* Image de profil avec bouton clic */}
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        <Image source={{ uri: profile_pic }} style={styles.profileImage} />
        <View style={styles.editIcon}>
          <Ionicons name="camera" size={20} color="white" />
        </View>
      </TouchableOpacity>

      <Text style={styles.label}>Nom d'utilisateur</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Entrer un nouveau nom" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Entrer un nouvel email" keyboardType="email-address" />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 90,
    left: 20,
    zIndex: 10,
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: "#00008B",
    borderRadius: 55,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#00008B",
    borderRadius: 15,
    padding: 5,
    borderWidth: 2,
    borderColor: "white",
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "bold",
    color: "#00008B",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#00008B",
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
