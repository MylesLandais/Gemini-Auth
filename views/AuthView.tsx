import React, { useState } from 'react';
import { SocialButton } from '../components/SocialButton';
import { OnboardingStep, AuthProvider, UserProfile } from '../types';
import { ArrowLeft, Mail, Github, Apple, Chrome } from 'lucide-react';
import { authClient } from '../services/authClient';

interface AuthViewProps {
  setStep: (step: OnboardingStep) => void;
  onComplete: (profile: UserProfile) => void;
  inviteCode: string;
}

export const AuthView: React.FC<AuthViewProps> = ({ setStep, onComplete, inviteCode }) => {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAuth = async (provider: AuthProvider) => {
    setIsLoading(provider);
    
    try {
      if (provider === AuthProvider.EMAIL) {
        // Simulate Email Magic Link Flow
        await authClient.signIn.email({ email: 'user@example.com' });
        
        // In a real magic link flow, the user would close the tab and check email.
        // For this demo, we auto-complete them.
        onComplete({
          name: 'Alpha Tester',
          email: 'user@example.com',
          provider: provider,
          inviteCode: inviteCode
        });
        setStep(OnboardingStep.DASHBOARD);
      } else {
        // Social Flow
        await authClient.signIn.social({ 
          provider: provider as 'google' | 'github' | 'apple',
          callbackURL: '/dashboard'
        });

        // Simulate the callback behavior
        onComplete({
          name: provider === AuthProvider.GITHUB ? 'DevUser_01' : 'Alpha User',
          email: `user@${provider}.com`,
          provider: provider,
          inviteCode: inviteCode
        });
        setStep(OnboardingStep.DASHBOARD);
      }
    } catch (error) {
      console.error("Auth failed", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
       <div className="space-y-2">
         <button 
          onClick={() => setStep(OnboardingStep.INVITE_CODE)}
          className="text-zinc-500 hover:text-zinc-300 flex items-center gap-2 text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>
        <h2 className="text-3xl font-bold text-white">Create Account</h2>
        <p className="text-zinc-400">
          Code <span className="text-indigo-400 font-mono">{inviteCode}</span> verified.
          <br/>Securely authenticate via <span className="text-zinc-300">BetterAuth</span> provider.
        </p>
      </div>

      <div className="space-y-3">
        <SocialButton
          provider="Google"
          icon={<Chrome size={20} />}
          onClick={() => handleAuth(AuthProvider.GOOGLE)}
          disabled={!!isLoading}
        />
        <SocialButton
          provider="GitHub"
          icon={<Github size={20} />}
          onClick={() => handleAuth(AuthProvider.GITHUB)}
          disabled={!!isLoading}
        />
        <SocialButton
          provider="Apple"
          icon={<Apple size={20} />}
          onClick={() => handleAuth(AuthProvider.APPLE)}
          disabled={!!isLoading}
        />
        
        <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#09090b] px-2 text-zinc-500">Or continue with</span>
            </div>
        </div>

        <SocialButton
          provider="Email"
          icon={<Mail size={20} />}
          onClick={() => handleAuth(AuthProvider.EMAIL)}
          disabled={!!isLoading}
        />
      </div>
      
      {isLoading && (
        <div className="text-center text-sm text-zinc-500 animate-pulse flex items-center justify-center gap-2">
           <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
           Connecting to auth server via {isLoading}...
        </div>
      )}
    </div>
  );
};