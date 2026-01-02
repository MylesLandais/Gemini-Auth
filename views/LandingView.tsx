import React from 'react';
import { Button } from '../components/Button';
import { OnboardingStep } from '../types';

interface LandingViewProps {
  setStep: (step: OnboardingStep) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ setStep }) => {
  return (
    <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-medium uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
          Stealth Mode: Active
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Nebula</span>
        </h1>
        <p className="text-xl text-zinc-400 leading-relaxed max-w-lg mx-auto">
          We are currently building in the shadows. Access is restricted to friends and trusted allies for confidential testing.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-8">
        <Button 
          variant="primary" 
          onClick={() => setStep(OnboardingStep.WAITLIST)}
          className="sm:min-w-[200px]"
        >
          Request Clearance
        </Button>
        <Button 
          variant="secondary" 
          onClick={() => setStep(OnboardingStep.INVITE_CODE)}
          className="sm:min-w-[200px]"
        >
          Enter Key
        </Button>
      </div>
      
      <div className="pt-12 flex gap-8 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
         {/* Mock trusted logos */}
         <div className="h-8 w-24 bg-zinc-800/50 rounded animate-pulse"></div>
         <div className="h-8 w-24 bg-zinc-800/50 rounded animate-pulse delay-75"></div>
         <div className="h-8 w-24 bg-zinc-800/50 rounded animate-pulse delay-150"></div>
      </div>
    </div>
  );
};