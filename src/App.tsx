import { useState } from 'react';
import Navbar from './components/Navbar';
import ThaliHero from './components/ThaliHero';
import MenuSection from './components/MenuSection';
import ReviewSection from './components/ReviewSection';
import Footer from './components/Footer';
import OrderDrawer from './components/OrderDrawer';
import { MenuItem, CartItem } from './types';
import { RESTAURANT_INFO } from './data';
import { 
  Flame, Sparkles, MapPin, Phone, Clock, ArrowRight, Check, Shield,
  ChevronDown, Utensils, Award, Mountain, Sprout, Heart
} from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [orderType, setOrderType] = useState<'dine-in' | 'takeout' | 'delivery'>('takeout');

  // Add Item to shopping bag
  const handleAddToCart = (menuItem: MenuItem, quantity: number, notes?: string) => {
    setCart((prevCart) => {
      // Check if item with same ID and same custom notes already exists in cart
      const existingIdx = prevCart.findIndex(
        (item) => item.menuItem.id === menuItem.id && item.notes === notes
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [...prevCart, { menuItem, quantity, notes }];
    });
    
    // Auto open cart drawer to guide order flow
    setIsCartOpen(true);
  };

  // Update item quantity in shopping bag
  const handleUpdateQty = (menuItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(menuItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuItem.id === menuItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove item from shopping bag
  const handleRemoveItem = (menuItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.menuItem.id !== menuItemId));
  };

  // Clear shopping bag
  const handleClearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-brand-charcoal selection:bg-brand-red selection:text-white">
      
      {/* Dynamic Nav bar */}
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      {/* 1. DYNAMIC ROTATING DAL BHAT THALI HERO EXPERIENCE */}
      <ThaliHero />

      {/* 2. SOURCING STORY: SPICES DIRECT FROM RASUWA */}
      <section id="sourcing-story" className="py-24 px-4 bg-white border-b border-border-bento relative overflow-hidden">
        
        {/* Background texture */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-[radial-gradient(#8B261E03_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Sourcing Graphics */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            <div className="aspect-square w-full max-w-sm mx-auto rounded-[2rem] overflow-hidden border border-border-bento shadow-xl relative bg-brand-cream">
              <img 
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80" 
                alt="Himalayan Mountain Sourcing Rasuwa"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white text-left space-y-1">
                <p className="text-[10px] uppercase font-bold font-mono tracking-widest text-brand-gold">Rasuwa District</p>
                <h4 className="text-lg font-serif font-bold">Lirung Glacier Valleys</h4>
                <p className="text-xs text-white/80 leading-normal">Our spices are sourced at altitudes exceeding 10,000 feet directly from small local cooperatives.</p>
              </div>
            </div>

            {/* Overlapping small circular spice dish visual */}
            <div className="absolute -bottom-6 -right-2 sm:-right-6 w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-orange-950">
              <img 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=300&q=80" 
                alt="Nepalese Red Timmur Pepper"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Sourcing Textual Narrative */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-bold uppercase tracking-widest rounded-full">
              <Mountain size={14} className="text-brand-red" />
              <span>Direct Farm-To-Table Sourcing</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight">
              Wild Herbs Sourced From<br/>
              <span className="text-brand-red italic font-normal">the High Himalayas</span>
            </h2>

            <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
              What sets Rasuwa Lirung apart is our absolute refusal to compromise on raw spice authenticity. Sourced directly from local foragers in the high-altitude Rasuwa district bordering Tibet, our kitchen uses wild, medicinal Himalayan flora that you won't find anywhere else in Woodside.
            </p>

            {/* Spice breakdown blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-border-bento">
              
              <div className="space-y-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-brand-cream border border-border-bento flex items-center justify-center">
                  <Sprout className="text-brand-red" size={16} />
                </div>
                <h4 className="font-serif font-bold text-sm text-brand-charcoal">Jimbu (जिम्बु)</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  A rare, thread-like wild allium grass hand-foraged in alpine grasslands. When flash-tempered in hot ghee, it releases an earthy, garlic-chive aroma that defines our signature Dal.
                </p>
              </div>

              <div className="space-y-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-brand-cream border border-border-bento flex items-center justify-center">
                  <Flame className="text-brand-red animate-pulse" size={16} />
                </div>
                <h4 className="font-serif font-bold text-sm text-brand-charcoal">Timmur (टिमुर)</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Wild-harvested Sichuan pepper native to the Nepalese mountains. Packing a crisp citrusy punch with a warm, tingling finish, it forms the heart of our hand-pounded tomato achar.
                </p>
              </div>

              <div className="space-y-2 text-left">
                <div className="w-8 h-8 rounded-lg bg-brand-cream border border-border-bento flex items-center justify-center">
                  <Heart className="text-brand-gold" size={16} />
                </div>
                <h4 className="font-serif font-bold text-sm text-brand-charcoal">Jimbu Ghee</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Ghee butter clarified with Himalayan mountain herbs, generating a deep butteriness and nutritional density used in both our curries and Tibetan butter tea.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. DIGITAL ONLINE FEAST MENU */}
      <MenuSection onAddToCart={handleAddToCart} />

      {/* 5. GUEST TESTIMONIALS & COMMUNITY SENTIMENT */}
      <ReviewSection />

      {/* 6. SCHEDULING, LOGISTICS & CONTACT INFO */}
      <Footer />

      {/* Shopping Cart Drawer */}
      <OrderDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        orderType={orderType}
        setOrderType={setOrderType}
      />

    </div>
  );
}
