
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, Globe, Star } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="glass-card p-4 rounded-full">
              <GraduationCap className="w-16 h-16 text-blue-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your
            <span className="gradient-text block mt-2">
              Dream University Abroad
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Turn your GRE, IELTS, and CGPA scores into personalized university recommendations. 
            Find institutions that want students like you.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <Globe className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">200+ Universities</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">Smart Matching</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-full">
              <GraduationCap className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Free Analysis</span>
            </div>
          </div>

          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Find My Universities
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <p className="text-sm text-gray-500 mt-4">
            No signup required • Results in under 30 seconds
          </p>
        </div>

        <div className="mt-16 animate-slide-up">
          <div className="glass-card p-8 rounded-3xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 gradient-text">
              How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-blue-600">1</span>
                </div>
                <h4 className="font-semibold mb-2">Enter Your Scores</h4>
                <p className="text-sm text-gray-600">Share your GRE, IELTS, CGPA and country preference</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-purple-600">2</span>
                </div>
                <h4 className="font-semibold mb-2">AI Analysis</h4>
                <p className="text-sm text-gray-600">Our algorithm matches you with suitable universities</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-green-600">3</span>
                </div>
                <h4 className="font-semibold mb-2">Get Results</h4>
                <p className="text-sm text-gray-600">Receive categorized recommendations: Safe, Moderate, Ambitious</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
