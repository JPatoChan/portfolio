import React from 'react';
import type { TabType } from '../types';
import { Code, Sparkles, Mail, User } from 'lucide-react';
import { getPlatformName, isNativeApp } from '../utils/platform';
import { GithubIcon, LinkedinIcon } from './icons/SocialIcons';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onSelectTab }) => {
  const platform = getPlatformName();
  const isNative = isNativeApp();

  const navItems: { id: TabType; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'about', label: 'About', icon: User },
    { id: 'features', label: 'Features & Demos', icon: Sparkles },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => onSelectTab('about')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Code className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors">
              Patrick Nance
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Staff Mobile & Full-Stack
            </div>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right side status / platform badge & links */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Platform runtime pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-mono">
            <span className={`w-1.5 h-1.5 rounded-full ${isNative ? 'bg-emerald-400' : 'bg-cyan-400'}`} />
            <span className="hidden sm:inline">{platform}</span>
            <span className="sm:hidden">{isNative ? 'Android' : 'Web'}</span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-cyan-400 border border-slate-800 transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
};
