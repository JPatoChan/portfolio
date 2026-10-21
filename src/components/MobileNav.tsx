import React from 'react';
import type { TabType } from '../types';
import { User, Sparkles, Mail } from 'lucide-react';
import { triggerHaptic } from '../utils/platform';

interface MobileNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'about', label: 'About', icon: User },
    { id: 'features', label: 'Features', icon: Sparkles },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleSelect = (tab: TabType) => {
    triggerHaptic();
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-lg px-6 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all relative ${
                isActive ? 'text-cyan-400 scale-105' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {tab.id === 'features' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400" />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>
                {tab.label}
              </span>

              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
