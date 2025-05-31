
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calculator, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { FormData, SearchResults, ScoreNormalization } from '../types';
import { calculateNormalizedScore, searchUniversities } from '../utils/scoreCalculations';
import ScoreVisualization from './ScoreVisualization';
import { toast } from 'sonner';

interface InputFormProps {
  onSearchComplete: (results: SearchResults) => void;
  onBack: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSearchComplete, onBack, isLoading, setIsLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    gre: '',
    ielts: '',
    cgpa: '',
    country: ''
  });

  const [scoreNormalization, setScoreNormalization] = useState<ScoreNormalization | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (formData.gre && formData.ielts && formData.cgpa) {
      try {
        const normalization = calculateNormalizedScore(
          parseFloat(formData.gre),
          parseFloat(formData.ielts),
          parseFloat(formData.cgpa)
        );
        setScoreNormalization(normalization);
      } catch (error) {
        setScoreNormalization(null);
      }
    } else {
      setScoreNormalization(null);
    }
  }, [formData.gre, formData.ielts, formData.cgpa]);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.gre || parseFloat(formData.gre) < 260 || parseFloat(formData.gre) > 340) {
      newErrors.gre = 'GRE score must be between 260-340';
    }

    if (!formData.ielts || parseFloat(formData.ielts) < 0 || parseFloat(formData.ielts) > 9) {
      newErrors.ielts = 'IELTS score must be between 0-9';
    }

    if (!formData.cgpa || parseFloat(formData.cgpa) < 0 || parseFloat(formData.cgpa) > 10) {
      newErrors.cgpa = 'CGPA must be between 0-10';
    }

    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    if (!scoreNormalization) {
      toast.error('Unable to calculate scores. Please check your inputs.');
      return;
    }

    setIsLoading(true);
    
    try {
      const results = await searchUniversities(
        parseFloat(formData.gre),
        parseFloat(formData.ielts),
        parseFloat(formData.cgpa),
        formData.country
      );
      
      toast.success(`Found ${results.universities.length} universities for you!`);
      onSearchComplete(results);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to find universities. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const countries = [
    'USA', 'UK', 'Canada', 'Australia', 'Germany', 'Netherlands', 'Ireland', 'New Zealand'
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-4 hover:bg-white/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
                Enter Your Academic Details
              </h1>
              <p className="text-gray-600 mb-6">
                We'll calculate your normalized score and find the best university matches
              </p>
            </div>
          </div>

          <Card className="glass-card border-0 shadow-2xl mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600" />
                Academic Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="gre">GRE Score *</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>GRE scores range from 260-340.<br />Most students score between 300-320.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="gre"
                      type="number"
                      placeholder="e.g., 315"
                      min="260"
                      max="340"
                      value={formData.gre}
                      onChange={(e) => handleInputChange('gre', e.target.value)}
                      className={`glass ${errors.gre ? 'border-red-500' : ''}`}
                    />
                    <p className="text-xs text-gray-500">Range: 260-340</p>
                    {errors.gre && <p className="text-xs text-red-500">{errors.gre}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="ielts">IELTS Score *</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>IELTS bands go from 0-9.<br />6.5+ is required for most universities.</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="ielts"
                      type="number"
                      step="0.5"
                      placeholder="e.g., 7.5"
                      min="0"
                      max="9"
                      value={formData.ielts}
                      onChange={(e) => handleInputChange('ielts', e.target.value)}
                      className={`glass ${errors.ielts ? 'border-red-500' : ''}`}
                    />
                    <p className="text-xs text-gray-500">Range: 0-9 (bands)</p>
                    {errors.ielts && <p className="text-xs text-red-500">{errors.ielts}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="cgpa">CGPA *</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="w-4 h-4 text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Your cumulative GPA on a 0-10 scale.<br />Most universities prefer 7.0+</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id="cgpa"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 8.5"
                      min="0"
                      max="10"
                      value={formData.cgpa}
                      onChange={(e) => handleInputChange('cgpa', e.target.value)}
                      className={`glass ${errors.cgpa ? 'border-red-500' : ''}`}
                    />
                    <p className="text-xs text-gray-500">Range: 0-10</p>
                    {errors.cgpa && <p className="text-xs text-red-500">{errors.cgpa}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Preferred Country *</Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className={`glass ${errors.country ? 'border-red-500' : ''}`}>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-md">
                        {countries.map((country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && <p className="text-xs text-red-500">{errors.country}</p>}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !scoreNormalization}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? 'Finding Universities...' : 'Find My Universities'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {scoreNormalization && (
            <ScoreVisualization scoreNormalization={scoreNormalization} />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default InputForm;
