import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Star, 
  Terminal, 
  Mail, 
  Phone, 
  Linkedin, 
  ExternalLink,
  Download,
  FileText,
  Search,
  Globe,
  Clock,
  Laptop,
  Armchair,
  Headphones,
  Plane,
  Sprout,
  Sparkles,
  HeartPulse,
  Mountain,
  Monitor,
  Map,
  Wine,
  Cloud,
  ChevronDown
} from 'lucide-react';
import { 
  CONTACT_INFO, 
  SKILLS, 
  EXPERIENCE, 
  INDUSTRIES, 
  WORKS_HIGHLIGHTS, 
  SERVICES 
} from './constants';
import { useAppSounds } from './hooks/useAppSounds';

type Section = 'home' | 'about' | 'experience' | 'works' | 'contact';

export default function App() {
  const [section, setSection] = useState<Section>('home');
  const { playTransition, playClick, playHover } = useAppSounds();

  const navigateTo = (sec: Section) => {
    if (sec !== section) playTransition();
    setSection(sec);
  };

  return (
    <div className="min-h-screen selection:bg-brand-primary selection:text-white flex flex-col items-center justify-center p-4 md:p-8">
      {/* Top Header - Hidden components */}
      <header className="fixed top-0 left-0 w-full p-6 md:px-12 flex justify-between items-center z-50">
      </header>

      {/* Main Window Container */}
      <main className="w-full max-w-5xl h-[80vh] min-h-[600px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              borderColor: ["#dbe4f0", "#93c5fd", "#dbe4f0"],
              boxShadow: [
                "0 18px 44px rgba(15, 23, 42, 0.08)",
                "0 18px 44px rgba(37, 99, 235, 0.12)",
                "0 18px 44px rgba(15, 23, 42, 0.08)"
              ]
            }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
              borderColor: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              boxShadow: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="w-full h-full browser-window"
          >
            {/* Browser Header */}
            <div className="h-12 border-b border-brand-outline bg-brand-surface-soft/50 flex items-center px-4 justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5 mr-4">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex gap-4 text-brand-on-background/40">
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => playClick()} onMouseEnter={() => playHover()}>
                    <ArrowLeft size={16} />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => playClick()} onMouseEnter={() => playHover()}>
                    <ArrowRight size={16} />
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} onClick={() => playClick()} onMouseEnter={() => playHover()}>
                    <RotateCw size={16} />
                  </motion.button>
                </div>
              </div>
              
              <div className="flex-1 max-w-xl mx-4">
                <div className="bg-brand-surface border border-brand-outline rounded-full h-7 px-3 flex items-center gap-2 text-[10px] md:text-xs text-brand-on-background/60">
                   <Globe size={12} />
                   <span className="truncate uppercase font-bold tracking-tight">https://facundopaduczak.com/{section}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-brand-on-background/40">
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => playClick()} onMouseEnter={() => playHover()}>
                  <Star size={16} />
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => playClick()} onMouseEnter={() => playHover()}>
                  <Search size={16} />
                </motion.button>
              </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 relative flex flex-col">
              {section === 'home' && (
                <HomeView 
                  onNavigate={navigateTo} 
                />
              )}
              {section === 'about' && <AboutView onNavigate={navigateTo} />}
              {section === 'experience' && <ExperienceView onNavigate={navigateTo} />}
              {section === 'works' && <WorksView onNavigate={navigateTo} />}
              {section === 'contact' && <ContactView onNavigate={navigateTo} />}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Footer */}
      <footer className="fixed bottom-0 left-0 w-full py-4 px-12 bg-brand-dark-panel text-brand-dark-on-surface-muted text-[10px] md:text-[11px] font-bold uppercase tracking-widest flex justify-between items-center z-50">
        <div className="flex gap-2 md:gap-4 font-black">
          <span>Facundo Paduczak</span>
        </div>
        <div className="flex gap-2 md:gap-4">
          <span>Buenos Aires</span>
          <span>Working Worldwide</span>
        </div>
      </footer>
    </div>
  );
}

function HomeView({ onNavigate }: { 
  onNavigate: (s: Section) => void 
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { playClick, playHover } = useAppSounds();

  const navOptions = [
    { label: 'About Me', value: 'about' },
    { label: 'Experience', value: 'experience' },
    { label: 'Works', value: 'works' },
    { label: 'Contact', value: 'contact' }
  ].filter(opt => opt.label.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex-1 flex flex-col items-center justify-center -mt-12 space-y-12">
      {/* Search Header/Logo */}
      <div className="flex flex-col items-center mb-4 select-none group relative">
        <div className="text-[84px] md:text-[96px] font-black tracking-tighter flex relative">
          <span style={{ color: '#4285f4' }}>F</span>
          <span style={{ color: '#ea4335' }}>a</span>
          <span style={{ color: '#fbbc05' }}>c</span>
          <span style={{ color: '#4285f4' }}>u</span>
          <span style={{ color: '#34a853' }}>g</span>
          <span style={{ color: '#ea4335' }}>l</span>
          <span style={{ color: '#4285f4' }}>e</span>
          
          <span className="absolute -right-12 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-success bg-brand-success-soft px-2 py-1 rounded-full uppercase tracking-wider">
            PRO
          </span>
        </div>
      </div>

      {/* SEARCH SYSTEM */}
      <div className="w-full max-w-2xl px-4 relative z-20">
        <div className="relative">
          <div className={`w-full h-14 pl-12 pr-4 bg-white border border-brand-outline shadow-sm flex items-center transition-all ${isDropdownOpen ? 'rounded-t-[28px] ring-2 ring-brand-primary border-transparent' : 'rounded-full hover:shadow-md'}`}>
             <Search className="absolute left-4 text-brand-primary-strong" size={24} strokeWidth={2.5} />
             <input 
                type="text"
                className="w-full h-full bg-transparent outline-none text-[16px] text-brand-on-background placeholder-brand-on-background/40"
                placeholder="Search to learn about this human being"
                value={searchQuery}
                onFocus={() => {
                  setIsDropdownOpen(true);
                  playHover();
                }}
                onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
             />
          </div>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-14 left-0 w-full bg-white border border-brand-outline border-t-0 rounded-b-[28px] shadow-2xl overflow-hidden py-4"
              >
                {navOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      playClick();
                      onNavigate(opt.value as Section);
                    }}
                    onMouseEnter={() => playHover()}
                    className="w-full px-12 py-3 text-left hover:bg-brand-surface-soft flex items-center gap-3 transition-colors text-brand-on-background font-semibold group"
                  >
                    <Clock size={16} className="text-brand-on-background/20" />
                    <span className="flex-1">{opt.label}</span>
                    <ArrowRight size={14} className="text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
                {navOptions.length === 0 && (
                  <div className="px-12 py-4 text-brand-on-background/40 italic">No results found for "{searchQuery}"</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <button 
            onClick={() => {
              playClick();
              onNavigate('works');
            }}
            onMouseEnter={() => playHover()}
            className="h-12 px-6 rounded-full bg-brand-surface-soft text-brand-primary text-sm font-bold border border-brand-outline hover:bg-brand-primary hover:text-white transition-all shadow-sm active:scale-95"
          >
            He's the moment
          </button>
          <button 
            onClick={() => {
              playClick();
              onNavigate('contact');
            }}
            onMouseEnter={() => playHover()}
            className="h-12 px-6 rounded-full bg-brand-surface-soft text-brand-primary text-sm font-bold border border-brand-outline hover:bg-brand-primary hover:text-white transition-all shadow-sm active:scale-95"
          >
            I'm feeling creative
          </button>
        </div>
      </div>
    </div>
  );
}

function AboutView({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const { playClick, playHover } = useAppSounds();
  return (
    <div className="space-y-12">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-black leading-[0.9] tracking-tight uppercase">
          This is not your typical <span className="text-brand-primary">Creative Portfolio.</span><br />
          Thank God.
        </h1>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="flex items-center gap-6"
        >
           <div className="space-y-1">
             <motion.p 
              className="text-3xl font-black italic uppercase tracking-tighter"
              animate={{ color: ['#4285f4', '#ea4335', '#fbbc05', '#34a853', '#4285f4'] }}
              transition={{ repeat: Infinity, duration: 8 }}
             >
              Hola. Hello. Olá.
             </motion.p>
             <p className="text-xs font-medium text-brand-on-background/60">Three languages. One brain. Endless briefs.</p>
           </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-lg leading-relaxed"
        >
          I'm a Buenos Aires-based creative with a degree in Advertising from Morón University and a Cambridge certificate to prove the English isn't just vibes. 
          <span className="font-bold block mt-4">Just Facundo Paduczak — the guy who writes campaigns by day and teaches to advertising students by night.</span>
        </motion.p>
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-black uppercase border-b-4 border-brand-primary inline-block">Skills: The toolkit</h2>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(skill => (
            <span 
              key={skill} 
              onMouseEnter={() => playHover()}
              className="px-4 py-2 bg-brand-surface-soft/50 border border-brand-outline rounded-full text-[10px] font-black tracking-wider hover:bg-brand-primary hover:text-white transition-all cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center py-12">
        <button 
          onClick={() => {
            playClick();
            onNavigate('home');
          }} 
          onMouseEnter={() => playHover()}
          className="font-bold flex items-center gap-2 hover:text-brand-primary group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Go to Home
        </button>
        <button 
          onClick={() => {
            playClick();
            onNavigate('experience');
          }} 
          onMouseEnter={() => playHover()}
          className="font-bold flex items-center gap-2 hover:text-brand-primary group text-brand-primary"
        >
          Next: Experience <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function ExperienceView({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const { playClick, playHover } = useAppSounds();
  const INDUSTRY_ICONS: Record<string, React.ReactNode> = {
    "Airlines": <Plane size={16} />,
    "Agro-industrial": <Sprout size={16} />,
    "Beauty": <Sparkles size={16} />,
    "Health": <HeartPulse size={16} />,
    "Mining": <Mountain size={16} />,
    "Technology": <Monitor size={16} />,
    "Travel": <Map size={16} />,
    "Winery": <Wine size={16} />
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black leading-tight uppercase">
          Where I've been.
        </h1>
        <motion.p 
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="italic text-brand-on-background/60 block"
        >
          (Spoiler: it's varied.)
        </motion.p>
      </div>

      <div className="space-y-16">
        <div>
          {EXPERIENCE.map((exp, i) => {
            return (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative pl-8 pb-12 border-l-2 border-brand-outline hover:border-brand-primary transition-colors last:pb-0"
              >
                <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-brand-outline group-hover:bg-brand-primary transition-colors" />
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black uppercase leading-none group-hover:text-brand-primary transition-colors">{exp.role} — {exp.company}</h3>
                    </div>
                    <p className="text-lg opacity-80">{exp.description}</p>
                  </div>
                  <div className="text-sm font-bold bg-brand-surface-soft px-3 py-1 rounded-full whitespace-nowrap">
                    {exp.period}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="space-y-8 pt-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black uppercase">Industries</h2>
            <p className="text-lg italic text-brand-on-background/80">I've written for all of these. Yes, all of them.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {INDUSTRIES.map((ind, i) => (
               <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                onMouseEnter={() => playHover()}
                className="flex items-center gap-3 p-4 bg-white border border-brand-outline rounded-2xl shadow-sm hover:shadow-md hover:border-brand-primary hover:bg-brand-primary-soft/5 group transition-all cursor-default"
               >
                  <div className="w-8 h-8 rounded-lg bg-brand-surface-soft flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    {INDUSTRY_ICONS[ind] || <Globe size={16} />}
                  </div>
                  <span className="text-sm font-bold text-brand-on-background group-hover:text-brand-primary transition-colors">{ind}</span>
               </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center py-12 border-t border-brand-outline">
        <button 
          onClick={() => {
            playClick();
            onNavigate('home');
          }} 
          onMouseEnter={() => playHover()}
          className="font-bold flex items-center gap-2 hover:text-brand-primary group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Go to Home
        </button>
        <button 
          onClick={() => {
            playClick();
            onNavigate('works');
          }} 
          onMouseEnter={() => playHover()}
          className="font-bold flex items-center gap-2 hover:text-brand-primary group text-brand-primary"
        >
          Next: Works <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function WorksView({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const { playClick, playHover } = useAppSounds();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const TOOLKIT_SKILLS = [
    {
      title: "Content & storytelling",
      description: "Campaigns, copy (ATL / BTL / digital), branded content, video scripts, editorial. Words that earn attention — and keep it."
    },
    {
      title: "Digital & social",
      description: "IG, TikTok, LinkedIn, X. Reels, Shorts, paid social, UGC. Short-form built for real feeds, not portfolio screenshots."
    },
    {
      title: "Strategy & planning",
      description: "Brand positioning, integrated campaigns, cultural insights, go-to-market. The thinking behind the doing."
    },
    {
      title: "AI-powered creative",
      description: "LLMs, prompt engineering, AI workflows, chatbots, immersive experiences. The future, used responsibly."
    },
    {
      title: "Experiential & BTL",
      description: "Activations, launches, POP, merch, sponsorships. Moments people remember — and actually talk about."
    },
    {
      title: "Media & PR",
      description: "Press campaigns, media kits, partnerships, earned media. Getting coverage that doesn't feel like coverage."
    }
  ];

  return (
    <div className="space-y-16">
      {/* Featured Work */}
      <div className="space-y-8">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary">Highlight</h2>
        <div className="max-w-2xl mx-auto bg-brand-surface-soft/30 p-8 rounded-3xl border border-brand-outline space-y-4 text-center">
          <div className="space-y-4">
            {/* Dynamic Animated Clouds Sky */}
            <div className="relative w-full h-32 md:h-36 overflow-hidden rounded-2xl bg-gradient-to-b from-blue-500/10 via-blue-400/5 to-transparent border border-blue-100/20 flex items-center justify-center mb-6 shadow-inner select-none">
              {/* Floating Airplane */}
              <motion.div
                animate={{
                  y: [-5, 5, -5],
                  rotate: [-1, 2, -1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute z-10 text-brand-primary/40 flex flex-col items-center gap-1"
              >
                <Plane size={36} className="rotate-[15deg] text-brand-primary filter drop-shadow-sm" strokeWidth={1.5} />
                <span className="text-[8px] font-black tracking-widest uppercase opacity-40">UNITED</span>
              </motion.div>

              {/* Drifting Clouds */}
              {[
                { size: 48, opacity: 0.5, duration: 22, delay: 0, top: "15%" },
                { size: 64, opacity: 0.35, duration: 32, delay: -10, top: "40%" },
                { size: 36, opacity: 0.6, duration: 16, delay: -4, top: "10%" },
                { size: 52, opacity: 0.45, duration: 27, delay: -18, top: "55%" },
                { size: 40, opacity: 0.3, duration: 20, delay: -7, top: "30%" },
              ].map((c, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: c.duration,
                    repeat: Infinity,
                    ease: "linear",
                    delay: c.delay,
                  }}
                  className="absolute pointer-events-none"
                  style={{ 
                    top: c.top, 
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start"
                  }}
                >
                  <Cloud 
                    size={c.size} 
                    className="text-brand-primary/15 fill-brand-primary/[0.02]" 
                    style={{ opacity: c.opacity }} 
                  />
                </motion.div>
              ))}

              {/* Sun/Light subtle ambient glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_100%)] pointer-events-none" />
            </div>

            <h3 className="text-3xl font-black uppercase leading-[1.1]">{WORKS_HIGHLIGHTS[0].title}</h3>
            <p className="text-brand-on-background/80 leading-relaxed">
              {WORKS_HIGHLIGHTS[0].description}
            </p>
            <div className="pt-2">
              <a 
                href={WORKS_HIGHLIGHTS[0].link} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => playClick()}
                onMouseEnter={() => playHover()}
                className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold py-3 px-6 rounded-full hover:bg-brand-primary-strong transition-all hover:shadow-lg active:scale-95"
              >
                {WORKS_HIGHLIGHTS[0].cta} <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Toolkit Section */}
      <div className="space-y-6 max-w-2xl mx-auto">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-brand-primary">SKILLS: TOOLKIT</h2>
        <div className="border border-brand-outline rounded-3xl overflow-hidden divide-y divide-brand-outline bg-white shadow-sm">
          {TOOLKIT_SKILLS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`group transition-all duration-300 ${isOpen ? 'bg-brand-primary-soft/5 border-l-4 border-l-brand-primary' : 'hover:bg-brand-surface-soft/20 border-l-4 border-l-transparent'}`}
              >
                <button
                  onClick={() => {
                    playClick();
                    setOpenIndex(isOpen ? null : idx);
                  }}
                  onMouseEnter={() => playHover()}
                  className="w-full h-16 px-6 flex items-center justify-between text-left font-bold text-sm tracking-tight text-brand-on-background group-hover:text-brand-primary transition-colors focus:outline-none select-none"
                >
                  <span className="font-bold tracking-tight text-base uppercase">{item.title}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-brand-on-background/40 group-hover:text-brand-primary"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-brand-on-background/80 text-xs sm:text-sm leading-relaxed font-semibold">
                        {item.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center py-12">
        <button 
          onClick={() => {
            playClick();
            onNavigate('home');
          }} 
          onMouseEnter={() => playHover()}
          className="font-bold flex items-center gap-2 hover:text-brand-primary group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Go to Home
        </button>
        <button 
          onClick={() => {
            playClick();
            onNavigate('contact');
          }} 
          onMouseEnter={() => playHover()}
          className="font-bold flex items-center gap-2 hover:text-brand-primary group text-brand-primary"
        >
          Next: Contact <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function ContactView({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const { playClick, playHover } = useAppSounds();

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black leading-tight uppercase">
          Got a brief? A hunch?<br />
          A half-baked idea?
        </h1>
        <h2 className="text-2xl font-bold italic text-brand-primary underline decoration-2 underline-offset-8">Let's talk.</h2>
        <p className="text-lg max-w-xl text-brand-on-background/80">
          I'm available for freelance projects, creative collaborations and conversations that go somewhere interesting.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <ContactButton 
          icon={<Mail size={20} />} 
          label="Email" 
          value={CONTACT_INFO.email} 
          href={`mailto:${CONTACT_INFO.email}`} 
          onAction={() => playClick()}
          onHover={() => playHover()}
        />
        <ContactButton 
          icon={<Phone size={20} />} 
          label="Phone" 
          value={CONTACT_INFO.phone} 
          href={`tel:${CONTACT_INFO.phone.replace(/ /g, '')}`} 
          onAction={() => playClick()}
          onHover={() => playHover()}
        />
        <ContactButton 
          icon={<Linkedin size={20} />} 
          label="LinkedIn" 
          value="Facundo Paduczak" 
          href={CONTACT_INFO.linkedin} 
          onAction={() => playClick()}
          onHover={() => playHover()}
        />
        <ContactButton 
          icon={<ExternalLink size={20} />} 
          label="Portfolio" 
          value="Behance Collection" 
          href={CONTACT_INFO.portfolio} 
          onAction={() => playClick()}
          onHover={() => playHover()}
        />
      </div>

      <div className="flex justify-center mt-8">
        <a 
          href="/Facundo_Paduczak_CV_ATS.pdf" 
          download="Facundo_Paduczak_CV_ATS.pdf"
          onClick={() => playClick()}
          onMouseEnter={() => playHover()}
          className="flex items-center justify-center gap-3 bg-brand-on-background text-white font-black uppercase tracking-widest text-[10px] py-4 px-8 rounded-full hover:bg-brand-primary transition-all active:scale-95 shadow-xl hover:shadow-brand-primary/20"
        >
          <FileText size={16} /> Download CV [ATS]
        </a>
      </div>

      <div className="flex justify-between items-center py-12">
        <button 
          onClick={() => {
            playClick();
            onNavigate('home');
          }} 
          onMouseEnter={() => playHover()}
          className="font-bold flex items-center gap-2 hover:text-brand-primary group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Go to Home
        </button>
        <button 
          onClick={() => {
            playClick();
            onNavigate('about');
          }} 
          onMouseEnter={() => playHover()}
          className="font-bold flex items-center gap-2 hover:text-brand-primary group text-brand-primary"
        >
          Back to Intro <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function ContactButton({ icon, label, value, href, onAction, onHover }: { 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  href: string,
  onAction?: () => void,
  onHover?: () => void
}) {
  return (
    <a 
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      onClick={onAction}
      onMouseEnter={onHover}
      className="p-6 border border-brand-outline rounded-2xl flex items-start gap-4 hover:border-brand-primary hover:bg-brand-surface-soft/30 transition-all group"
    >
      <div className="w-10 h-10 rounded-full bg-brand-surface-soft flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-xs font-black uppercase text-brand-on-background/40 mb-1">{label}</div>
        <div className="font-bold truncate max-w-[180px]">{value}</div>
      </div>
    </a>
  );
}
