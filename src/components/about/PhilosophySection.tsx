import React from 'react';
import { PHILOSOPHY_POINTS } from '../../data/portfolioData';
import { Zap, Layers, Sparkles, Smartphone } from 'lucide-react';

const icons = [Zap, Layers, Sparkles, Smartphone];

export const PhilosophySection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
          Core Beliefs
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Engineering Principles
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PHILOSOPHY_POINTS.map((item, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div
              key={item.title}
              className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
