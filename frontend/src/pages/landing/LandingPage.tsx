import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sprout,
  Scan,
  TrendingUp,
  Mic,
  ShoppingCart,
  ShieldCheck,
  Award,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Users,
  Sun,
  CloudSun,
  FileText,
  PhoneCall,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  LogIn,
  UserPlus,
  Play,
  ArrowUpRight,
  HeartHandshake,
  BarChart3,
  Bot,
  Truck,
  Building2,
  DollarSign,
  Shield,
  Star,
  Compass,
} from 'lucide-react';
import { useAuth, AVAILABLE_ROLES } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { getRoleHomePath } from '../../components/common/ProtectedRoute';

export const LandingPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'FARMER' | 'BUYER' | 'EXPERT' | 'TRANSPORT'>('FARMER');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleStartNow = (role: UserRole = 'FARMER') => {
    if (user && user.role) {
      navigate(getRoleHomePath(user.role));
    } else {
      navigate('/login', { state: { initialRole: role } });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-agro-500 selection:text-slate-950">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-agro-900 via-emerald-900 to-agro-950 text-white text-xs py-2 px-4 border-b border-emerald-800/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2">
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
              Govt. Aligned Portal
            </span>
            <span className="text-slate-200 text-xs">
              Aligned with PM-KISAN, e-NAM & ICAR National Agricultural Intelligence
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-emerald-300/90 font-medium">
            <span className="flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              Kisan Helpline: <strong className="text-white">1800-180-1551</strong> (Toll Free)
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-agro-500 to-emerald-400 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition duration-300">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white">
                  Asra<span className="text-agro-400">Verse</span>
                </span>
                <span className="text-[10px] font-extrabold bg-agro-500/20 text-agro-300 border border-agro-500/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  AI v2.6
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                National Agriculture Intelligence & Trade
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <a href="#features" className="hover:text-agro-400 transition">
              Features
            </a>
            <a href="#solutions" className="hover:text-agro-400 transition">
              Solutions
            </a>
            <a href="#ai-tools" className="hover:text-agro-400 transition">
              AI Tools
            </a>
            <a href="#mandi-rates" className="hover:text-agro-400 transition">
              Live Mandi
            </a>
            <a href="#schemes" className="hover:text-agro-400 transition">
              Govt Schemes
            </a>
            <a href="#faq" className="hover:text-agro-400 transition">
              FAQ
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={() => navigate(getRoleHomePath(user.role))}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-agro-500 to-emerald-600 hover:from-agro-600 hover:to-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition active:scale-95"
              >
                <span>Enter {user.role} Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <LogIn className="w-4 h-4 text-agro-400" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-agro-500 via-emerald-500 to-agro-600 hover:from-agro-600 hover:to-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Started Free</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-agro-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-agro-400 animate-pulse" />
                <span>Next-Gen Agricultural Intelligence for India (भारतीय कृषि क्रांति)</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Transforming Indian Farming with{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-agro-400 via-emerald-300 to-teal-300">
                  Artificial Intelligence
                </span>{' '}
                & Direct Mandi Trade.
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Empowering farmers, wholesale buyers, and agricultural experts with real-time CNN plant disease diagnostics, NPK soil crop recommendations, econometric mandi price forecasting, and zero-commission direct escrow trade.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => handleStartNow('FARMER')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-agro-500 via-emerald-500 to-agro-600 hover:from-agro-600 hover:to-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Get Started / शुरू करें</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#ai-tools"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-sm flex items-center justify-center gap-2 transition"
                >
                  <Play className="w-4 h-4 text-agro-400" />
                  <span>Explore AI Tools</span>
                </a>
              </div>

              {/* Quick Demo Access Bar */}
              <div className="pt-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-300 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-agro-400" />
                    1-Click Direct Role Demonstration:
                  </span>
                  <span className="text-[10px] text-slate-400">Pre-seeded accounts</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleStartNow('FARMER')}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-agro-950 hover:border-agro-500 border border-slate-700/60 text-left text-xs transition"
                  >
                    <div className="font-bold text-white flex items-center gap-1">🌾 Farmer</div>
                    <div className="text-[10px] text-slate-400">Ramesh K.</div>
                  </button>
                  <button
                    onClick={() => handleStartNow('BUYER')}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-agro-950 hover:border-agro-500 border border-slate-700/60 text-left text-xs transition"
                  >
                    <div className="font-bold text-white flex items-center gap-1">🛒 Buyer</div>
                    <div className="text-[10px] text-slate-400">Suresh P.</div>
                  </button>
                  <button
                    onClick={() => handleStartNow('EXPERT')}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-agro-950 hover:border-agro-500 border border-slate-700/60 text-left text-xs transition"
                  >
                    <div className="font-bold text-white flex items-center gap-1">🔬 Expert</div>
                    <div className="text-[10px] text-slate-400">Dr. Anita</div>
                  </button>
                  <button
                    onClick={() => handleStartNow('ADMIN')}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-agro-950 hover:border-agro-500 border border-slate-700/60 text-left text-xs transition"
                  >
                    <div className="font-bold text-white flex items-center gap-1">🛡️ Admin</div>
                    <div className="text-[10px] text-slate-400">Platform</div>
                  </button>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Free for Indian Farmers</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Escrow-Protected Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-emerald-400" />
                  <span>Hindi & Hinglish Voice AI</span>
                </div>
              </div>
            </div>

            {/* Right Live Interactive Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-emerald-500/30 p-6 shadow-2xl shadow-emerald-500/10 space-y-5">
                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-agro-500/20 border border-agro-500/40 flex items-center justify-center text-agro-400">
                      <Scan className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Live AI Diagnostic Engine</h4>
                      <p className="text-[11px] text-slate-400">Real-time Computer Vision & ML</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                    ● ACTIVE
                  </span>
                </div>

                {/* Interactive Simulated Disease Diagnostic Card */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🍅</span>
                      <div>
                        <p className="text-xs font-bold text-white">Tomato Leaf Sample #4102</p>
                        <p className="text-[10px] text-slate-400">Scanned at Lucknow Agro Region</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-rose-400 bg-rose-950/60 border border-rose-800/60 px-2 py-0.5 rounded-lg">
                      Early Blight (98.6%)
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="w-[98.6%] bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Organic Treatment</span>
                      <span className="text-emerald-300 font-semibold">Neem Oil Spray (5ml/L)</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Chemical Remedy</span>
                      <span className="text-amber-300 font-semibold">Mancozeb 75 WP (2g/L)</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Mandi Arbitrage Forecast */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span className="font-bold text-white">Wheat (गेहूं) 6-Mo APMC Trend</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-xs">+14.2% Growth Expected</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Current Mandi Rate</span>
                      <span className="font-extrabold text-white">₹2,275 / Qtl</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Peak Forecast (Nov '26)</span>
                      <span className="font-extrabold text-emerald-400">₹2,590 / Qtl</span>
                    </div>
                  </div>
                </div>

                {/* Multilingual Voice Trigger Preview */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/50 to-agro-950/50 border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">"धान के लिए कौन सी खाद सही है?"</p>
                      <p className="text-[10px] text-slate-400">Natural Hindi Voice Parsing Active</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded-md border border-emerald-800">
                    AI Voice Ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers Ticker */}
      <section className="border-y border-slate-800 bg-slate-900/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-white">50,000+</p>
              <p className="text-xs text-slate-400 font-medium">Registered Farmers (किसान)</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-agro-400">120+</p>
              <p className="text-xs text-slate-400 font-medium">APMC Mandis Connected</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-white">98.4%</p>
              <p className="text-xs text-slate-400 font-medium">Leaf Diagnostic Accuracy</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">₹4.2 Cr+</p>
              <p className="text-xs text-slate-400 font-medium">Direct Mandi Trade Volume</p>
            </div>
            <div className="col-span-2 md:col-span-1 space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-amber-400">4.9 / 5</p>
              <p className="text-xs text-slate-400 font-medium">Farmer Satisfaction Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem vs. Solution Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-agro-400 uppercase tracking-wider bg-agro-950/80 px-3 py-1 rounded-full border border-agro-800">
              Why Indian Agriculture Needs AsraVerse
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Solving Real Agricultural Challenges with Modern Technology
            </h2>
            <p className="text-sm text-slate-400">
              Traditional Indian agriculture faces fragmented information, unfair intermediaries, and crop loss from unidentified pests. AsraVerse AI connects the entire ecosystem onto one unified intelligent network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Middlemen */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Zero-Middleman Mandi Trade</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Middlemen take up to 25% of farmer margins. AsraVerse connects farmers directly with wholesale institutional buyers with Escrow payment verification and GST dispatch invoices.
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Farmers earn 18-24% higher net profit</span>
              </div>
            </div>

            {/* Card 2: Pest & Disease */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Scan className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Instant CNN Disease Detection</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Crop disease destroys over ₹50,000 Cr worth of harvest annually. Our computer vision model scans leaf symptoms in seconds and prescribes exact organic and chemical spray schedules.
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>One-click ICAR/KVK expert consultation</span>
              </div>
            </div>

            {/* Card 3: Soil Guesswork */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition duration-300 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-agro-500/10 border border-agro-500/20 flex items-center justify-center text-agro-400">
                <Sprout className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Explainable Soil Crop AI</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Planting the wrong crop causes massive losses. Our agronomic engine analyzes Nitrogen, Phosphorus, Potassium, Soil pH, and micro-climate to provide suitability scores and growing guides.
              </p>
              <div className="pt-2 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Downloadable Kisan Advisory PDF Reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core AI Tools & Capabilities Showcase */}
      <section id="ai-tools" className="py-20 bg-slate-900/40 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-agro-400 uppercase tracking-wider bg-agro-950/80 px-3 py-1 rounded-full border border-agro-800">
              Suite of Intelligent Agri Tools
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              End-to-End AI Agriculture Infrastructure
            </h2>
            <p className="text-sm text-slate-400">
              From soil testing to post-harvest wholesale dispatch, explore our six core platform engines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tool 1 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-agro-500/50 transition group space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-agro-500/20 text-agro-400 flex items-center justify-center group-hover:scale-110 transition">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">AI Crop Recommender</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Scientific crop matching based on Soil NPK, pH, rainfall, and agro-climatic zones with explainable reasoning.
                </p>
              </div>
              <button
                onClick={() => handleStartNow('FARMER')}
                className="text-xs font-bold text-agro-400 hover:text-agro-300 flex items-center gap-1 pt-2"
              >
                <span>Try Soil Recommender</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 2 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-agro-500/50 transition group space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
                <Scan className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Leaf Disease Scanner</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Instant visual diagnostics for Tomato, Rice, Wheat, Potato, Cotton, and Corn with verified spray dosages.
                </p>
              </div>
              <button
                onClick={() => handleStartNow('FARMER')}
                className="text-xs font-bold text-agro-400 hover:text-agro-300 flex items-center gap-1 pt-2"
              >
                <span>Scan Plant Leaves</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 3 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-agro-500/50 transition group space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Mandi Price Forecaster</h4>
                <p className="text-xs text-slate-400 mt-1">
                  6-month forward econometric price predictions and multi-mandi arbitrage comparison across APMCs.
                </p>
              </div>
              <button
                onClick={() => handleStartNow('FARMER')}
                className="text-xs font-bold text-agro-400 hover:text-agro-300 flex items-center gap-1 pt-2"
              >
                <span>Check Mandi Forecasts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 4 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-agro-500/50 transition group space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-110 transition">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Multilingual Voice AI</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Hands-free Speech-to-Text and Speech Synthesis in Hindi, Hinglish, and English for all advisories.
                </p>
              </div>
              <button
                onClick={() => handleStartNow('FARMER')}
                className="text-xs font-bold text-agro-400 hover:text-agro-300 flex items-center gap-1 pt-2"
              >
                <span>Use Voice Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 5 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-agro-500/50 transition group space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Direct Fasal Marketplace</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Zero commission trade with certified organic produce badges, cart, bulk escrow, and truck dispatch.
                </p>
              </div>
              <button
                onClick={() => handleStartNow('BUYER')}
                className="text-xs font-bold text-agro-400 hover:text-agro-300 flex items-center gap-1 pt-2"
              >
                <span>Browse Produce</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Tool 6 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-agro-500/50 transition group space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Govt Schemes & Agromet</h4>
                <p className="text-xs text-slate-400 mt-1">
                  PM-KISAN, PMFBY insurance, Soil Health Card eligibility checkers, and 7-day micro-weather forecasts.
                </p>
              </div>
              <button
                onClick={() => handleStartNow('FARMER')}
                className="text-xs font-bold text-agro-400 hover:text-agro-300 flex items-center gap-1 pt-2"
              >
                <span>View Schemes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions by Role Interactive Tabs */}
      <section id="solutions" className="py-24 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-agro-400 uppercase tracking-wider bg-agro-950/80 px-3 py-1 rounded-full border border-agro-800">
              Tailored Ecosystem Workspaces
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Built for Every Agricultural Stakeholder
            </h2>
            <p className="text-sm text-slate-400">
              Switch roles to see how AsraVerse AI adapts its tools, security, and dashboards for your specific workflow.
            </p>
          </div>

          {/* Role Navigation Tab Switcher */}
          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveTab('FARMER')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'FARMER'
                  ? 'bg-agro-600 text-white shadow-lg shadow-agro-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🌾 Farmers (किसान)</span>
            </button>
            <button
              onClick={() => setActiveTab('BUYER')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'BUYER'
                  ? 'bg-agro-600 text-white shadow-lg shadow-agro-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🛒 Wholesale Buyers</span>
            </button>
            <button
              onClick={() => setActiveTab('EXPERT')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'EXPERT'
                  ? 'bg-agro-600 text-white shadow-lg shadow-agro-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🔬 ICAR / KVK Experts</span>
            </button>
            <button
              onClick={() => setActiveTab('TRANSPORT')}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'TRANSPORT'
                  ? 'bg-agro-600 text-white shadow-lg shadow-agro-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🚚 Logistics Partners</span>
            </button>
          </div>

          {/* Active Tab Panel */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl">
            {activeTab === 'FARMER' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-agro-400 bg-agro-950 px-3 py-1 rounded-full border border-agro-800">
                    <span>🌾 Farmer Portal (किसान सेवा केंद्र)</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Higher Yields, Fair Prices & Scientific Guidance at Zero Cost
                  </h3>
                  <ul className="space-y-3.5 text-xs text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-agro-400 shrink-0 mt-0.5" />
                      <span>Instant AI scan of leaf diseases with exact medicine & spray dosage recipes.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-agro-400 shrink-0 mt-0.5" />
                      <span>List your harvested crops directly to wholesale buyers without mandi commission.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-agro-400 shrink-0 mt-0.5" />
                      <span>6-Month forward mandi forecast so you sell at peak prices instead of distress sales.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-agro-400 shrink-0 mt-0.5" />
                      <span>Ask questions verbally in Hindi or Hinglish using the AI Voice Assistant.</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => handleStartNow('FARMER')}
                    className="px-6 py-3.5 rounded-xl bg-agro-600 hover:bg-agro-700 text-white font-bold text-xs shadow-lg shadow-agro-600/30 flex items-center gap-2 transition active:scale-95"
                  >
                    <span>Enter Farmer Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Farmer Dashboard Features</span>
                    <span className="text-[10px] text-agro-400 font-bold">● Active 24/7</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="font-semibold text-white">🌾 Crop Recommendation Engine</span>
                      <span className="text-agro-400 font-bold">Soil NPK Ready</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="font-semibold text-white">🍃 CNN Leaf Disease Vision</span>
                      <span className="text-emerald-400 font-bold">98.4% Acc.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="font-semibold text-white">📈 Multi-Mandi Arbitrage Rates</span>
                      <span className="text-amber-400 font-bold">120+ APMCs</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'BUYER' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
                    <span>🛒 Wholesale Procurement Portal</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Direct Farm-Gate Sourcing with Escrow & Quality Certification
                  </h3>
                  <ul className="space-y-3.5 text-xs text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>Procure certified organic and A-grade crops directly from verified farmer clusters.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>Zero payment risk: Funds held safely in Escrow until produce passes physical inspection.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>Automated GST tax invoices, transport vehicle scheduling, and live fleet dispatch tracking.</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => handleStartNow('BUYER')}
                    className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-600/30 flex items-center gap-2 transition active:scale-95"
                  >
                    <span>Enter Buyer Procurement Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Procurement Tools</span>
                    <span className="text-[10px] text-blue-400 font-bold">● Institutional Grade</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="font-semibold text-white">📦 Bulk Lot Auction & Order Engine</span>
                      <span className="text-blue-400 font-bold">Escrow Active</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="font-semibold text-white">🧾 Automated GST Tax Compliance</span>
                      <span className="text-emerald-400 font-bold">100% Verified</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="font-semibold text-white">🚚 Dedicated Fleet Dispatch Booking</span>
                      <span className="text-amber-400 font-bold">Fast Tracking</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'EXPERT' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 bg-indigo-950 px-3 py-1 rounded-full border border-indigo-800">
                    <span>🔬 ICAR / KVK Scientific Diagnostic Hub</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Issue Certified Agronomic Prescriptions & Tele-Consultations
                  </h3>
                  <ul className="space-y-3.5 text-xs text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>Review complex crop diseases flagged by farmers when AI model confidence is below 85%.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>Issue digitally signed ICAR-aligned pesticide, fertilizer, and treatment prescriptions.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>Broadcast regional disease outbreak alerts to farmers in specific pincodes.</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => handleStartNow('EXPERT')}
                    className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition active:scale-95"
                  >
                    <span>Enter Agri Expert Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Scientist Workspace</span>
                    <span className="text-[10px] text-indigo-400 font-bold">● KVK Certified</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="font-semibold text-white">📋 Escalated Disease Diagnostic Queue</span>
                      <span className="text-indigo-400 font-bold">Tele-Consult</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="font-semibold text-white">📝 Certified Digital Prescriptions</span>
                      <span className="text-emerald-400 font-bold">QR Verified</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="font-semibold text-white">📢 Regional Agromet Advisory Broadcast</span>
                      <span className="text-amber-400 font-bold">IMD Data</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'TRANSPORT' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-in fade-in">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
                    <span>🚚 Fleet & Farm Logistics Coordination</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    Optimize Farm-to-Mandi Truck Dispatch & Route Tracking
                  </h3>
                  <ul className="space-y-3.5 text-xs text-slate-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Accept verified wholesale harvest dispatch jobs with guaranteed payment upon delivery.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>Optimize route schedules and eliminate empty return trips with load aggregation.</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => handleStartNow('TRANSPORT')}
                    className="px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-lg shadow-amber-600/30 flex items-center gap-2 transition active:scale-95"
                  >
                    <span>Enter Transport Fleet Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-300">Fleet Dashboard</span>
                    <span className="text-[10px] text-amber-400 font-bold">● Real-time GPS</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="font-semibold text-white">🚛 Active Dispatch Order Manifests</span>
                      <span className="text-amber-400 font-bold">Live Status</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800/80 flex items-center justify-between">
                      <span className="font-semibold text-white">📍 Turn-by-Turn Mandi Navigation</span>
                      <span className="text-emerald-400 font-bold">Optimized</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Live Mandi Rates Section */}
      <section id="mandi-rates" className="py-20 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-agro-400 uppercase tracking-wider bg-agro-950/80 px-3 py-1 rounded-full border border-agro-800">
                APMC Market Intelligence
              </span>
              <h2 className="text-3xl font-black text-white">Live Mandi Prices & 6-Month Predictions</h2>
              <p className="text-xs text-slate-400">
                Real-time price tickers across major Indian agricultural mandis (e-NAM aligned).
              </p>
            </div>
            <button
              onClick={() => handleStartNow('FARMER')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center gap-2 self-start md:self-auto"
            >
              <span>View All 120+ Mandis</span>
              <ArrowRight className="w-4 h-4 text-agro-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🌾</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  +14.2% Bullish
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">Wheat (गेहूं)</h4>
                <p className="text-[11px] text-slate-400">Azadpur APMC, Delhi</p>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Rate:</span>
                <span className="font-extrabold text-white">₹2,275 / Qtl</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🍚</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  +8.7% Steady
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">Basmati Rice (चावल)</h4>
                <p className="text-[11px] text-slate-400">Karnal Mandi, Haryana</p>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Rate:</span>
                <span className="font-extrabold text-white">₹3,850 / Qtl</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🍅</span>
                <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800">
                  -3.4% Seasonal
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">Tomato (टमाटर)</h4>
                <p className="text-[11px] text-slate-400">Varanasi APMC, UP</p>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Rate:</span>
                <span className="font-extrabold text-white">₹1,950 / Qtl</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl">🥔</span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  +19.1% High Demand
                </span>
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base">Potato (आलू)</h4>
                <p className="text-[11px] text-slate-400">Kanpur Grain Mandi, UP</p>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">Rate:</span>
                <span className="font-extrabold text-white">₹1,420 / Qtl</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Govt Schemes Hub */}
      <section id="schemes" className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-agro-400 uppercase tracking-wider bg-agro-950/80 px-3 py-1 rounded-full border border-agro-800">
              Direct Central & State Subsidies
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Government Schemes & Financial Security
            </h2>
            <p className="text-sm text-slate-400">
              Check eligibility criteria and apply directly to official government agricultural portals with one click.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  ₹6,000 / Year
                </span>
                <span className="text-xs text-slate-400">Direct DBT</span>
              </div>
              <h4 className="text-lg font-bold text-white">PM-KISAN Samman Nidhi</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct income support of ₹6,000 per annum in three equal installments directly into farmer Aadhaar-linked bank accounts.
              </p>
              <a
                href="https://pmkisan.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-agro-400 hover:text-agro-300 flex items-center gap-1.5 pt-2"
              >
                <span>Check PM-KISAN Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                  1.5% - 2% Premium
                </span>
                <span className="text-xs text-slate-400">Crop Shield</span>
              </div>
              <h4 className="text-lg font-bold text-white">PM Fasal Bima Yojana (PMFBY)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Comprehensive crop loss insurance against unseasonal rainfall, drought, floods, pest attacks, and post-harvest cyclone damage.
              </p>
              <a
                href="https://pmfby.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-agro-400 hover:text-agro-300 flex items-center gap-1.5 pt-2"
              >
                <span>Check PMFBY Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                  4% Subsidized ROI
                </span>
                <span className="text-xs text-slate-400">Credit Line</span>
              </div>
              <h4 className="text-lg font-bold text-white">Kisan Credit Card (KCC)</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Affordable institutional credit up to ₹3,00,000 for purchasing quality seeds, organic fertilizers, diesel, and farm machinery.
              </p>
              <a
                href="https://agricoop.nic.in"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-agro-400 hover:text-agro-300 flex items-center gap-1.5 pt-2"
              >
                <span>Check KCC Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Testimonials */}
      <section id="testimonials" className="py-24 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-agro-400 uppercase tracking-wider bg-agro-950/80 px-3 py-1 rounded-full border border-agro-800">
              Real Experiences from the Field
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Trusted by 50,000+ Farmers & Wholesale Buyers
            </h2>
            <p className="text-sm text-slate-400">
              Hear directly from Indian farmers and agri-procurement managers using AsraVerse daily.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 relative">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "धान की फसल में भूरा धब्बा (Brown Spot) लग गया था। AsraVerse के AI स्कैनर से फोटो खींची, 5 सेकंड में दवा और स्प्रे का सही नाप मिल गया। पूरी फसल बच गई!"
              </p>
              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-agro-600 flex items-center justify-center font-bold text-white text-sm">
                  RK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ramesh Kumar</h4>
                  <p className="text-[10px] text-slate-400">Paddy Farmer, Bareilly (UP)</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 relative">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "Direct farmer procurement through AsraVerse escrow has simplified our wholesale supply chain. Produce quality is A-grade and farmers receive instantaneous payout on verification."
              </p>
              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                  SP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Suresh Patel</h4>
                  <p className="text-[10px] text-slate-400">Wholesale Agro Buyer, Delhi APMC</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 relative">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "As an agricultural scientist, AsraVerse allows us to tele-diagnose rare disease cases escalated from remote villages that local agronomists cannot identify. Outstanding platform."
              </p>
              <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                  AS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Dr. Anita Sharma</h4>
                  <p className="text-[10px] text-slate-400">Senior Pathologist, ICAR/KVK</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-24 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-xs font-bold text-agro-400 uppercase tracking-wider bg-agro-950/80 px-3 py-1 rounded-full border border-agro-800">
              Got Questions?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Frequently Asked Questions (अक्सर पूछे जाने वाले सवाल)
            </h2>
            <p className="text-sm text-slate-400">
              Clear answers to help you get the most out of AsraVerse AI.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Is AsraVerse free for Indian farmers? (क्या यह किसानों के लिए निःशुल्क है?)',
                a: 'Yes, 100%! All AI Crop Recommendations, Plant Disease Scans, Weather Agromet Forecasts, and Voice Assistant capabilities are completely free for all Indian farmers.',
              },
              {
                q: 'How does the Plant Leaf Disease Scanner work? (पत्तियों की बीमारी की जांच कैसे होती है?)',
                a: 'Simply upload or capture a photo of the affected plant leaf. Our convolutional neural network analyzes visual markers in under 3 seconds to identify the disease and prescribe organic & chemical treatments with exact dosages.',
              },
              {
                q: 'How does the Direct Fasal Marketplace protect payments? (भुगतान की सुरक्षा कैसे होती है?)',
                a: 'All buyer orders use an Escrow mechanism. When a wholesale buyer places an order, funds are safely held in Escrow. Once produce is delivered and inspected, payment is released directly to the farmer bank account without middleman commission.',
              },
              {
                q: 'Does the Voice Assistant understand Hindi and local accents? (क्या वॉयस असिस्टेंट हिंदी समझता है?)',
                a: 'Yes! The voice assistant is customized for Hindi, Hinglish, and regional agricultural terminology. You can simply speak into the microphone to ask questions about crops, mandi rates, and disease remedies.',
              },
              {
                q: 'Can I test the platform before signing up? (क्या मैं बिना खाते के डेमो देख सकता हूँ?)',
                a: 'Yes! Use the 1-Click Demo Profile Switcher on the Login page or Hero section to test the platform as a Farmer, Buyer, Agri Expert, Transport Partner, or Administrator.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-agro-400 transition"
                >
                  <span>{item.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-agro-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Bottom Call-To-Action Banner */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-agro-950/40 to-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-agro-500 to-emerald-400 flex items-center justify-center text-white mx-auto shadow-2xl shadow-emerald-500/30">
            <Sprout className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Transform Your Farming & Agricultural Trade?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
              Join 50,000+ Indian farmers, buyers, and agricultural scientists on India's premier AI agricultural portal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => handleStartNow('FARMER')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-agro-500 via-emerald-500 to-agro-600 hover:from-agro-600 hover:to-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-2 transition active:scale-95"
            >
              <Sparkles className="w-5 h-5" />
              <span>Create Free Account / खाता बनाएं</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/login"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition"
            >
              <LogIn className="w-4 h-4 text-agro-400" />
              <span>Sign In to Portal</span>
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>256-Bit Encrypted Sessions • Masked Aadhaar Privacy Protection</span>
          </div>
        </div>
      </section>

      {/* Comprehensive Landing Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <div className="w-8 h-8 rounded-xl bg-agro-600 flex items-center justify-center text-white">
                  <Sprout className="w-5 h-5" />
                </div>
                <span>AsraVerse AI</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                National Agricultural Intelligence & Zero-Middleman Direct Trade Portal for Indian Farmers, Buyers, Agronomists & Logistics.
              </p>
            </div>

            {/* Col 2: Core AI Engines */}
            <div className="space-y-2">
              <p className="text-white font-bold text-xs uppercase tracking-wider">AI Platform</p>
              <ul className="space-y-2">
                <li>
                  <a href="#ai-tools" className="hover:text-agro-400 transition">
                    Soil NPK Crop Recommender
                  </a>
                </li>
                <li>
                  <a href="#ai-tools" className="hover:text-agro-400 transition">
                    CNN Leaf Disease Vision Scanner
                  </a>
                </li>
                <li>
                  <a href="#mandi-rates" className="hover:text-agro-400 transition">
                    APMC 6-Month Price Forecasting
                  </a>
                </li>
                <li>
                  <a href="#ai-tools" className="hover:text-agro-400 transition">
                    Multilingual Voice Assistant (Hindi)
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Portal Access */}
            <div className="space-y-2">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Stakeholder Portals</p>
              <ul className="space-y-2">
                <li>
                  <Link to="/login" className="hover:text-agro-400 transition">
                    🌾 Kisan / Farmer Portal
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-agro-400 transition">
                    🛒 Wholesale Buyer Portal
                  </Link>
                </li>
                <li>
                  <Link to="/expert/login" className="hover:text-indigo-400 transition">
                    🔬 ICAR / KVK Expert Hub
                  </Link>
                </li>
                <li>
                  <Link to="/transport/login" className="hover:text-amber-400 transition">
                    🚚 Fleet Transport Portal
                  </Link>
                </li>
                <li>
                  <Link to="/admin/login" className="hover:text-rose-400 transition">
                    🏛️ Governance & Admin Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Helplines & Govt Links */}
            <div className="space-y-2">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Government Links</p>
              <div className="space-y-2 text-xs">
                <p className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Kisan Call Centre: 1800-180-1551</span>
                </p>
                <p>
                  <a
                    href="https://pmkisan.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-400 flex items-center gap-1"
                  >
                    PM-KISAN Samman Nidhi <ArrowUpRight className="w-3 h-3" />
                  </a>
                </p>
                <p>
                  <a
                    href="https://enam.gov.in"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-emerald-400 flex items-center gap-1"
                  >
                    e-NAM National Agriculture Market <ArrowUpRight className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>© 2026 AsraVerse AI Platform. Dedicated to the farmers of India (जय जवान, जय किसान).</p>
            <div className="flex gap-4">
              <a href="#features" className="hover:text-slate-400">
                Privacy Policy
              </a>
              <a href="#features" className="hover:text-slate-400">
                Terms of Service
              </a>
              <a href="#features" className="hover:text-slate-400">
                AI Agricultural Disclaimer
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
