import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Search, ArrowRight, Shield, Calendar, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { treatments } from '../utils/medicalData';

export default function Treatments() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTreatments = Object.values(treatments).filter(treat => 
    treat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    treat.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
    treat.benefits.some(ben => ben.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-12 text-left">
      
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
        <div className="space-y-4 max-w-2xl">
          <Badge variant="secondary" className="bg-medical-100 text-medical-700 font-bold uppercase tracking-widest">
            Clinic Procedures
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-primary-900 leading-none">
            Interventional Pain Treatments
          </h1>
          <p className="text-lg text-primary-700 leading-relaxed">
            Discover our advanced, FDA-approved outpatient therapies. We focus on non-surgical joint-preservation, muscle spasm release, and nerve-calming procedures.
          </p>
        </div>

        {/* Search Filter */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-full focus:outline-none focus:border-medical-600 focus:ring-1 focus:ring-medical-600 text-sm shadow-sm"
          />
        </div>
      </div>

      {/* 2. TREATMENTS GRID */}
      {filteredTreatments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTreatments.map((treat) => (
            <Card 
              key={treat.id} 
              hoverable 
              variant="white" 
              className="flex flex-col justify-between h-full group border-slate-100 shadow-premium"
            >
              <div className="space-y-5">
                {/* Top Badge and Icon */}
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-medical-50 text-medical-600 rounded-2xl w-12 h-12 flex items-center justify-center group-hover:bg-medical-600 group-hover:text-white transition-colors duration-300">
                    <Activity className="h-6 w-6" />
                  </div>
                  <Badge variant="accent">Minimally Invasive</Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold font-heading text-primary-900 group-hover:text-medical-600 transition-colors">
                    {treat.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> Outpatient Recovery: 1-3 Days
                  </span>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                  {treat.overview}
                </p>
              </div>

              {/* Action and link */}
              <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  FDA Approved
                </span>
                <Link 
                  to={`/treatments/${treat.id}`}
                  className="inline-flex items-center text-sm font-bold text-medical-600 hover:text-medical-700 gap-1.5"
                >
                  <span>Procedure Details</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 space-y-4">
          <p className="text-slate-500 text-base">No treatments found matching your search term.</p>
          <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
            Clear Search
          </Button>
        </div>
      )}

      {/* 3. MOCK HOSPITAL FEE REMINDER PANEL */}
      <Card variant="slate" padding="lg" className="border-slate-200/80 bg-slate-100/50 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-2 max-w-2xl">
          <h3 className="text-xl font-bold font-heading text-primary-900">
            A Financial Advantage: Zero Hidden Facility Charges
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Hospital-owned outpatient departments routinely bill an extra "facility fee" just for scheduling a room. As an independent clinical center, Amara Pain &amp; Spine charges only the single standard physician fee, saving patients and their insurers up to 60% on total procedure costs.
          </p>
        </div>
        <Link to="/contact" className="shrink-0">
          <Button variant="outline">
            Verify Insurance Coverage
          </Button>
        </Link>
      </Card>

    </div>
  );
}
