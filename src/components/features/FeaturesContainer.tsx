import React, { useState } from 'react';
import { FEATURES_LIST } from '../../data/portfolioData';
import { PaletteCraft } from './PaletteCraft';
import { MarkCraft } from './MarkCraft';
import { DevConverter } from './DevConverter';
import { TaskPulse } from './TaskPulse';
import { ApiSandbox } from './ApiSandbox';
import { DeviceSensorLab } from './DeviceSensorLab';
import { Palette, FileText, Calculator, CheckSquare, Terminal, Smartphone, Search, Sparkles, ChevronRight, Layers } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Palette: Palette,
  FileText: FileText,
  Calculator: Calculator,
  CheckSquare: CheckSquare,
  Terminal: Terminal,
  Smartphone: Smartphone,
};

export const FeaturesContainer: React.FC = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('palette-craft');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Tools', 'Design & UI', 'Productivity', 'API & Networking', 'Mobile & Hardware'];

  const filteredFeatures = FEATURES_LIST.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderActiveFeature = () => {
    switch (selectedFeatureId) {
      case 'palette-craft':
        return <PaletteCraft />;
      case 'mark-craft':
        return <MarkCraft />;
      case 'dev-converter':
        return <DevConverter />;
      case 'task-pulse':
        return <TaskPulse />;
      case 'api-sandbox':
        return <ApiSandbox />;
      case 'device-sensor':
        return <DeviceSensorLab />;
      default:
        return <PaletteCraft />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro section banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/20 p-5 sm:p-6">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Demos & Micro-Apps
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Select any feature below to test it live
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Developer Feature Showcase
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Explore live interactive utilities, reactive state tools, and mobile capabilities built to demonstrate clean architecture, fast UI responsiveness, and cross-platform flexibility.
          </p>
        </div>
      </div>

      {/* Main Split Layout: Feature List (Sidebar) & Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Feature List / Selector (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-3">
          {/* Search & Filter Header */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search features..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors font-medium ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 text-white shadow'
                      : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* List of features */}
          <div className="space-y-2">
            {filteredFeatures.map(item => {
              const Icon = iconMap[item.iconName] || Layers;
              const isSelected = item.id === selectedFeatureId;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedFeatureId(item.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start gap-3 relative group ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/60 to-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-500/40'
                      : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30'
                        : 'bg-slate-800 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-750'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className={`text-sm font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                        {item.title}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 shrink-0">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {item.shortDesc}
                    </p>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 self-center transition-transform shrink-0 ${
                      isSelected
                        ? 'text-cyan-400 translate-x-0.5'
                        : 'text-slate-600 group-hover:text-slate-400 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}

            {filteredFeatures.length === 0 && (
              <div className="p-8 text-center rounded-xl bg-slate-900/30 border border-dashed border-slate-800 text-slate-500 text-xs">
                No features matched your search query.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Selected Feature Live Playground (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm shadow-xl">
            {renderActiveFeature()}
          </div>
        </div>
      </div>
    </div>
  );
};
