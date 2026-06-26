import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Search, ArrowRight, ShieldCheck, Calendar, Info } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { conditions } from '../utils/medicalData';

export default function Conditions() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConditions = Object.values(conditions).filter(cond => 
    cond.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cond.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cond.symptoms.some(sym => sym.toLowerCase().includes(searchQuery.toLowerCase())) ||
    cond.causes.some(cau => cau.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-12 text-left">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-4 max-w-2xl">
          <Badge variant="accent" className="bg-accent-100 text-accent-700 font-bold uppercase tracking-widest">
            Patient Education
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-primary-900 leading-none">
            Pain Conditions We Treat
          </h1>
          <p className="text-lg text-primary-700 leading-relaxed">
            Understanding your pain is the first step toward recovery. Explore our comprehensive, physician-reviewed guides on symptoms, causes, and non-surgical relief options.
          </p>
        </div>

        {/* Dynamic Search Bar */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search symptoms or pain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-medical-600 focus:ring-1 focus:ring-medical-600 text-sm shadow-sm"
          />
        </div>
      </div>

      {/* 2. WARNING CALLOUT */}
      <Card variant="slate" padding="sm" className="bg-slate-100/50 border-slate-200 flex gap-3.5 items-start">
        <Info className="h-5 w-5 text-medical-600 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong>Important Note:</strong> The conditions listed below represent broad clinical categories we treat. Pain can manifest in highly complex, overlapping ways. A physical evaluation and review of recent diagnostics (such as MRIs or X-rays) by our double board-certified specialist is necessary to formulate an accurate, targeted treatment plan.
        </p>
      </Card>

      {/* 3. CONDITIONS CARDS GRID */}
      {filteredConditions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredConditions.map((cond) => (
            <Card 
              key={cond.id} 
              hoverable 
              variant="white" 
              className="flex flex-col justify-between h-full group border-slate-100 shadow-premium"
            >
              <div className="space-y-4">
                {/* Header Icon */}
                <div className="p-3 bg-medical-50 text-medical-600 rounded-2xl w-12 h-12 flex items-center justify-center group-hover:bg-medical-600 group-hover:text-white transition-colors duration-300">
                  <Activity className="h-6 w-6" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-primary-900 group-hover:text-medical-600 transition-colors">
                    {cond.title}
                  </h3>
                  <Badge variant="secondary" className="bg-medical-50 text-medical-700 font-medium">
                    Evidence-Based Care
                  </Badge>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {cond.shortDesc}
                </p>
              </div>

              {/* Action and link */}
              <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Clinically Proven
                </span>
                <Link 
                  to={`/conditions/${cond.id}`}
                  className="inline-flex items-center text-sm font-bold text-medical-600 hover:text-medical-700 gap-1.5"
                >
                  <span>Explore Guide</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 space-y-4">
          <p className="text-slate-500 text-base">No conditions found matching your search term.</p>
          <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
            Clear Search
          </Button>
        </div>
      )}

      {/* 4. CALL TO ACTION SECTION */}
      <Card variant="slate" padding="lg" className="bg-gradient-to-br from-primary-900 to-slate-900 border-none text-white text-center space-y-6 pt-12 pb-12 mt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-medical-500/10 rounded-full blur-3xl -z-10" />
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black font-heading tracking-tight">
            Ready to Find Long-Lasting Pain Relief?
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            You do not have to live with chronic, debilitating pain. Book a comprehensive, same-week consultation with our double board-certified specialist today.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link to="/book">
            <Button variant="primary" icon={Calendar}>
              Book Appointment
            </Button>
          </Link>
          <a href="tel:7045039338">
            <Button variant="outline" className="text-white border-slate-600 hover:bg-slate-800" icon={Phone}>
              Call 704-503-9338
            </Button>
          </a>
        </div>
      </Card>

    </div>
  );
}
