import { ArrowDown, ArrowUpRight, Github, Linkedin, MapPin } from 'lucide-react';
import { profile } from '../../data/portfolio';

export default function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <p className="hero-intro">Muhammad Sayeed</p>
        <h1 aria-label={profile.name}>
          Sadman
          <br />
          <span className="hero-last-name">
            Saad<span className="accent">.</span>
          </span>
        </h1>
        <div className="hero-buttons">
          <a className="button primary" href="#projects">
            Explore my work <ArrowUpRight size={21} />
          </a>
          <a className="button subtle" href="#contact">
            Get in touch <ArrowUpRight size={21} />
          </a>
        </div>
        <div className="hero-socials">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <Github size={20} />
            GitHub<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} />
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        {profile.resume && (
          <a className="text-link resume-link" href={profile.resume} download>
            Download CV <ArrowDown size={18} />
          </a>
        )}
      </div>
      <div className="hero-footer">
        <span>
          <MapPin size={17} />
          {profile.location}
        </span>
        <a href="#projects">
          Explore the portfolio <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
