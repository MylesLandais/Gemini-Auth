import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { OnboardingStep } from '../types';
import { ArrowLeft, Key, Lock } from 'lucide-react';

interface InviteCodeViewProps {
  setStep: (step: OnboardingStep) => void;
  setInviteCode: (code: string) => void;
}

export const InviteCodeView: React.FC<InviteCodeViewProps> = ({ setStep, setInviteCode }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    
    setIsLoading(true);
    setError('');

    // Simulate validation
    // Mock valid code: anything starting with "ALPHA"
    setTimeout(() => {
      setIsLoading(false);
      if (code.toUpperCase().startsWith('ALPHA')) {
        setInviteCode(code.toUpperCase());
        setStep(OnboardingStep.AUTH_SELECTION);
      } else {
        setError('Invalid invite code. Please try again.');
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
       <div className="space-y-2">
         <button 
          onClick={() => setStep(OnboardingStep.LANDING)}
          className="text-zinc-500 hover:text-zinc-300 flex items-center gap-2 text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <h2 className="text-3xl font-bold text-white">Enter Invite Code</h2>
        <p className="text-zinc-400">
          Please enter the secure alpha access code sent to your email.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Access Code"
          placeholder="ALPHA-XXXX-XXXX"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          icon={<Key size={18} />}
          error={error}
          autoFocus
        />
        
        <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 flex gap-3">
            <Lock size={20} className="text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-500">
                Codes are single-use and tied to your identity once redeemed. 
                Do not share your code with others.
            </p>
        </div>

        <Button 
          type="submit" 
          fullWidth 
          isLoading={isLoading}
          disabled={code.length < 5}
        >
          Verify Code
        </Button>
      </form>
    </div>
  );
};