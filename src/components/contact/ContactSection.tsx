import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Mail, Copy, Check, Send, Clock, MapPin, MessageSquare, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Time Role',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [localTime, setLocalTime] = useState('');

  // Live Austin time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Chicago',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/20 p-6 sm:p-8">
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to Opportunities
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build Something Exceptional
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Interested in discussing a senior engineering role, mobile consulting, or scalable architecture? Drop a note or connect directly through any platform below.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Connect & Info (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email card */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Direct Email</span>
              <Mail className="w-4 h-4 text-slate-400" />
            </div>

            <div className="font-mono text-sm sm:text-base font-semibold text-white break-all">
              {PERSONAL_INFO.email}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={copyEmail}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedEmail ? 'Copied to Clipboard' : 'Copy Email'}
              </button>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="py-2 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center justify-center transition-colors shadow-md shadow-cyan-600/20"
              >
                Send Mail
              </a>
            </div>
          </div>

          {/* Location & Timezone Clock */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Current Location & Time</span>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{PERSONAL_INFO.location}</span>
            </div>

            <div className="pt-1 flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold text-white">{localTime || '10:00:00 PM'}</span>
              <span className="text-xs text-slate-400 font-mono">CST (UTC-5)</span>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
              Profiles & Code Repositories
            </span>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-center space-y-1 transition-colors group"
              >
                <GithubIcon className="w-5 h-5 mx-auto text-slate-400 group-hover:text-white" />
                <span className="block text-xs font-medium text-slate-300">GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-center space-y-1 transition-colors group"
              >
                <LinkedinIcon className="w-5 h-5 mx-auto text-slate-400 group-hover:text-cyan-400" />
                <span className="block text-xs font-medium text-slate-300">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form (lg:col-span-7) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 shadow-xl backdrop-blur-sm">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="font-semibold text-cyan-400">{formData.name}</span>. Your message regarding <span className="font-semibold text-cyan-400">{formData.projectType}</span> has been logged. I'll get back to you shortly at <span className="font-mono text-slate-200">{formData.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', projectType: 'Full-Time Role', message: '' });
                  }}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Send a Message</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@cyberdyne.io"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Engagement Category
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Full-Time Role">Full-Time Senior / Lead Engineering Role</option>
                    <option value="Mobile App Development">Mobile App Development (Android / Cross-Platform)</option>
                    <option value="Consulting & Architecture">Architecture & Performance Consulting</option>
                    <option value="Open Source Collaboration">Open Source / Hackathon Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your project, team, timeline, or requirements..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-cyan-500 resize-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
