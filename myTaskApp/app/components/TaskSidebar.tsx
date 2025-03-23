import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "@env";
import { useAuth } from "../context/AuthContext";
import { DatePicker } from "./DatePicker";

interface TaskSidebarProps {
  visible: boolean;
  onClose: () => void;
}

export default function TaskSidebar({ visible, onClose }: TaskSidebarProps) {
  const { authState } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [duration, setDuration] = useState<number>(0); // Ajout d'un état pour stocker la durée

  const slideAnim = useState(new Animated.Value(600))[0];

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  //  Fonction pour calculer la durée en heures
  const calculateDuration = (start: Date, end: Date) => {
    const diffMs = end.getTime() - start.getTime(); // Différence en millisecondes
    const diffHours = diffMs / (1000 * 60 * 60); // Convertir en heures
    setDuration(diffHours > 0 ? diffHours : 0); // Ne pas afficher une durée négative
  };

  //  Mettre à jour la durée dès que startDate ou endDate change
  React.useEffect(() => {
    calculateDuration(startDate, endDate);
  }, [startDate, endDate]);

  const determineStatus = () => {
    const currentDate = new Date();
    if (startDate > currentDate) return "Not started";
    if (currentDate >= startDate && currentDate <= endDate) return "In progress";
    return "Completed";
  };

  const handleCreateTask = async () => {
    try {
      await axios.post(
        `${API_URL}/task/create`,
        { title, description, start_date: startDate, end_date: endDate, duration, status: determineStatus() },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );

      setTitle("");
      setDescription("");
      setStartDate(new Date());
      setEndDate(new Date());
      setDuration(0);

      
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.sidebar, { transform: [{ translateY: slideAnim }] }]}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={30} color="black" />
              </TouchableOpacity>
              <Text style={styles.title}>New Task</Text>
              <TextInput style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
              <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} multiline />

              {/* 🔹 Date Picker Personnalisé */}
              <DatePicker value={startDate} onChange={setStartDate} placeholder="Sélectionner la date de début" />
              <DatePicker value={endDate} onChange={setEndDate} placeholder="Sélectionner la date de fin" />

              {/* 🔥 Affichage dynamique de la durée */}
              <Text style={styles.durationText}>Durée: {duration.toFixed(2)} heures</Text>

              <TouchableOpacity style={styles.addButton} onPress={handleCreateTask}>
                <Text style={styles.addButtonText}>Create Task</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

// 📌 Ajout du style pour la durée
const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  sidebar: { 
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "75%",
  },
  closeButton: { alignSelf: "flex-end" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  durationText: { fontSize: 16, fontWeight: "bold", marginTop: 10, color: "#333" }, // Ajout du style pour afficher la durée
  addButton: { backgroundColor: "#00008B", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 10 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
});


