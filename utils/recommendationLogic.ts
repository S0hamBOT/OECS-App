import { universityData } from '../data/universityData';

interface StudentInfo {
  greScore: string;
  ieltsScore: string;
  reasonForStudying: string;
  preferredCountries: string[];
  preferredUniversities: string[];
}

export const getRecommendedUniversities = (studentInfo: StudentInfo) => {
  // Create a deep copy of university data to avoid modifying the original
  const universities = JSON.parse(JSON.stringify(universityData));
  
  // Convert student scores to numbers
  const greScore = Number(studentInfo.greScore);
  const ieltsScore = Number(studentInfo.ieltsScore);
  
  // Calculate match scores for each university
  universities.forEach(university => {
    let score = 0;
    
    // GRE score match (max 0.3)
    if (greScore >= university.eligibility.minGRE) {
      // Full score if exceeds minimum by 10 or more
      if (greScore >= university.eligibility.minGRE + 10) {
        score += 0.3;
      } else {
        // Partial score based on how close to minimum + 10
        score += 0.15 + 0.15 * ((greScore - university.eligibility.minGRE) / 10);
      }
    } else {
      // Partial score if within 10 points of minimum
      if (greScore >= university.eligibility.minGRE - 10) {
        score += 0.15 * (1 - (university.eligibility.minGRE - greScore) / 10);
      }
    }
    
    // IELTS score match (max 0.3)
    if (ieltsScore >= university.eligibility.minIELTS) {
      // Full score if exceeds minimum by 1 or more
      if (ieltsScore >= university.eligibility.minIELTS + 1) {
        score += 0.3;
      } else {
        // Partial score based on how close to minimum + 1
        score += 0.15 + 0.15 * ((ieltsScore - university.eligibility.minIELTS) / 1);
      }
    } else {
      // Partial score if within 1 point of minimum
      if (ieltsScore >= university.eligibility.minIELTS - 1) {
        score += 0.15 * (1 - (university.eligibility.minIELTS - ieltsScore) / 1);
      }
    }
    
    // Country preference match (max 0.2)
    const countryMatch = studentInfo.preferredCountries.includes(university.country);
    if (countryMatch) {
      score += 0.2;
    }
    
    // University preference match (max 0.2)
    const universityMatch = studentInfo.preferredUniversities.some(
      prefUni => university.name.includes(prefUni)
    );
    if (universityMatch) {
      score += 0.2;
    }
    
    // University ranking bonus (max 0.1)
    // Higher ranking (lower number) gets higher score
    score += 0.1 * (1 - Math.min(university.ranking, 100) / 100);
    
    university.matchScore = score;
  });
  
  // Sort universities by match score (descending)
  return universities
    .sort((a, b) => b.matchScore - a.matchScore)
    .filter(university => university.matchScore > 0);
};