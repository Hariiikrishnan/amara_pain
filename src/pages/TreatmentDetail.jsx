import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Activity, ArrowLeft, CheckCircle2, ChevronRight, Calendar, Phone, ShieldCheck, Clock, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Accordion from '../components/ui/Accordion';
import { treatments } from '../utils/medicalData';

export default function TreatmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const treat = treatments[id];

  // Dynamically update metadata for SEO
  useEffect(() => {
    if (treat) {
      document.title = treat.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', treat.metaDesc);
      }
    }
    window.scrollTo(0, 0);
  }, [treat]);

  if (!treat) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 text-center space-y-6 text-left">
        <AlertCircle className="h-16 w-16 text-cta-600 mx-auto" />
        <h1 className="text-3xl font-bold font-heading text-primary-900">Procedure Not Found</h1>
        <p className="text-slate-500">We couldn't find the pain treatment procedure you were looking for.</p>
        <Button variant="primary" onClick={() => navigate('/treatments')}>
          Back to Treatments
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-8 text-left">
      {/* 1. BREADCRUMBS & BACK LINK */}
      <div className="flex flex-col gap-4">
        <Link 
          to="/treatments" 
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-medical-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Treatments</span>
        </Link>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Link to="/" className="hover:text-primary-900">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/treatments" className="hover:text-primary-900">Pain Treatments</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-500 truncate">{treat.title}</span>
        </div>
      </div>

      {/* 2. HEADER BLOCK */}
      <div className="border-b border-slate-100 pb-8 space-y-4">
        <Badge variant="accent" className="bg-accent-100 text-accent-700 font-bold uppercase tracking-widest">
          Procedure Guide
        </Badge>
        <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight text-primary-900 leading-tight">
          {treat.title}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-medical-600" />
          Outpatient Recovery: 1-3 Days &bull; Minimally Invasive
        </p>
      </div>

      {/* 3. DUAL COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Clinical Content */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black font-heading text-primary-900">Procedure Overview</h2>
            <p className="text-primary-700 leading-relaxed text-base">
              {treat.overview}
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black font-heading text-primary-900">Clinical Benefits</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Precision interventional procedures offer major advantages over major surgery and daily oral pain medications:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-primary-700">
              {treat.benefits.map((benefit, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2.5 bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                  <CheckCircle2 className="h-4.5 w-4.5 text-accent-500 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recovery */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black font-heading text-primary-900">Recovery &amp; Aftercare</h2>
            <p className="text-primary-700 leading-relaxed text-base">
              {treat.recovery}
            </p>
          </div>

          {/* FAQs */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black font-heading text-primary-900">Frequently Asked Questions</h2>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-premium">
              {treat.faqs.map((faq, fIdx) => (
                <Accordion key={fIdx} title={faq.q}>
                  {faq.a}
                </Accordion>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Booking Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <Card variant="white" padding="lg" className="border-slate-100 shadow-xl relative sticky top-6">
            <div className="absolute top-0 right-0 w-20 h-20 bg-medical-50 rounded-full blur-xl -z-10" />
            
            <div className="space-y-4 text-left">
              <Badge variant="secondary" className="bg-medical-100 text-medical-700 font-bold">
                Affordable Pain Tech
              </Badge>
              <h3 className="text-xl font-bold font-heading text-primary-900 leading-tight">
                Schedule {treat.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Take a vital step toward long-term relief. Our outpatient procedures are performed with absolute precision in our local Charlotte clinic.
              </p>
              
              <div className="space-y-3 pt-2 text-xs text-slate-600 border-t border-slate-55">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>FDA-approved clinical methods</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Fluoroscopic (X-ray) precision</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Zero hospital facility fee markup</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <Link 
                to="/book" 
                state={{ prefilledTreatment: treat.title }}
                className="w-full block"
              >
                <Button variant="primary" className="w-full" icon={Calendar}>
                  Request Procedure
                </Button>
              </Link>
              
              <a href="tel:7045039338" className="w-full block">
                <Button variant="outline" className="w-full text-primary-900 border-slate-300" icon={Phone}>
                  Call 704-503-9338
                </Button>
              </a>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
