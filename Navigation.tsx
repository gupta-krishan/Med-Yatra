import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Phone, Globe, Users } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'AI Checker', href: '#symptom-checker' },
    { name: 'Compare Cost', href: '#' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? 'py-4 bg-white/90 backdrop-blur-2xl shadow-xl shadow-brand-teal/5' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-teal rounded-[14px] flex items-center justify-center text-brand-mint shadow-xl border border-white/20">
              <Globe className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-brand-teal leading-none">MedYatra<span className="text-brand-mint">.</span></span>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">Making Travel Effortless</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-widest hover:text-brand-mint transition-all relative group ${isScrolled ? 'text-brand-teal' : 'text-brand-teal/80'}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-mint transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button className="px-6 py-2.5 bg-white border border-slate-200 text-brand-teal rounded-xl font-bold text-sm hover:border-brand-mint transition-all">
              Login
            </button>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-2.5 bg-brand-teal text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-brand-teal/10 transition-all hover:bg-brand-cyan"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-brand-teal"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-mint origin-left"
          style={{ scaleX }}
        />
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-white z-[120] lg:hidden flex flex-col p-10 pt-32"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 p-2 bg-slate-50 rounded-full">
              <X className="w-8 h-8" />
            </button>
            
            <div className="flex flex-col gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-display font-bold hover:text-brand-mint transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-slate-100 flex flex-col gap-4">
              <button className="w-full py-5 bg-brand-teal text-white rounded-2xl font-bold text-lg">
                Book Consultation
              </button>
              <div className="flex justify-center gap-6 pt-4 text-slate-300">
                <Globe /> <Phone /> <Users />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
