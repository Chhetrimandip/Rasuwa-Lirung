import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { THALI_HOTSPOTS } from '../data';
import { ThaliHotspot } from '../types';
import { Flame, Sparkles, Heart, RefreshCw, ArrowRight, MapPin, Clock, Utensils, ChevronDown } from 'lucide-react';

export default function ThaliHero() {
  const [selectedId, setSelectedId] = useState<string>('bhat');
  const [rotation, setRotation] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track page scroll to rotate the thali plate smoothly
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight && elementTop + elementHeight > 0) {
        // Map scroll range to rotation angle
        const scrolledFraction = (windowHeight - elementTop) / (windowHeight + elementHeight);
        setRotation(scrolledFraction * 360); // Full 360 degrees for circular rotation on scroll
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  //just for deploying added comment

  const selectedItem = THALI_HOTSPOTS.find(item => item.id === selectedId) || THALI_HOTSPOTS[0];

  // Helper to place interactive hotspots precisely on the rotating plate circle
  const getHotspotStyle = (hotspot: ThaliHotspot) => {
    if (hotspot.id === 'bhat') {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    // Override angles to align perfectly with the high-res real top-down food photo!
    let angle = hotspot.angle;
    let distance = hotspot.distance;

    if (hotspot.id === 'dal') {
      angle = 300; // Top Right
      distance = 62;
    }
    if (hotspot.id === 'tarkari') {
      angle = 220; // Top Left
      distance = 62;
    }
    if (hotspot.id === 'saag') {
      angle = 40;  // Bottom Right
      distance = 62;
    }
    if (hotspot.id === 'achar') {
      angle = 130; // Bottom Left
      distance = 62;
    }
    if (hotspot.id === 'papad') {
      angle = 185; // Left
      distance = 75;
    }

    const rad = (angle * Math.PI) / 180;
    // Radial offset from the 50% 50% center
    const distanceFactor = 0.40;
    const x = 50 + distance * distanceFactor * Math.cos(rad);
    const y = 50 + distance * distanceFactor * Math.sin(rad);

    return {
      top: `${y}%`,
      left: `${x}%`,
      transform: 'translate(-50%, -50%)',
    };
  };

  return (
    <section
      id="thali-experience"
      ref={containerRef}
      className="relative w-full bg-[#FAF8F5] overflow-hidden border-b border-border-bento lg:py-24 py-12"
    >
      {/* Background Subtle Cream & Red Accents */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative mountain background line at the bottom */}
      <div className="absolute bottom-0 inset-x-0 opacity-[0.02] pointer-events-none select-none">
        <svg width="100%" height="100" viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 100 L150 40 L300 80 L450 30 L650 70 L850 20 L1100 80 L1250 30 L1440 80 L1440 100 Z" fill="#8B261E" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-12 lg:space-y-16">

        {/* TOP BLOCK: Balanced Full-Width Header (Anti-AI design, no empty left/right columns!) */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-red/10 border border-brand-red/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
            <span className="text-[9px] font-mono font-bold text-brand-red uppercase tracking-widest">
              Directly Sourcing From Rasuwa, Nepal
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-brand-charcoal tracking-tight leading-none">
            Savor the Authentic<br />
            <span className="text-brand-red italic font-normal">Spices of the Himalayas</span>
          </h1>

          {/* Description */}
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Welcome to <span className="text-brand-red font-semibold font-serif">Rasuwa Lirung Restaurant</span>. Sourced straight from local farmers in Nepal's high-altitude valleys, our dishes are infused with authentic herbs like wild Jimbu and Timmur pepper. Discover a rich tapestry of Nepalese, Tibetan, and Indo-Chinese culinary crafts.
          </p>

          {/* Compact Practical Info Row (Centered, prominent, zero layout overlapping) */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500 font-medium py-2.5 border-y border-border-bento w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-brand-red shrink-0" />
              <span className="font-sans font-semibold text-brand-charcoal">63-02 Roosevelt Ave, Woodside</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-brand-red shrink-0" />
              <span className="font-sans font-semibold text-brand-charcoal">9:00 AM – 11:00 PM Today</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
            <div className="flex items-center gap-1.5">
              <Utensils size={13} className="text-brand-red shrink-0" />
              <span className="font-sans font-semibold text-brand-charcoal">Dine-in, Takeout & Delivery</span>
            </div>
          </div>

          {/* Core Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <a
              href="#menu-section"
              className="w-full sm:w-auto bg-brand-red text-white hover:bg-red-800 transition-all font-bold text-[10px] tracking-widest uppercase py-3.5 px-7 rounded-full shadow-md flex items-center justify-center gap-1.5"
            >
              Order Online Delivery
              <ArrowRight size={12} />
            </a>
            <button
              onClick={() => {
                const element = document.getElementById('thali-interactive-playground');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full sm:w-auto bg-[#1A1A1A] text-white hover:bg-black transition-all font-bold text-[10px] tracking-widest uppercase py-3.5 px-7 rounded-full shadow-md flex items-center justify-center gap-1.5 group"
            >
              Learn the Interactive Thali
              <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* BOTTOM BLOCK: Interactive Showcase (Grid layout) */}
        <div
          id="thali-interactive-playground"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-6"
        >
          {/* LEFT COLUMN: Sticky Inspector Card on Desktop / Rendered beneath plate on Mobile */}
          <div className="order-2 lg:order-1 lg:col-span-5 lg:sticky lg:top-32 space-y-4">

            <div
              id="thali-inspector-block"
              className="bg-white border border-border-bento rounded-2xl p-5 md:p-6 shadow-sm relative overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-bl-full pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans text-[9px] uppercase tracking-widest text-brand-red font-bold font-mono">
                      Thali Highlight
                    </span>
                    <span className="text-lg md:text-xl font-bold text-brand-gold font-serif">
                      {selectedItem.nepaliName}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-serif font-bold text-brand-charcoal mb-1.5">
                    {selectedItem.name}
                  </h3>

                  <p className="text-gray-500 text-xs leading-relaxed mb-4">
                    {selectedItem.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3.5 border-t border-border-bento">
                    <div className="flex gap-2">
                      <Flame className="text-brand-red shrink-0" size={16} />
                      <div>
                        <h4 className="font-bold text-[10px] text-brand-charcoal uppercase tracking-wider">Himalayan Spicing</h4>
                        <p className="text-gray-400 text-[10px] mt-0.5 leading-snug">
                          {selectedItem.id === 'bhat' ? 'Fragrant Himalayan long grain, fluffy and delicate.' :
                            selectedItem.id === 'dal' ? 'Tempered with wild Jimbu grass and ghee.' :
                              selectedItem.id === 'achar' ? 'Pounded with citrusy wild Timmur pepper.' :
                                selectedItem.id === 'saag' ? 'Sautéed in fresh local cold-pressed mustard oil.' :
                                  selectedItem.id === 'tarkari' ? 'Organic spices roasted with mountain herbs.' :
                                    'Sun-dried lentil flour toasted over hot wood coals.'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Heart className="text-brand-red shrink-0" size={16} />
                      <div>
                        <h4 className="font-bold text-[10px] text-brand-charcoal uppercase tracking-wider">Ayurvedic Benefits</h4>
                        <p className="text-gray-400 text-[10px] mt-0.5 leading-snug">
                          {selectedItem.benefits}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Manual item quick switcher buttons inside inspector card */}
              <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-border-bento justify-start">
                {THALI_HOTSPOTS.map((hotspot) => (
                  <button
                    key={hotspot.id}
                    onClick={() => setSelectedId(hotspot.id)}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all border ${selectedId === hotspot.id
                      ? 'bg-brand-red border-brand-red text-white shadow-sm'
                      : 'bg-stone-50 border-border-bento text-gray-500 hover:bg-[#F2ECE1] hover:text-brand-charcoal'
                      }`}
                  >
                    {hotspot.name.split(' ')[hotspot.name.split(' ').length - 1]}
                  </button>
                ))}
              </div>

              {/* Scrolling instruction */}
              <div className="mt-4 flex items-center justify-between text-[10px] text-gray-400">
                <span className="flex items-center gap-1.5 font-medium uppercase tracking-wider">
                  <RefreshCw size={11} className="animate-spin-slow text-brand-red" />
                  Scroll to spin plate
                </span>
                <span className="uppercase tracking-wider">Tap items to inspect</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Spinning Thali Plate (Sticky on Desktop / Rendered above on Mobile) */}
          <div className="order-1 lg:order-2 lg:col-span-7 w-full flex flex-col items-center justify-center py-4 lg:py-0 lg:sticky lg:top-24">

            {/* Scroll instruction for mobile */}
            <div className="block lg:hidden text-center mb-4">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5 justify-center">
                <RefreshCw size={10} className="animate-spin-slow text-brand-red" />
                Scroll to spin • Tap highlights to inspect
              </p>
            </div>

            <div className="relative w-[290px] h-[290px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] lg:w-[450px] lg:h-[450px] flex items-center justify-center">

              {/* Soft plate shadow */}
              <div className="absolute w-[94%] h-[94%] rounded-full bg-black/10 blur-2xl pointer-events-none transform translate-y-6" />

              {/* Interactive Spinning Container */}
              <motion.div
                style={{ rotate: rotation }}
                className="relative w-[96%] h-[96%] rounded-full flex items-center justify-center select-none cursor-pointer"
              >
                {/* 100% REAL AND BEAUTIFUL NEPALESE THAKALI THALI PLATE WITH NO TABLE BACKGROUND (MATCHING USER'S PHOTO PERFECTLY) */}
                <img
                  src="/plate.webp"
                  alt="Authentic Nepalese Thakali Thali Plate"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain drop-shadow-2xl select-none scale-200"
                />

                {/* INTERACTIVE HOTSPOT OVERLAYS */}
                {THALI_HOTSPOTS.map((hotspot) => {
                  const style = getHotspotStyle(hotspot);
                  const isSelected = hotspot.id === selectedId;

                  return (
                    <button
                      key={hotspot.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedId(hotspot.id);
                      }}
                      style={style}
                      className="absolute z-30 group/hotspot focus:outline-none transition-transform duration-300 active:scale-95"
                      id={`hotspot-${hotspot.id}`}
                    >
                      {/* Glowing highlight ring */}
                      <span className={`absolute -inset-4 rounded-full bg-white/20 transition-all duration-300 ${isSelected
                        ? 'scale-110 ring-4 ring-brand-red animate-pulse'
                        : 'scale-0 group-hover/hotspot:scale-100 group-hover/hotspot:ring-2 group-hover/hotspot:ring-white/60'
                        }`} />

                      {/* Glassmorphic plate marker tag */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-300 ${isSelected
                        ? 'bg-brand-red border-white text-white scale-110 shadow-brand-red/40'
                        : 'bg-[#1A1A1A]/85 border-[#EBE3D5] text-white hover:bg-brand-red hover:border-white'
                        }`}>
                        <span className="text-[9px] font-black uppercase font-mono tracking-tighter">
                          {hotspot.id === 'bhat' ? 'Rice' : hotspot.name.charAt(0)}
                        </span>
                      </div>

                      {/* Self-correcting horizontal label tag that adjusts as plate rotates! */}
                      <motion.div
                        style={{ rotate: -rotation }}
                        className={`absolute left-1/2 -translate-x-1/2 -top-11 bg-[#1A1A1A] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 rounded-full shadow-md border border-white/10 whitespace-nowrap pointer-events-none transition-all duration-300 ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover/hotspot:opacity-100 group-hover/hotspot:scale-100'
                          }`}
                      >
                        {hotspot.name}
                      </motion.div>
                    </button>
                  );
                })}
              </motion.div>

              {/* Decorative outer rotating dashed guide ring */}
              <div className="absolute inset-[-14px] border border-dashed border-brand-red/20 rounded-full pointer-events-none animate-spin-slow" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
