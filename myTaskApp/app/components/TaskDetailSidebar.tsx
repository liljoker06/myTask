import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";

interface TaskDetailSidebarProps {
  visible: boolean;
  onClose: () => void;
  task: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    status: string;
  } | null;
}

export default function TaskDetailSidebar({ visible, onClose, task }: TaskDetailSidebarProps) {
  const slideAnim = useState(new Animated.Value(600))[0];
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      if (task) {
        const endDate = new Date(task.end_date);
        setTimeLeft(formatDistanceToNow(endDate, { addSuffix: true }));
      }
    }
  }, [visible, task]);

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <Animated.View style={[styles.sidebar, { transform: [{ translateY: slideAnim }] }]}>
          {/* Bouton de fermeture */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>

          {/* Détails de la tâche */}
          {task && (
            <>
              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.status}>Status: {task.status}</Text>
              <Text style={styles.description}>{task.description}</Text>
              
              {/* 🔥 Chrono : Temps restant avant la fin */}
              <Text style={styles.timer}>Time left: {timeLeft}</Text>
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

// 🎨 Styles
const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
  sidebar: { 
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "60%",
  },
  closeButton: { alignSelf: "flex-end" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, color: "#666", marginVertical: 10 },
  status: { fontSize: 16, fontWeight: "bold", color: "#333" },
  timer: { fontSize: 18, fontWeight: "bold", color: "#FF4500", marginTop: 15 },
});
