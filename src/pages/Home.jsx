import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Zap, Shield, Smile, Star, Award, CheckCircle2, 
  ArrowRight, Phone, Calendar, Clock, Sparkles, AlertCircle,
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import { conditions, treatments } from '../utils/medicalData';
import Badge from '../components/ui/Badge';
import '../styles/skeuomorphic.css';

export default function Home() {
  const [activeTreatmentTab, setActiveTreatmentTab] = useState('epidural-injections');
  const sliderRef = useRef(null);

  // 1. Scroll-Driven Animations on Native Scroll (Repeatable on Reverse Scroll)
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          } else {
            entry.target.classList.remove('revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.animate-reveal');
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
    };
  }, []);

  // 2. Mouse Wheel Scroll Translation for Video slider (Move left/right smoothly on scroll down/up)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      const isScrollable = slider.scrollWidth > slider.clientWidth;
      if (isScrollable) {
        // Prevent default browser scroll only when not hitting the boundaries
        const atStart = slider.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1 && e.deltaY > 0;

        if (!atStart && !atEnd) {
          e.preventDefault();
          slider.scrollBy({ left: e.deltaY * 1.05, behavior: 'auto' });
        }
      }
    };

    slider.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      slider.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Snap-Slider Scroll Actions
  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({ left: -cardWidth * 0.7, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.offsetWidth;
      sliderRef.current.scrollBy({ left: cardWidth * 0.7, behavior: 'smooth' });
    }
  };

  const highlightGrid = [
    { title: 'Restore Function', desc: 'Restore better quality of life and reclaim active days.', icon: Activity },
    { title: 'Quality Pain-Free Time', desc: 'Helping you find comfortable, pain-free daily moments.', icon: Sparkles },
    { title: 'Double Board Certified', desc: 'Evidence-based, safe interventional pain care.', icon: Award },
    { title: 'Caring Clinical Staff', desc: 'We listen to, understand, and validate your pain.', icon: Smile },
    { title: 'Result-Oriented Plans', desc: 'Tailored treatments engineered for optimum outcomes.', icon: CheckCircle2 },
  ];

  // Written Testimonials (Original Website content)
  const originalTestimonials = [
    {
      name: "L.P.",
      rating: 5,
      date: "Patient Review",
      text: "Dr. Amara took time to listen and pay full attention to my condition. He update my treatment plan. I trust his care with my pain condition."
    },
    {
      name: "D.L.",
      rating: 5,
      date: "Patient Review",
      text: "I can get back to work and feel normal again thanks to the prompt and targeted care from Dr. Amara."
    },
    {
      name: "M.P.",
      rating: 5,
      date: "Patient Review",
      text: "He talked to my primary care physician and updated my treatment plan thoroughly. Excellent clinical follow-up."
    },
    {
      name: "S.A.",
      rating: 5,
      date: "Patient Review",
      text: "I trust his care with my pain condition. He explains complex spine anatomy in a way that actually makes sense."
    }
  ];

  // Google Reviews
  const googleReviews = [
    { name: "Sarah M.", rating: 5, date: "2 weeks ago", text: "Dr. Amara is wonderful! He actually listened to my pain concerns after years of other doctors brushing me off. The injections have given me my life back." },
    { name: "Robert K.", rating: 5, date: "1 month ago", text: "Independent clinic with zero hidden hospital fees. Flat rates are highly transparent. Excellent double board-certified treatment for my sciatica." },
    { name: "Elena D.", rating: 5, date: "3 months ago", text: "The medical weight loss program combined with knee blocks changed everything. I have lost 25 pounds and can walk upstairs without knee pain!" }
  ];

  // All 10 YouTube Video Testimonials from the client site
  const testimonialVideos = [
    {
      title: "Knee, Joint & Sciatica Pain Relief",
      embedId: "nMBF_8eDTFo",
      desc: "Knee and joint pain patient sharing their anxiety-free treatment experience."
    },
    {
      title: "Sacroiliac & Lower Back Pain Recovery",
      embedId: "TKW6w1Y_IYQ",
      desc: "Patient sharing their journey to pain-free walking after targeted therapy."
    },
    {
      title: "Severe Hip Pain, Bursa & Leg Pain Relief",
      embedId: "4_vkimyqdR8",
      desc: "Recovery from hip bursa inflammation and walking pain."
    },
    {
      title: "Carpal Tunnel Syndrome & Wrist Pain Relief",
      embedId: "FB0bGFWK22A",
      desc: "Patient recovery from wrist pain and numbness."
    },
    {
      title: "Leg, Ankle Pain & Plantar Fasciitis Relief",
      embedId: "T_W9sDm_ufA",
      desc: "Successful management of severe plantar foot pain."
    },
    {
      title: "Chronic Low Back & Hip Pain Management",
      embedId: "IddX14qZisM",
      desc: "Demonstrating restored movement and relief from lumbar spine pain."
    },
    {
      title: "Sciatica & Low Back Pain Relief",
      embedId: "IpnNYRjszB4",
      desc: "Mother with toddler sharing her return to comfortable child-rearing."
    },
    {
      title: "Post-Back Surgery & Severe Arthritis Pain Care",
      embedId: "Svn4RGvSMbw",
      desc: "Successful pain reduction after surgical fail and arthritis."
    },
    {
      title: "Lumbar Spine Treatment & Pain Relief",
      embedId: "GSLb3a0xqF0",
      desc: "Restored motion and function through targeted epidural therapy."
    },
    {
      title: "Shoulder & Chronic Joint Pain Relief",
      embedId: "du0gV8O3e74",
      desc: "Outpatient shoulder block giving significant range-of-motion back."
    }
  ];

  const insuranceLogos = [
    "Medicare", "Medicaid", "Blue Cross Blue Shield", "Medcost", "United Healthcare", 
    "Cigna", "Aetna", "Humana", "Novant Employee Plan", "Workers' Comp"
  ];

  return (
    <div className="w-full skeuomorphic-console min-h-screen relative">
      
      {/* Premium Floating Ambient Background Orbs */}
      <div className="absolute top-[-5%] right-[-10%] w-[550px] h-[550px] bg-cyan-200/25 rounded-full blur-[140px] pointer-events-none animate-float-slow z-0" />
      <div className="absolute top-[35%] left-[-15%] w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-[150px] pointer-events-none animate-float-delayed z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] bg-cyan-100/20 rounded-full blur-[130px] pointer-events-none animate-float-slow z-0" />

      {/* 1. HERO SECTION (Clean White Space & Raised Bezel Panel - Straight typography) */}
      <section className="relative py-12 md:py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
        <div className="console-panel p-6 md:p-12 lg:p-16 animate-reveal revealed">
          
          <div className="console-screw top-4 left-4" />
          <div className="console-screw top-4 right-4" />
          <div className="console-screw bottom-4 left-4" />
          <div className="console-screw bottom-4 right-4" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Info Control Board */}
            <div className="lg:col-span-7 space-y-8 text-left">
              
              {/* Premium Logo & Badge */}
              <div className="flex items-center gap-3">
                <svg className="h-10 w-10 text-medical-600 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="9" y="2" width="6" height="20" rx="3" fill="currentColor" opacity="0.15" />
                  <path d="M12 2V22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M7 6H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M5 11H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M7 16H17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="12" cy="6" r="1.5" fill="#0d9488" />
                  <circle cx="12" cy="11" r="1.5" fill="#0d9488" />
                  <circle cx="12" cy="16" r="1.5" fill="#0d9488" />
                </svg>
                <div className="px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-xs font-bold uppercase tracking-wider text-medical-700 flex items-center gap-1.5 shadow-sm">
                  <span className="console-led console-led-cyan" />
                  Double Board-Certified Pain Care
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading tracking-tight text-slate-900 leading-[1.15]">
                Restore Your Active Life, <span className="text-medical-600">Pain-Free</span>
              </h1>
              
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-2xl">
                Precision interventional pain management and spine care in Charlotte, NC. We locate the exact source of your pain and deliver evidence-based, minimally invasive relief.
              </p>

              {/* Zero Facility Fees Inset Panel */}
              <div className="flex items-center gap-4 p-4 console-inset max-w-md">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow border border-emerald-450 shrink-0">
                  <Shield className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Zero Hospital Facility Fees</h4>
                  <p className="text-xs text-slate-600 mt-0.5">We charge one flat, affordable office fee. No hidden costs.</p>
                </div>
              </div>

              {/* Dual CTAs (High Contrast Coral Action Button) */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/book" className="console-button-gel console-button-gel-cta px-8 py-4 text-base md:text-lg text-white whitespace-nowrap">
                  <Calendar className="h-5.5 w-5.5 mr-2" />
                  Book Appointment
                </Link>
                
                <a href="tel:7045039338" className="console-button-gel console-button-outline px-8 py-4 text-base md:text-lg whitespace-nowrap">
                  <Phone className="h-5.5 w-5.5 mr-2" />
                  Call: 704-503-9338
                </a>
              </div>

              {/* Digital Display Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 max-w-lg">
                <div className="console-display-panel p-3 text-center">
                  <span className="block text-2xl md:text-3xl font-bold font-mono text-cyan-400">15+</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Years Exp</span>
                </div>
                <div className="console-display-panel p-3 text-center">
                  <span className="block text-2xl md:text-3xl font-bold font-mono text-emerald-400">0</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Facility Fees</span>
                </div>
                <div className="console-display-panel p-3 text-center">
                  <span className="block text-2xl md:text-3xl font-bold font-mono text-cyan-400">100%</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Patient Care</span>
                </div>
              </div>
            </div>

            {/* Right Side: Clean Modern Plaque Profile Card (No Screen Glare distortion) */}
            <div className="lg:col-span-5">
              <div className="console-panel p-8 relative flex flex-col justify-between min-h-[380px] bg-slate-50/10">
                <div className="console-screw top-3 left-3" />
                <div className="console-screw top-3 right-3" />
                <div className="console-screw bottom-3 left-3" />
                <div className="console-screw bottom-3 right-3" />

                <div className="flex justify-between items-start">
                  <span className="px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200 text-[10px] font-bold text-cyan-800 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="console-led console-led-cyan" />
                    Charlotte Clinic
                  </span>
                  <Activity className="h-6 w-6 text-medical-600 animate-pulse" />
                </div>

                <div className="space-y-4 text-left pt-8 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 block">
                    Pain &amp; Spine Specialist
                  </span>
                  <h3 className="text-3xl font-bold font-heading text-slate-900 leading-tight">
                    Dr. Ashvin K. Amara, MD
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-sans">
                    Anesthesiology &amp; Interventional Pain Medicine Fellowship Trained Specialist
                  </p>
                </div>

                <div className="border-t border-slate-200 pt-4 flex justify-between items-center text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="console-led console-led-green" />
                    Accepting New Patients
                  </span>
                  <span>Board Certified</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. HIGHLIGHTS GRID (Tactile Instrument Board) */}
      <section className="relative py-12 px-4 md:px-8 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {highlightGrid.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="console-card-tactile p-6 relative overflow-hidden flex flex-col text-left space-y-4 animate-reveal"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                {/* Glowing LED status light */}
                <span className="console-led console-led-cyan absolute top-4 right-4" />
                
                <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl border border-cyan-100 self-start shadow-inner">
                  <Icon className="h-5.5 w-5.5" />
                </div>
                
                <div>
                  <h4 className="font-bold text-base text-slate-950">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INTERACTIVE PAIN SELECTOR (Anatomical Clipboard Cards) */}
      <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center space-y-12">
          
          <div className="space-y-4 max-w-3xl mx-auto animate-reveal">
            <Badge variant="accent" className="bg-cyan-50 text-cyan-800 border border-cyan-200">
              Conditions We Treat
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tight text-slate-900">
              Where is Your Pain?
            </h2>
            <p className="text-base md:text-lg text-slate-700">
              Select your primary area of discomfort to explore diagnostic details, common causes, and non-surgical relief options.
            </p>
          </div>

          {/* Conditions Grid styled as clinic document charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-slate-200">
            {Object.values(conditions).map((cond, idx) => (
              <div 
                key={cond.id} 
                className="console-card-tactile bg-slate-50/20 pt-6 pb-6 px-6 flex flex-col justify-between text-left h-full group relative animate-reveal border-t-[8px] border-t-slate-350"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Visual binder clip at top */}
                <div className="console-binder-clip" />

                <div className="space-y-4 pt-4">
                  <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl w-12 h-12 flex items-center justify-center border border-cyan-155 shadow-inner group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                    <Activity className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold font-heading text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {cond.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">{cond.shortDesc}</p>
                </div>
                
                <div className="pt-4 mt-6 border-t border-slate-200/80">
                  <Link 
                    to={`/conditions/${cond.id}`}
                    className="console-button-gel console-button-gel-teal py-2.5 px-4 text-xs w-full flex items-center justify-center gap-1.5 text-white"
                  >
                    <span>Explore Relief Options</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 animate-reveal">
            <Link to="/conditions" className="console-button-gel console-button-outline px-8 py-3.5 text-sm font-bold">
              View All Conditions
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. TREATMENTS SHOWCASE (Filing Divider Tab Board) */}
      <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
        <div className="text-center space-y-12">
          
          <div className="space-y-4 max-w-3xl mx-auto animate-reveal">
            <Badge variant="secondary" className="bg-cyan-50 text-cyan-800 border border-cyan-200">
              Advanced Clinical Procedures
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tight text-slate-900">
              Precision-Guided Treatments
            </h2>
            <p className="text-base md:text-lg text-slate-700">
              We specialize in state-of-the-art outpatient procedures performed under high-definition fluoroscopy and ultrasound.
            </p>
          </div>

          {/* Filing Cabinet Tab Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start animate-reveal">
            
            {/* Tabs list (Staggered folders index list) */}
            <div className="lg:col-span-4 flex flex-col space-y-1.5 relative z-10">
              {Object.values(treatments).map((treat) => (
                <button
                  key={treat.id}
                  onClick={() => setActiveTreatmentTab(treat.id)}
                  className={`w-full text-left px-5 py-4 rounded-l-xl font-bold transition-all duration-300 ease-out cursor-pointer flex items-center justify-between border-l-4 ${
                    activeTreatmentTab === treat.id
                      ? 'bg-white border-l-cyan-600 text-cyan-600 shadow-md translate-x-1'
                      : 'bg-slate-200/50 border-l-slate-350 hover:bg-white hover:border-l-cyan-400 hover:text-cyan-600 hover:translate-x-0.5 hover:-translate-y-[1px] hover:shadow-sm text-slate-700'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`console-led h-2 w-2 ${activeTreatmentTab === treat.id ? 'console-led-cyan' : 'bg-slate-350'}`} />
                    {treat.title}
                  </span>
                  <ArrowRight className={`h-4 w-4 transition-transform duration-200 ${
                    activeTreatmentTab === treat.id ? 'translate-x-0' : '-translate-x-2 opacity-0'
                  }`} />
                </button>
              ))}
            </div>

            {/* Cabinet Drawer body */}
            <div className="lg:col-span-8">
              {Object.values(treatments).map((treat) => {
                if (treat.id !== activeTreatmentTab) return null;
                return (
                  <div key={treat.id} className="console-folder-body min-h-[420px] flex flex-col justify-between animate-fade-in">
                    <div className="console-screen-glass" />
                    
                    <div className="space-y-6">
                      <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                        <h3 className="text-2xl md:text-3xl font-black font-heading text-slate-900">
                          {treat.title}
                        </h3>
                        <span className="px-2.5 py-1 rounded bg-cyan-50 border border-cyan-200 text-xs font-bold text-cyan-800 uppercase tracking-wide">
                          Outpatient Procedure
                        </span>
                      </div>

                      <div className="space-y-4">
                        <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                          {treat.overview}
                        </p>
                        
                        {/* Benefits list */}
                        <div className="space-y-2.5 pt-2">
                          <h4 className="font-bold text-xs text-slate-900 uppercase tracking-widest">Key Advantages:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-slate-700">
                            {treat.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4.5 w-4.5 text-cyan-600 shrink-0 mt-0.5" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-8 border-t border-slate-250 flex flex-wrap gap-4 items-center justify-between">
                      <span className="console-display-panel flex items-center gap-2 p-2.5 text-xs text-cyan-400 font-mono">
                        <Clock className="h-4 w-4 text-cyan-400" />
                        RECOVERY: 1-3 DAYS TYPICALLY
                      </span>
                      
                      <Link to={`/treatments/${treat.id}`} className="console-button-gel console-button-gel-secondary px-6 py-3 text-sm text-white">
                        Detailed Procedure Guide
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 5. DOCTOR SPOTLIGHT (Professional Credentials workspace) */}
      <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10" id="meet-staff">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bio Text */}
          <div className="lg:col-span-7 space-y-6 text-left animate-reveal">
            <Badge variant="primary" className="bg-cyan-50 text-cyan-800 border border-cyan-200">
              Meet Your Specialist
            </Badge>
            <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tight text-slate-900">
              Dr. Ashvin K. Amara, MD
            </h2>
            <h4 className="text-lg font-bold text-cyan-600 leading-none mt-1">
              Double Board-Certified Pain Management Specialist
            </h4>
            
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Dr. Ashvin K. Amara, MD, is a highly trusted double board-certified physician in both Anesthesiology and Interventional Pain Medicine. He completed his comprehensive fellowship training in pain management and has dedicated over 15 years to helping patients in Charlotte, NC, find relief from complex chronic and acute pain conditions.
            </p>

            <p className="text-sm md:text-base text-slate-700 leading-relaxed font-semibold">
              Our core clinic value is simple: We listen to your concerns, locate the exact pain generators, and design personalized plans utilizing the least invasive interventional treatments. We strive for permanent clinical recovery.
            </p>

            {/* Bulleted credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs md:text-sm text-slate-700">
              <div className="flex items-start gap-2.5 p-3 console-inset animate-reveal">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0" />
                <div>
                  <strong className="text-slate-950 block">Double Board Certified</strong>
                  American Board of Anesthesiology
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 console-inset animate-reveal">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0" />
                <div>
                  <strong className="text-slate-950 block">Fellowship Trained</strong>
                  Interventional Pain Medicine Specialist
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 console-inset animate-reveal">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0" />
                <div>
                  <strong className="text-slate-950 block">Languages Spoken</strong>
                  English, Spanish, Hindi, Telugu
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 console-inset animate-reveal">
                <CheckCircle2 className="h-5 w-5 text-cyan-600 shrink-0" />
                <div>
                  <strong className="text-slate-950 block">Independent Clinic</strong>
                  No hospital markup or facility fees
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/about" className="console-button-gel console-button-outline px-6 py-3.5 text-sm font-bold">
                Read Dr. Amara's Story
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Right Column: Plaque Certificate Framed Board */}
          <div className="lg:col-span-5 space-y-6 animate-reveal">
            <div className="console-panel p-6 md:p-8 relative overflow-hidden border-2 border-slate-350 bg-slate-50/20">
              <div className="console-screw top-3 left-3" />
              <div className="console-screw top-3 right-3" />
              <div className="console-screw bottom-3 left-3" />
              <div className="console-screw bottom-3 right-3" />

              {/* Plaque stamp details */}
              <div className="flex justify-between items-center mb-6 pt-2">
                <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl border border-cyan-150 shadow-inner">
                  <Award className="h-7 w-7" />
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-emerald-50 border border-emerald-250 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  <span className="console-led console-led-green h-1.5 w-1.5" />
                  Active Certifications
                </span>
              </div>

              <div className="space-y-4 text-left">
                <h4 className="font-bold text-xs text-slate-800 uppercase tracking-widest font-sans">
                  Clinical Board Certifications
                </h4>
                <ul className="space-y-3.5 text-xs md:text-sm text-slate-700 leading-relaxed font-sans">
                  <li className="flex gap-2">
                    <span className="font-bold text-cyan-600 shrink-0">&bull;</span>
                    <span>Board Certified in <strong>Pain Medicine</strong> - American Board of Anesthesiology</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-cyan-600 shrink-0">&bull;</span>
                    <span>Board Certified in <strong>Anesthesiology</strong> - American Board of Anesthesiology</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-cyan-600 shrink-0">&bull;</span>
                    <span>Licensed Medical Provider in <strong>North Carolina</strong></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Office hours LCD clock readout */}
            <div className="console-display-panel p-4 flex items-center gap-4 text-left">
              <Clock className="h-7 w-7 text-cyan-400 shrink-0 animate-pulse" />
              <div>
                <h4 className="font-bold text-xs text-cyan-500 uppercase tracking-widest font-sans">Operation Schedule</h4>
                <p className="text-[11px] text-slate-300 font-mono mt-0.5">MON-FRI: 08:00 - 17:00 // Same-Week Slots Open</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. PATIENT TESTIMONIALS SECTION (Aggressively Animated + Scroll Momentum Eased) */}
      <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto space-y-16 z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto animate-reveal">
          <Badge variant="accent" className="bg-cyan-50 text-cyan-800 border border-cyan-200">
            Patient Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tight text-slate-900">
            What Our Pain Patients Say
          </h2>
          <p className="text-base md:text-lg text-slate-700">
            Explore verified patient testimonials, Google reviews, and recovery stories from individuals returning to active daily living.
          </p>
        </div>

        {/* 6A. DEDICATED YOUTUBE VIDEO TESTIMONIALS SLIDER (10 Videos, Always Visible with arrows) */}
        <div className="space-y-6 animate-reveal">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-4 border-cyan-600 pl-3">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                Video Recovery Journeys
              </h3>
              <p className="text-xs text-slate-500 mt-1">10 Success Stories of patients sharing their journey to pain relief.</p>
            </div>
            
            {/* Slider control buttons */}
            <div className="flex gap-2">
              <button 
                onClick={scrollLeft}
                aria-label="Scroll left video testimonials"
                className="console-button-gel console-button-gel-teal w-10 h-10 p-0 text-white rounded-full flex items-center justify-center shadow"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={scrollRight}
                aria-label="Scroll right video testimonials"
                className="console-button-gel console-button-gel-teal w-10 h-10 p-0 text-white rounded-full flex items-center justify-center shadow"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Video Horizontalsnap slider container */}
          <div 
            ref={sliderRef}
            className="video-slider-deck flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory text-left scrollbar-thin"
          >
            {testimonialVideos.map((video, idx) => (
              <div 
                key={idx} 
                className="video-slider-card snap-start console-panel p-5 relative overflow-hidden group transition-all duration-300"
              >
                <div className="console-screw top-2 left-2" />
                <div className="console-screw top-2 right-2" />
                <div className="console-screw bottom-2 left-2" />
                <div className="console-screw bottom-2 right-2" />

                {/* Framed Video Container */}
                <div className="relative aspect-video w-full bg-slate-950 rounded-xl overflow-hidden border-2 border-slate-300 shadow-inner">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.embedId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <div className="console-screen-glass" />
                </div>
                
                <div className="pt-4 space-y-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <h4 className="text-base font-bold text-slate-950 group-hover:text-cyan-700 transition-colors">
                    {video.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {video.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6B. WRITTEN & GOOGLE REVIEWS (Always Visible Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 text-left">
          
          {/* Left Column: Original Site Testimonials (CK, LP, DL, TP) */}
          <div className="lg:col-span-7 space-y-6 animate-reveal">
            <h3 className="text-xl font-bold text-slate-900 border-l-4 border-cyan-600 pl-3">
              Patient Written Reviews
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {originalTestimonials.map((review, idx) => (
                <div key={idx} className="p-5 sticky-note-testimonial relative flex flex-col justify-between space-y-4 animate-reveal">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{review.name}</span>
                    <span className="text-[10px] text-slate-500 font-semibold px-2 py-0.5 bg-slate-100 rounded">
                      Verified Patient
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Google Reviews */}
          <div className="lg:col-span-5 space-y-6 animate-reveal">
            <h3 className="text-xl font-bold text-slate-900 border-l-4 border-cyan-600 pl-3">
              Google Verified Reviews
            </h3>
            
            <div className="space-y-6">
              {googleReviews.map((review, idx) => (
                <div key={idx} className="p-5 console-inset relative flex flex-col justify-between space-y-3 animate-reveal">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 text-xs block">{review.name}</span>
                      <span className="text-[9px] text-slate-500 font-medium">{review.date}</span>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic font-sans">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. INSURANCE & QUICK INTAKE (Document Binder Plaque) */}
      <section className="relative py-20 px-4 md:px-8 max-w-7xl mx-auto z-10">
        <div className="console-panel p-6 md:p-12 animate-reveal">
          
          <div className="console-screw top-4 left-4" />
          <div className="console-screw top-4 right-4" />
          <div className="console-screw bottom-4 left-4" />
          <div className="console-screw bottom-4 right-4" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Insurance Badges list */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Badge variant="primary" className="bg-cyan-50 text-cyan-800 border border-cyan-200">
                Billing &amp; Access
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black font-heading tracking-tight text-slate-900">
                Accepted Insurances &amp; Billing
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                We work diligently with major insurance networks to make double board-certified interventional pain care accessible and affordable. We accept Medicare, Medicaid, workers' compensation, and most major commercial networks.
              </p>

              {/* Insurance Tags (Plastic click tags) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                {insuranceLogos.map((logo, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2 p-3 bg-white border border-slate-200/80 rounded-xl font-bold text-xs text-slate-800 shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-cyan-600 shrink-0" />
                    <span>{logo}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed max-w-xl">
                <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>No Doctor Referral Needed:</strong> Patients can schedule consultations directly without an existing referral. For referring physicians, we provide rapid same-week schedule slots and direct clinical feedback.
                </p>
              </div>
            </div>

            {/* Right: Intake Form folder binder */}
            <div className="lg:col-span-5">
              <div className="bg-white p-6 md:p-8 border border-slate-350 rounded-2xl shadow-xl relative text-left space-y-6 border-l-[16px] border-l-cyan-600 animate-reveal">
                
                {/* Binder Visual Rings */}
                <div className="absolute left-[-2px] top-8 w-1 h-3.5 rounded bg-slate-350 shadow" />
                <div className="absolute left-[-2px] top-1/4 w-1 h-3.5 rounded bg-slate-350 shadow" />
                <div className="absolute left-[-2px] top-1/2 w-1 h-3.5 rounded bg-slate-350 shadow" />
                <div className="absolute left-[-2px] top-3/4 w-1 h-3.5 rounded bg-slate-350 shadow" />
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-heading text-slate-900">
                    Patient Referral &amp; Intake
                  </h3>
                  <p className="text-xs text-slate-600">
                    Please download, print, and fill out our registration packets in advance to streamline your check-in process.
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  {/* Referral pack links */}
                  <a 
                    href="https://amarapain.com/wp-content/uploads/2025/06/Referral-package-APS.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-4 console-inset hover:bg-slate-100 border border-slate-200 transition-colors group cursor-pointer"
                  >
                    <div>
                      <span className="block font-bold text-xs md:text-sm text-slate-900 group-hover:text-cyan-600 transition-colors">
                        Referral Package (APS-Referral)
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Physician guidelines [PDF]</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a 
                    href="https://amarapain.com/wp-content/themes/amara-pain/documents/APS-New-patient-intake-form.docx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between p-4 console-inset hover:bg-slate-100 border border-slate-200 transition-colors group cursor-pointer"
                  >
                    <div>
                      <span className="block font-bold text-xs md:text-sm text-slate-900 group-hover:text-cyan-600 transition-colors">
                        New Patient Intake Pack
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Demographics &amp; history form [DOCX]</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <Link to="/book" className="console-button-gel console-button-gel-cta w-full py-3.5 text-sm text-white">
                    <Calendar className="h-4.5 w-4.5 mr-2" />
                    Book Appointment Online
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
