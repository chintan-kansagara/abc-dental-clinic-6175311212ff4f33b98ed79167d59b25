import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import site from './site.json';
import './styles.css';

function Reveal({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    if (!window.IntersectionObserver || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    element.classList.add('reveal-pending');
    const observer = new IntersectionObserver(entries => { if (entries.some(entry => entry.isIntersecting)) { element.classList.remove('reveal-pending'); observer.disconnect(); } }, { threshold: 0.1 });
    observer.observe(element);
    return () => { element.classList.remove('reveal-pending'); observer.disconnect(); };
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
function App() {
  const phone = site.phone?.replace(/[^+\d]/g, '');
  const contactHref = phone ? `tel:${phone}` : site.email ? `mailto:${site.email}` : '#contact';
  useEffect(() => { document.title = site.businessName; }, []);
  return <div className={`site theme-${site.theme}`}>
    <a className="skip" href="#main">Skip to content</a>
    <div className="demo-banner">Website concept · Preview for {site.businessName}</div>
    <header className="nav"><a className="wordmark" href="#main">{site.businessName}<span>✦</span></a><nav aria-label="Main navigation"><a href={`#${site.sections[0].id}`}>Discover</a><a href="#contact">Contact</a></nav><a className="button small" href={contactHref}>{site.cta} ↗</a></header>
    <main id="main">
      <section className="hero"><div className="hero-copy"><Reveal><p className="eyebrow">{site.category} <span>—</span> {site.location}</p><h1>{site.headline}</h1><p className="description">{site.description}</p><a className="button" href={contactHref}>{site.cta}<span>↗</span></a><div className="hero-foot"><span className="mini-line"></span> A local connection. A thoughtful experience.</div></Reveal></div><div className="hero-art" aria-hidden="true"><div className="art-grid"></div><div className="art-ring ring-one"></div><div className="art-ring ring-two"></div><div className="art-orb"></div><div className="art-petal"></div><span className="art-star">✦</span><div className="art-label"><span>{site.location}</span><strong>{site.category}</strong></div></div></section>
      <div className="identity-strip"><span>{site.businessName}</span><span>✦</span><span>{site.location}</span><span>✦</span><span>Let's start a conversation</span></div>
      {site.sections.map((section, i) => <section id={section.id} key={section.id} className={`section section-${i % 2}`}><Reveal className="section-heading"><span className="eyebrow">0{i + 1} / {site.category}</span><h2>{section.title}</h2></Reveal><Reveal className="section-content"><p>{section.description}</p>{section.items.length > 0 && <ul className="cards">{section.items.map((item, j) => <li key={j}><span>0{j + 1} ↗</span><h3>{item}</h3></li>)}</ul>}<a className="text-link" href="#contact">Get in touch <span>↗</span></a></Reveal></section>)}
      <section id="contact" className="contact"><Reveal><p className="eyebrow">THE NEXT STEP STARTS HERE</p><h2>Let's talk.</h2><p>Connect with {site.businessName} in {site.location}.</p><div className="contact-actions">{phone && <a className="button" href={`tel:${phone}`}>Call {site.phone} ↗</a>}{site.email && <a className="button secondary" href={`mailto:${site.email}`}>Email us ↗</a>}{!phone && !site.email && <p className="contact-pending">Contact details will be added after business verification.</p>}</div></Reveal><span className="contact-star" aria-hidden="true">✦</span></section>
    </main><footer><a className="wordmark" href="#main">{site.businessName}</a><span>{site.location} · Website concept</span><a href="#main">Back to top ↑</a></footer>
  </div>;
}
createRoot(document.getElementById('root')).render(<App />);
