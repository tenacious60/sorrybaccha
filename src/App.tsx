import React, { useState, useEffect, useRef } from 'react';
import FallingPieces from './components/FallingShapes';

// प्रकार
interface Song {
  title: string;
  artist: string;
  src: string;
}

interface CandleState {
  A: boolean;
  B: boolean;
}

const App: React.FC = () => {
  // स्टेट
  const [currentSong, setCurrentSong] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [candlesLit] = useState<CandleState>({ A: false, B: false });
  const [showPromise, setShowPromise] = useState<boolean>(false);
  const [showFireworks] = useState<boolean>(false);
  const [herName, setHerName] = useState<string>('पुग्गू');
  const [nickname, setNickname] = useState<string>('पुग्गू');
  const [myName, setMyName] = useState<string>('पार्टनर');


  // रेफ्स
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationContainerRef = useRef<HTMLDivElement>(null);

  // कॉन्फ़िगरेशन
  const songs: Song[] = [
    { 
      title: 'हमारा बाबू सोना करेजा ',
      artist: 'साथ हमेशा के लिए',
      src: './songs/special-song.mp3'
    },
    { 
      title: 'हमारा गाना',
      artist: 'साथ हमेशा के लिए',
      src: './songs/m01.mp3'
    },
    { 
      title: 'हमारा गाना', 
      artist: 'साथ हमेशा के लिए',
      src: './songs/m04.mp3'
    },
    { 
      title: 'हमेशा तुम्हारा', 
      artist: 'दिल की धड़कन',
      src: './songs/m05.mp3'
    },
    { 
      title: 'हमेशा तुम्हारा', 
      artist: 'दिल की धड़कन',
      src: './songs/m06.mp3'
    },
    { 
      title: 'हमेशा तुम्हारा', 
      artist: 'दिल की धड़कन',
      src: './songs/m07.mp3'
    },
    { 
      title: 'हमेशा तुम्हारा', 
      artist: 'दिल की धड़कन',
      src: './songs/m09.mp3'
    }
  ];

  // (removed unused romanticQuotes to satisfy typecheck)

  const [showShapes, setShowShapes] = useState<boolean>(false);

  // फ्लोटिंग हार्ट्स इनिशियलाइज़ करें
  useEffect(() => {
    initFloatingHearts();
    personalizePage();
    initAudio();

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ऑडियो इनिशियलाइज़ करें
  const initAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(songs[currentSong].src);
      audioRef.current.addEventListener('ended', handleSongEnd);
    }
  };

  // गाना खत्म होने पर ऑटो प्ले
  const handleSongEnd = () => {
    nextSong();
  };

  const initFloatingHearts = () => {
    const container = document.getElementById('floatingHearts');
    if (!container) return;

    const heartCount = window.innerWidth < 768 ? 8 : 15;
    container.innerHTML = '';

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = '❤️';
      heart.className = 'absolute text-xl md:text-2xl animate-float opacity-20';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.top = Math.random() * 100 + '%';
      heart.style.animationDuration = (8 + Math.random() * 10) + 's';
      heart.style.animationDelay = (Math.random() * -10) + 's';
      container.appendChild(heart);
    }
  };

  const personalizePage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    setHerName(urlParams.get('herName') || 'पुग्गू');
    setNickname(urlParams.get('nickname') || 'पुग्गू');
    setMyName(urlParams.get('myName') || 'पार्टनर');
  };

  // म्यूजिक कंट्रोल्स
  const togglePlay = () => {
    if (!audioRef.current) {
      initAudio();
    }

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.log('प्ले फेल:', e));
    }
    setIsPlaying(!isPlaying);
  };

  const prevSong = () => {
    setCurrentSong((prev) => {
      const newIndex = (prev - 1 + songs.length) % songs.length;
      if (audioRef.current) {
        audioRef.current.src = songs[newIndex].src;
        if (isPlaying) {
          audioRef.current.play().catch(e => console.log('प्ले फेल:', e));
        }
      }
      return newIndex;
    });
  };

  const nextSong = () => {
    setCurrentSong((prev) => {
      const newIndex = (prev + 1) % songs.length;
      if (audioRef.current) {
        audioRef.current.src = songs[newIndex].src;
        if (isPlaying) {
          audioRef.current.play().catch(e => console.log('प्ले फेल:', e));
        }
      }
      return newIndex;
    });
  };

  // प्रॉमिस ओवरले
  const openPromise = () => {
    setShowPromise(true);
    document.body.style.overflow = 'hidden';
  };

  const closePromise = () => {
    setShowPromise(false);
    document.body.style.overflow = 'auto';
  };




  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white min-h-screen overflow-x-hidden">
      {/* फ्लोटिंग हार्ट्स */}
      <div id="floatingHearts" className="fixed inset-0 pointer-events-none overflow-hidden z-0" />
      
      {/* फॉलिंग एनिमेशन */}
      <div 
        ref={animationContainerRef}
        className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
      />
      
      {/* फायरवर्क्स */}
      {showFireworks && (
        <div id="fireworks" className="fixed inset-0 pointer-events-none z-40">
          {/* फायरवर्क्स CSS/JS द्वारा जेनरेट होंगे */}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-6">
        {/* हैडर */}
        <header className="text-center mb-8 mobile-p-4">
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-4 mobile-stack mobile-gap-4">
            <svg className="w-8 h-8 md:w-12 md:h-12 text-pink-400 fill-pink-400 animate-heartbeat" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-slate-200 mt-10 mb-2 mobile-text-xl">मुझे माफ़ कर दो {herName}</h1>
              <p className="text-xl md:text-2xl text-pink-400 mt-6 font-medium animate-pulse mobile-text-lg">
                मैं तुमसे प्यार करता था, हूँ और रहूँगा , <span>{herName}</span>
              </p>
            </div>
            <svg className="w-8 h-8 md:w-12 md:h-12 text-pink-400 fill-pink-400 animate-heartbeat" style={{ animationDelay: '0.3s' }} viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <p className="text-base md:text-lg text-slate-400 font-bold tracking-wide mobile-text-center">
            मेरी प्यारी सी जान 🌸 <span>{nickname}</span> 🌸
          </p>
          <div className="w-24 h-0.5 bg-slate-600 mx-auto rounded-full mt-4"></div>

          {/* म्यूजिक कंट्रोल्स */}
          <div className="mt-6 inline-flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 mobile-stack mobile-gap-4">
            <span className="text-pink-400 text-sm font-semibold">🎵 लव यू हमार जान 🎵</span>
            <div className="flex gap-2">
              <button onClick={prevSong} className="p-2 hover:bg-white/10 rounded-lg transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button onClick={togglePlay} className="p-2 hover:bg-white/10 rounded-lg transition">
                {isPlaying ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6zm8 0h4v16h-4z"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"></path>
                  </svg>
                )}
              </button>
              <button onClick={nextSong} className="p-2 hover:bg-white/10 rounded-lg transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            {songs[currentSong].title} - {songs[currentSong].artist}
          </p>
        </header>

        {/* मुख्य कंटेंट */}
        <section className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-4 md:p-8 mb-6 border border-slate-700/50 mobile-p-4">
  <div className="grid md:grid-cols-2 gap-6 md:gap-8 mobile-stack mobile-gap-6">
    {/* बायीं ओर - मोमबत्तियाँ और कविता */}
    <div className="mobile-mb-4">
      <p className="text-pink-400 text-center mb-6 font-semibold text-lg mobile-text-center">
        मुझे खेद है कि मैंने तुम्हें दुख पहुँचाया 💔
      </p>

      {/* माफ़ी के लिए मोमबत्तियाँ */}
      <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-8 mb-8 mobile-stack mobile-gap-4">
        {/* मोमबत्ती A */}
        <div className="relative cursor-pointer transition-all duration-500 hover:scale-[1.02] w-full max-w-md mx-auto">
          <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border-2 border-pink-400/30 bg-slate-700/50 shadow-[0_0_40px_5px_rgba(255,182,193,0.3)] hover:shadow-[0_0_60px_10px_rgba(255,192,203,0.5)] transition-shadow duration-500">
            <img
              src="/01.jpg"
              alt="माफ़ी की मोमबत्ती"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />

            {/* Candle flame glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-10 h-16 md:w-12 md:h-20 candle-flame rounded-full shadow-[0_0_40px_15px_rgba(255,200,200,0.8)] ${
                  candlesLit.A ? '' : 'hidden'
                }`}
              />
            </div>
          </div>
        </div>

        {/* मोमबत्ती B */}
        <div className="relative cursor-pointer transition-all duration-500 hover:scale-[1.02] w-full max-w-md mx-auto">
          <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border-2 border-pink-400/30 bg-slate-700/50 shadow-[0_0_40px_5px_rgba(255,182,193,0.3)] hover:shadow-[0_0_60px_10px_rgba(255,192,203,0.5)] transition-shadow duration-500">
            <img
              src="/02.jpg"
              alt="प्यार की मोमबत्ती"
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"
            />

            {/* Candle flame glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-10 h-16 md:w-12 md:h-20 candle-flame rounded-full shadow-[0_0_40px_15px_rgba(255,200,200,0.8)] ${
                  candlesLit.B ? '' : 'hidden'
                }`}
              />
            </div>
            
          </div>
        </div>
        
      </div>
      <div className="mt-8 flex justify-center">
  <button
    onClick={() => {
      setShowShapes(true);
      // auto-hide after 6s
      setTimeout(() => setShowShapes(false), 6000);
    }}
    className="relative inline-block px-8 py-2 mb-5 bg-rose-500/90 hover:bg-rose-400/90 rounded-full font-semibold text-white text-sx shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-rose-400/60"
  >
    <span className="text-shadow-glow">💖 Click to forgive me 💖</span>
  </button>
</div>


      {/* माफ़ी कविता */}
      <div className="text-center p-4 md:p-6 bg-slate-900/50 rounded-2xl border border-pink-400/20 shadow-[0_0_25px_5px_rgba(255,182,193,0.2)] animate-glow mobile-p-4">
        <p className="text-pink-200 leading-relaxed text-sm md:text-base mobile-text-sm">
          💕 माफ़ करो मुझे आँसू लाने के लिए<br />
          दिल का दर्द जो लाया तुम्हारे लिए<br />
          तुम्हारी मुस्कान के बिना हर पल<br />
          यह माफ़ी माँगना बनता है सार्थक<br /><br />
          तुम मेरी दुनिया हो, यह सच है<br />
          और मैं वादा करता हूँ इसे सुधारने का<br />
          <span className="block mt-4 text-rose-300 font-bold text-base md:text-lg">
            कृपया मुझे माफ़ कर दो, मेरे प्यार 💕
          </span>
        </p>
      </div>
    </div>

    {/* दायीं ओर - माफ़ी संदेश */}
    <div>
      <div className="bg-slate-800/50 rounded-2xl p-4 md:p-6 mb-6 border border-slate-700/50 mobile-p-4 shadow-[0_0_25px_5px_rgba(255,182,193,0.15)]">
        <h2 className="text-lg md:text-xl font-bold text-pink-400 mb-3 mobile-text-center">
          दिल की गहराइयों से 💝
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mobile-text-center">
          मुझे पता है कि मैंने तुम्हें दुख पहुँचाया है, और शब्द व्यक्त नहीं कर सकते कि मैं कितना माफ़ी चाहता हूँ। तुम दुनिया की सारी खुशी की हकदार हो, और मैं वादा करता हूँ कि बेहतर बनूँगा। कृपया मुझे चीजों को सही करने का एक मौका दो।
        </p>
      </div>

      {/* माफ़ी संदेश */}
      <div className="space-y-3">
        {[
          "मुझे गहराई से खेद है कि मैंने आपको दर्द दिया। आप मेरे लिए सब कुछ हैं।",
          "आपकी मुस्कान के बिना हर पल अधूरा लगता है। कृपया मुझे माफ कर दें।",
          "मैं बेहतर बनने का, अधिक सुनने का और आपके साथ हर पल को संजोने का वादा करता हूं।",
          "आप मेरी दुनिया, मेरी रोशनी और एक बेहतर इंसान बनने का कारण हैं।",
          "मैं कभी नहीं चाहता कि आपकी आंखों में मेरी वजह से आंसू आएं। मुझे वास्तव में खेद है।",
          "तुम्हारे बिना मेरी दुनिया अधूरी है, कृपया मुझे फिर से अपने दिल में जगह दो।",
          "मैं वादा करता हूं कि मैं हर दिन तुम्हें खुश करने की कोशिश करूंगा। मुझे माफ कर दो।"
        ].map((message, index) => (
          <div
            key={index}
            className="bg-slate-800/30 p-4 rounded-xl border-l-2 border-pink-400 hover:bg-slate-800/50 transition-all duration-300 hover:translate-x-1 fade-in"
            style={{ animationDelay: `${0.3 + index * 0.3}s` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-slate-700 text-slate-300 rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-slate-300 text-sm">{message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


        {/* प्रॉमिस बटन */}
        <div className="text-center mb-8 mobile-p-4">
          <button 
            onClick={openPromise}
            className="relative px-8 md:px-12 py-3 md:py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-full text-base md:text-lg font-bold hover:scale-105 transition-transform shadow-lg shadow-pink-500/50 w-full max-w-xs mobile-text-lg"
          >
            <span className="relative z-10">आपसे मेरा वादा</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
          </button>
          
          <p className="text-pink-400 text-sm mt-3 animate-pulse mobile-text-center">💕 मेरा वादा देखने के लिए क्लिक करें 💕</p>
        </div>

        {/* अंतिम माफ़ी */}
        <section className="text-center bg-slate-800/30 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-700/50 mobile-p-4">
          <div className="flex justify-center gap-2 mb-6">
            {[0, 0.2, 0.4].map((delay, index) => (
              <svg 
                key={index}
                className="w-8 h-8 md:w-10 md:h-10 text-red-500 fill-red-500 animate-heartbeat" 
                style={{ animationDelay: `${delay}s` }}
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-200 mobile-text-xl">मैं तुम्हें हमेशा प्यार करूंगा</h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-6 mobile-text-center">
            कोई भी शब्द वास्तव में व्यक्त नहीं कर सकता कि मुझे कितना खेद है। तुम मेरी सब कुछ हो, और मैं वादा करता हूं कि इसे सही करने के लिए हर दिन काम करूंगा। कृपया मुझे माफ कर दो।
          </p>
          <p className="text-slate-300 text-base md:text-lg mobile-text-center">
            मेरे सारे प्यार के साथ, <span className="font-bold text-pink-400">तुम्हारा {myName}</span> 💕
          </p>
          <img 
            src="https://static.vecteezy.com/system/resources/previews/016/618/230/original/3d-cute-pink-valentine-s-day-icon-heart-i-love-you-free-png.png" 
            alt="दिल" 
            className="w-24 h-24 md:w-32 md:h-32 mx-auto mt-6 opacity-80"
          />
        </section>
      </div>

      {/* प्रॉमिस ओवरले */}
      {showPromise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative max-w-2xl w-full mx-auto bg-gradient-to-br from-slate-800 to-slate-900 p-6 md:p-8 rounded-3xl border-2 border-pink-400/50 shadow-2xl shadow-pink-500/20">
            <button 
              onClick={closePromise}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            <div className="text-center">
              <div className="text-4xl md:text-6xl mb-4 animate-heartbeat">💍</div>
              <h3 className="text-2xl md:text-3xl font-bold text-pink-400 mb-6 mobile-text-xl">आपसे मेरा वादा</h3>
              <div className="space-y-3 md:space-y-4 text-left text-slate-300 text-sm md:text-base leading-relaxed">
                <p>💕 मैं वादा करता हूं कि हमेशा आपकी पूरी ध्यान से सुनूंगा</p>
                <p>💕 मैं वादा करता हूं कि आपकी भावनाओं को सब कुछ से ऊपर महत्व दूंगा</p>
                <p>💕 मैं वादा करता हूं कि कभी भी आपको हल्के में नहीं लूंगा</p>
                <p>💕 मैं वादा करता हूं कि आपको हर रोज मुस्कुराऊंगा</p>
                <p>💕 मैं वादा करता हूं कि वह साथी बनूंगा जिसके आप हकदार हैं</p>
                <p>💕 मैं वादा करता हूं कि हर गुजरते पल के साथ आपसे और ज्यादा प्यार करूंगा</p>
              </div>
              <div className="mt-6 md:mt-8 p-4 md:p-6 bg-slate-900/50 rounded-2xl border border-pink-400/30">
                <p className="text-pink-300 font-bold text-base md:text-lg">
                  आप मेरे हमेशा के लिए हैं, और मुझे खेद है कि मैं एक पल के लिए भी इसे भूल गया। ❤️
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Falling shapes canvas (render when active) */}
      <FallingPieces active={showShapes} count={140} />
    </div>
  );
};

export default App;