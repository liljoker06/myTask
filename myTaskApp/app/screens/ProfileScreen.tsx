import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext"; 
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../types";
import Modal from "react-native-modal";
import Constants from "expo-constants"; // 🔹 Importer expo-constants

type NavigationProp = StackNavigationProp<RootStackParamList, "Home">;

export default function ProfileScreen() {
  const { user, onLogout } = useAuth(); 
  const navigation = useNavigation<NavigationProp>();

  // 🔹 Gestion du modal
  const [isModalVisible, setModalVisible] = useState(false);

  // 🔹 Récupération de la version de l'app
  const appVersion = Constants.expoConfig?.version || "error";

  const menuItems = [
    { id: "1", title: "Settings", icon: "settings-outline" },
    { id: "2", title: "Information", icon: "information-circle-outline", onPress: () => setModalVisible(true) },
  ];

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          await onLogout();
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Profil */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: user?.profile_pic || "https://i.postimg.cc/g0Jb3QbC/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user?.username || "Loading..."}</Text>
        <Text style={styles.email}>{user?.email || "No email available"}</Text>

        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate("EditProfile")}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des options */}
      <View style={styles.menuContainer}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.menuItem} onPress={item.onPress}>
              <Ionicons name={item.icon} size={24} color="#00008B" style={styles.menuIcon} />
              <Text style={styles.menuText}>{item.title}</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="#00008B" />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Bouton Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="red" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* 🔹 Modal coulissant pour afficher les informations */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>User Information</Text>
          <Text style={styles.modalText}>Username: {user?.username}</Text>
          <Text style={styles.modalText}>Email: {user?.email}</Text>
          <Text style={styles.modalText}>
            Account Created: {new Date(user?.createdAt).toLocaleDateString()}
          </Text>

          {/* 🔹 Ajout de la version de l'app */}
          <Text style={styles.modalText}>App Version: {appVersion}</Text>

          {/* Bouton fermer */}
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#00008B",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#00008B",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffff",
  },
  menuContainer: {
    marginHorizontal: 20,
    borderRadius: 10,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#00008B",
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#00008B",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 15,
  },
  logoutText: {
    fontSize: 16,
    color: "red",
    marginLeft: 10,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#00008B",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#00008B",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
