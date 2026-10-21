import React, { useState } from 'react';
import { SKILLS_DATA } from '../../data/portfolioData';
import { Cpu, Smartphone, Monitor, Database, Cloud } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Tech', icon: Cpu },
    { id: 'mobile', label: 'Android & Mobile', icon: Smartphone },
    { id: 'frontend', label: 'Frontend & UI', icon: Monitor },
    { id: 'backend', label: 'Backend & Systems', icon: Database },
    { id: 'devops', label: 'Cloud & DevOps', icon: Cloud },
  ];

  const filteredSkills = SKILLS_DATA.filter(skill => {
    if (selectedCategory === 'all') return true;
    return skill.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Technical Proficiency
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
            Core Competencies & Stack
          </h2>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => (
          <div
            key={skill.name}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 transition-all group space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </h4>
                {skill.highlight && (
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {skill.highlight}
                  </p>
                )}
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                {skill.level}%
              </span>
            </div>

            {/* Progress meter */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${skill.level}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500">
              <span className="capitalize">{skill.category}</span>
              <span>{skill.years} yrs experience</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
