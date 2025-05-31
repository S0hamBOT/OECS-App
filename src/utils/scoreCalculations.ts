
import { ScoreNormalization, SearchResults, University } from '../types';

// Score normalization functions (0-100 scale)
const normalizeGRE = (gre: number): number => ((gre - 260) / (340 - 260)) * 100;
const normalizeIELTS = (ielts: number): number => ((ielts - 0) / (9 - 0)) * 100;
const normalizeCGPA = (cgpa: number): number => (cgpa / 10) * 100;

// Country mapping for API compatibility
const countryMapping: Record<string, string> = {
  'USA': 'United States',
  'UK': 'United Kingdom',
  'Canada': 'Canada',
  'Australia': 'Australia',
  'Germany': 'Germany',
  'Netherlands': 'Netherlands',
  'Ireland': 'Ireland',
  'New Zealand': 'New Zealand'
};

// Weighted final score calculation
export const calculateNormalizedScore = (gre: number, ielts: number, cgpa: number): ScoreNormalization => {
  const normalizedGRE = normalizeGRE(gre);
  const normalizedIELTS = normalizeIELTS(ielts);
  const normalizedCGPA = normalizeCGPA(cgpa);
  
  const finalScore = 0.5 * normalizedGRE + 0.3 * normalizedIELTS + 0.2 * normalizedCGPA;
  
  return {
    normalizedGRE,
    normalizedIELTS,
    normalizedCGPA,
    finalScore
  };
};

// Calculate tier based on score difference
const calculateTier = (studentScore: number, universityScore: number): 'Safe' | 'Moderate' | 'Ambitious' => {
  const difference = studentScore - universityScore;
  if (difference > 5) return 'Safe';
  if (difference >= -5) return 'Moderate';
  return 'Ambitious';
};

// Main function to search universities
export const searchUniversities = async (gre: number, ielts: number, cgpa: number, country: string): Promise<SearchResults> => {
  try {
    // Calculate normalized score
    const scoreNormalization = calculateNormalizedScore(gre, ielts, cgpa);
    
    console.log('Searching with normalized score:', scoreNormalization.finalScore);
    
    // Map country to full name expected by API
    const fullCountryName = countryMapping[country] || country;
    
    // Call the API with the correct field name the API expects
    const response = await fetch('https://college-api-0qgk.onrender.com/find-colleges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: fullCountryName,
        overall_normalised_score: scoreNormalization.finalScore
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    // Check if we have results
    if (!data.results || !data.results.colleges || data.results.colleges.length === 0) {
      throw new Error('No universities found for your criteria. Try adjusting your scores or selecting a different country.');
    }
    
    // Calculate tiers for each university
    const universitiesWithTiers: University[] = data.results.colleges.map((uni: any) => ({
      name: uni.name,
      country: uni.country,
      ranking: uni.ranking,
      website: uni.website,
      minGRE: uni.minGRE,
      minIELTS: uni.minIELTS,
      minCGPA: uni.minCGPA,
      normalizedScore: uni.normalizedScore,
      tier: calculateTier(scoreNormalization.finalScore, uni.normalizedScore)
    }));
    
    // Sort by ranking
    universitiesWithTiers.sort((a, b) => a.ranking - b.ranking);
    
    return {
      studentScore: scoreNormalization.finalScore,
      universities: universitiesWithTiers
    };
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to search universities. Please check your connection and try again.');
  }
};
