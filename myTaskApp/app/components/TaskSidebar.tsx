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

  const determineStatus = () => {
    const currentDate = new Date();
    if (startDate > currentDate) return "Not started";
    if (currentDate >= startDate && currentDate <= endDate) return "In progress";
    return "Completed";
  };

  const handleCreateTask = async () => {
    try {
      await axios.post(
        `${API_URL}/tasks`,
        { title, description, start_date: startDate, end_date: endDate, status: determineStatus() },
        { headers: { Authorization: `Bearer ${authState.token}` } }
      );
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
              <DatePicker value={startDate} onChange={setStartDate}  placeholder="Sélectionner une date et heure"/>
              <DatePicker value={endDate} onChange={setEndDate}   placeholder="Sélectionner une date et heure"/>

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

// 📌 Styles du composant
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
  addButton: { backgroundColor: "#00008B", padding: 10, borderRadius: 5, alignItems: "center" },
  addButtonText: { color: "#fff", fontWeight: "bold" },
});

