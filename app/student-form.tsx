import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, X, Check, ChevronDown } from 'lucide-react-native';
import { Dropdown } from '../components/Dropdown';
import { MultiSelect } from '../components/MultiSelect';
import { useStudentContext } from '../context/StudentContext';
import { countries, universities, studyReasons } from '../data/formData';

export default function StudentFormScreen() {
  const { studentInfo, updateStudentInfo, completeForm } = useStudentContext();
  
  const [formData, setFormData] = useState({
    greScore: studentInfo.greScore || '',
    ieltsScore: studentInfo.ieltsScore || '',
    reasonForStudying: studentInfo.reasonForStudying || '',
    preferredCountries: studentInfo.preferredCountries || [],
    preferredUniversities: studentInfo.preferredUniversities || [],
  });
  
  const [errors, setErrors] = useState({
    greScore: '',
    ieltsScore: '',
    reasonForStudying: '',
    preferredCountries: '',
  });
  
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      greScore: '',
      ieltsScore: '',
      reasonForStudying: '',
      preferredCountries: '',
    };
    
    // Validate GRE score
    if (!formData.greScore) {
      newErrors.greScore = 'GRE score is required';
      isValid = false;
    } else if (isNaN(Number(formData.greScore)) || Number(formData.greScore) < 260 || Number(formData.greScore) > 340) {
      newErrors.greScore = 'GRE score must be between 260-340';
      isValid = false;
    }
    
    // Validate IELTS score
    if (!formData.ieltsScore) {
      newErrors.ieltsScore = 'IELTS score is required';
      isValid = false;
    } else if (isNaN(Number(formData.ieltsScore)) || Number(formData.ieltsScore) < 1 || Number(formData.ieltsScore) > 9) {
      newErrors.ieltsScore = 'IELTS score must be between 1-9';
      isValid = false;
    }
    
    // Validate reason for studying
    if (!formData.reasonForStudying) {
      newErrors.reasonForStudying = 'Please select a reason';
      isValid = false;
    }
    
    // Validate preferred countries
    if (formData.preferredCountries.length === 0) {
      newErrors.preferredCountries = 'Please select at least one country';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleSubmit = () => {
    if (validateForm()) {
      updateStudentInfo(formData);
      completeForm();
      router.push('/universities');
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Student Profile</Text>
          <View style={styles.backButton} />
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Academic Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>GRE Score</Text>
            <TextInput
              style={[styles.input, errors.greScore ? styles.inputError : null]}
              placeholder="Enter your GRE score (260-340)"
              value={formData.greScore}
              onChangeText={(text) => setFormData({ ...formData, greScore: text })}
              keyboardType="numeric"
            />
            {errors.greScore ? <Text style={styles.errorText}>{errors.greScore}</Text> : null}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>IELTS Score</Text>
            <TextInput
              style={[styles.input, errors.ieltsScore ? styles.inputError : null]}
              placeholder="Enter your IELTS score (1-9)"
              value={formData.ieltsScore}
              onChangeText={(text) => setFormData({ ...formData, ieltsScore: text })}
              keyboardType="numeric"
            />
            {errors.ieltsScore ? <Text style={styles.errorText}>{errors.ieltsScore}</Text> : null}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Reason for Studying Abroad</Text>
            <Dropdown
              placeholder="Select a reason"
              items={studyReasons}
              selectedValue={formData.reasonForStudying}
              onValueChange={(value) => setFormData({ ...formData, reasonForStudying: value })}
              error={errors.reasonForStudying}
            />
            {errors.reasonForStudying ? <Text style={styles.errorText}>{errors.reasonForStudying}</Text> : null}
          </View>
          
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Preferred Countries</Text>
            <MultiSelect
              items={countries}
              selectedItems={formData.preferredCountries}
              onSelectedItemsChange={(selectedItems) => 
                setFormData({ ...formData, preferredCountries: selectedItems })
              }
              placeholder="Select countries"
              error={errors.preferredCountries}
            />
            {errors.preferredCountries ? <Text style={styles.errorText}>{errors.preferredCountries}</Text> : null}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Preferred Universities (Optional)</Text>
            <MultiSelect
              items={universities}
              selectedItems={formData.preferredUniversities}
              onSelectedItemsChange={(selectedItems) => 
                setFormData({ ...formData, preferredUniversities: selectedItems })
              }
              placeholder="Select universities (optional)"
            />
          </View>
          
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Get Recommendations</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#3563E9',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});