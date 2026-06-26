import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, User, ArrowRight, Activity } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { blogPosts } from '../utils/medicalData';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Patient Education', 'Billing & Insurance', 'Tips & Wellness'];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="w-full py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-12 text-left">
      
      {/* 1. PAGE HEADER */}
      <div className="space-y-4 max-w-3xl border-b border-slate-100 pb-8">
        <Badge variant="secondary" className="bg-medical-100 text-medical-700 font-bold uppercase tracking-widest">
          Clinical Insights
        </Badge>
        <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight text-primary-900 leading-none">
          Patient Education Blog
        </h1>
        <p className="text-lg text-primary-700 leading-relaxed">
          Stay informed with evidence-based articles, lifestyle tips, and clinical updates on chronic pain management and spine health.
        </p>
      </div>

      {/* 2. CATEGORY FILTERS */}
      <div className="flex flex-wrap gap-2 pt-2">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-medical-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-primary-800 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. BLOG POSTS GRID */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card 
              key={post.id} 
              hoverable 
              variant="white" 
              className="flex flex-col justify-between h-full group border-slate-100 shadow-premium"
            >
              <div className="space-y-4">
                {/* Meta Row */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-medical-500" />
                    {post.date}
                  </span>
                  <Badge variant="accent">{post.category}</Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold font-heading text-primary-900 group-hover:text-medical-600 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    By {post.author}
                  </span>
                </div>

                <p className="text-sm text-slate-505 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Read Full Button */}
              <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <BookOpen className="h-4 w-4 text-emerald-600" />
                  5 min read
                </span>
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-sm font-bold text-medical-600 hover:text-medical-700 gap-1.5"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-slate-100 rounded-2xl">
          <p className="text-slate-500">No articles published in this category yet.</p>
        </div>
      )}

      {/* 4. CLINICAL CARE HIGHLIGHT */}
      <Card variant="slate" padding="lg" className="border-slate-200 bg-slate-50 flex gap-4 items-start max-w-4xl">
        <Activity className="h-6 w-6 text-medical-600 shrink-0 mt-1" />
        <div className="space-y-2">
          <h4 className="font-bold text-base text-primary-900">Do you have a topic suggestion?</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Our medical writing team regularly publishes clinical breakdowns based on common questions from our patient community in Charlotte. If you would like us to explain a specific condition, treatment, or clinical study, feel free to drop your suggestion via our Contact Us form.
          </p>
        </div>
      </Card>

    </div>
  );
}
