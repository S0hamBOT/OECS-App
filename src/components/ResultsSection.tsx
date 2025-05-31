import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink, RefreshCw, Trophy, Target, Rocket, Globe } from 'lucide-react';
import { SearchResults, University } from '../types';

interface ResultsSectionProps {
  results: SearchResults;
  onStartOver: () => void;
  onBack: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results, onStartOver, onBack }) => {
  const [filter, setFilter] = useState<'all' | 'Dream' | 'Competitive' | 'Safe'>('all');

  // Categorize universities based on ranking
  const categorizeUniversity = (ranking: number): 'Dream' | 'Competitive' | 'Safe' => {
    if (ranking >= 1 && ranking <= 40) return 'Dream';
    if (ranking >= 41 && ranking <= 120) return 'Competitive';
    return 'Safe'; // 121-200 and beyond
  };

  // Add category to universities
  const universitiesWithCategories = results.universities.map(uni => ({
    ...uni,
    category: categorizeUniversity(uni.ranking)
  }));

  const filteredUniversities = filter === 'all' 
    ? universitiesWithCategories 
    : universitiesWithCategories.filter(uni => uni.category === filter);

  const getTierIcon = (category: string) => {
    switch (category) {
      case 'Dream': return <Rocket className="w-4 h-4" />;
      case 'Competitive': return <Trophy className="w-4 h-4" />;
      case 'Safe': return <Target className="w-4 h-4" />;
      default: return null;
    }
  };

  const getTierColor = (category: string) => {
    switch (category) {
      case 'Dream': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'Competitive': return 'moderate-tier';
      case 'Safe': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryCount = (category: 'Dream' | 'Competitive' | 'Safe') => {
    return universitiesWithCategories.filter(uni => uni.category === category).length;
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>
          
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Your University Matches
            </h1>
            <p className="text-gray-600 mb-2">
              Found {results.universities.length} universities based on your profile
            </p>
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <span className="text-sm font-medium">Your Score:</span>
              <span className="text-lg font-bold text-blue-600">
                {results.studentScore.toFixed(1)}/100
              </span>
            </div>
          </div>

          {/* Category Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="glass-card h-auto p-4 justify-start"
            >
              <div className="text-left">
                <div className="text-lg font-bold">{results.universities.length}</div>
                <div className="text-sm">All Universities</div>
              </div>
            </Button>
            
            <Button
              variant={filter === 'Dream' ? 'default' : 'outline'}
              onClick={() => setFilter('Dream')}
              className="glass-card h-auto p-4 justify-start bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600"
            >
              <Rocket className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="text-lg font-bold">{getCategoryCount('Dream')}</div>
                <div className="text-sm">Dream Universities</div>
              </div>
            </Button>
            
            <Button
              variant={filter === 'Competitive' ? 'default' : 'outline'}
              onClick={() => setFilter('Competitive')}
              className="glass-card h-auto p-4 justify-start moderate-tier"
            >
              <Trophy className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="text-lg font-bold">{getCategoryCount('Competitive')}</div>
                <div className="text-sm">Competitive Universities</div>
              </div>
            </Button>
            
            <Button
              variant={filter === 'Safe' ? 'default' : 'outline'}
              onClick={() => setFilter('Safe')}
              className="glass-card h-auto p-4 justify-start bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
            >
              <Target className="w-5 h-5 mr-3" />
              <div className="text-left">
                <div className="text-lg font-bold">{getCategoryCount('Safe')}</div>
                <div className="text-sm">Safe Universities</div>
              </div>
            </Button>
          </div>
        </div>

        {/* University List */}
        <div className="grid gap-6">
          {filteredUniversities.map((university, index) => (
            <Card key={`${university.name}-${index}`} className="glass-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2 flex items-center gap-3">
                      <span>{university.name}</span>
                      <Badge className={`${getTierColor(university.category)} text-xs`}>
                        {getTierIcon(university.category)}
                        <span className="ml-1">{university.category}</span>
                      </Badge>
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {university.country}
                      </div>
                      <div className="flex items-center gap-1">
                        <Trophy className="w-4 h-4" />
                        Rank #{university.ranking}
                      </div>
                    </div>
                  </div>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="glass hover:bg-white/70"
                  >
                    <a 
                      href={university.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      Visit
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Requirements</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Min GRE:</span>
                        <span className="font-medium">{university.minGRE}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min IELTS:</span>
                        <span className="font-medium">{university.minIELTS}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min CGPA:</span>
                        <span className="font-medium">{university.minCGPA}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Score Comparison</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>University Score:</span>
                        <span className="font-medium">{university.normalizedScore.toFixed(1)}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Your Score:</span>
                        <span className="font-medium text-blue-600">{results.studentScore.toFixed(1)}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Difference:</span>
                        <span className={`font-medium ${(results.studentScore - university.normalizedScore) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {(results.studentScore - university.normalizedScore) >= 0 ? '+' : ''}{(results.studentScore - university.normalizedScore).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center py-12">
            <div className="glass-card p-8 rounded-2xl max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-4">No universities found in this category</h3>
              <p className="text-gray-600 mb-4">Try viewing all results or adjusting your search criteria.</p>
              <Button onClick={() => setFilter('all')} variant="outline">
                View All Results
              </Button>
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <Button 
            onClick={onStartOver}
            variant="outline"
            className="glass-card hover:bg-white/70"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Start New Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;