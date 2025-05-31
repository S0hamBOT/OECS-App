
export interface University {
  name: string;
  country: string;
  ranking: number;
  website: string;
  minGRE: number;
  minIELTS: number;
  minCGPA: number;
  normalizedScore: number;
  tier?: 'Safe' | 'Moderate' | 'Ambitious';
}

export interface SearchResults {
  studentScore: number;
  universities: University[];
}

export interface FormData {
  gre: string;
  ielts: string;
  cgpa: string;
  country: string;
}

export interface ScoreNormalization {
  normalizedGRE: number;
  normalizedIELTS: number;
  normalizedCGPA: number;
  finalScore: number;
}
