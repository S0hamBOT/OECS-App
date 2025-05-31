
import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import InputForm from '../components/InputForm';
import ResultsSection from '../components/ResultsSection';
import { University, SearchResults } from '../types';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'hero' | 'form' | 'results'>('hero');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setCurrentStep('form');
  };

  const handleSearchComplete = (results: SearchResults) => {
    setSearchResults(results);
    setCurrentStep('results');
  };

  const handleStartOver = () => {
    setCurrentStep('hero');
    setSearchResults(null);
  };

  return (
    <div className="min-h-screen">
      {currentStep === 'hero' && (
        <HeroSection onGetStarted={handleGetStarted} />
      )}
      
      {currentStep === 'form' && (
        <InputForm 
          onSearchComplete={handleSearchComplete}
          onBack={() => setCurrentStep('hero')}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      
      {currentStep === 'results' && searchResults && (
        <ResultsSection 
          results={searchResults}
          onStartOver={handleStartOver}
          onBack={() => setCurrentStep('form')}
        />
      )}
    </div>
  );
};

export default Index;
