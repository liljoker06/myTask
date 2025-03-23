import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { format, getDaysInMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = 'Sélectionner une date',
}: DatePickerProps) {
  const today = new Date();

  // Références pour le scroll automatique
  const yearRef = useRef<ScrollView>(null);
  const monthRef = useRef<ScrollView>(null);
  const dayRef = useRef<ScrollView>(null);
  const hourRef = useRef<ScrollView>(null);
  const minuteRef = useRef<ScrollView>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [tempDate, setTempDate] = useState(value || today);

  const translateY = useSharedValue(500);
  const opacity = useSharedValue(0);

  useEffect(() => {
    setTempDate(value || today);
  }, [value]);

  const openModal = useCallback(() => {
    setTempDate(value || today);
    setIsOpen(true);
    translateY.value = withSpring(0);
    opacity.value = withTiming(1);
  }, [value]);

  const closeModal = useCallback(() => {
    translateY.value = withSpring(500);
    opacity.value = withTiming(0);
    setTimeout(() => setIsOpen(false), 300);
  }, []);

  const handleConfirm = () => {
    if (mode === 'date') {
      setMode('time');
    } else {
      onChange(tempDate);
      closeModal();
      setMode('date');
    }
  };

  // Animation de l'overlay et du modal
  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // Options pour le choix des dates et heures
  const years = Array.from({ length: 21 }, (_, i) => today.getFullYear() - 10 + i);
  const months = Array.from({ length: 12 }, (_, i) => i);
  const days = Array.from({ length: getDaysInMonth(tempDate) }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const updateDate = (type: 'year' | 'month' | 'day' | 'hour' | 'minute', value: number) => {
    const newDate = new Date(tempDate);
    switch (type) {
      case 'year': newDate.setFullYear(value); break;
      case 'month': newDate.setMonth(value); break;
      case 'day': newDate.setDate(value); break;
      case 'hour': newDate.setHours(value); break;
      case 'minute': newDate.setMinutes(value); break;
    }
    setTempDate(newDate);
  };

  // 🔥 Scroll automatique vers la date actuelle quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        yearRef.current?.scrollTo({ y: (tempDate.getFullYear() - (today.getFullYear() - 10)) * 40, animated: true });
        monthRef.current?.scrollTo({ y: tempDate.getMonth() * 40, animated: true });
        dayRef.current?.scrollTo({ y: (tempDate.getDate() - 1) * 40, animated: true });
        hourRef.current?.scrollTo({ y: tempDate.getHours() * 40, animated: true });
        minuteRef.current?.scrollTo({ y: tempDate.getMinutes() * 40, animated: true });
      }, 300);
    }
  }, [isOpen, tempDate]);

  return (
    <>
      <TouchableOpacity onPress={openModal} style={styles.input}>
        <View style={styles.inputContent}>
          <Text style={styles.inputText}>
            {format(tempDate, 'dd MMMM yyyy à HH:mm', { locale: fr })}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="none">
        <View style={styles.fullScreenContainer}>
          <Animated.View style={[styles.overlay, overlayStyle]} onTouchStart={closeModal} />
          <Animated.View style={[styles.fullScreenModalContent, modalStyle]}>
            <View style={styles.pickerContainer}>
              {mode === 'date' ? (
                <>
                  <ScrollView ref={yearRef} style={styles.pickerColumn}>{years.map(year => (
                    <Text key={year} style={[styles.pickerText, year === tempDate.getFullYear() && styles.selectedPicker]} onPress={() => updateDate('year', year)}>{year}</Text>
                  ))}</ScrollView>
                  <ScrollView ref={monthRef} style={styles.pickerColumn}>{months.map(month => (
                    <Text key={month} style={[styles.pickerText, month === tempDate.getMonth() && styles.selectedPicker]} onPress={() => updateDate('month', month)}>{format(new Date(2024, month), 'MMM', { locale: fr })}</Text>
                  ))}</ScrollView>
                  <ScrollView ref={dayRef} style={styles.pickerColumn}>{days.map(day => (
                    <Text key={day} style={[styles.pickerText, day === tempDate.getDate() && styles.selectedPicker]} onPress={() => updateDate('day', day)}>{day}</Text>
                  ))}</ScrollView>
                </>
              ) : (
                <>
                  <ScrollView ref={hourRef} style={styles.pickerColumn}>{hours.map(hour => (
                    <Text key={hour} style={[styles.pickerText, hour === tempDate.getHours() && styles.selectedPicker]} onPress={() => updateDate('hour', hour)}>{hour}</Text>
                  ))}</ScrollView>
                  <ScrollView ref={minuteRef} style={styles.pickerColumn}>{minutes.map(minute => (
                    <Text key={minute} style={[styles.pickerText, minute === tempDate.getMinutes() && styles.selectedPicker]} onPress={() => updateDate('minute', minute)}>{minute}</Text>
                  ))}</ScrollView>
                </>
              )}
            </View>

            <View style={styles.footer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>{mode === 'date' ? 'Suivant' : 'Confirmer'}</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}


const styles = StyleSheet.create({
  input: { backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  inputContent: { flexDirection: 'row', alignItems: 'center' },
  inputText: { flex: 1, fontSize: 16, color: '#333' },
  selectedPicker: { backgroundColor: '#007AFF', color: '#fff', padding: 10, borderRadius: 5 },
  fullScreenContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  fullScreenModalContent: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 2, // Prend la moitié de l'écran
    backgroundColor: '#fff',
    padding: 20,
    position: 'absolute', // Permet de le placer où on veut
    bottom: 0, // Positionné en bas de l'écran
    borderTopLeftRadius: 20, // Coins arrondis en haut
    borderTopRightRadius: 20,
  },
  pickerContainer: { flexDirection: 'row', height: 200, marginBottom: 20 },
  pickerColumn: { flex: 1 },
  pickerText: { fontSize: 16, color: '#333', textAlign: 'center', padding: 10 },
  footer: { flexDirection: 'row', gap: 12, marginTop: 20 },
  button: { flex: 1, padding: 16, borderRadius: 12, alignItems: 'center' },
  cancelButton: { backgroundColor: '#f5f5f5' },
  confirmButton: { backgroundColor: '#007AFF' },
  cancelButtonText: { fontSize: 16, color: '#666', fontWeight: '600' },
  confirmButtonText: { fontSize: 16, color: '#fff', fontWeight: '600' },
});
