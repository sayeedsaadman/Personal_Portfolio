import { lazy, Suspense, useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/sections/HeroSection';
import ProjectsSection from './components/sections/ProjectsSection';
import {
  AboutSection,
  AchievementsSection,
  EducationSection,
  ExperienceSection,
  ResearchSection,
  SkillsSection,
} from './components/sections/ProfileSections';
import ContactSection from './components/sections/ContactSection';
import { useReducedMotion } from './hooks/useReducedMotion';
const ExperienceCanvas = lazy(() => import('./components/three/ExperienceCanvas'));

gsap.registerPlugin(ScrollTrigger);
export default function App() {
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', reducedMotion || paused);
    return () => document.documentElement.classList.remove('reduced-motion');
  }, [reducedMotion, paused]);
  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(
          '.section-heading, .about-copy, .timeline-item, .education-card, .award-card',
        )
        .forEach((el) => {
          gsap.fromTo(
            el,
            { y: 24, opacity: 0.45 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: { trigger: el, start: 'top 95%', once: true },
            },
          );
        });
    });
    return () => ctx.revert();
  }, [reducedMotion]);
  return (
    <div className={`app ${reducedMotion || paused ? 'motion-paused' : ''}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <div className="scene-backdrop">
        <Suspense
          fallback={
            <div className="scene-loading" aria-hidden="true">
              <span>INITIALIZING SYSTEM</span>
            </div>
          }
        >
          <ExperienceCanvas reducedMotion={reducedMotion || paused} />
        </Suspense>
      </div>
      <main id="main">
        <HeroSection />
        <ProjectsSection />
        <ResearchSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <AchievementsSection />
        <EducationSection reducedMotion={reducedMotion || paused} />
        <ContactSection />
      </main>
      <button
        className="motion-control"
        disabled={reducedMotion}
        aria-label={
          reducedMotion
            ? 'Reduced motion is enabled'
            : paused
              ? 'Resume animation'
              : 'Pause animation'
        }
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused || reducedMotion ? <Play size={12} /> : <Pause size={12} />}
        <span>{reducedMotion ? 'REDUCED MOTION' : paused ? 'STILL MODE' : 'MOTION ON'}</span>
      </button>
    </div>
  );
}
