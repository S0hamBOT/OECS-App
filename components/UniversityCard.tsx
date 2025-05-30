import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { ExternalLink, MapPin, Trophy, GraduationCap, Check } from 'lucide-react-native';

interface University {
  id: number;
  name: string;
  location: string;
  country: string;
  ranking: number;
  website: string;
  image: string;
  eligibility: {
    minGRE: number;
    minIELTS: number;
  };
  programs: string[];
  matchScore: number;
}

interface UniversityCardProps {
  university: University;
}

export const UniversityCard: React.FC<UniversityCardProps> = ({ university }) => {
  const openWebsite = () => {
    Linking.openURL(university.website);
  };
  
  // Calculate match percentage for visual indicator
  const matchPercentage = Math.min(100, Math.round(university.matchScore * 100));
  
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: university.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.matchBadge}>
          <Text style={styles.matchText}>{matchPercentage}% Match</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{university.name}</Text>
        
        <View style={styles.infoRow}>
          <MapPin size={16} color="#64748B" style={styles.infoIcon} />
          <Text style={styles.location}>{university.location}, {university.country}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Trophy size={16} color="#64748B" style={styles.infoIcon} />
          <Text style={styles.ranking}>Ranking: #{university.ranking} Worldwide</Text>
        </View>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Eligibility Requirements</Text>
        
        <View style={styles.requirementsContainer}>
          <View style={styles.requirement}>
            <Text style={styles.requirementLabel}>GRE</Text>
            <Text style={styles.requirementValue}>{university.eligibility.minGRE}+</Text>
          </View>
          
          <View style={styles.requirement}>
            <Text style={styles.requirementLabel}>IELTS</Text>
            <Text style={styles.requirementValue}>{university.eligibility.minIELTS}+</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>Available Programs</Text>
        
        <View style={styles.programsContainer}>
          {university.programs.slice(0, 3).map((program, index) => (
            <View key={index} style={styles.programItem}>
              <Check size={16} color="#3563E9" style={styles.programIcon} />
              <Text style={styles.programText}>{program}</Text>
            </View>
          ))}
          {university.programs.length > 3 && (
            <Text style={styles.morePrograms}>+{university.programs.length - 3} more</Text>
          )}
        </View>
        
        <TouchableOpacity style={styles.websiteButton} onPress={openWebsite}>
          <Text style={styles.websiteButtonText}>Visit Website</Text>
          <ExternalLink size={16} color="#3563E9" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  matchBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#3563E9',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  matchText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoIcon: {
    marginRight: 8,
  },
  location: {
    fontSize: 14,
    color: '#64748B',
  },
  ranking: {
    fontSize: 14,
    color: '#64748B',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  requirementsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  requirement: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  requirementLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  requirementValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  programsContainer: {
    marginBottom: 16,
  },
  programItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  programIcon: {
    marginRight: 8,
  },
  programText: {
    fontSize: 14,
    color: '#475569',
  },
  morePrograms: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 24,
    fontStyle: 'italic',
  },
  websiteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
  },
  websiteButtonText: {
    color: '#3563E9',
    fontWeight: '600',
    marginRight: 8,
  },
});