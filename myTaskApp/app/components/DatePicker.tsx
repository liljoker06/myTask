import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [tempDate, setTempDate] = useState(value || new Date());

  useEffect(() => {
    setTempDate(value || new Date());
  }, [value]);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const handleConfirm = () => {
    onChange(tempDate);
    closeModal();
  };

  return (
    <>
      <TouchableOpacity onPress={openModal} style={styles.input}>
        <View style={styles.inputContent}>
          <Text style={styles.inputText}>
            {value instanceof Date
              ? format(value, 'dd MMMM yyyy à HH:mm', { locale: fr })
              : placeholder}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.overlay} onPress={closeModal} />
          <View style={styles.modalContent}>
            <View style={styles.footer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  input: { backgroundColor: '#fff', padding: 16, borderRadius: 12 },
  inputContent: { flexDirection: 'row', alignItems: 'center' },
  inputText: { flex: 1, fontSize: 16, color: '#333' },
  modalContainer: { flex: 1, justifyContent: 'flex-end' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  footer: { flexDirection: 'row', gap: 12, marginTop: 20 },
  button: { flex: 1, padding: 16, borderRadius: 12, alignItems: 'center' },
  cancelButton: { backgroundColor: '#f5f5f5' },
  confirmButton: { backgroundColor: '#007AFF' },
  cancelButtonText: { fontSize: 16, color: '#666', fontWeight: '600' },
  confirmButtonText: { fontSize: 16, color: '#fff', fontWeight: '600' },
});
