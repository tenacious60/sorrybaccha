import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Frown,
  Gift,
  Handshake,
  Sparkles,
  Star,
  Moon,
  Sun,
  Music,
  Clock,
  Shield,
  Target,
} from 'lucide-react';

// Adjust these imports to match where your images actually live in your project.
// If images are in `src/assets/01.jpg` change the path accordingly.
import img01 from './public/01.jpg';
import img02 from './public/02.jpg';

export default function App() {
  const [activeIconIndex, setActiveIconIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const icons = [
    { Icon: Frown, label: 'Regret', color: 'from-rose-500 to-pink-500' },
    { Icon: Heart, label: 'Sorry', color: 'from-pink-500 to-rose-500' },
    { Icon: Handshake, label: 'Forgive', color: 'from-amber-500 to-yellow-400' },
    { Icon: Gift, label: 'Promise', color: 'from-sky-500 to-indigo-500' },
    { Icon: Sparkles, label: 'Forever', color: 'from-emerald-400 to-lime-400' },
    { Icon: Shield, label: 'Protect', color: 'from-cyan-500 to-sky-500' },
    { Icon: Target, label: 'Devotion', color: 'from-violet-500 to-fuchsia-500' }
  ];

  const messages = [
    "I'm deeply sorry for the pain I've caused you. You mean everything to me.",
    "Every moment without your smile feels incomplete. Please forgive me.",
    "I promise to be better, to listen more, and to cherish every second with you.",
    "You are my world, my light, and my reason to be a better person.",
    "I never want to see tears in your eyes because of me. I'm truly sorry.",
    "My heart aches knowing I hurt you. You deserve all the love and happiness.",
    "I'm sorry for taking you for granted. You are irreplaceable in my life.",
    "Please give me another chance to show you how much you mean to me.",
    "I love you more than words can express, and I'm sorry for not showing it enough.",
    "You are my forever, and I promise to never let you go. I'm deeply sorry."
  ];

  // IntersectionObserver to reveal the messages section
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  // Auto-rotate icons
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIconIndex((prev) => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [icons.length]);

  // Floating decorative elements (small circles)
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute border border-slate-600/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${20 + Math.random() * 10}s`,
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <FloatingElements />

      {/* Subtle Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-slate-800/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-800/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 text-center">
            {/* Left Heart */}
            <div className="relative flex items-center justify-center order-2 sm:order-1">
              <div className="absolute inset-0 bg-slate-600 rounded-full blur-sm animate-pulse" />
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-slate-300 fill-slate-300 relative z-10 animate-heartbeat" />
            </div>

            {/* Text Section */}
            <div className="flex flex-col items-center order-1 sm:order-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-200 font-serif tracking-tight">I'm Sorry</h1>
              <p className="text-xl sm:text-xl md:text-2xl text-pink-400 font-medium mt-1 animate-pulse font-poppins">Love You Puggu</p>
            </div>

            {/* Right Heart */}
            <div className="relative flex items-center justify-center order-3">
              <div className="absolute inset-0 bg-slate-600 rounded-full blur-sm animate-pulse delay-500" />
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-slate-300 fill-slate-300 relative z-10 animate-heartbeat delay-300" />
            </div>
          </div>

          <p className="text-lg md:text-xl font-bold text-slate-400 mb-3 md:mb-4 tracking-wide px-2 mt-4">To My Dearest Love 🌸 Puggu 🌸</p>
          <div className="w-20 md:w-24 h-0.5 bg-slate-600 mx-auto rounded-full" />
        </div>

        {/* Main Content Card */}
        <div
          ref={containerRef}
          className="bg-slate-800/30 rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8 mb-6 md:mb-8 border border-slate-700/50 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Decorative border overlay */}
          <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-slate-600/30 pointer-events-none" />

          <div className="relative z-10">
            {/* Interactive Icons Grid */}
            <div className="mb-8 md:mb-12">
              <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
                {icons.map((item, index) => (
                  <div
                    key={index}
                    className={`transform transition-all duration-500 cursor-pointer group ${
                      index === activeIconIndex
                        ? 'scale-105 md:scale-110 animate-icon-glow'
                        : 'scale-95 md:scale-100 opacity-70 hover:scale-100 md:hover:scale-105 hover:opacity-100'
                    }`}
                    onClick={() => setActiveIconIndex(index)}
                  >
                    <div className="relative p-0.5 rounded-xl md:rounded-2xl bg-slate-700/50 shadow-lg group-hover:shadow-xl transition-all duration-500">
                      <div className="bg-slate-800/80 rounded-xl md:rounded-2xl p-2 md:p-3 backdrop-blur-sm">
                        <div
                          className={`w-14 h-14 md:w-20 md:h-20 rounded-lg md:rounded-xl flex items-center justify-center transition-all duration-500 ${
                            index === activeIconIndex ? `bg-gradient-to-br ${item.color} shadow-xl` : 'bg-slate-700/50 group-hover:bg-slate-600/50'
                          }`}
                        >
                          <item.Icon
                            className={`w-6 h-6 md:w-10 md:h-10 ${index === activeIconIndex ? 'text-white' : 'text-slate-300'} group-hover:scale-110 transition-transform duration-300`}
                          />
                        </div>
                      </div>

                      {/* Active indicator */}
                      {index === activeIconIndex && (
                        <div className="absolute -top-1 -right-1">
                          <div className="relative">
                            <div className="absolute inset-0 bg-slate-400 rounded-full animate-ping" />
                            <div className="w-2 h-2 md:w-3 md:h-3 bg-slate-300 rounded-full relative z-10" />
                          </div>
                        </div>
                      )}
                    </div>
                    <p
                      className={`text-center mt-2 md:mt-3 font-medium transition-all duration-300 text-xs md:text-sm ${
                        index === activeIconIndex ? 'text-slate-200 font-semibold' : 'text-slate-500 group-hover:text-slate-400'
                      }`}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Placeholders */}
            <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
              <div className="group relative">
                <div className="absolute inset-0 bg-slate-700/30 rounded-xl md:rounded-2xl blur-sm group-hover:blur-md transition-all duration-500" />
                <div className="relative bg-slate-800/40 rounded-xl md:rounded-2xl flex items-center justify-center border border-slate-600/50 hover:border-slate-500 transition-all duration-500 shadow-lg group-hover:shadow-xl min-h-[180px] md:min-h-[250px] backdrop-blur-sm">
                  <div className="text-center p-4 md:p-8 w-full">
                    <div className="relative inline-block mb-3 md:mb-4">
                      <div className="absolute inset-0 bg-slate-600 rounded-xl blur-sm" />
                      <img
                        src={img02}
                        alt="Our Beautiful Memories"
                        className="w-50 h-50 relative z-10 group-hover:scale-105 transition-transform duration-500 rounded-xl object-cover"
                      />
                    </div>
                    <p className="text-slate-500 text-xs md:text-sm">Moments I'll always cherish</p>
                    <div className="flex justify-center gap-1 mt-2 md:mt-3">
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-400 fill-amber-400 transition-colors duration-300 group-hover:text-amber-300 group-hover:fill-amber-300" />
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-400 fill-amber-400 transition-colors duration-300 group-hover:text-amber-300 group-hover:fill-amber-300" />
                      <Star className="w-3 h-3 md:w-4 md:h-4 text-amber-400 fill-amber-400 transition-colors duration-300 group-hover:text-amber-300 group-hover:fill-amber-300" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-slate-700/30 rounded-xl md:rounded-2xl blur-sm group-hover:blur-md transition-all duration-500" />
                <div className="relative bg-slate-800/40 rounded-xl md:rounded-2xl flex items-center justify-center border border-slate-600/50 hover:border-slate-500 transition-all duration-500 shadow-lg group-hover:shadow-xl min-h-[180px] md:min-h-[250px] backdrop-blur-sm">
                  <div className="text-center p-4 md:p-8 w-full">
                    <div className="relative inline-block mb-3 md:mb-4">
                      <div className="absolute inset-0 bg-slate-600 rounded-xl blur-sm" />
                      <img
                        src={img01}
                        alt="Our Beautiful Memories"
                        className="w-50 h-50 relative z-10 group-hover:scale-105 transition-transform duration-500 rounded-xl object-cover"
                      />
                    </div>
                    <p className="text-slate-500 text-xs md:text-sm">Our future awaits</p>
                    <div className="flex justify-center gap-1 mt-2 md:mt-3">
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 fill-emerald-400 transition-colors duration-300 group-hover:text-emerald-300 group-hover:fill-emerald-300" />
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 fill-emerald-400 transition-colors duration-300 group-hover:text-emerald-300 group-hover:fill-emerald-300" />
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 fill-emerald-400 transition-colors duration-300 group-hover:text-emerald-300 group-hover:fill-emerald-300" />
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-lg md:text-2xl font-bold text-center lg:col-span-2 mt-3 md:mt-4 font-poppins glow-text px-2">❤️ Forever Together ❤️</p>
            </div>

            {/* Messages Section */}
            <div
              className={`space-y-3 md:space-y-4 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className="group bg-slate-800/30 p-4 md:p-6 rounded-lg md:rounded-xl border-l-2 border-slate-600 hover:shadow-lg transition-all duration-500 hover:translate-x-1 backdrop-blur-sm hover:border-slate-500 cursor-pointer"
                >
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0 relative">
                      <div className="absolute inset-0 bg-slate-600 rounded-full blur-sm" />
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-slate-700 text-slate-300 rounded-full flex items-center justify-center font-medium text-xs md:text-sm shadow-md relative z-10 group-hover:scale-105 transition-transform duration-300">{index + 1}</div>
                    </div>
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed flex-1 group-hover:text-slate-200 transition-colors duration-300">{message}</p>
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-red-600 animate-glowIcon group-hover:text-slate-500 transition-all duration-500 flex-shrink-0 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center bg-slate-800/30 rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-12 border border-slate-700/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-slate-700/5 rounded-2xl md:rounded-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex justify-center gap-1 md:gap-2 mb-6 md:mb-8 flex-wrap">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="relative">
                  <div className="absolute inset-0 bg-slate-600 rounded-full blur-sm animate-ping" style={{ animationDelay: `${i * 0.3}s` }} />
                  <Heart className="w-8 h-8 md:w-12 md:h-12 text-slate-400 animate-glowIcon fill-slate-400 relative z-10 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                </div>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-200 font-serif tracking-tight mb-4 md:mb-6 px-2">I Love You Forever</h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-6 md:mb-8 px-2">
              No amount of words can truly express how sorry I am. You are my everything,
              and I promise to spend every day making it up to you. Please forgive me.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6">
              <div className="flex items-center justify-center gap-2 text-slate-500">
                <Moon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">Always</span>
                <Sun className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-500">
                <Music className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">Forever</span>
                <Clock className="w-4 h-4 md:w-5 md:h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}