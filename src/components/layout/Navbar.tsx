import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Brand from './Brand';

const links = [
  ['home', 'Home'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['research', 'Research'],
  ['achievements', 'Achievements'],
  ['education', 'Education'],
  ['contact', 'Contact'],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: '-12% 0px -65% 0px', threshold: 0 },
    );
    links.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Saad home" onClick={() => setOpen(false)}>
        <Brand />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {links
          .filter(([id]) => ['about', 'experience', 'projects', 'research'].includes(id))
          .map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? 'active' : ''}
              aria-current={active === id ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
      </nav>
      <div className="header-actions">
        <a className="header-contact" href="#contact">
          Let’s talk <ArrowUpRight size={15} />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="all-navigation"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {open && (
        <nav className="expanded-nav" id="all-navigation" aria-label="All sections">
          {links.map(([id, label], i) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              aria-current={active === id ? 'location' : undefined}
            >
              <span>0{i + 1}</span>
              {label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
