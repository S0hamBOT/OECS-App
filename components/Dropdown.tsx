import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, SafeAreaView } from 'react-native';
import { ChevronDown, Check, X } from 'lucide-react-native';

interface DropdownProps {
  placeholder: string;
  items: Array<{ label: string; value: string }>;
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  items,
  selectedValue,
  onValueChange,
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  const selectedItem = items.find(item => item.value === selectedValue);
  
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          error ? styles.dropdownError : null,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[
            styles.dropdownButtonText,
            !selectedValue ? styles.placeholderText : null,
          ]}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <ChevronDown size={20} color="#64748B" />
      </TouchableOpacity>
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{placeholder}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <X size={20} color="#1E293B" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                  {item.value === selectedValue && (
                    <Check size={20} color="#3563E9" />
                  )}
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.optionsList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
  },
  dropdownError: {
    borderColor: '#EF4444',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#1E293B',
  },
  placeholderText: {
    color: '#94A3B8',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  closeButton: {
    padding: 4,
  },
  optionsList: {
    paddingBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  optionText: {
    fontSize: 16,
    color: '#1E293B',
  },
});