import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data';
import { MenuItem, CartItem } from '../types';
import { Search, Flame, Leaf, Award, Plus, Check, Info, X } from 'lucide-react';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, quantity: number, notes?: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Complete Feast' },
  { id: 'weekly-specials', label: 'Weekly Specials' },
  { id: 'himalayan-tibetan', label: 'Himalayan Specials' },
  { id: 'momo', label: 'Handcrafted Momos' },
  { id: 'indo-chinese', label: 'Indo-Chinese Fusion' },
  { id: 'noodles-rice', label: 'Noodles & Wok Rice' },
  { id: 'quick-bites', label: 'Himalayan Street Food' },
  { id: 'beverages', label: 'Spiced Teas & Lassis' },
];

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Customization Modal states
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [spiceLevel, setSpiceLevel] = useState<string>('Himalayan Medium');
  const [proteinChoice, setProteinChoice] = useState<string>('Chicken');
  const [customNotes, setCustomNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNotification, setAddedNotification] = useState<boolean>(false);

  // Filter items based on category and search query
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenCustomizer = (item: MenuItem) => {
    setSelectedItem(item);
    setSpiceLevel('Himalayan Medium');
    setProteinChoice(item.name.toLowerCase().includes('chicken') ? 'Chicken' : 
                      item.name.toLowerCase().includes('beef') ? 'Beef' : 
                      item.name.toLowerCase().includes('pork') ? 'Pork' : 'Veg');
    setCustomNotes('');
    setQuantity(1);
    setAddedNotification(false);
  };

  const handleConfirmAdd = () => {
    if (!selectedItem) return;
    
    // Construct customization details for cart note
    const options: string[] = [];
    if (selectedItem.isSpicy) options.push(`Spice: ${spiceLevel}`);
    
    // If momos or select Indo-Chinese allow protein swap
    const canSwapProtein = ['momo', 'indo-chinese', 'noodles-rice'].includes(selectedItem.category) && 
                           !selectedItem.isVegetarian;
    if (canSwapProtein) {
      options.push(`Protein: ${proteinChoice}`);
    }

    if (customNotes.trim()) {
      options.push(customNotes.trim());
    }

    onAddToCart(selectedItem, quantity, options.join(', '));
    setAddedNotification(true);
    
    // Brief visual confirmation before closing
    setTimeout(() => {
      setSelectedItem(null);
      setAddedNotification(false);
    }, 800);
  };

  return (
    <section id="menu-section" className="py-24 px-4 bg-[#FAF8F5] border-b border-border-bento relative overflow-hidden">
      
      {/* Decorative Spice/Leaf pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#8B261E03_2px,transparent_2px)] bg-[size:16px_16px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[radial-gradient(#8B261E03_2px,transparent_2px)] bg-[size:16px_16px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-red/10 border border-brand-red/20 text-brand-red text-xs font-bold uppercase tracking-widest rounded-full mb-3">
            <Award size={14} className="text-brand-red" />
            <span>Feast of high mountains</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight">
            Order Online
          </h2>
          <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-lg mx-auto leading-relaxed">
            Choose from authentic Indo-Chinese, Tibetan, and Nepalese classics. Customized to your preferred heat levels, prepared fresh daily.
          </p>
        </div>

        {/* Filter Controls (Search + Categories) */}
        <div className="space-y-6 mb-12">
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search dishes (e.g. momo, shapta, lassi...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-border-bento rounded-full text-xs md:text-sm focus:outline-none focus:border-brand-red focus:bg-white text-brand-charcoal transition-all placeholder:text-gray-400 shadow-xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-charcoal"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Categories Horizontal Scroller */}
          <div className="flex gap-2 overflow-x-auto pb-4 pt-1 justify-start md:justify-center no-scrollbar -mx-4 px-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-brand-red text-white border-brand-red shadow-md scale-[1.02]'
                    : 'bg-white border-border-bento text-gray-500 hover:bg-[#F2ECE1] hover:text-brand-charcoal'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-border-bento rounded-[2rem] p-5 hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative aspect-video w-full rounded-[1.5rem] overflow-hidden mb-4 border border-[#F2ECE1] bg-[#F2ECE1]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                        <Info size={24} />
                      </div>
                    )}
                    
                    {/* Tags overlay */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                      {item.isPopular && (
                        <span className="bg-brand-red text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                          ⭐ Popular
                        </span>
                      )}
                      {item.isVegetarian && (
                        <span className="bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                          <Leaf size={8} /> Veg
                        </span>
                      )}
                      {item.isSpicy && (
                        <span className="bg-orange-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-0.5">
                          <Flame size={8} /> Spicy
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3 className="font-serif font-bold text-lg text-brand-charcoal leading-snug group-hover:text-brand-red transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-serif font-bold text-brand-red text-sm sm:text-base bg-brand-cream border border-border-bento px-3 py-1 rounded-full shadow-xs">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-gray-500 text-xs leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between mt-auto">
                  <span className="text-[10px] text-gray-400 font-mono">
                    Category: {CATEGORIES.find((c) => c.id === item.category)?.label}
                  </span>
                  <button
                    onClick={() => handleOpenCustomizer(item)}
                    className="bg-[#1A1A1A] text-white hover:bg-black transition-all rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 shadow-md"
                  >
                    <Plus size={12} className="text-white" />
                    Customize & Add
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* No Results Fallback */}
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-16 space-y-4 border border-dashed border-border-bento rounded-[2rem] bg-white">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto border border-dashed border-border-bento">
                <Info size={18} className="text-gray-400" />
              </div>
              <div>
                <p className="font-semibold text-brand-charcoal">No dishes match your filters</p>
                <p className="text-xs text-gray-400 mt-1">Try clear search query or select another food category.</p>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ITEM CUSTOMIZATION MODAL DIALOG */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-4 right-4 md:left-auto md:right-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 max-w-lg w-full bg-white rounded-3xl shadow-2xl z-50 overflow-hidden border border-[#EBE3D5] flex flex-col max-h-[90vh]"
            >
              {/* Modal Banner Photo */}
              {selectedItem.image && (
                <div className="relative aspect-video w-full">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 bg-black/40 text-white hover:bg-black/70 p-2 rounded-full transition-colors"
                  >
                    <X size={16} />
                  </button>

                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-2xl font-display font-bold text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                      {selectedItem.name}
                    </h3>
                  </div>
                </div>
              )}

              {/* Modal Details Scrollable */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
                
                <div>
                  <h4 className="text-xs font-mono uppercase text-brand-red font-semibold mb-1">Description</h4>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Customize Spice Level (Only if applicable/spicy or requests allow) */}
                {selectedItem.isSpicy && (
                  <div>
                    <h4 className="text-xs font-semibold text-brand-charcoal mb-2 flex items-center gap-1">
                      <Flame size={14} className="text-orange-500" />
                      Select Spice Intensity
                    </h4>
                    <div className="grid grid-cols-4 gap-2">
                      {['Mild Mountain', 'Himalayan Medium', 'Gorkha Hot', 'Rasuwa Fiery!'].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setSpiceLevel(level)}
                          className={`py-2 px-1 text-[10px] sm:text-xs font-bold rounded-xl border text-center transition-all ${
                            spiceLevel === level
                              ? 'bg-brand-red border-brand-red text-white'
                              : 'bg-[#FAF7F2] border-[#EBE3D5] text-gray-600 hover:bg-[#F2ECE1]'
                          }`}
                        >
                          {level.split(' ')[0]}
                          <span className="block text-[8px] font-normal opacity-80 mt-0.5">
                            {level.split(' ')[1] || 'Spice'}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Protein swap for momos or stir-fries */}
                {['momo', 'indo-chinese', 'noodles-rice'].includes(selectedItem.category) && !selectedItem.isVegetarian && (
                  <div>
                    <h4 className="text-xs font-semibold text-brand-charcoal mb-2">Protein Selection</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {['Chicken', 'Beef', 'Pork', 'Vegetable'].map((prot) => (
                        <button
                          key={prot}
                          type="button"
                          onClick={() => setProteinChoice(prot)}
                          className={`py-2 px-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                            proteinChoice === prot
                              ? 'bg-brand-green border-brand-green text-white'
                              : 'bg-[#FAF7F2] border-[#EBE3D5] text-gray-600 hover:bg-[#F2ECE1]'
                          }`}
                        >
                          {prot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special Instructions */}
                <div>
                  <h4 className="text-xs font-semibold text-brand-charcoal mb-1">Add Specific Notes</h4>
                  <input
                    type="text"
                    placeholder="E.g. Extra hot tomato sauce, sauce on side..."
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#EBE3D5] bg-[#FAF7F2] focus:outline-none focus:border-brand-red text-brand-charcoal"
                  />
                </div>

                {/* Quantity and Action Footer */}
                <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between gap-4">
                  {/* Quantity Counter */}
                  <div className="flex items-center gap-3 border border-[#EBE3D5] rounded-xl p-1.5 bg-[#FAF7F2]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-lg hover:bg-[#EBE3D5] flex items-center justify-center text-gray-500 font-bold"
                    >
                      -
                    </button>
                    <span className="font-mono font-bold text-brand-charcoal text-sm w-4 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-lg hover:bg-[#EBE3D5] flex items-center justify-center text-gray-500 font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={handleConfirmAdd}
                    disabled={addedNotification}
                    className="flex-1 bg-brand-red text-white py-3 rounded-xl text-xs font-bold tracking-wider hover:bg-red-800 transition-all flex items-center justify-center gap-2 shadow-xs"
                  >
                    {addedNotification ? (
                      <>
                        <Check size={14} className="text-brand-gold animate-bounce" />
                        Added to Basket!
                      </>
                    ) : (
                      <>
                        Add {quantity} to Order • ${(selectedItem.price * quantity).toFixed(2)}
                      </>
                    )}
                  </button>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
