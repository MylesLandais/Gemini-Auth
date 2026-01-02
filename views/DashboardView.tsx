import React, { useEffect, useState } from 'react';
import { UserProfile, GenerateWelcomeResponse } from '../types';
import { generateWelcomeMessage } from '../services/geminiService';
import { Terminal, Shield, Cpu, Activity } from 'lucide-react';

interface DashboardViewProps {
  user: UserProfile;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ user }) => {
  const [welcomeData, setWelcomeData] = useState<GenerateWelcomeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchWelcome = async () => {
      try {
        const data = await generateWelcomeMessage(user.name || 'User', user.provider || 'Unknown');
        if (mounted) {
          setWelcomeData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchWelcome();

    return () => { mounted = false; };
  }, [user]);

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center space-x-4">
            <div className="p-2 bg-indigo-500/10 rounded-md text-indigo-400">
                <Shield size={24} />
            </div>
            <div>
                <p className="text-xs text-zinc-500 uppercase">Clearance</p>
                <p className="text-lg font-bold text-white">Stealth-Ops</p>
            </div>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center space-x-4">
             <div className="p-2 bg-purple-500/10 rounded-md text-purple-400">
                <Cpu size={24} />
            </div>
            <div>
                <p className="text-xs text-zinc-500 uppercase">System Status</p>
                <p className="text-lg font-bold text-white">Stealth Active</p>
            </div>
        </div>
        <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg flex items-center space-x-4">
             <div className="p-2 bg-emerald-500/10 rounded-md text-emerald-400">
                <Activity size={24} />
            </div>
            <div>
                <p className="text-xs text-zinc-500 uppercase">Session ID</p>
                <p className="text-lg font-bold text-white text-ellipsis overflow-hidden">
                    {user.inviteCode?.substring(0, 8)}...
                </p>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="glass-panel rounded-xl p-8 space-y-8 relative overflow-hidden">
        
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 z-0 opacity-5" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}>
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <Terminal className="text-indigo-400" />
            <h2 className="text-xl font-mono text-indigo-400">PROJECT_BRIEF</h2>
          </div>

          {loading ? (
             <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-zinc-700/50 rounded w-3/4"></div>
                <div className="h-4 bg-zinc-700/50 rounded w-1/2"></div>
                <div className="h-4 bg-zinc-700/50 rounded w-5/6"></div>
             </div>
          ) : (
            <div className="space-y-6">
               <div className="border-l-2 border-indigo-500 pl-4 py-2">
                 <p className="text-xs text-zinc-500 uppercase mb-1">Designated Role</p>
                 <p className="text-2xl font-bold text-white tracking-wide">{welcomeData?.role || 'Recruit'}</p>
               </div>
               
               <p className="text-lg text-zinc-300 leading-relaxed font-light">
                 "{welcomeData?.message}"
               </p>

               <div className="pt-8">
                  <button className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-zinc-200 transition-colors">
                    Access Dev Environment
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-center text-zinc-600 mt-8 text-sm">
        You are now inside the System Nebula network. <br/>
        Feedback is crucial. Break things. Report back.
      </p>
    </div>
  );
};