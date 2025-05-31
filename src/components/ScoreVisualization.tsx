
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp } from 'lucide-react';
import { ScoreNormalization } from '../types';

interface ScoreVisualizationProps {
  scoreNormalization: ScoreNormalization;
}

const ScoreVisualization: React.FC<ScoreVisualizationProps> = ({ scoreNormalization }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="glass-card border-0 shadow-xl animate-scale-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Your Normalized Score Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className={`text-4xl font-bold ${getScoreColor(scoreNormalization.finalScore)} mb-2`}>
            {scoreNormalization.finalScore.toFixed(1)}
          </div>
          <p className="text-gray-600">Overall Competitiveness Score</p>
          <div className="mt-4">
            <Progress 
              value={scoreNormalization.finalScore} 
              className="h-3 bg-gray-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-gray-600">GRE (50%)</p>
            <div className={`text-2xl font-bold ${getScoreColor(scoreNormalization.normalizedGRE)}`}>
              {scoreNormalization.normalizedGRE.toFixed(1)}
            </div>
            <Progress 
              value={scoreNormalization.normalizedGRE} 
              className="h-2"
            />
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-gray-600">IELTS (30%)</p>
            <div className={`text-2xl font-bold ${getScoreColor(scoreNormalization.normalizedIELTS)}`}>
              {scoreNormalization.normalizedIELTS.toFixed(1)}
            </div>
            <Progress 
              value={scoreNormalization.normalizedIELTS} 
              className="h-2"
            />
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-gray-600">CGPA (20%)</p>
            <div className={`text-2xl font-bold ${getScoreColor(scoreNormalization.normalizedCGPA)}`}>
              {scoreNormalization.normalizedCGPA.toFixed(1)}
            </div>
            <Progress 
              value={scoreNormalization.normalizedCGPA} 
              className="h-2"
            />
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Score Interpretation</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>80-100:</span>
              <span className="text-green-600 font-medium">Excellent - Target top universities</span>
            </div>
            <div className="flex justify-between">
              <span>60-79:</span>
              <span className="text-yellow-600 font-medium">Good - Solid range of options</span>
            </div>
            <div className="flex justify-between">
              <span>40-59:</span>
              <span className="text-orange-600 font-medium">Fair - Focus on improvement</span>
            </div>
            <div className="flex justify-between">
              <span>0-39:</span>
              <span className="text-red-600 font-medium">Needs work - Consider test prep</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreVisualization;
