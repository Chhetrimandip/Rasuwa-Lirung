import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, MenuItem } from '../types';
import { RESTAURANT_INFO } from '../data';
import { 
  X, ShoppingBag, Plus, Minus, Send, Phone, MapPin, Watch, 
  CheckCircle, Truck, Flame, Sparkles, Clipboard, Coffee, ArrowRight 
} from 'lucide-react';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (menuItemId: string, newQty: number) => void;
  onRemoveItem: (menuItemId: string) => void;
  onClearCart: () => void;
  orderType: 'dine-in' | 'takeout' | 'delivery';
  setOrderType: (type: 'dine-in' | 'takeout' | 'delivery') => void;
}

type OrderStatus = 'none' | 'received' | 'cooking' | 'out-for-delivery' | 'completed';

export default function OrderDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  orderType,
  setOrderType
}: OrderDrawerProps) {
  // Checkout & Simulator States
  const [step, setStep] = useState<'cart' | 'checkout' | 'tracking'>('cart');
  const [address, setAddress] = useState<string>('');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  
  // Tracking simulator
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('none');
  const [timeRemaining, setTimeRemaining] = useState<number>(30); // seconds for demo

  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const tax = subtotal * 0.08875; // NYC Tax
  const deliveryFee = orderType === 'delivery' ? 3.99 : 0;
  const total = subtotal + tax + deliveryFee;

  // Track simulated countdown
  useEffect(() => {
    if (step !== 'tracking' || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setOrderStatus('completed');
          return 0;
        }
        
        // Dynamically update status based on remaining time
        if (prev === 22) setOrderStatus('cooking');
        if (prev === 12) setOrderStatus(orderType === 'delivery' ? 'out-for-delivery' : 'completed');
        
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeRemaining, orderType]);

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    // Begin order tracking simulation
    setStep('tracking');
    setOrderStatus('received');
    setTimeRemaining(30); // 30 seconds interactive demonstration
  };

  const resetOrderProcess = () => {
    onClearCart();
    setStep('cart');
    setOrderStatus('none');
    setTimeRemaining(30);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-xs"
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col h-full border-l border-[#EBE3D5]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#F2ECE1] flex items-center justify-between bg-brand-cream">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-brand-red" size={22} />
                <h3 className="text-xl font-display font-bold text-brand-charcoal">
                  {step === 'cart' ? 'Your Feast Order' : 
                   step === 'checkout' ? 'Details & Dispatch' : 'Rasuwa Live Tracker'}
                </h3>
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#F2ECE1] text-gray-500 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Container */}
            <div className="flex-1 overflow-y-auto p-6">
              
              {/* STEP 1: CART LIST */}
              {step === 'cart' && (
                <div className="space-y-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                      <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto border border-dashed border-[#EBE3D5]">
                        <ShoppingBag size={24} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-brand-charcoal">Your basket is empty</p>
                        <p className="text-xs text-gray-500 mt-1">Explore our aromatic menu and add something special!</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Order Type Toggle */}
                      <div className="bg-[#FAF7F2] p-1.5 rounded-xl border border-[#EBE3D5] grid grid-cols-3 gap-1">
                        {(['dine-in', 'takeout', 'delivery'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => setOrderType(type)}
                            className={`py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                              orderType === type 
                                ? 'bg-brand-red text-white shadow-xs' 
                                : 'text-gray-600 hover:text-brand-charcoal hover:bg-[#F2ECE1]'
                            }`}
                          >
                            {type.replace('-', ' ')}
                          </button>
                        ))}
                      </div>

                      {/* Cart Items List */}
                      <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                        {cart.map((item) => (
                          <div 
                            key={item.menuItem.id}
                            className="flex items-start gap-4 p-3 bg-[#FAF7F2] border border-[#F2ECE1] rounded-2xl relative group"
                          >
                            {item.menuItem.image && (
                              <img 
                                src={item.menuItem.image} 
                                alt={item.menuItem.name}
                                referrerPolicy="no-referrer"
                                className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#EBE3D5]"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-brand-charcoal truncate">
                                {item.menuItem.name}
                              </h4>
                              <p className="text-xs text-brand-red font-medium mt-0.5">
                                ${item.menuItem.price.toFixed(2)} each
                              </p>
                              {item.notes && (
                                <p className="text-[10px] text-emerald-700 bg-emerald-50 inline-block px-1.5 py-0.5 rounded mt-1 border border-emerald-100 italic">
                                  Notes: "{item.notes}"
                                </p>
                              )}
                            </div>

                            {/* Qty Counter */}
                            <div className="flex items-center gap-2 border border-[#EBE3D5] bg-white rounded-lg p-1 shrink-0 self-center">
                              <button 
                                onClick={() => onUpdateQty(item.menuItem.id, item.quantity - 1)}
                                className="p-1 rounded hover:bg-gray-100 text-gray-500"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-mono text-xs font-semibold text-brand-charcoal w-4 text-center">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => onUpdateQty(item.menuItem.id, item.quantity + 1)}
                                className="p-1 rounded hover:bg-gray-100 text-gray-500"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add special instructions */}
                      <div>
                        <label className="block text-xs font-semibold text-brand-charcoal mb-1 flex items-center gap-1">
                          <Clipboard size={12} />
                          Add Chef Notes
                        </label>
                        <textarea
                          placeholder="E.g., Extra hot chili momo sauce, no onions in Hakka noodles, etc."
                          value={specialInstructions}
                          onChange={(e) => setSpecialInstructions(e.target.value)}
                          className="w-full text-xs p-2.5 rounded-xl border border-[#EBE3D5] focus:outline-none focus:border-brand-red bg-[#FAF7F2] text-brand-charcoal h-16 resize-none"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* STEP 2: CHECKOUT INFO */}
              {step === 'checkout' && (
                <form onSubmit={handlePlaceOrder} className="space-y-5">
                  <h4 className="text-sm font-semibold text-brand-charcoal border-b border-[#F2ECE1] pb-2">
                    Customer Information
                  </h4>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-brand-charcoal mb-1">Your Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Aarya Sharma"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-[#EBE3D5] focus:outline-none focus:border-brand-red bg-[#FAF7F2] text-brand-charcoal"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-charcoal mb-1">Contact Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="+1 347-527-1285"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-[#EBE3D5] focus:outline-none focus:border-brand-red bg-[#FAF7F2] text-brand-charcoal"
                      />
                    </div>

                    {orderType === 'delivery' && (
                      <div>
                        <label className="block text-xs font-semibold text-brand-charcoal mb-1 flex items-center gap-1">
                          <MapPin size={12} className="text-brand-red" />
                          Delivery Address (Queens/Woodside vicinity)
                        </label>
                        <input 
                          type="text" 
                          required={orderType === 'delivery'}
                          placeholder="e.g. 61-10 Roosevelt Ave, Woodside, NY 11377"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-[#EBE3D5] focus:outline-none focus:border-brand-red bg-[#FAF7F2] text-brand-charcoal"
                        />
                        <p className="text-[10px] text-gray-400 mt-1">We currently deliver within a 3-mile radius of Woodside.</p>
                      </div>
                    )}

                    {orderType === 'dine-in' && (
                      <div>
                        <label className="block text-xs font-semibold text-brand-charcoal mb-1">Table Number</label>
                        <input 
                          type="text" 
                          required={orderType === 'dine-in'}
                          placeholder="e.g. Table 4"
                          value={tableNumber}
                          onChange={(e) => setTableNumber(e.target.value)}
                          className="w-full text-xs p-3 rounded-xl border border-[#EBE3D5] focus:outline-none focus:border-brand-red bg-[#FAF7F2] text-brand-charcoal"
                        />
                        <p className="text-[10px] text-gray-400 mt-1">For in-restaurant contactless ordering, enter your table number.</p>
                      </div>
                    )}
                  </div>

                  <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EBE3D5] space-y-2 text-xs">
                    <p className="font-semibold text-brand-charcoal">Demo Sandbox Mode:</p>
                    <p className="text-gray-500 leading-normal">
                      This is a real-time order mockup. No money will be transacted. Submit to launch the custom **Rasuwa Kitchen Live Simulator** and track your culinary feast!
                    </p>
                  </div>

                  {/* Back to Cart Link */}
                  <button 
                    type="button"
                    onClick={() => setStep('cart')}
                    className="text-xs text-brand-red font-semibold hover:underline flex items-center gap-1"
                  >
                    ← Review Basket Items
                  </button>

                  <button
                    type="submit"
                    className="w-full bg-brand-red text-white py-4 rounded-xl text-xs font-bold tracking-wider hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send size={14} />
                    Place Simulated Feast Order
                  </button>
                </form>
              )}

              {/* STEP 3: LIVE TRACKING SIMULATOR */}
              {step === 'tracking' && (
                <div className="space-y-8 text-center py-6">
                  {/* Circular visual countdown indicator */}
                  <div className="relative w-36 h-36 bg-[#FAF7F2] rounded-full border-4 border-[#EBE3D5] flex flex-col items-center justify-center mx-auto shadow-sm overflow-hidden">
                    <div className="absolute inset-2 border-2 border-dashed border-brand-gold/30 rounded-full animate-spin-slow" />
                    
                    {orderStatus === 'received' && <Coffee className="text-orange-500 animate-bounce" size={32} />}
                    {orderStatus === 'cooking' && <Flame className="text-red-500 animate-pulse" size={32} />}
                    {orderStatus === 'out-for-delivery' && <Truck className="text-brand-green animate-bounce" size={32} />}
                    {orderStatus === 'completed' && <CheckCircle className="text-emerald-600 scale-110" size={36} />}

                    <span className="font-mono text-xl font-bold text-brand-charcoal mt-2">
                      {timeRemaining > 0 ? `${timeRemaining}s` : 'Served!'}
                    </span>
                    <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">
                      {timeRemaining > 0 ? 'Countdown' : 'Done'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-display font-bold text-brand-charcoal">
                      {orderStatus === 'received' && 'Order Received'}
                      {orderStatus === 'cooking' && 'Searing over Flame'}
                      {orderStatus === 'out-for-delivery' && 'Tuk-Tuk Dispatch'}
                      {orderStatus === 'completed' && 'Bon Appétit!'}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                      {orderStatus === 'received' && 'Our chefs are reviewing your request, heating the wok and sorting the whole spices.'}
                      {orderStatus === 'cooking' && 'Stirring with raw spices imported directly from the high-altitude Rasuwa valleys.'}
                      {orderStatus === 'out-for-delivery' && `Our delivery rider is zipped up and speeding towards ${address || 'your table'}!`}
                      {orderStatus === 'completed' && 'Your authentic Himalayan feast has arrived and is ready for pure enjoyment!'}
                    </p>
                  </div>

                  {/* Status Stepper */}
                  <div className="relative pl-6 space-y-6 text-left max-w-xs mx-auto">
                    {/* Line connection */}
                    <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gray-200" />

                    {/* Step 1 */}
                    <div className="flex items-center gap-3 relative">
                      <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center z-10 border-2 ${
                        ['received', 'cooking', 'out-for-delivery', 'completed'].includes(orderStatus)
                          ? 'bg-brand-red border-brand-red text-white'
                          : 'bg-white border-gray-300'
                      }`}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${['received', 'cooking', 'out-for-delivery', 'completed'].includes(orderStatus) ? 'text-brand-charcoal' : 'text-gray-400'}`}>
                          Order Confirmed
                        </p>
                        <p className="text-[10px] text-gray-400">Accepted by Rasuwa Kitchen</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-center gap-3 relative">
                      <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center z-10 border-2 ${
                        ['cooking', 'out-for-delivery', 'completed'].includes(orderStatus)
                          ? 'bg-brand-gold border-brand-gold text-white'
                          : 'bg-white border-gray-300'
                      }`}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${['cooking', 'out-for-delivery', 'completed'].includes(orderStatus) ? 'text-brand-charcoal' : 'text-gray-400'}`}>
                          Preparing Feast
                        </p>
                        <p className="text-[10px] text-gray-400">Wok-fired with Himalayan Jimbu</p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-center gap-3 relative">
                      <div className={`w-4.5 h-4.5 rounded-full flex items-center justify-center z-10 border-2 ${
                        orderType === 'delivery' 
                          ? (['out-for-delivery', 'completed'].includes(orderStatus) ? 'bg-brand-green border-brand-green' : 'bg-white border-gray-300')
                          : (['completed'].includes(orderStatus) ? 'bg-brand-green border-brand-green' : 'bg-white border-gray-300')
                      }`}>
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${
                          orderType === 'delivery'
                            ? (['out-for-delivery', 'completed'].includes(orderStatus) ? 'text-brand-charcoal' : 'text-gray-400')
                            : (['completed'].includes(orderStatus) ? 'text-brand-charcoal' : 'text-gray-400')
                        }`}>
                          {orderType === 'delivery' ? 'Out for Delivery' : 'Ready on Table'}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {orderType === 'delivery' ? 'Dispatched via Express Rider' : `Seated at ${tableNumber || 'Table'}`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary order receipt mock */}
                  <div className="border border-dashed border-[#EBE3D5] rounded-2xl p-4 bg-[#FAF7F2] text-left text-xs max-w-xs mx-auto space-y-1">
                    <p className="font-semibold text-brand-charcoal mb-2 border-b border-[#EBE3D5] pb-1">Feast Dispatch Summary</p>
                    <p><span className="text-gray-500">Customer:</span> {customerName}</p>
                    <p><span className="text-gray-500">Service:</span> <span className="capitalize">{orderType}</span></p>
                    {orderType === 'delivery' && <p className="truncate"><span className="text-gray-500">Address:</span> {address}</p>}
                    {orderType === 'dine-in' && <p><span className="text-gray-500">Location:</span> {tableNumber}</p>}
                    <p className="pt-1.5 font-bold text-brand-red border-t border-[#EBE3D5] mt-2">
                      Total: ${total.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={resetOrderProcess}
                    className="w-full bg-brand-charcoal text-white py-3.5 rounded-xl text-xs font-bold tracking-wider hover:bg-black transition-colors"
                  >
                    Start a New Feast Order
                  </button>
                </div>
              )}

            </div>

            {/* Sticky Order Totals & Action Footer (ONLY on step 1 & 2) */}
            {step !== 'tracking' && cart.length > 0 && (
              <div className="p-6 border-t border-[#F2ECE1] bg-brand-cream space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>NYC State Tax (8.875%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-gray-500">
                      <span>Delivery Surcharge</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-brand-charcoal text-base pt-2 border-t border-[#F2ECE1]">
                    <span>Grand Total</span>
                    <span className="text-brand-red">${total.toFixed(2)}</span>
                  </div>
                </div>

                {step === 'cart' ? (
                  <button
                    onClick={() => setStep('checkout')}
                    className="w-full bg-brand-red text-white py-4 rounded-xl text-xs font-bold tracking-wider hover:bg-red-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    Proceed to Delivery Details
                    <ArrowRight size={14} />
                  </button>
                ) : null}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
