import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { OnboardingStep } from '../types';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

interface WaitlistViewProps {
  setStep: (step: OnboardingStep) => void;
}

export const WaitlistView: React.FC<WaitlistViewProps> = ({ setStep }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6 max-w-md mx-auto animate-fade-in">
        <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white">Request Received</h2>
        <p className="text-zinc-400">
          We have encrypted your request for <span className="text-zinc-100 font-medium">{email}</span>. 
          If you are selected for the stealth cohort, we will contact you via a secure channel.
        </p>
        <Button variant="outline" onClick={() => setStep(OnboardingStep.LANDING)}>
          Return to Shadows
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2">
         <button 
          onClick={() => setStep(OnboardingStep.LANDING)}
          className="text-zinc-500 hover:text-zinc-300 flex items-center gap-2 text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <h2 className="text-3xl font-bold text-white">Request Clearance</h2>
        <p className="text-zinc-400">
          System Nebula is in stealth. We are only onboarding friends and trusted testers at this time.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          label="Email Address"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail size={18} />}
          required
        />
        <Button 
          type="submit" 
          fullWidth 
          isLoading={isLoading}
          disabled={!email.includes('@')}
        >
          Request Access
        </Button>
      </form>
    </div>
  );
};