import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, ExternalLink } from 'lucide-react-native';
import { useStudentContext } from '../../context/StudentContext';
import { UniversityCard } from '../../components/UniversityCard';
import { useEffect, useState } from 'react';
import { getRecommendedUniversities } from '../../utils/recommendationLogic';

export default function UniversitiesScreen() {
  const { studentInfo, hasCompletedForm } = useStudentContext();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hasCompletedForm) {
      // Simulate API call with a slight delay
      setLoading(true);
      setTimeout(() => {
        const recommendations = getRecommendedUniversities(studentInfo);
        setUniversities(recommendations);
        setLoading(false);
      }, 1500);
    } else {
      setLoading(false);
    }
  }, [hasCompletedForm, studentInfo]);

  if (!hasCompletedForm) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Universities</Text>
          <Text style={styles.subtitleText}>
            Discover universities that match your profile
          </Text>
        </View>

        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>Complete Your Profile First</Text>
          <Text style={styles.emptyStateDescription}>
            We need to know more about you to recommend suitable universities.
          </Text>
          <TouchableOpacity 
            style={styles.createProfileButton}
            onPress={() => router.push('/student-form')}
          >
            <Text style={styles.createProfileButtonText}>Create Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titleText}>Recommended Universities</Text>
        <Text style={styles.subtitleText}>
          Based on your academic profile and preferences
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3563E9" />
          <Text style={styles.loadingText}>Finding the best matches for you...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={universities}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <UniversityCard university={item} />}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>No universities found matching your criteria.</Text>
                <TouchableOpacity 
                  style={styles.updateButton}
                  onPress={() => router.push('/student-form')}
                >
                  <Text style={styles.updateButtonText}>Update Preferences</Text>
                </TouchableOpacity>
              </View>
            }
          />

          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.footerButton}
              onPress={() => router.push('/student-form')}
            >
              <ArrowLeft size={16} color="#3563E9" />
              <Text style={styles.footerButtonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
  },
  createProfileButton: {
    backgroundColor: '#3563E9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  createProfileButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyListContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
  },
  updateButton: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  updateButtonText: {
    color: '#3563E9',
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#3563E9',
  },
});