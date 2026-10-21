import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Code2, Smartphone } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-slate-900 bg-slate-950/80 pb-20 md:pb-8 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} {PERSONAL_INFO.name}.</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            Engineered with <Code2 className="w-3.5 h-3.5 text-cyan-400" /> React 19 & <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Capacitor Android
          </span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
