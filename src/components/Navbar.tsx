import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, MapPin, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Thali Experience', href: '#thali-experience' },
    { name: 'Sourcing Story', href: '#sourcing-story' },
    { name: 'Feast Menu', href: '#menu-section' },
    { name: 'Guest Reviews', href: '#reviews-section' },
    { name: 'Find Us', href: '#footer-logistics' },
  ];

  return (
    <>
      {/* Top Banner with quick contact details */}
      <div className="bg-[#1A1A1A] text-white/90 text-[11px] py-2 px-4 hidden sm:flex items-center justify-between border-b border-white/10 relative z-50">
        <div className="flex items-center gap-4 max-w-7xl mx-auto w-full">
          <span className="flex items-center gap-1 font-medium">
            <MapPin size={11} className="text-brand-red" />
            {RESTAURANT_INFO.address}
          </span>
          <span className="flex items-center gap-1 font-medium">
            <Phone size={11} className="text-brand-red" />
            {RESTAURANT_INFO.phone}
          </span>
          <span className="ml-auto flex items-center gap-1 font-bold text-brand-gold uppercase tracking-wider">
            <Star size={11} className="fill-brand-gold" />
            5.0 ★ Google Rating
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 w-full ${
          isScrolled 
            ? 'bg-brand-cream/90 backdrop-blur-md shadow-sm border-b border-border-bento py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            {/* Mountain / Brass Pot hybrid abstract SVG */}
            <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center shadow-lg relative overflow-hidden transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-serif text-lg font-bold">RL</span>
            </div>
            <div>
              <h1 className="font-serif font-bold text-lg leading-none text-brand-charcoal tracking-tight uppercase group-hover:text-brand-red transition-colors">
                Rasuwa Lirung
              </h1>
              <span className="text-[10px] uppercase tracking-widest text-brand-red font-semibold font-sans block mt-0.5">
                Authentic Indo-Chinese & Nepali
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-wider text-gray-600 hover:text-brand-red transition-colors relative py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Call to Actions */}
          <div className="flex items-center gap-3">
            {/* Primary Order CTA */}
            <a 
              href="#menu-section"
              className="hidden sm:flex bg-brand-red text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-red-800 shadow-md transition-all"
            >
              Order Delivery
            </a>

            {/* Shopping Cart Pill */}
            <button
              onClick={onOpenCart}
              className="relative px-4 py-2.5 rounded-full bg-[#1A1A1A] text-white hover:bg-black transition-all shadow-md flex items-center gap-2 font-bold uppercase tracking-wider text-[11px]"
              id="cart-button"
            >
              <ShoppingBag size={14} className="text-white" />
              <span>Bag ({cartCount})</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-gold rounded-full animate-ping" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg md:hidden text-brand-charcoal hover:bg-[#F2ECE1] transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border-bento shadow-lg py-6 px-4 z-40 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-wider text-brand-charcoal hover:text-brand-red transition-colors py-2.5 border-b border-border-bento"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <a
                href="#menu-section"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-brand-red text-white py-3 rounded-full text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5"
              >
                Order Delivery
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full bg-[#1A1A1A] text-white py-3 rounded-full text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-1.5"
              >
                <ShoppingBag size={14} className="text-white" />
                View Bag ({cartCount})
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
