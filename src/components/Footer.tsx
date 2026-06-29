import { RESTAURANT_INFO } from '../data';
import { 
  Phone, MapPin, Clock, Truck, Utensils, Heart, Mail, 
  Send, Shield, ArrowUpRight 
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-logistics" className="bg-brand-charcoal text-[#EDE9E2] pt-20 pb-8 px-4 border-t-4 border-brand-gold relative overflow-hidden">
      
      {/* Mountain outline details in the background footer */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 relative z-10">
        
        {/* Brand Story & Mission */}
        <div className="md:col-span-4 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-brand-red flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-brand-cream">
                <path d="M4 18 L10 7 L14 13 L18 5 L21 18 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-none tracking-tight">Rasuwa Lirung</h3>
              <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold font-mono">Himalayan Spiced Kitchen</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            {RESTAURANT_INFO.story}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {RESTAURANT_INFO.serviceOptions.map((opt) => (
              <span 
                key={opt}
                className="text-[10px] font-semibold bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-brand-gold uppercase tracking-wider flex items-center gap-1"
              >
                {opt === 'Delivery' ? <Truck size={10} /> : <Utensils size={10} />}
                {opt}
              </span>
            ))}
          </div>
        </div>

        {/* Logistics, Hours, Phone */}
        <div className="md:col-span-4 space-y-6">
          <h4 className="font-display font-bold text-sm uppercase tracking-widest text-brand-gold border-b border-white/10 pb-2">
            Contact & Hours
          </h4>

          <div className="space-y-4 text-xs md:text-sm">
            <div className="flex items-start gap-3">
              <Clock className="text-brand-gold shrink-0 mt-0.5" size={16} />
              <div>
                <h5 className="font-semibold text-[#EDE9E2]">Service Hours</h5>
                <p className="text-gray-400 text-xs mt-1 leading-normal">
                  {RESTAURANT_INFO.hours}
                  <span className="block text-[10px] text-brand-gold/80 mt-0.5">Open every single day for lunch, dinner & tea</span>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="text-brand-gold shrink-0 mt-0.5" size={16} />
              <div>
                <h5 className="font-semibold text-[#EDE9E2]">Call or Order Ahead</h5>
                <p className="text-gray-400 text-xs mt-1">
                  <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-brand-red font-semibold transition-colors">
                    {RESTAURANT_INFO.phone}
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-brand-gold shrink-0 mt-0.5" size={16} />
              <div>
                <h5 className="font-semibold text-[#EDE9E2]">Dining Location</h5>
                <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                  {RESTAURANT_INFO.address}
                  <span className="block text-[10px] text-gray-500 mt-0.5">Under the 7 Train subway tracks in Woodside, Queens</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mock Map / Dynamic Location visual card */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-display font-bold text-sm uppercase tracking-widest text-brand-gold border-b border-white/10 pb-2">
            Location Map
          </h4>

          <div className="bg-white/5 border border-white/10 p-4 rounded-3xl relative overflow-hidden flex flex-col justify-between h-44 group">
            {/* Minimal SVG stylized map elements inside */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                {/* Roosevelt Ave Grid lines */}
                <line x1="0" y1="50" x2="300" y2="50" stroke="currentColor" strokeWidth="6" />
                <line x1="120" y1="0" x2="120" y2="150" stroke="currentColor" strokeWidth="4" />
                <line x1="200" y1="0" x2="200" y2="150" stroke="currentColor" strokeWidth="4" />
                {/* 7 Train Elevated tracks */}
                <line x1="0" y1="45" x2="300" y2="45" stroke="#C53030" strokeWidth="2" strokeDasharray="5,5" />
                {/* Restaurant location pin */}
                <circle cx="120" cy="50" r="10" fill="#D4AF37" className="animate-ping opacity-70" />
                <circle cx="120" cy="50" r="6" fill="#A62B2B" />
              </svg>
            </div>

            <div className="relative z-10">
              <span className="text-[10px] uppercase font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">
                Woodside, Queens, NY
              </span>
              <p className="text-xs font-semibold mt-2 text-white">63-02 Roosevelt Ave</p>
              <p className="text-[10px] text-gray-400 mt-1">Excellent transit accessibility. Off the 61st St-Woodside express terminal.</p>
            </div>

            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT_INFO.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 w-full bg-white/10 hover:bg-white text-white hover:text-brand-charcoal font-bold text-[11px] py-2.5 rounded-xl transition-all flex items-center justify-center gap-1 border border-white/10"
            >
              Get Directions on Maps
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

      </div>

      {/* Sub Footer Legal / Sourcing Details */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 text-center md:text-left">
        <p className="flex items-center gap-1 justify-center md:justify-start">
          Made with <Heart size={11} className="text-brand-red fill-brand-red animate-pulse" /> for Nepalese culinary culture. 
          © {currentYear} {RESTAURANT_INFO.name}. All Rights Reserved.
        </p>

        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <Shield size={11} />
            Secure simulated sandbox order
          </span>
          <span>•</span>
          <span>Sourced from Rasuwa, Nepal</span>
        </div>
      </div>
    </footer>
  );
}
