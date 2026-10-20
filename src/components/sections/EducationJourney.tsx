import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education } from '../../data/portfolio';

export default function EducationJourney({ reducedMotion }: { reducedMotion: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (reducedMotion) {
      setProgress(1);
      return;
    }
    const trigger = ScrollTrigger.create({
      trigger: root.current,
      start: 'top 80%',
      end: 'bottom 35%',
      onUpdate: (self) => setProgress(self.progress),
    });
    return () => trigger.kill();
  }, [reducedMotion]);
  return (
    <div className="education-flight" ref={root}>
      <div className="flight-rail" aria-hidden="true">
        <div className="flight-track" />
        <div className="flight-completed" style={{ height: `${progress * 100}%` }} />
        <div className="flight-rocket" style={{ bottom: `${progress * 100}%` }}>
          <Rocket size={35} />
          <i className="rocket-exhaust" />
        </div>
        <span className="orbit-marker orbit-marker-top" />
        <span className="orbit-marker orbit-marker-bottom" />
      </div>
      <p className="flight-note">
        Scroll to follow the journey <span aria-hidden="true">↑</span>
      </p>
      <div className="education-grid">
        {education.map((item, i) => (
          <article
            key={item.qualification}
            className={`education-card ${i === 0 ? 'current-orbit' : ''}`}
          >
            <div className="education-top">
              <GraduationCap size={27} />
              <span>{item.period || 'Foundation'}</span>
            </div>
            <p className="orbit-stage">
              {i === 0 ? 'In orbit · undergraduate study' : 'Launchpad · higher secondary'}
            </p>
            <h3>{item.qualification}</h3>
            <p>{item.institution}</p>
            <span className="status-label">{item.status}</span>
            <p className="content-note">{item.note}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
gsap.registerPlugin(ScrollTrigger);
