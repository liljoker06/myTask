import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker"; 
import { API_URL } from "@env";
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();

  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "https://i.postimg.cc/g0Jb3QbC/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg"); 

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to grant camera roll permission to select an image.");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
  
    if (!result.canceled && result.assets.length > 0) { 
      setProfilePic(result.assets[0].uri);
    }
  };
  

  const handleSave = async () => {
    try {
      let imageUrl = profilePic;
  
      // 🔹 Si l'image a changé, il faut l'uploader
      if (profilePic !== user?.profilePic) {
        const formData = new FormData();
  
        // 🔹 Convertir l'image URI en `Blob`
        const response = await fetch(profilePic);
        const blob = await response.blob();
  
        formData.append("file", blob, "profile.jpg"); 
  
        const uploadResponse = await axios.post(`${API_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        imageUrl = uploadResponse.data.url;
      }
  
    
      await axios.put(`${API_URL}/user/upload`, { username, email, profilePic: imageUrl });
  
      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack(); // Retourner au profil après modification
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile");
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
        <Image source={{ uri: profilePic }} style={styles.profileImage} />
        <View style={styles.editIcon}>
          <Ionicons name="camera" size={20} color="white" />
        </View>
      </TouchableOpacity>

      <Text style={styles.label}>Username</Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Enter new username" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter new email" keyboardType="email-address" />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff", 
    alignItems: "center" 
  },
  backButton: { 
    position: "absolute", 
    top: 90, 
    left: 20, 
    zIndex: 10 
  },

  // 🔹 Conteneur pour l'image avec bordure
  imageContainer: { 
    borderWidth: 3, 
    borderColor: "#00008B", // Bleu foncé
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

  // 🔹 Icône de modification (📷)
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
    marginBottom: 5 
  },

  input: { 
    width: "100%", 
    padding: 10, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 10, 
    marginBottom: 15 
  },

  saveButton: { 
    backgroundColor: "#00008B", 
    padding: 10, 
    borderRadius: 10, 
    width: "100%", 
    alignItems: "center" 
  },

  saveButtonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
});
