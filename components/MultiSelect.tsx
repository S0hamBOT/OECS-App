import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import { ChevronDown, Check, X, Search } from 'lucide-react-native';

interface MultiSelectProps {
  placeholder: string;
  items: Array<{ label: string; value: string }>;
  selectedItems: string[];
  onSelectedItemsChange: (selectedItems: string[]) => void;
  error?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  items,
  selectedItems,
  onSelectedItemsChange,
  error,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredItems = searchQuery
    ? items.filter(item => 
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;
  
  const toggleItem = (value: string) => {
    if (selectedItems.includes(value)) {
      onSelectedItemsChange(selectedItems.filter(item => item !== value));
    } else {
      onSelectedItemsChange([...selectedItems, value]);
    }
  };
  
  const renderSelectedItems = () => {
    if (selectedItems.length === 0) {
      return <Text style={styles.placeholderText}>{placeholder}</Text>;
    }
    
    if (selectedItems.length <= 2) {
      return (
        <Text style={styles.selectedText}>
          {selectedItems.map(value => {
            const item = items.find(item => item.value === value);
            return item ? item.label : '';
          }).join(', ')}
        </Text>
      );
    }
    
    return (
      <Text style={styles.selectedText}>
        {selectedItems.length} items selected
      </Text>
    );
  };
  
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.selectButton,
          error ? styles.selectError : null,
        ]}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.selectedItemsContainer}>
          {renderSelectedItems()}
        </View>
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
            
            <View style={styles.searchContainer}>
              <Search size={20} color="#64748B" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <X size={16} color="#64748B" />
                </TouchableOpacity>
              ) : null}
            </View>
            
            <FlatList
              data={filteredItems}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => toggleItem(item.value)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                  <View style={[
                    styles.checkbox,
                    selectedItems.includes(item.value) ? styles.checkboxSelected : null
                  ]}>
                    {selectedItems.includes(item.value) && (
                      <Check size={16} color="#fff" />
                    )}
                  </View>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.optionsList}
              ListEmptyComponent={
                <View style={styles.emptyList}>
                  <Text style={styles.emptyListText}>No items found</Text>
                </View>
              }
            />
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.doneButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    minHeight: 48,
  },
  selectError: {
    borderColor: '#EF4444',
  },
  selectedItemsContainer: {
    flex: 1,
  },
  placeholderText: {
    color: '#94A3B8',
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    color: '#1E293B',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    margin: 16,
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
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
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#3563E9',
    borderColor: '#3563E9',
  },
  emptyList: {
    padding: 16,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#64748B',
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  doneButton: {
    backgroundColor: '#3563E9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});