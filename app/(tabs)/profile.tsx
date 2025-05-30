import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowRight, CreditCard as Edit, Building, GraduationCap, Award, User } from 'lucide-react-native';
import { useStudentContext } from '../../context/StudentContext';

export default function ProfileScreen() {
  const { studentInfo, hasCompletedForm } = useStudentContext();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Your Profile</Text>
          <Text style={styles.subtitleText}>
            {hasCompletedForm 
              ? "View and manage your academic information" 
              : "Complete your profile to get university recommendations"}
          </Text>
        </View>

        {hasCompletedForm ? (
          <View style={styles.profileContainer}>
            <View style={styles.profileCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Academic Information</Text>
                <TouchableOpacity
                  onPress={() => router.push('/student-form')}
                  style={styles.editButton}
                >
                  <Edit size={16} color="#3563E9" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <Award size={18} color="#3563E9" />
                </View>
                <View>
                  <Text style={styles.infoLabel}>GRE Score</Text>
                  <Text style={styles.infoValue}>{studentInfo.greScore || 'Not provided'}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <GraduationCap size={18} color="#3563E9" />
                </View>
                <View>
                  <Text style={styles.infoLabel}>IELTS Score</Text>
                  <Text style={styles.infoValue}>{studentInfo.ieltsScore || 'Not provided'}</Text>
                </View>
              </View>

              <View style={styles.infoRow}>
                <View style={styles.infoIconContainer}>
                  <Building size={18} color="#3563E9" />
                </View>
                <View>
                  <Text style={styles.infoLabel}>Reason for Studying</Text>
                  <Text style={styles.infoValue}>{studentInfo.reasonForStudying || 'Not provided'}</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Preferred Countries</Text>
              <View style={styles.tagsContainer}>
                {studentInfo.preferredCountries && studentInfo.preferredCountries.length > 0 ? (
                  studentInfo.preferredCountries.map((country, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{country}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No countries selected</Text>
                )}
              </View>

              <Text style={styles.sectionTitle}>Preferred Universities</Text>
              <View style={styles.tagsContainer}>
                {studentInfo.preferredUniversities && studentInfo.preferredUniversities.length > 0 ? (
                  studentInfo.preferredUniversities.map((university, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{university}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.emptyText}>No universities selected</Text>
                )}
              </View>
            </View>

            <TouchableOpacity 
              style={styles.recommendationButton}
              onPress={() => router.push('/universities')}
            >
              <Text style={styles.recommendationButtonText}>View Recommendations</Text>
              <ArrowRight size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateIconContainer}>
              <User size={40} color="#3563E9" />
            </View>
            <Text style={styles.emptyStateTitle}>Complete Your Profile</Text>
            <Text style={styles.emptyStateDescription}>
              Fill in your academic details and preferences to get personalized university recommendations
            </Text>
            <TouchableOpacity 
              style={styles.createProfileButton}
              onPress={() => router.push('/student-form')}
            >
              <Text style={styles.createProfileButtonText}>Create Profile</Text>
              <ArrowRight size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#64748B',
  },
  profileContainer: {
    padding: 20,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#3563E9',
    fontSize: 14,
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 14,
    fontStyle: 'italic',
  },
  recommendationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3563E9',
    paddingVertical: 14,
    borderRadius: 10,
  },
  recommendationButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  emptyStateContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  emptyStateIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    lineHeight: 24,
  },
  createProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3563E9',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  createProfileButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
});