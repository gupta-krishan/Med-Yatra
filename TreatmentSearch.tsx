import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, Briefcase, PlusCircle, Baby, Bone, Eye, ShieldCheck, ArrowRight, Globe } from 'lucide-react';
import { TREATMENTS, Treatment } from '../constants';

const categoryIcons: Record<string, React.ReactNode> = {
  'Cardiology': <Heart className="w-5 h-5 text-red-500" />,
  'Oncology': <ShieldCheck className="w-5 h-5 text-orange-500" />,
  'Orthopedics': <Bone className="w-5 h-5 text-slate-500" />,
  'Fertility': <Baby className="w-5 h-5 text-pink-500" />,
  'Dentistry': <PlusCircle className="w-5 h-5 text-blue-400" />,
  'Ophthalmology': <Eye className="w-5 h-5 text-indigo-400" />,
  'Transplants': <Briefcase className="w-5 h-5 text-emerald-500" />,
};

export default function TreatmentSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(TREATMENTS.map(t => t.category)));
    return cats;
  }, []);

  const filteredTreatments = useMemo(() => {
    return TREATMENTS.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           t.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? t.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section id="treatments" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-brand-mint font-bold uppercase tracking-widest text-[10px] mb-4 flex items-center gap-2"
            >
              <Globe className="w-3 h-3" /> Specialised Treatments
            </motion.div>
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold"
            >
              Find Your <span className="text-brand-mint italic font-light">Treatment</span>
            </motion.h2>
          </div>

          <div className="relative flex-1 max-w-lg w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            <input
              type="text"
              placeholder="Search surgery, disease, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-brand-bg rounded-[32px] border-2 border-transparent focus:border-brand-mint/10 focus:outline-none transition-all placeholder:text-slate-300 shadow-sm"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto pb-8 gap-3 no-scrollbar mb-16">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-8 py-4 rounded-full font-bold text-xs whitespace-nowrap transition-all uppercase tracking-widest ${!selectedCategory ? 'bg-brand-teal text-white shadow-xl' : 'bg-brand-bg text-slate-400 border border-slate-100 hover:border-brand-mint/30'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-8 py-4 rounded-full font-bold text-xs whitespace-nowrap transition-all flex items-center gap-2 uppercase tracking-widest ${selectedCategory === cat ? 'bg-brand-teal text-white shadow-xl' : 'bg-brand-bg text-slate-400 border border-slate-100 hover:border-brand-mint/30'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTreatments.map((treatment, idx) => (
              <motion.div
                key={treatment.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white p-8 rounded-[40px] border border-slate-100 hover:border-brand-mint/20 transition-all hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="mb-8 flex justify-between items-start">
                  <div className="w-14 h-14 bg-brand-soft rounded-2xl flex items-center justify-center text-brand-mint group-hover:scale-110 transition-transform">
                    {categoryIcons[treatment.category] || <PlusCircle className="w-7 h-7" />}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-brand-mint/5 text-brand-mint px-4 py-1.5 rounded-full border border-brand-mint/10">
                    {treatment.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 flex-grow tracking-tight">{treatment.name}</h3>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed line-clamp-3">
                  {treatment.description}
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold uppercase text-slate-300 tracking-widest">In India</span>
                    <span className="text-2xl font-display font-bold text-brand-teal">{treatment.avgCostIndia}</span>
                  </div>
                  <div className="h-[2px] bg-brand-soft relative overflow-hidden rounded-full">
                     <div className="absolute top-0 left-0 h-full bg-brand-mint w-1/3"></div>
                  </div>
                  <div className="flex justify-between items-center opacity-30">
                    <span className="text-[10px] uppercase text-slate-500 tracking-widest">In USA</span>
                    <span className="text-sm font-bold text-slate-500 line-through">{treatment.avgCostUSA}</span>
                  </div>
                </div>

                <button className="w-full py-5 bg-brand-bg text-brand-teal font-bold rounded-2xl border border-slate-100 group-hover:bg-brand-teal group-hover:text-white transition-all flex items-center justify-center gap-3">
                  Inquire Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTreatments.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-brand-bg rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-400">No treatments found</h3>
            <p className="text-slate-500 mt-2">Try searching for a different term or category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
