import React, { useState, useEffect } from 'react';
import type { TabType } from './types';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';
import { HeroSection } from './components/about/HeroSection';
import { SkillsSection } from './components/about/SkillsSection';
import { ExperienceSection } from './components/about/ExperienceSection';
import { PhilosophySection } from './components/about/PhilosophySection';
import { FeaturesContainer } from './components/features/FeaturesContainer';
import { ContactSection } from './components/contact/ContactSection';
import WalkingSprite from './components/WalkingSprite';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('about');

  // Handle browser / Android back button
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') as TabType;
      if (['about', 'features', 'contact'].includes(hash)) {
        setCurrentTab(hash);
      } else {
        setCurrentTab('about');
      }
    };

    window.addEventListener('popstate', handlePopState);
    if (window.location.hash) {
      handlePopState();
    }

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    window.location.hash = tab;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Top Header Navigation */}
      <Navbar currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentTab === 'about' && (
          <div className="space-y-12 sm:space-y-16 animate-fadeIn">
            <HeroSection onNavigateTab={handleSelectTab} />
            <SkillsSection />
            <PhilosophySection />
            <ExperienceSection />
          </div>
        )}

        {currentTab === 'features' && (
          <div className="animate-fadeIn">
            <FeaturesContainer />
          </div>
        )}

        {currentTab === 'contact' && (
          <div className="animate-fadeIn">
            <ContactSection />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Android-style Bottom Navigation */}
      <MobileNav currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Walking Sprite */}
      <WalkingSprite />
    </div>
  );
};

export default App;
