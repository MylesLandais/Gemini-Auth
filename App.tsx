import React, { useState, useEffect } from 'react';
import { OnboardingStep, UserProfile } from './types';
import { LandingView } from './views/LandingView';
import { WaitlistView } from './views/WaitlistView';
import { InviteCodeView } from './views/InviteCodeView';
import { AuthView } from './views/AuthView';
import { DashboardView } from './views/DashboardView';
import { Hexagon } from 'lucide-react';
import { authClient } from './services/authClient';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.LANDING);
  const [inviteCode, setInviteCode] = useState<string>('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await authClient.getSession();
        if (result?.data?.user) {
          setUserProfile(result.data.user);
          setInviteCode(result.data.user.inviteCode || 'SESSION_RESTORED');
          setCurrentStep(OnboardingStep.DASHBOARD);
        }
      } catch (e) {
        console.log("No active session found");
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  const renderStep = () => {
    switch (currentStep) {
      case OnboardingStep.LANDING:
        return <LandingView setStep={setCurrentStep} />;
      case OnboardingStep.WAITLIST:
        return <WaitlistView setStep={setCurrentStep} />;
      case OnboardingStep.INVITE_CODE:
        return <InviteCodeView setStep={setCurrentStep} setInviteCode={setInviteCode} />;
      case OnboardingStep.AUTH_SELECTION:
        return (
          <AuthView 
            setStep={setCurrentStep} 
            inviteCode={inviteCode} 
            onComplete={(profile) => {
              setUserProfile(profile);
            }} 
          />
        );
      case OnboardingStep.DASHBOARD:
        return userProfile ? <DashboardView user={userProfile} /> : null;
      default:
        return <LandingView setStep={setCurrentStep} />;
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-zinc-500">
        <div className="flex flex-col items-center space-y-4">
           <Hexagon className="text-zinc-700 animate-spin" size={32} />
           <p className="text-sm font-mono tracking-wider">INITIALIZING STEALTH PROTOCOLS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[100px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[100px]"></div>
      </div>

      {/* Top Navigation / Logo */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div className="flex items-center space-x-2 text-white">
           <Hexagon className="text-indigo-500 fill-indigo-500/20" size={32} strokeWidth={1.5} />
           <span className="font-bold text-xl tracking-tight uppercase">System Nebula</span>
        </div>
        {currentStep !== OnboardingStep.DASHBOARD && currentStep !== OnboardingStep.LANDING && (
           <div className="hidden sm:flex space-x-2">
              <div className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${currentStep === OnboardingStep.WAITLIST ? 'bg-indigo-500' : 'bg-zinc-800'}`}></div>
              <div className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${currentStep === OnboardingStep.INVITE_CODE ? 'bg-indigo-500' : 'bg-zinc-800'}`}></div>
              <div className={`h-1.5 w-8 rounded-full transition-colors duration-300 ${currentStep === OnboardingStep.AUTH_SELECTION ? 'bg-indigo-500' : 'bg-zinc-800'}`}></div>
           </div>
        )}
      </div>

      {/* Main Content Container */}
      <main className="w-full max-w-5xl z-10 flex flex-col items-center justify-center min-h-[60vh]">
        {renderStep()}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-zinc-700 text-xs text-center w-full">
        <p>&copy; 2024 System Nebula. Stealth Mode Active. Unauthorized access prohibited.</p>
      </footer>
    </div>
  );
};

export default App;