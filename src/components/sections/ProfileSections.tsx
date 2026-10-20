import { useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, Sparkles, Trophy } from 'lucide-react';
import {
  achievements,
  certifications,
  experience,
  profile,
  research,
  skills,
} from '../../data/portfolio';
import { ExternalLink, SectionHeading } from '../ui';
import PathologyVisual from './PathologyVisual';
import EducationJourney from './EducationJourney';

export function AboutSection() {
  return (
    <section id="about" className="section about-section">
      <SectionHeading
        number="03"
        label="About me"
        title={
          <>
            Curiosity is{' '}
            <br />
            <span className="muted">the common thread.</span>
          </>
        }
      />
      <div className="about-copy">
        <p className="large-copy">
          From understanding how systems work to exploring what intelligent software can do.
        </p>
        <p>{profile.about}</p>
        <div className="about-facts">
          <div>
            <span>BASED IN</span>
            <strong>{profile.location}</strong>
          </div>
          <div>
            <span>CURRENTLY AT</span>
            <strong>
              {profile.organization} <ArrowUpRight size={14} />
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
export function ResearchSection() {
  return (
    <section id="research" className="section research-section">
      <SectionHeading
        number="02"
        label="Research & innovation"
        title={
          <>
            Exploring the{' '}
            <br />
            <span className="muted">next question.</span>
          </>
        }
      />
      {research.map((paper) => (
        <article className="research-card" key={paper.title}>
          <div className="research-art">
            <PathologyVisual />
          </div>
          <div className="research-copy">
            <p className="eyebrow violet-text">GRAPH LEARNING · PATHOLOGY IMAGE ANALYSIS</p>
            <h3>{paper.title}</h3>
            <p className="conference">{paper.conference}</p>
            <span className="status-label">
              {paper.status || 'Publication / presentation status unconfirmed'}
            </span>
            {paper.abstract && <p>{paper.abstract}</p>}
            {paper.authors.length > 0 && (
              <div className="paper-authors">
                <h4>Authors</h4>
                <p>
                  {paper.authors.map((author, i) => (
                    <span key={author}>
                      {i > 0 ? ', ' : ''}
                      {author === profile.name ? <strong>{author}</strong> : author}
                    </span>
                  ))}
                </p>
              </div>
            )}
            {paper.contribution && <p>{paper.contribution}</p>}
            {paper.date && <p>{paper.date}</p>}
            {paper.doi && (
              <p className="paper-doi">
                <span>DOI</span>{' '}
                <ExternalLink href={'https://doi.org/' + paper.doi}>{paper.doi}</ExternalLink>
              </p>
            )}
            <div className="research-links">
              {paper.url && <ExternalLink href={paper.url}>Read paper</ExternalLink>}
              {paper.pdf && <ExternalLink href={paper.pdf}>Paper PDF</ExternalLink>}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
export function ExperienceSection() {
  return (
    <section id="experience" className="section experience-section">
      <SectionHeading
        number="04"
        label="Professional experience"
        title={
          <>
            At the intersection{' '}
            <br />
            <span className="muted">of people and technology.</span>
          </>
        }
      />
      <div className="timeline">
        {experience.map((job) => (
          <article key={job.organization + job.role} className="timeline-item">
            <div className="timeline-meta">
              <span className="timeline-symbol">
                <BriefcaseBusiness size={19} />
              </span>
              <span className="eyebrow">{job.type}</span>
              <p>{job.period || 'Employment dates to be added'}</p>
            </div>
            <div className="timeline-body">
              <h3>{job.role}</h3>
              <p className="company-name">{job.organization}</p>
              {!job.activitiesConfirmed && (
                <p className="content-note">Activity details awaiting confirmation.</p>
              )}
              <ul>
                {[...job.responsibilities, ...job.activities].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {job.tools.length > 0 && (
                <div className="tags">
                  {job.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              )}
              {job.achievements.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
export function SkillsSection() {
  const [selected, setSelected] = useState(0);
  return (
    <section id="skills" className="section skills-section">
      <div>
        <SectionHeading number="05" label="Technical toolkit" title="The tools behind the work." />
      </div>
      <div className="skills-content">
        <div className="skill-tabs" aria-label="Skill categories">
          {skills.map((group, i) => (
            <button
              key={group.name}
              className={i === selected ? 'selected' : ''}
              onClick={() => setSelected(i)}
              aria-pressed={i === selected}
            >
              {group.name}
            </button>
          ))}
        </div>
        <div className="skill-panel" aria-live="polite">
          <p className="eyebrow">{skills[selected].label}</p>
          <div className="tags large-tags">
            {skills[selected].items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p>{skills[selected].description}</p>
        </div>
      </div>
    </section>
  );
}
export function AchievementsSection() {
  return (
    <section id="achievements" className="section achievement-section">
      <SectionHeading
        number="06"
        label="Awards & recognition"
        title={
          <>
            A milestone.{' '}
            <br />
            <span className="muted">More to learn.</span>
          </>
        }
      />
      {achievements.map((award) => (
        <article className="award-card" key={award.title}>
          <div className="award-icon">
            <Trophy size={47} strokeWidth={1.2} />
            <span>RECOGNITION</span>
          </div>
          <div>
            <p className="eyebrow amber-text">LEARNING & ACHIEVEMENT</p>
            <h3>{award.title}</h3>
            {award.description && <p>{award.description}</p>}
            {(award.provider || award.date) && <p className="content-note">
              {[award.provider, award.date].filter(Boolean).join(' · ')}
            </p>}
            {award.url && <ExternalLink href={award.url}>Official result</ExternalLink>}
            {award.certificate && (
              <ExternalLink href={award.certificate}>Award certificate</ExternalLink>
            )}
          </div>
          <Sparkles className="award-spark" size={28} strokeWidth={1} />
        </article>
      ))}
    </section>
  );
}
export function EducationSection({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section id="education" className="section education-section">
      <SectionHeading
        number="07"
        label="Education"
        title={<>Every journey starts with a launchpad.</>}
      />
      <EducationJourney reducedMotion={reducedMotion} />
      <div className="certifications-section">
        <div className="certifications-heading">
          <p className="eyebrow">CERTIFICATIONS & CONTINUOUS LEARNING</p>
          <h3>Learning, put into practice.</h3>
        </div>
        <div className="certificate-grid">
          {certifications.map(cert => <article className="certificate-card" key={cert.name}>
            <a className="certificate-image" href={cert.image} target="_blank" rel="noopener noreferrer" aria-label={`View ${cert.name} certificate (opens in a new tab)`}>
              <img src={cert.image} alt={`${cert.name} certificate — ${cert.issuer}`} loading="lazy" width={cert.width} height={cert.height} />
            </a>
            <div className="certificate-copy">
              <p className="eyebrow">{cert.issuer}</p>
              <h4>{cert.name}</h4>
              {cert.date && <p className="certificate-date">{cert.date}</p>}
              {cert.credentialId && <p className="certificate-id">Certificate ID: {cert.credentialId}</p>}
              <ExternalLink href={cert.image}>View certificate</ExternalLink>
            </div>
          </article>)}
        </div>
      </div>
    </section>
  );
}
