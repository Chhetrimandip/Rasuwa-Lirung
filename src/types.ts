export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'weekly-specials' | 'himalayan-tibetan' | 'momo' | 'indo-chinese' | 'noodles-rice' | 'quick-bites' | 'beverages';
  isPopular?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  image?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ThaliHotspot {
  id: string;
  name: string;
  nepaliName: string;
  description: string;
  benefits: string;
  angle: number; // angle in degrees around the center
  distance: number; // percentage distance from center
  color: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  source: string;
}
