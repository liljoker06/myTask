import React, { useState, useCallback } from 'react';
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
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { Calendar, Clock, ChevronDown } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  placeholder = 'Sélectionner une date',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [tempDate, setTempDate] = useState(value);

  const translateY = useSharedValue(500);
  const opacity = useSharedValue(0);

  const years = Array.from({ length: 21 }, (_, i) => new Date().getFullYear() - 10 + i);
  const months = Array.from({ length: 12 }, (_, i) => i);
  const days = Array.from(
    { length: new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0).getDate() },
    (_, i) => i + 1
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const openModal = useCallback(() => {
    setIsOpen(true);
    translateY.value = withSpring(0);
    opacity.value = withTiming(1);
  }, []);

  const closeModal = useCallback(() => {
    translateY.value = withSpring(500);
    opacity.value = withTiming(0);
    setTimeout(() => setIsOpen(false), 300);
  }, []);

  const handleConfirm = () => {
    onChange(tempDate);
    closeModal();
  };

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const updateDate = (type: 'year' | 'month' | 'day' | 'hour' | 'minute', value: number) => {
    const newDate = new Date(tempDate);
    switch (type) {
      case 'year':
        newDate.setFullYear(value);
        break;
      case 'month':
        newDate.setMonth(value);
        break;
      case 'day':
        newDate.setDate(value);
        break;
      case 'hour':
        newDate.setHours(value);
        break;
      case 'minute':
        newDate.setMinutes(value);
        break;
    }
    setTempDate(newDate);
  };

  const renderPickerItem = (item: number, isSelected: boolean) => (
    <View
      key={item}
      style={[
        styles.pickerItem,
        isSelected && styles.selectedPickerItem,
      ]}>
      <Text style={[
        styles.pickerText,
        isSelected && styles.selectedPickerText,
      ]}>
        {item.toString().padStart(2, '0')}
      </Text>
    </View>
  );

  return (
    <>
      <TouchableOpacity onPress={openModal} style={styles.input}>
        <View style={styles.inputContent}>
          <Calendar size={20} color="#666" />
          <Text style={styles.inputText}>
            {value
              ? format(value, 'dd MMMM yyyy à HH:mm', { locale: fr })
              : placeholder}
          </Text>
          <ChevronDown size={20} color="#666" />
        </View>
      </TouchableOpacity>

      <Modal visible={isOpen} transparent animationType="none">
        <View style={styles.modalContainer}>
          <Animated.View
            style={[styles.overlay, overlayStyle]}
            onTouchStart={closeModal}
          />
          <Animated.View style={[styles.modalContent, modalStyle]}>
            <View style={styles.header}>
              <TouchableOpacity
                style={[styles.modeButton, mode === 'date' && styles.activeModeButton]}
                onPress={() => setMode('date')}>
                <Calendar size={20} color={mode === 'date' ? '#fff' : '#666'} />
                <Text style={[styles.modeButtonText, mode === 'date' && styles.activeModeButtonText]}>
                  Date
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modeButton, mode === 'time' && styles.activeModeButton]}
                onPress={() => setMode('time')}>
                <Clock size={20} color={mode === 'time' ? '#fff' : '#666'} />
                <Text style={[styles.modeButtonText, mode === 'time' && styles.activeModeButtonText]}>
                  Heure
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              {mode === 'date' ? (
                <>
                  <ScrollView
                    style={styles.pickerColumn}
                    showsVerticalScrollIndicator={false}>
                    {years.map(year => renderPickerItem(year, year === tempDate.getFullYear()))}
                  </ScrollView>
                  <ScrollView
                    style={styles.pickerColumn}
                    showsVerticalScrollIndicator={false}>
                    {months.map(month => (
                      <View key={month} style={[
                        styles.pickerItem,
                        month === tempDate.getMonth() && styles.selectedPickerItem,
                      ]}>
                        <Text style={[
                          styles.pickerText,
                          month === tempDate.getMonth() && styles.selectedPickerText,
                        ]}>
                          {format(new Date(2024, month), 'MMM', { locale: fr })}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>
                  <ScrollView
                    style={styles.pickerColumn}
                    showsVerticalScrollIndicator={false}>
                    {days.map(day => renderPickerItem(day, day === tempDate.getDate()))}
                  </ScrollView>
                </>
              ) : (
                <>
                  <ScrollView
                    style={styles.pickerColumn}
                    showsVerticalScrollIndicator={false}>
                    {hours.map(hour => renderPickerItem(hour, hour === tempDate.getHours()))}
                  </ScrollView>
                  <ScrollView
                    style={styles.pickerColumn}
                    showsVerticalScrollIndicator={false}>
                    {minutes.map(minute => renderPickerItem(minute, minute === tempDate.getMinutes()))}
                  </ScrollView>
                </>
              )}
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={closeModal}>
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirmer</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  header: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
  },
  activeModeButton: {
    backgroundColor: '#007AFF',
  },
  modeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  activeModeButtonText: {
    color: '#fff',
  },
  pickerContainer: {
    flexDirection: 'row',
    height: 200,
    marginBottom: 20,
  },
  pickerColumn: {
    flex: 1,
  },
  pickerItem: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  selectedPickerItem: {
    backgroundColor: '#007AFF',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  selectedPickerText: {
    color: '#fff',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  confirmButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});