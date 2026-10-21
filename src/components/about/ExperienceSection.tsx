import React from 'react';
import { EXPERIENCES_DATA } from '../../data/portfolioData';
import { Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
          Career Trajectory
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
          Work History & Production Experience
        </h2>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
        {EXPERIENCES_DATA.map((exp, idx) => (
          <div key={idx} className="relative pl-10 group">
            {/* Timeline node */}
            <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

            <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {exp.role}
                  </h3>
                  <div className="text-sm font-semibold text-cyan-400">
                    {exp.company}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Bullet points */}
              <ul className="space-y-1.5 pt-1">
                {exp.description.map((item, bulletIdx) => (
                  <li key={bulletIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.technologies.map(tech => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
