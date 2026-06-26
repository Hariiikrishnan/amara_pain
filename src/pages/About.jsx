import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CheckCircle2, Shield, Calendar, MapPin, Heart, BookOpen, HeartHandshake } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

export default function About() {
  const staff = [
    {
      name: "Dr. Ashvin K. Amara, MD",
      role: "Founder & Lead Physician",
      credentials: "Double Board-Certified in Pain Medicine & Anesthesiology",
      bio: "Dr. Amara has spent over 15 years diagnosing and treating complex spinal and joint pain disorders. He believes in a patient-centered model that combines advanced diagnostic blocks with minimally invasive outpatient treatments, avoiding unnecessary surgery. He is double board-certified by the American Board of Anesthesiology.",
      education: [
        "Fellowship in Pain Management - Interventional Pain Medicine",
        "Residency in Anesthesiology - Board Certified",
        "Medical Doctor Degree (MD) - Double Board Certified Specialist"
      ],
      memberships: [
        "American Society of Anesthesiologists (ASA)",
        "American Society of Interventional Pain Physicians (ASIPP)",
        "North Carolina Medical Society (NCMS)"
      ]
    },
    {
      name: "Nurse Practitioners (NPs)",
      role: "Advanced Clinical Providers",
      credentials: "Board-Certified Family Nurse Practitioners",
      bio: "Our highly trained Family Nurse Practitioners work in close clinical collaboration with Dr. Amara. They provide comprehensive evaluations, trigger point injections, chronic pain management follow-ups, and metabolic coaching for our medical weight loss program. They are dedicated to validating your concerns and supporting your daily recovery.",
      education: [
        "Master of Science in Nursing (MSN) - Advanced Practice Registered Nurse",
        "Board Certified Nurse Practitioners (AANP / ANCC)",
        "Specialized Clinical Training in Myofascial Release & Joint Injections"
      ],
      memberships: [
        "American Association of Nurse Practitioners (AANP)",
        "North Carolina Nurses Association (NCNA)"
      ]
    }
  ];

  return (
    <div className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-16 text-left">
      {/* 1. PAGE HEADER */}
      <div className="space-y-4 max-w-3xl border-b border-slate-100 pb-8">
        <Badge variant="secondary" className="bg-medical-100 text-medical-700 font-bold uppercase tracking-widest">
          About Our Clinic
        </Badge>
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-primary-900 leading-none">
          Our Story &amp; Mission
        </h1>
        <p className="text-lg text-primary-700 leading-relaxed">
          Amara Pain &amp; Spine Management is an independent, physician-owned practice dedicated to delivering high-quality, transparent, and patient-centered interventional pain care in Charlotte, NC.
        </p>
      </div>

      {/* 2. OUR STORY & VALUE CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <h2 className="text-2xl md:text-3xl font-black font-heading text-primary-900">
            Dedicated to Safe, Evidence-Based Pain Relief
          </h2>
          <p className="text-primary-700 leading-relaxed">
            We believe that chronic pain management requires a comprehensive, customized approach. Pain is highly personal, and a cookie-cutter treatment plan is rarely effective. Our interventional pain specialists are dedicated to accurately diagnosing your specific pain generators using advanced diagnostic nerve blocks and imaging.
          </p>
          <p className="text-primary-700 leading-relaxed">
            We strive to relieve your pain utilizing the least invasive, non-surgical treatments first, such as epidural steroid injections, radiofrequency ablation, and regenerative therapies. By focusing on joint-preservation and nerve-calming procedures, we help you restore function and find quality, pain-free moments in your daily life.
          </p>

          {/* Three core values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-premium">
              <Heart className="h-6 w-6 text-medical-600 mb-2" />
              <h4 className="font-bold text-sm text-primary-900 mb-1">Human Element</h4>
              <p className="text-xs text-slate-500">We validate your pain and treat every patient with empathy.</p>
            </div>
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-premium">
              <Shield className="h-6 w-6 text-accent-600 mb-2" />
              <h4 className="font-bold text-sm text-primary-900 mb-1">Affordable Care</h4>
              <p className="text-xs text-slate-500">Flat office fee with absolutely zero facility fee markups.</p>
            </div>
            <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-premium">
              <BookOpen className="h-6 w-6 text-cta-600 mb-2" />
              <h4 className="font-bold text-sm text-primary-900 mb-1">Evidence-Based</h4>
              <p className="text-xs text-slate-500">FDA-approved interventional clinical techniques.</p>
            </div>
          </div>
        </div>

        {/* Value Proposition Graphic Card */}
        <div className="lg:col-span-5">
          <Card variant="slate" padding="lg" className="border-slate-200 space-y-6 relative overflow-hidden">
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-medical-100/30 rounded-full blur-2xl -z-10" />
            <h3 className="text-xl font-bold font-heading text-primary-900">
              How We Are Different
            </h3>
            <ul className="space-y-4 text-sm text-primary-700">
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent-600 shrink-0 mt-0.5" />
                <div>
                  <strong>No Hidden Facility Fees:</strong> Unlike hospital-owned clinics, our independent practice saves you hundreds of dollars by charging a single, transparent office visit fee.
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Double Board-Certified:</strong> Directed by a physician board-certified in both pain medicine and anesthesiology.
                </div>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Personalized Care Plans:</strong> We spend the time to listen, locate the exact pain sources, and adapt plans to your physical recovery progress.
                </div>
              </li>
            </ul>
          </Card>
        </div>
      </div>

      {/* 3. MEET THE CLINICAL TEAM */}
      <section className="space-y-8 pt-6">
        <div className="space-y-2">
          <Badge variant="accent" className="bg-accent-100 text-accent-700 font-semibold">
            Our Medical Providers
          </Badge>
          <h2 className="text-3xl font-black font-heading tracking-tight text-primary-900">
            Meet Our Specialist &amp; Staff
          </h2>
          <p className="text-base text-slate-500 max-w-3xl">
            Our clinical team combines decades of specialized interventional pain medicine experience to deliver safe, precise, and compassionate care.
          </p>
        </div>

        {/* Providers Details List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {staff.map((provider, idx) => (
            <Card key={idx} variant="white" padding="lg" className="border-slate-100 shadow-premium flex flex-col justify-between h-full group">
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold font-heading text-primary-900 group-hover:text-medical-600 transition-colors">
                      {provider.name}
                    </h3>
                    <span className="text-sm font-semibold text-slate-400 block mt-0.5">{provider.role}</span>
                  </div>
                  <Badge variant={idx === 0 ? "secondary" : "accent"}>{idx === 0 ? "Double Board Certified" : "Clinical Partner"}</Badge>
                </div>

                {/* Bio text */}
                <p className="text-sm text-primary-700 leading-relaxed">
                  {provider.bio}
                </p>

                {/* Education bulleted list */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-xs text-primary-900 uppercase tracking-wider">Education &amp; Training:</h4>
                  <ul className="space-y-2 text-xs text-primary-700">
                    {provider.education.map((edu, eIdx) => (
                      <li key={eIdx} className="flex gap-2">
                        <span className="font-bold text-medical-600 shrink-0">&bull;</span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Memberships bulleted list */}
                <div className="space-y-2.5">
                  <h4 className="font-bold text-xs text-primary-900 uppercase tracking-wider">Professional Memberships:</h4>
                  <ul className="space-y-2 text-xs text-primary-700">
                    {provider.memberships.map((member, mIdx) => (
                      <li key={mIdx} className="flex gap-2">
                        <span className="font-bold text-accent-600 shrink-0">&bull;</span>
                        <span>{member}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <HeartHandshake className="h-4 w-4 text-medical-600" />
                  Accepting new patients.
                </span>
                <Link to="/book">
                  <Button variant="outline" size="sm" icon={Calendar}>
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
