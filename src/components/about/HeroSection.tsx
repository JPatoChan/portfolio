import React from 'react';
import { FEATURES_LIST, PERSONAL_INFO, SKILLS_DATA } from '../../data/portfolioData';
import { Sparkles, ArrowRight, Download, Mail, Code, MapPin } from 'lucide-react';
import type { TabType } from '../../types';

interface HeroSectionProps {
  onNavigateTab: (tab: TabType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateTab }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-10 shadow-2xl">
      {/* Background glow effects */}
      <div className="tech-glow top-0 left-1/4 w-96 h-96 bg-cyan-500/20" />
      <div className="tech-glow bottom-0 right-10 w-80 h-80 bg-indigo-500/20" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Avatar & Badges */}
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            {/* Gradient border ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 opacity-75 blur group-hover:opacity-100 transition duration-500" />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-slate-900 border-2 border-slate-800 p-1 flex items-center justify-center">
              {/* Modern SVG Avatar / Portrait */}
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-tr from-cyan-900 to-indigo-900 flex items-center justify-center text-cyan-200">
                <img
                  src={`${import.meta.env.BASE_URL}profile.jpg`}
                  alt="Profile"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to Code icon if image is not found
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement?.querySelector('svg')?.classList.remove('hidden');
                  }}
                />
                <Code className="hidden w-16 h-16 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            {/* Online badge */}
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/90 border border-emerald-500/50 shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold text-emerald-400">Available</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{PERSONAL_INFO.location}</span>
          </div>
        </div>

        {/* Bio & Headlines */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{PERSONAL_INFO.status}</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-cyan-400 mt-1">
              {PERSONAL_INFO.title}
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            {PERSONAL_INFO.tagline}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg mx-auto md:mx-0">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center md:text-left">
              <span className="block text-lg sm:text-2xl font-black text-cyan-400">{PERSONAL_INFO.yearsExperience}</span>
              <span className="text-[11px] text-slate-400">Experience</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center md:text-left">
              <span className="block text-lg sm:text-2xl font-black text-indigo-400">{SKILLS_DATA.length}</span>
              <span className="text-[11px] text-slate-400">Skills</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center md:text-left">
              <span className="block text-lg sm:text-2xl font-black text-emerald-400">{FEATURES_LIST.length}</span>
              <span className="text-[11px] text-slate-400">Interactive Tools</span>
            </div>
          </div>

          {/* Call to actions */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('features')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all active:scale-95"
            >
              <span>Explore Interactive Features</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('contact')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-all active:scale-95"
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Contact Me</span>
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-300 text-xs sm:text-sm transition-colors"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Resume</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
