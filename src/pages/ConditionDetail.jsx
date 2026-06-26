import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Activity, ArrowLeft, CheckCircle2, ChevronRight, Calendar, Phone, ShieldCheck, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Accordion from '../components/ui/Accordion';
import { conditions } from '../utils/medicalData';

export default function ConditionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cond = conditions[id];

  // Dynamically update page titles and meta descriptions for SEO
  useEffect(() => {
    if (cond) {
      document.title = cond.metaTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', cond.metaDesc);
      }
    }
    window.scrollTo(0, 0);
  }, [cond]);

  if (!cond) {
    return (
      <div className="max-w-7xl mx-auto py-20 px-4 text-center space-y-6 text-left">
        <AlertCircle className="h-16 w-16 text-cta-600 mx-auto" />
        <h1 className="text-3xl font-bold font-heading text-primary-900">Condition Not Found</h1>
        <p className="text-slate-500">We couldn't find the pain condition you were looking for.</p>
        <Button variant="primary" onClick={() => navigate('/conditions')}>
          Back to Conditions
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full py-12 px-4 md:px-8 max-w-7xl mx-auto space-y-8 text-left">
      {/* 1. BREADCRUMBS & BACK LINK */}
      <div className="flex flex-col gap-4">
        <Link 
          to="/conditions" 
          className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-medical-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Conditions</span>
        </Link>

        {/* Breadcrumb row */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Link to="/" className="hover:text-primary-900">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/conditions" className="hover:text-primary-900">Conditions We Treat</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-500 truncate">{cond.title}</span>
        </div>
      </div>

      {/* 2. HEADER BLOCK */}
      <div className="border-b border-slate-100 pb-8 space-y-4">
        <Badge variant="secondary" className="bg-medical-100 text-medical-700 font-bold uppercase tracking-widest">
          Pain Guide
        </Badge>
        <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tight text-primary-900 leading-tight">
          {cond.title}
        </h1>
        <p className="text-lg md:text-xl text-primary-700 leading-relaxed max-w-4xl font-medium">
          {cond.shortDesc}
        </p>
      </div>

      {/* 3. DUAL-COLUMN CONTENT LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Detailed Content */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black font-heading text-primary-900">Condition Overview</h2>
            <p className="text-primary-700 leading-relaxed text-base">
              {cond.overview}
            </p>
          </div>

          {/* Symptoms */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black font-heading text-primary-900">Common Symptoms</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Patients suffering from {cond.title.toLowerCase()} often report experiencing one or more of the following symptoms:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-primary-700">
              {cond.symptoms.map((sym, sIdx) => (
                <li key={sIdx} className="flex items-start gap-2 bg-white border border-slate-100 p-3.5 rounded-xl shadow-sm">
                  <CheckCircle2 className="h-4.5 w-4.5 text-accent-500 shrink-0 mt-0.5" />
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black font-heading text-primary-900">Underlying Causes</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Pain is a complex signal. {cond.title.toLowerCase()} can be triggered by structural wear-and-tear, injury, or nerve irritation:
            </p>
            <ul className="space-y-2.5 text-sm text-primary-700">
              {cond.causes.map((cause, cIdx) => (
                <li key={cIdx} className="flex gap-2.5 items-start">
                  <span className="font-bold text-medical-600 text-lg leading-none mt-0.5">&bull;</span>
                  <span className="leading-relaxed">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Treatments */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black font-heading text-primary-900">Clinical Treatment Options</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              We specialize in targeted, non-surgical therapies that alleviate inflammation, block pain transmission, and promote tissue healing:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cond.treatments.map((treat, tIdx) => (
                <Link key={tIdx} to={treat.path}>
                  <Card hoverable variant="white" padding="sm" className="border-slate-200/80 flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-medical-50 text-medical-600 rounded-xl group-hover:bg-medical-600 group-hover:text-white transition-colors">
                        <Activity className="h-4.5 w-4.5" />
                      </div>
                      <span className="font-bold text-sm text-primary-900 group-hover:text-medical-600 transition-colors">
                        {treat.name}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Condition Specific FAQs */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black font-heading text-primary-900">Frequently Asked Questions</h2>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-premium">
              {cond.faqs.map((faq, fIdx) => (
                <Accordion key={fIdx} title={faq.q}>
                  {faq.a}
                </Accordion>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Appointment Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Schedule Card */}
          <Card variant="white" padding="lg" className="border-slate-100 shadow-xl relative sticky top-6">
            <div className="absolute top-0 right-0 w-20 h-20 bg-medical-50 rounded-full blur-xl -z-10" />
            
            <div className="space-y-4 text-left">
              <Badge variant="primary" className="bg-cta-100 text-cta-700 font-bold">
                Direct Clinic Intake
              </Badge>
              <h3 className="text-xl font-bold font-heading text-primary-900 leading-tight">
                Schedule Relief for {cond.title.split(' & ')[0]}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Take the first step toward reclaiming your quality of life. Consult directly with our board-certified pain specialist.
              </p>
              
              <div className="space-y-3 pt-2 text-xs text-slate-600 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Double board-certified specialist care</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Affordable flat fee (no facility fees)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Rapid schedule bookings</span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              {/* Button linking to Booking Wizard, passing state context if needed */}
              <Link 
                to="/book" 
                state={{ prefilledCondition: cond.title }}
                className="w-full block"
              >
                <Button variant="primary" className="w-full" icon={Calendar}>
                  Book Online Now
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
