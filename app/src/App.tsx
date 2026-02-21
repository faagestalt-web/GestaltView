import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// Section data
const sections = [
  {
    id: 1,
    headline: ['YOUR', 'CONSCIOUSNESS', 'SERVED'],
    body: 'An AI system designed to understand how you think—then get out of your way.',
    cta: 'Enter the experience',
    cta2: 'Read the philosophy',
    image: '/hero_astronaut_helmet.jpg',
    position: 'left',
    hasPanel: true,
  },
  {
    id: 2,
    headline: ['WHAT IF YOUR AI', 'DIDN\'T NEED', 'INSTRUCTIONS?'],
    body: 'Most tools demand structure. GestaltView learns your structure—then adapts to it.',
    image: '/astronaut_seated_visor.jpg',
    position: 'left',
  },
  {
    id: 3,
    headline: ['NOT A TOOL.', 'A MIRROR.'],
    body: 'It doesn\'t do the work for you. It reveals the patterns you\'ve been too busy to see.',
    image: '/hooded_portrait_visor.jpg',
    position: 'right',
  },
  {
    id: 4,
    headline: ['YOUR MIND IS NOT', 'A PROBLEM', 'TO SOLVE.'],
    body: 'You don\'t need another system forcing you into boxes. You need a system that finally understands you don\'t fit in them.',
    image: '/profile_visor.jpg',
    position: 'left',
  },
  {
    id: 5,
    headline: ['WE DON\'T', 'OPTIMIZE YOU.', 'WE SEE YOU.'],
    body: 'No scores. No streaks. No guilt. Just a quiet, steady presence that learns what matters to you.',
    image: '/astronaut_seated_visor.jpg',
    position: 'right',
  },
  {
    id: 6,
    headline: ['THIS IS', 'GESTALTVIEW.'],
    body: 'A consciousness-serving AI that builds a living model of how you think—so your tools finally feel like extensions of you.',
    badge: 'BEAUTIFUL TAPESTRY ARCHITECTURE',
    image: '/hooded_portrait_visor.jpg',
    position: 'left',
  },
  {
    id: 7,
    headline: ['BUILT FOR MINDS', 'THAT MOVE', 'DIFFERENTLY.'],
    body: 'Hyperfocus one hour, scattered the next? That\'s not a bug. That\'s data. We map the rhythm—so your system keeps up, not slows down.',
    image: '/astronaut_seated_visor.jpg',
    position: 'right',
  },
  {
    id: 8,
    headline: ['A SYSTEM THAT', 'LEARNS HOW', 'YOU THINK.'],
    body: 'Patterns in your notes. Peaks in your energy. The way you name your ideas. Over time, it becomes a mirror you can trust.',
    image: '/hooded_portrait_visor.jpg',
    position: 'left',
  },
  {
    id: 9,
    headline: ['NOT AUTOMATION.', 'ALIGNMENT.'],
    body: 'You stay the author. It stays the amplifier—quiet, precise, and always in service of your intent.',
    image: '/astronaut_seated_visor.jpg',
    position: 'right',
  },
  {
    id: 10,
    headline: ['YOUR DATA', 'BELONGS TO YOUR', 'FUTURE SELF.'],
    body: 'Encrypted. Portable. Yours. We don\'t train on your mind. We protect it—so it can evolve with you.',
    image: '/hooded_portrait_visor.jpg',
    position: 'left',
  },
  {
    id: 11,
    headline: ['READY TO MEET', 'YOUR OWN MIND?'],
    body: 'Start with a short conversation. We\'ll map your patterns and build your first personal model—free.',
    cta: 'Begin onboarding',
    image: '/astronaut_seated_visor.jpg',
    position: 'right',
  },
];

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      // Panel entrance
      heroTl.fromTo('.hero-panel',
        { opacity: 0, x: '-6vw' },
        { opacity: 1, x: 0, duration: 0.8 }
      );
      
      // Headline lines
      heroTl.fromTo('.hero-headline-line',
        { opacity: 0, y: 24, rotateX: 18 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.08 },
        '-=0.4'
      );
      
      // Subheadline
      heroTl.fromTo('.hero-subheadline',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      );
      
      // CTAs
      heroTl.fromTo('.hero-cta',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
        '-=0.3'
      );
      
      // Line draw
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        heroTl.to(lineRef.current, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, '-=0.8');
      }
    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  // Scroll-driven animations for all sections
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Clear any existing triggers
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];

      // Hero section exit animation
      const heroTrigger = ScrollTrigger.create({
        trigger: '.section-1',
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // EXIT phase (70% - 100%)
          if (progress > 0.7) {
            const exitProgress = (progress - 0.7) / 0.3;
            gsap.set('.hero-panel', { 
              x: -18 * exitProgress + 'vw', 
              opacity: 1 - exitProgress * 0.75 
            });
            gsap.set('.hero-headline', { 
              y: -10 * exitProgress + 'vh', 
              opacity: 1 - exitProgress * 0.8 
            });
            gsap.set('.hero-cta-row', { 
              y: 6 * exitProgress + 'vh', 
              opacity: 1 - exitProgress 
            });
          }
        },
        onLeaveBack: () => {
          // Reset hero when scrolling back to top
          gsap.set('.hero-panel', { x: 0, opacity: 1 });
          gsap.set('.hero-headline', { y: 0, opacity: 1 });
          gsap.set('.hero-cta-row', { x: 0, opacity: 1 });
        }
      });
      triggersRef.current.push(heroTrigger);

      // Sections 2-11 animations
      sections.slice(1).forEach((section, index) => {
        const sectionNum = index + 2;
        const isLeft = section.position === 'left';
        
        const trigger = ScrollTrigger.create({
          trigger: `.section-${sectionNum}`,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;
            const headline = `.section-${sectionNum}-headline`;
            const body = `.section-${sectionNum}-body`;
            const badge = `.section-${sectionNum}-badge`;
            const cta = `.section-${sectionNum}-cta`;
            
            // ENTRANCE (0% - 30%)
            if (progress <= 0.3) {
              const entranceProgress = progress / 0.3;
              const easeProgress = 1 - Math.pow(1 - entranceProgress, 3);
              
              gsap.set(headline, {
                x: isLeft ? -40 * (1 - easeProgress) + 'vw' : 40 * (1 - easeProgress) + 'vw',
                opacity: easeProgress,
              });
              
              if (progress > 0.05) {
                const bodyProgress = Math.min(1, (progress - 0.05) / 0.25);
                const bodyEase = 1 - Math.pow(1 - bodyProgress, 3);
                gsap.set(body, {
                  y: 10 * (1 - bodyEase) + 'vh',
                  opacity: bodyEase,
                });
              }
              
              if (badge && progress > 0.12) {
                const badgeProgress = Math.min(1, (progress - 0.12) / 0.18);
                gsap.set(badge, {
                  scale: 0.96 + 0.04 * badgeProgress,
                  opacity: badgeProgress,
                });
              }
              
              if (cta && progress > 0.12) {
                const ctaProgress = Math.min(1, (progress - 0.12) / 0.18);
                gsap.set(cta, {
                  scale: 0.96 + 0.04 * ctaProgress,
                  opacity: ctaProgress,
                });
              }
            }
            // SETTLE (30% - 70%)
            else if (progress <= 0.7) {
              gsap.set(headline, { x: 0, opacity: 1 });
              gsap.set(body, { y: 0, opacity: 1 });
              if (badge) gsap.set(badge, { scale: 1, opacity: 1 });
              if (cta) gsap.set(cta, { scale: 1, opacity: 1 });
            }
            // EXIT (70% - 100%)
            else {
              const exitProgress = (progress - 0.7) / 0.3;
              
              gsap.set(headline, {
                x: isLeft ? -18 * exitProgress + 'vw' : 14 * exitProgress + 'vw',
                opacity: 1 - exitProgress * 0.75,
              });
              
              gsap.set(body, {
                y: 6 * exitProgress + 'vh',
                opacity: 1 - exitProgress,
              });
              
              if (badge) {
                gsap.set(badge, { opacity: 1 - exitProgress });
              }
              
              if (cta) {
                gsap.set(cta, { opacity: 1 - exitProgress });
              }
            }
          }
        });
        triggersRef.current.push(trigger);
      });

      // Contact section (flowing, not pinned)
      const contactTrigger = ScrollTrigger.create({
        trigger: '.section-contact',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.contact-title',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
          );
          gsap.fromTo('.contact-form-field',
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.2, ease: 'power2.out' }
          );
          gsap.fromTo('.contact-principle',
            { x: 20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.3, ease: 'power2.out' }
          );
        },
        once: true
      });
      triggersRef.current.push(contactTrigger);

      // Global snap for pinned sections
      const allTriggers = ScrollTrigger.getAll();
      const pinned = allTriggers
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
            if (!inPinned) return value;
            
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        }
      });
    }, mainRef);

    return () => {
      triggersRef.current.forEach(st => st.kill());
      triggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const scrollToSection = (index: number) => {
    const section = document.querySelector(`.section-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={mainRef} className="relative bg-navy">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-navy/80 to-transparent">
        <div className="font-mono text-sm tracking-wider text-foreground">
          GESTALTVIEW
        </div>
        <div className="hidden md:flex gap-8">
          <button onClick={() => scrollToSection(4)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Philosophy
          </button>
          <button onClick={() => scrollToSection(6)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Experience
          </button>
          <button onClick={() => scrollToSection(10)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Safety
          </button>
          <button onClick={() => scrollToSection(12)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Contact
          </button>
        </div>
      </nav>

      {/* Gestalt Line SVG */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-40" style={{ opacity: 0.6 }}>
        <path
          ref={lineRef}
          d="M -50 400 Q 100 350 200 400 T 400 380 T 600 420 T 800 360 T 1000 400 T 1200 380 T 1400 420"
          className="gestalt-line"
        />
      </svg>

      {/* Section 1: Hero */}
      <section ref={heroRef} className="section-pinned section-1 z-10">
        <div className="absolute inset-0">
          <img 
            src="/hero_astronaut_helmet.jpg" 
            alt="Hero" 
            className="w-full h-full object-cover image-cinematic"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/40 to-transparent" />
        </div>
        
        <div className="hero-panel absolute left-0 top-0 w-[44vw] h-full bg-navy/72 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/30" />
        </div>
        
        <div className="absolute left-[7vw] top-[18vh] max-w-[30vw]">
          <div className="hero-headline">
            {sections[0].headline.map((line, i) => (
              <h1 
                key={i} 
                className="hero-headline-line font-display text-[clamp(2rem,4.5vw,5rem)] font-light uppercase tracking-widest leading-tight text-foreground"
                style={{ perspective: '1000px' }}
              >
                {line}
              </h1>
            ))}
          </div>
        </div>
        
        <p className="hero-subheadline absolute left-[7vw] top-[52vh] max-w-[30vw] text-lg text-muted-foreground leading-relaxed">
          {sections[0].body}
        </p>
        
        <div className="hero-cta-row absolute left-[7vw] top-[68vh] flex gap-4">
          <button className="hero-cta btn-primary">
            {sections[0].cta}
          </button>
          <button className="hero-cta btn-secondary">
            {sections[0].cta2}
          </button>
        </div>
      </section>

      {/* Sections 2-11 */}
      {sections.slice(1).map((section, index) => {
        const sectionNum = index + 2;
        const isLeft = section.position === 'left';
        
        return (
          <section 
            key={section.id} 
            className={`section-pinned section-${sectionNum} z-${(sectionNum) * 10}`}
          >
            <div className="absolute inset-0">
              <img 
                src={section.image} 
                alt={`Section ${sectionNum}`} 
                className="w-full h-full object-cover image-cinematic"
              />
              <div className={`absolute inset-0 ${isLeft 
                ? 'bg-gradient-to-r from-navy/80 via-navy/40 to-transparent' 
                : 'bg-gradient-to-l from-navy/80 via-navy/40 to-transparent'
              }`} />
            </div>
            
            <div 
              className={`section-${sectionNum}-headline absolute ${isLeft ? 'left-[10vw]' : 'left-[54vw]'} top-[34vh] max-w-[40vw]`}
              style={{ opacity: 0 }}
            >
              {section.headline.map((line, i) => (
                <h2 
                  key={i} 
                  className="font-display text-[clamp(1.8rem,3.5vw,4rem)] font-light uppercase tracking-wider leading-tight text-foreground"
                >
                  {line}
                </h2>
              ))}
            </div>
            
            <p 
              className={`section-${sectionNum}-body absolute ${isLeft ? 'left-[10vw]' : 'left-[54vw]'} top-[50vh] max-w-[34vw] text-base text-muted-foreground leading-relaxed`}
              style={{ opacity: 0 }}
            >
              {section.body}
            </p>
            
            {section.badge && (
              <div 
                className={`section-${sectionNum}-badge absolute ${isLeft ? 'left-[10vw]' : 'left-[54vw]'} top-[66vh]`}
                style={{ opacity: 0 }}
              >
                <span className="font-mono text-xs tracking-widest text-primary uppercase">
                  {section.badge}
                </span>
              </div>
            )}
            
            {section.cta && (
              <div 
                className={`section-${sectionNum}-cta absolute ${isLeft ? 'left-[10vw]' : 'left-[54vw]'} top-[64vh]`}
                style={{ opacity: 0 }}
              >
                <button className="btn-primary">
                  {section.cta}
                </button>
              </div>
            )}
          </section>
        );
      })}

      {/* Section 12: Contact */}
      <section className="section-contact relative min-h-screen bg-navy-light py-20 z-[120]">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16">
          {/* Left column - Form */}
          <div>
            <h2 className="contact-title font-display text-4xl md:text-5xl font-light text-foreground mb-6">
              Let's build your mirror.
            </h2>
            <p className="contact-title text-muted-foreground mb-10">
              Tell us what you're building. We'll respond within two business days.
            </p>
            
            <form className="space-y-6">
              <div className="contact-form-field">
                <label className="block text-sm text-muted-foreground mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-navy border border-border rounded-md text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div className="contact-form-field">
                <label className="block text-sm text-muted-foreground mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-navy border border-border rounded-md text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div className="contact-form-field">
                <label className="block text-sm text-muted-foreground mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-navy border border-border rounded-md text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  placeholder="What are you building?"
                />
              </div>
              <button type="submit" className="contact-form-field btn-primary w-full">
                Send
              </button>
            </form>
          </div>
          
          {/* Right column - Principles */}
          <div className="md:pt-20">
            <h3 className="font-mono text-sm tracking-widest text-muted-foreground uppercase mb-8">
              Our Principles
            </h3>
            <ul className="space-y-6">
              {[
                'No training on your data',
                'You own the model',
                'Delete anytime',
              ].map((principle, i) => (
                <li key={i} className="contact-principle flex items-center gap-4">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-mono text-sm text-foreground">{principle}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-16 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">
                GestaltView — Consciousness-serving AI
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                Built with the Beautiful Tapestry Architecture
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
