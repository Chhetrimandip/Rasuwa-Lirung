import { Star, MapPin, Sparkles } from 'lucide-react';
import { REVIEWS, RESTAURANT_INFO } from '../data';

export default function ReviewSection() {
  return (
    <section id="reviews-section" className="py-24 px-4 bg-[#FAF8F5] border-b border-border-bento">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-red/10 text-brand-red border border-brand-red/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles size={12} className="text-brand-red" />
            <span>Guaranteed Quality & Taste</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-charcoal tracking-tight">
            Loved by the Community
          </h2>
          
          {/* Rating Badge */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 bg-white border border-border-bento px-4 py-1.5 rounded-full shadow-xs">
              <span className="font-serif font-bold text-brand-charcoal text-base">5.0</span>
              <div className="flex text-brand-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-brand-gold" />
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
              Based on {RESTAURANT_INFO.reviewCount} verified reviews on Google
            </p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              className="bg-white border border-border-bento rounded-3xl p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Stars and date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-brand-gold">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">{review.date}</span>
                </div>

                {/* Review Text */}
                <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-border-bento flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-xs text-brand-charcoal">{review.name}</h4>
                  <span className="text-[9px] text-brand-red font-bold flex items-center gap-0.5 mt-0.5 uppercase tracking-widest font-mono">
                    <MapPin size={8} /> Local Guide
                  </span>
                </div>
                
                <span className="text-[10px] bg-brand-red/5 text-brand-red font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-brand-red/10">
                  {review.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Callout box for review promotion */}
        <div className="mt-12 bg-white border border-border-bento rounded-[2rem] p-6 md:p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-bl-full pointer-events-none" />
          
          <div className="text-center md:text-left space-y-1">
            <h3 className="font-serif font-bold text-lg text-brand-charcoal">Visited us in Woodside, Queens?</h3>
            <p className="text-xs text-gray-400 max-w-xl">
              We strive to preserve the authentic tastes of Nepalese and Tibetan heritage. Share your dining experience with the local community on Google Maps!
            </p>
          </div>

          <a 
            href={`https://maps.google.com/?q=${encodeURIComponent(RESTAURANT_INFO.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1A1A1A] text-white hover:bg-black transition-all py-3.5 px-6 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap shadow-md"
          >
            Leave a Google Review
          </a>
        </div>

      </div>
    </section>
  );
}
