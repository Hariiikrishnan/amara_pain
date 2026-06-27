import React, { useRef, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import StickyActionBar from './components/layout/StickyActionBar';
import AIChatbot from './components/features/ai-chat/AIChatbot';
import Home from './pages/Home';
import About from './pages/About';
import Conditions from './pages/Conditions';
import ConditionDetail from './pages/ConditionDetail';
import Treatments from './pages/Treatments';
import TreatmentDetail from './pages/TreatmentDetail';
import Patients from './pages/Patients';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import { AppointmentProvider } from './context/AppointmentContext';
import useSmoothParallax from './hooks/useSmoothParallax';
import './styles/skeuomorphic.css';

function MainLayout() {
  const location = useLocation();
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);

  const parallaxTargets = useMemo(() => [
    { ref: orb1Ref, factor: -0.04 },
    { ref: orb2Ref, factor: 0.03 },
    { ref: orb3Ref, factor: -0.02 }
  ], []);

  useSmoothParallax(parallaxTargets, location.pathname);

  return (
    <div className="flex flex-col min-h-screen skeuomorphic-console text-primary-800 selection:bg-medical-100 selection:text-medical-800 pb-[68px] lg:pb-0 relative overflow-x-hidden">
      {/* Global Parallax Ambient Orbs */}
      <div ref={orb1Ref} className="absolute top-[-5%] right-[-10%] w-[550px] h-[550px] bg-cyan-200/25 rounded-full blur-[140px] pointer-events-none z-0" />
      <div ref={orb2Ref} className="absolute top-[35%] left-[-15%] w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-[150px] pointer-events-none z-0" />
      <div ref={orb3Ref} className="absolute bottom-[10%] right-[-10%] w-[550px] h-[550px] bg-cyan-100/20 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Main Navigation Header */}
      <Header />

      {/* Main Scrollable Content area */}
      <main className="flex-grow w-full relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Conditions Hub & Dynamic SEO Landing Pages */}
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/conditions/:id" element={<ConditionDetail />} />
          
          {/* Treatments Hub & Dynamic Procedure Guides */}
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/treatments/:id" element={<TreatmentDetail />} />
          
          {/* Patient resources, FAQS, and portals */}
          <Route path="/patients" element={<Patients />} />
          
          {/* Blog and articles */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          {/* Contact, maps, transit directions */}
          <Route path="/contact" element={<Contact />} />
          
          {/* Smart Booking Flow */}
          <Route path="/book" element={<BookAppointment />} />
          
          {/* Administrative Lead dashboard */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Compliance documents */}
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </main>

      {/* Clinical Footer */}
      <Footer />

      {/* Mobile-only Sticky Action Bar */}
      <StickyActionBar />

      {/* AI Symptom & FAQ chatbot assistant */}
      <AIChatbot />
    </div>
  );
}

export default function App() {
  return (
    <AppointmentProvider>
      <Router>
        <MainLayout />
      </Router>
    </AppointmentProvider>
  );
}
