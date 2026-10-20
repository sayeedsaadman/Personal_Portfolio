import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Compass,
  FileSearch,
  Globe2,
  ScanLine,
  Workflow,
  X,
} from 'lucide-react';
import { projects } from '../../data/portfolio';
import { ExternalLink, SectionHeading } from '../ui';
import ProjectArtwork from './ProjectArtwork';

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [expanded]);
  const trip = projects[0];
  return (
    <section id="projects" className="section projects-section">
      <div className="section-top">
        <SectionHeading
          number="01"
          label="Projects"
          title={
            <>
              Beyond support.{' '}
              <br />
              <span className="muted">Building solutions.</span>
            </>
          }
        >
          An exploration of software, intelligent applications, and the possibilities between them.
        </SectionHeading>
        <span className="project-count">01 — 03</span>
      </div>
      <article className="featured-project">
        <div
          className="tripmind-visual"
          aria-label="Conceptual TripMind-AI architecture illustration"
        >
          <div className="visual-grid" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="visual-caption">TRIPMIND / INTELLIGENCE IN MOTION</span>
          <div className="ai-core">
            <Compass size={58} strokeWidth={1} />
          </div>
          <div className="floating-node agent-node">
            <Bot size={17} />
            <div>
              Agent workflow<span>LANGGRAPH</span>
            </div>
          </div>
          <div className="floating-node rag-node">
            <FileSearch size={17} />
            <div>
              Knowledge retrieval<span>RAG + FAISS</span>
            </div>
          </div>
          <div className="floating-node web-node">
            <Globe2 size={17} />
            <div>
              Web grounding<span>TAVILY + SEARCH</span>
            </div>
          </div>
          <span className="visual-bottom">
            CONCEPTUAL ARCHITECTURE <ArrowUpRight size={15} />
          </span>
        </div>
        <div className="featured-project-copy">
          <p className="eyebrow violet-text">FEATURED PROJECT / AI & APPLICATIONS</p>
          <h3>
            {trip.name}
            <span>↗</span>
          </h3>
          <p>{trip.summary}</p>
          <div className="tags">
            {trip.technologies.slice(0, 4).map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-actions">
            <button
              className="button primary"
              aria-expanded={expanded}
              aria-controls="tripmind-details"
              onClick={() => setExpanded(!expanded)}
            >
              Explore the architecture {expanded ? <X size={16} /> : <ArrowUpRight size={16} />}
            </button>
          </div>
          {(trip.repository || trip.demo) && <div className="project-links">
            {trip.repository && (
              <ExternalLink href={trip.repository}>GitHub repository</ExternalLink>
            )}{' '}
            {trip.demo && (
              <ExternalLink href={trip.demo}>Live demo</ExternalLink>
            )}
          </div>}
        </div>
      </article>
      {expanded && (
        <div className="project-details" id="tripmind-details">
          <div className="architecture-pipeline">
            {[
              ['01', 'User request'],
              ['02', 'Agent workflow'],
              ['03', 'Knowledge retrieval'],
              ['04', 'Web grounding'],
              ['05', 'Response'],
            ].map(([n, label], i) => (
              <div key={n}>
                <span>{n}</span>
                <strong>{label}</strong>
                {i < 4 && <ArrowRight size={16} />}
              </div>
            ))}
          </div>
          <div className="project-feature-grid">
            {trip.features.map((feature, i) => {
              const Icon = [Workflow, FileSearch, Globe2, ScanLine][i];
              return (
                <div key={feature.title}>
                  <Icon size={21} />
                  <h4>{feature.title}</h4>
                  <p>{feature.text}</p>
                </div>
              );
            })}
          </div>
          <p className="vision-pipeline">
            <ScanLine size={16} /> Image input <ArrowRight size={14} /> OCR / landmark recognition{' '}
            <ArrowRight size={14} /> Extraction <ArrowRight size={14} /> Result
          </p>
        </div>
      )}
      <div className="secondary-projects">
        {projects.slice(1).map((project) => (
          <article className={`project-card ${project.id}`} key={project.id}>
            <div className="project-card-art">
              <ProjectArtwork farm={project.id === 'agrofarm'} />
            </div>
            <div className="project-card-body">
              <p className="eyebrow">{project.category}</p>
              <h3>{project.name}</h3>
              {project.summary && <p>{project.summary}</p>}
              {project.technologies.length > 0 && (
                <div className="tags">
                  {project.technologies.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              )}
              {project.features.length > 0 && (
                <ul className="project-capabilities">
                  {project.features.map((feature) => (
                    <li key={feature.title}>
                      <h4>{feature.title}</h4>
                      <p>{feature.text}</p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="card-bottom">
                {project.repository && (
                  <ExternalLink href={project.repository}>Repository</ExternalLink>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <a className="inline-next" href="#research">
        From building to asking better questions <ArrowDown size={16} />
      </a>
    </section>
  );
}
