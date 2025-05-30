import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowRight, GraduationCap, BookOpen, Globe, User } from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.titleText}>UniGuide</Text>
          <Text style={styles.subtitleText}>
            Your pathway to studying abroad
          </Text>
        </View>

        <View style={styles.heroContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg' }} 
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroText}>Find your perfect university match</Text>
            <TouchableOpacity 
              style={styles.heroButton}
              onPress={() => router.push('/student-form')}
            >
              <Text style={styles.heroButtonText}>Get Started</Text>
              <ArrowRight size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>How It Works</Text>
        
        <View style={styles.stepsContainer}>
          <View style={styles.stepCard}>
            <View style={styles.stepIconContainer}>
              <User size={24} color="#3563E9" />
            </View>
            <Text style={styles.stepTitle}>1. Profile</Text>
            <Text style={styles.stepDescription}>
              Fill in your academic details and preferences
            </Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepIconContainer}>
              <BookOpen size={24} color="#3563E9" />
            </View>
            <Text style={styles.stepTitle}>2. Match</Text>
            <Text style={styles.stepDescription}>
              Our algorithm finds universities that match your profile
            </Text>
          </View>

          <View style={styles.stepCard}>
            <View style={styles.stepIconContainer}>
              <GraduationCap size={24} color="#3563E9" />
            </View>
            <Text style={styles.stepTitle}>3. Apply</Text>
            <Text style={styles.stepDescription}>
              Get guidance on application process for chosen universities
            </Text>
          </View>
        </View>

        <View style={styles.ctaContainer}>
          <Text style={styles.ctaTitle}>Ready to start your journey?</Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push('/student-form')}
          >
            <Text style={styles.ctaButtonText}>Create Your Profile</Text>
          </TouchableOpacity>
        </View>
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
  welcomeText: {
    fontSize: 18,
    color: '#64748B',
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3563E9',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: '#64748B',
  },
  heroContainer: {
    position: 'relative',
    height: 220,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    padding: 20,
  },
  heroText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3563E9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  stepsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 32,
  },
  stepCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stepIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  ctaContainer: {
    backgroundColor: '#EFF6FF',
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#3563E9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});