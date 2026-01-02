import React from 'react';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: string;
  icon: React.ReactNode;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ provider, icon, className = '', ...props }) => {
  return (
    <button
      className={`
        w-full flex items-center justify-center space-x-3
        px-4 py-3 rounded-lg border border-zinc-700 bg-zinc-800/50
        text-zinc-300 font-medium
        hover:bg-zinc-700 hover:text-white hover:border-zinc-600
        focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
        transition-all duration-200
        ${className}
      `}
      {...props}
    >
      <span className="w-5 h-5 flex items-center justify-center">
        {icon}
      </span>
      <span>Continue with {provider}</span>
    </button>
  );
};