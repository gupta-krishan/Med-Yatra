import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Stethoscope, Activity, AlertCircle, Loader2, ArrowRight, X } from 'lucide-react';
import { analyzeSymptoms, SymptomResult } from '../services/geminiService';

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<SymptomResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const res = await analyzeSymptoms(symptoms);
      setResult(res);
    } catch (err) {
      setError("Unable to process your request. Please try describing your symptoms again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-amber-400 text-brand-teal';
      default: return 'bg-brand-mint text-brand-teal';
    }
  };

  return (
    <section id="symptom-checker" className="py-24 px-6 bg-brand-soft overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-mint/10 rounded-full blur-3xl -mr-48 -mt-48"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-mint/10 border border-brand-mint/20 text-brand-mint text-xs font-bold uppercase tracking-wider mb-6"
        >
          <Stethoscope className="w-4 h-4" />
          AI-Powered Diagnosis
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Smart Health Analysis</h2>
        <p className="text-slate-500 max-w-2xl mx-auto mb-16 px-4">
          Describe your symptoms in your own words. Our AI analyzes your inputs to suggest potential causes and connects you with the right specialists in India.
        </p>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-slate-100 text-left max-w-4xl mx-auto"
        >
          {!result ? (
            <div className="space-y-8">
              <div className="relative">
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="Describe your symptoms (e.g. Sharp chest pain after walking for 10 minutes...)"
                  className="w-full h-48 p-8 bg-brand-bg rounded-[32px] border-2 border-transparent focus:border-brand-mint/20 focus:outline-none transition-all placeholder:text-slate-300 text-xl resize-none"
                />
                <div className="absolute bottom-6 right-8 flex items-center gap-2 text-slate-300">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">AI Engine Active</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Fatigue', 'Blurry Vision', 'Knee Pain', 'Dizziness', 'Persistent Cough'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSymptoms(prev => prev ? `${prev}, ${tag}` : tag)}
                    className="px-4 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-500 hover:bg-brand-mint/10 hover:text-brand-mint hover:border-brand-mint/20 transition-all text-xs font-bold"
                  >
                    + {tag}
                  </button>
                ))}
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-500 rounded-2xl flex items-center gap-3 text-sm border border-red-100">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </div>
              )}

              <button
                disabled={isAnalyzing || !symptoms.trim()}
                onClick={handleAnalyze}
                className="w-full bg-brand-teal text-white py-6 rounded-[32px] font-bold text-xl hover:bg-brand-cyan transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    AI Analyzing...
                  </>
                ) : (
                  <>
                    Start Analysis
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-display font-bold">Analysis Output</h3>
                    <p className="text-slate-400 text-sm">Based on your description</p>
                  </div>
                  <button 
                    onClick={() => {setResult(null); setSymptoms('');}}
                    className="w-12 h-12 rounded-full border border-slate-100 flex items-center justify-center hover:bg-brand-mint/10 hover:text-brand-mint transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-brand-bg rounded-[32px] border border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                       <Activity className="w-3 h-3" /> Potential Diagnosis
                    </div>
                    <p className="text-2xl font-bold">{result.diagnosis}</p>
                  </div>

                  <div className="p-8 bg-brand-bg rounded-[32px] border border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                       <AlertCircle className="w-3 h-3" /> Urgency Level
                    </div>
                    <div className={`inline-block px-4 py-1 rounded-full font-bold uppercase text-[10px] tracking-widest ${getUrgencyColor(result.urgency)}`}>
                      {result.urgency}
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-brand-soft rounded-[32px] border border-brand-mint/10">
                   <div className="text-xs font-bold uppercase tracking-widest text-brand-mint mb-4">Recommended Next Steps</div>
                   <p className="text-slate-600 leading-relaxed mb-6 italic">"{result.recommendation}"</p>
                   <div className="flex items-center gap-3">
                     <span className="text-xs font-bold text-slate-400">Specialist:</span>
                     <span className="px-4 py-1.5 bg-white rounded-full border border-slate-200 text-sm font-bold text-brand-teal">{result.specialist}</span>
                   </div>
                </div>

                <button 
                  className="w-full bg-brand-teal text-white py-5 rounded-[32px] font-bold text-lg"
                  onClick={() => document.getElementById('treatments')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Match with Indian Hospitals
                </button>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Info({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
