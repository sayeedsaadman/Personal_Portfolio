import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  ArrowUp,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  LoaderCircle,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { profile } from '../../data/portfolio';
import { ExternalLink } from '../ui';
import Brand from '../layout/Brand';
import { emailDraft, submitContact } from '../../lib/contact';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'preview'>(
    'idle',
  );
  const [draft, setDraft] = useState('mailto:' + profile.email);
  const loopback = ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
  const configured = import.meta.env.VITE_NETLIFY_FORMS === 'true' && !loopback;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const fields = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      message: String(data.get('message') || ''),
      'bot-field': String(data.get('bot-field') || ''),
    };
    setDraft(emailDraft(fields, profile.email));
    if (!configured) {
      setStatus('preview');
      return;
    }
    setStatus('loading');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      await submitContact(fields, fetch, controller.signal);
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    } finally {
      window.clearTimeout(timeout);
    }
  }
  return (
    <>
      <section id="contact" className="section contact-section">
        <div className="contact-copy">
          <p className="section-index">/08</p>
          <h2>
            Let’s connect.
            <br />
            Build something
            <br />
            <span className="accent">meaningful.</span>
          </h2>
          <p>
            For conversations about systems, software, AI, or a new perspective on a technical
            problem.
          </p>
          <div className="contact-location">
            <MapPin size={18} />
            {profile.location}
          </div>
          <div className="contact-links">
            <ExternalLink href={profile.github}>
              <Github size={20} />
              GitHub
            </ExternalLink>
            <ExternalLink href={profile.linkedin}>
              <Linkedin size={20} />
              LinkedIn
            </ExternalLink>
            <a className="text-link email-link" href={'mailto:' + profile.email}>
              <Mail size={20} />
              {profile.email}
            </a>
            {profile.resume && (
              <a className="text-link" href={profile.resume} download>
                Download CV <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="contact-form"
          onSubmit={submit}
          onChange={() => {
            if (status !== 'loading') setStatus('idle');
          }}
        >
          <input type="hidden" name="form-name" value="contact" />
          <h3>
            Start a conversation <ArrowUpRight size={24} />
          </h3>
          <p className="contact-recipient">
            To <a href={'mailto:' + profile.email}>{profile.email}</a>
          </p>
          {!configured && (
            <p className="form-notice">
              In this local preview, prepare an email draft below. Online form delivery becomes
              available on Netlify after the form and email notifications are configured.
            </p>
          )}
          <label htmlFor="name">Your name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="How should I address you?"
            required
            maxLength={100}
          />
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
          />
          <label htmlFor="message">What’s on your mind?</label>
          <textarea
            id="message"
            name="message"
            placeholder="A project, an opportunity, or just a hello…"
            required
            minLength={10}
            maxLength={5000}
            rows={4}
          />
          <input
            className="honeypot"
            name="bot-field"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <button className="button primary" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? (
              <>
                Sending… <LoaderCircle className="spin" size={19} />
              </>
            ) : status === 'success' ? (
              <>
                Message submitted <Check size={19} />
              </>
            ) : (
              <>
                {configured ? 'Send message' : 'Prepare email draft'} <Send size={19} />
              </>
            )}
          </button>
          <div aria-live="polite" className={'form-status ' + status}>
            {status === 'preview' && (
              <>
                Your message has not been sent.{' '}
                <a className="text-link" href={draft}>
                  Open your email app to send it <ArrowUpRight size={16} />
                </a>
              </>
            )}
            {status === 'error' && (
              <>
                Your message was not confirmed. Please try again, or{' '}
                <a href={draft}>send it by email</a>.
              </>
            )}
            {status === 'success' &&
              'Your message was accepted by the form service. Thank you for reaching out.'}
          </div>
          {configured && (
            <p className="content-note">
              Your name, email, and message are processed by Netlify Forms to respond to your
              inquiry.
            </p>
          )}
        </form>
      </section>
      <footer className="site-footer">
        <a className="brand" href="#home" aria-label="Saad home">
          <Brand />
        </a>
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a className="back-top" href="#home">
          Back to top <ArrowUp size={18} />
        </a>
      </footer>
    </>
  );
}
