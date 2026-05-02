import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Plane, ShieldCheck, Award, Users, Heart, Star, Sparkles, MoveDown, Globe, CheckCircle, MessageSquare } from 'lucide-react';
import Navigation from './components/Navigation';
import AIAssistant from './components/AIAssistant';
import SymptomChecker from './components/SymptomChecker';
import TreatmentSearch from './components/TreatmentSearch';

const TRUST_LOGOS = [
  "Apollo Hospitals", "Fortis Healthcare", "Medanta - The Medicity", 
  "Max Healthcare", "Artemis Hospital", "Manipal Hospitals", 
  "BLK-Max Super Speciality", "Sir Ganga Ram Hospital"
];

const TESTIMONIALS = [
  {
    name: "Luca B.",
    country: "Italy",
    text: "AI + Human touch = MedYatra magic. Even after I arrived in India, the team stayed connected. Efficient and stress-free.",
    image: "https://i.pravatar.cc/150?u=luca"
  },
  {
    name: "Hana S.",
    country: "S. Korea",
    text: "Trustworthy, Transparent, Totally Worth it. The local agents quoted me nearly double. MedYatra booked everything flawlessly.",
    image: "https://i.pravatar.cc/150?u=hana"
  },
  {
    name: "Olivia Wilson",
    country: "UK",
    text: "From confusion to clarity in minutes! My surgeon already understood my case before I even left home. Game changer!",
    image: "https://i.pravatar.cc/150?u=olivia"
  }
];

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { entry.isIntersecting && entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navigation />
      <AIAssistant />

      {/* Hero Section Split Layout */}
      <header className="relative pt-32 pb-20 px-6 lg:px-12 bg-gradient-to-br from-brand-soft via-white to-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-brand-mint/5 -skew-x-12 translate-x-1/2 z-0"></div>
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-12 h-0.5 bg-brand-mint"></span>
              <span className="text-sm font-bold text-brand-mint uppercase tracking-widest">Medical Travel Made Effortless</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              Compare Treatment Costs in India & <span className="text-brand-mint">Save Up to 70%</span>
            </h1>
            
            <p className="text-xl text-slate-500 mb-10 max-w-xl">
              Speak to our MedYatra AI companion – We've Helped 10,000+ People Like You find high-quality, affordable world-class care.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button 
                onClick={() => document.getElementById('ai-assistant-toggle')?.click()}
                className="px-8 py-5 bg-brand-teal text-white rounded-2xl font-bold shadow-xl hover:bg-brand-cyan transition-all flex items-center justify-center gap-3"
              >
                <MessageSquare className="w-5 h-5" />
                Chat With AI Agent
              </button>
              <button 
                onClick={() => document.getElementById('treatments')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-5 bg-white text-brand-teal border border-slate-200 rounded-2xl font-bold hover:border-brand-mint transition-all"
              >
                Compare Treatment Cost
              </button>
            </div>

            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-slate-100 shadow-sm">
                <Users className="w-4 h-4 text-brand-mint" />
                <span className="text-xs font-bold">10000+ patients served</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-slate-100 shadow-sm">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold">4.9 average rating</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/50 rounded-full border border-slate-100 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-brand-mint" />
                <span className="text-xs font-bold">Trusted by Hospitals</span>
              </div>
            </div>
          </motion.div>

          {/* Right Consultation Form */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="glass-card p-8 md:p-10 rounded-[32px] relative">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-mint/20 rounded-full blur-2xl"></div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-display font-bold mb-2">Get Free Consultation</h3>
                <p className="text-slate-400 text-sm">Fill out the form below and our medical experts will contact you within 24 hours.</p>
              </div>

              <form className="space-y-4">
                <input type="text" placeholder="Patient Name" className="input-field" />
                <select className="input-field appearance-none">
                  <option>Home Country</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                  <option>Other</option>
                </select>
                <select className="input-field appearance-none">
                  <option>Treatment Needed</option>
                  <option>Cardiac Surgery</option>
                  <option>Joint Replacement</option>
                  <option>IVF</option>
                  <option>Oncology</option>
                </select>
                <textarea placeholder="Describe Current Medical Problem" className="input-field h-24 resize-none"></textarea>
                <input type="tel" placeholder="Phone Number (with country code)" className="input-field" />
                
                <button className="w-full py-5 bg-brand-teal text-white rounded-2xl font-bold text-lg hover:shadow-2xl transition-all mt-4">
                  Request Custom Plan
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Stats Bar */}
      <section className="bg-brand-teal py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div className="scroll-reveal">
            <div className="text-4xl md:text-5xl font-display font-bold mb-2">10,000+</div>
            <div className="text-xs uppercase tracking-widest opacity-60">Patients Served</div>
          </div>
          <div className="scroll-reveal delay-100">
            <div className="text-4xl md:text-5xl font-display font-bold mb-2">4.9/5</div>
            <div className="text-xs uppercase tracking-widest opacity-60">Satisfaction Rating</div>
          </div>
          <div className="scroll-reveal delay-200">
            <div className="text-4xl md:text-5xl font-display font-bold mb-2">30+</div>
            <div className="text-xs uppercase tracking-widest opacity-60">Cities Covered</div>
          </div>
          <div className="scroll-reveal delay-300">
            <div className="text-4xl md:text-5xl font-display font-bold mb-2">500+</div>
            <div className="text-xs uppercase tracking-widest opacity-60">Verified Doctors</div>
          </div>
        </div>
      </section>

      {/* Realistic Imagery & Trust Section */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-video rounded-[32px] overflow-hidden shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1631815541552-39a352723f2a?auto=format&fit=crop&q=80&w=2000" 
                alt="Doctor talking to patient" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-teal/10"></div>
            </div>
            <div className="absolute -bottom-8 -left-8 glass-card p-6 rounded-2xl z-20 hidden md:block">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-brand-mint" />
                <div>
                  <div className="font-bold">Globally Trusted</div>
                  <div className="text-xs text-slate-400">By Thousands of Patients</div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-mint/5 rounded-full blur-[100px] -z-10"></div>
          </div>

          <div className="scroll-reveal">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Ensuring Best <br />Treatment Experience
            </h2>
            <p className="text-slate-500 mb-10 text-lg leading-relaxed">
              We connect you with JCI-accredited hospitals that maintain the highest international standards. Our local team ensures you're never alone in your journey.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Personalised Care", desc: "Custom recovery plans tailored to your specific medical history." },
                { title: "Zero Wait Time", desc: "Priority booking system skips months of domestic waiting lists." },
                { title: "Travel & Stay", desc: "End-to-end management of flights, visa, and local transport." },
                { title: "AI Precision", desc: "Gemini-powered symptom analysis for instant specialist routing." }
              ].map(f => (
                <div key={f.title} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand-mint/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-brand-mint" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{f.title}</h4>
                    <p className="text-sm text-slate-400">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-24 px-6 bg-brand-soft">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Patient Success Stories</h2>
          <p className="text-slate-400">Real people, real results. Thousands have found their path to healing with MedYatra.</p>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="scroll-reveal bg-white p-8 rounded-3xl border border-brand-teal/5 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full" />
                <div>
                  <h4 className="font-bold leading-none">{t.name}</h4>
                  <span className="text-xs text-slate-400">{t.country}</span>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                </div>
              </div>
              <p className="italic text-slate-600 leading-relaxed group-hover:text-brand-teal transition-colors underline decoration-brand-mint/20 decoration-2 underline-offset-4">
                "{t.text}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Symptom Checker section */}
      <SymptomChecker />

      {/* Featured Procedures Section - Inspired by Screenshot 4 */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Precision Treatments</h2>
            <p className="text-slate-400">Specialized procedures with world-class success rates.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                title: "BALD TO BOLD", 
                subtitle: "Your Hair Comeback", 
                desc: "Advanced FUE & FUT methods for natural-looking regrowth.",
                services: ["Hairline Design", "FUE & FUT", "Post-Op Care"],
                color: "bg-[#e2f3f1] text-[#0d9488]",
                image: "https://images.unsplash.com/photo-1620331713541-7f89217ceee0?auto=format&fit=crop&q=80&w=1000"
              },
              { 
                title: "DRIP & SMILE", 
                subtitle: "Dental Excellence", 
                desc: "From basic cleaning to full smile makeovers with cutting-edge tech.",
                services: ["Implants", "Teeth Whitening", "Smile Makeovers"],
                color: "bg-[#fcf3f6] text-[#cc5a8b]",
                image: "https://images.unsplash.com/photo-1593054941684-6f1c73a11cca?auto=format&fit=crop&q=80&w=1000"
              },
              { 
                title: "AGELESS BEAUTY", 
                subtitle: "Cosmetic Surgery", 
                desc: "Redefine your beauty with confidence and global cost savings.",
                services: ["Botox & Fillers", "Liposuction", "Skin Rejuvenation"],
                color: "bg-[#fef8e6] text-[#b45309]",
                image: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?auto=format&fit=crop&q=80&w=1000"
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`${card.color} rounded-[40px] flex flex-col h-full relative group overflow-hidden shadow-sm hover:shadow-2xl transition-all`}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-black mb-1 leading-tight">{card.title}</h3>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50">{card.subtitle}</h4>
                  <p className="text-current/80 text-sm font-medium mb-6 leading-relaxed">
                    {card.desc}
                  </p>
                  <div className="mt-auto">
                    <ul className="space-y-2 mb-8">
                      {card.services.map(s => (
                        <li key={s} className="flex items-center gap-2 text-xs font-bold opacity-70">
                          <CheckCircle className="w-3 h-3" />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full py-3 bg-white text-brand-teal rounded-2xl font-bold text-xs shadow-sm hover:shadow-lg transition-all">
                      View Packages
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments section */}
      <TreatmentSearch />

      {/* Partners Automated Flow */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Our Hospital Network</span>
        </div>
        <div className="flow-container">
          <div className="flow-content">
            {[...TRUST_LOGOS, ...TRUST_LOGOS].map((l, i) => (
              <div key={i} className="px-16 text-3xl md:text-5xl font-display font-bold text-slate-200 hover:text-brand-mint transition-colors">
                {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer id="contact" className="py-20 px-6 bg-brand-teal text-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-8 h-8 text-brand-mint" />
              <span className="text-3xl font-display font-bold">MedYatra.</span>
            </div>
            <p className="text-white/60 max-w-sm mb-8 leading-relaxed">
              We make world-class medical travel effortless by combining AI efficiency with the soul of Indian hospitality.
            </p>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-mint transition-colors cursor-pointer"><Globe className="w-5 h-5" /></div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-mint transition-colors cursor-pointer"><Users className="w-5 h-5" /></div>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-brand-mint text-sm uppercase tracking-widest">Solutions</h4>
            <ul className="space-y-4 opacity-70 text-sm">
              <li><a href="#symptom-checker" className="hover:opacity-100">AI Symptom Analysis</a></li>
              <li><a href="#treatments" className="hover:opacity-100">Compare Surgery Costs</a></li>
              <li><a href="#partners" className="hover:opacity-100">JCI Hospital Network</a></li>
              <li><a href="#" className="hover:opacity-100">Medical Visa Assistance</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-brand-mint text-sm uppercase tracking-widest">Reach Us</h4>
            <p className="opacity-70 text-sm mb-4">info@medyatra.ai <br />+91 1800 555 000</p>
            <p className="text-[10px] opacity-40">Gurgaon Cyber Hub, Sector 24, India</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-40 uppercase tracking-widest">
          <p>© 2025 MedYatra Hub. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
