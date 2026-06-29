import { MenuItem, ThaliHotspot, Review } from './types';

export const RESTAURANT_INFO = {
  name: 'Rasuwa Lirung Restaurant',
  address: '63-02 Roosevelt Ave, Woodside, NY 11377, United States',
  phone: '+1 347-527-1285',
  hours: 'Monday to Sunday, 9:00 AM – 11:00 PM',
  serviceOptions: ['Dine-in', 'Takeout', 'Delivery'],
  story: 'Sourcing our traditional Himalayan spices directly from the pristine Rasuwa region of Nepal, Rasuwa Lirung brings authentic flavors of the Himalayas, Tibet, and Indo-Chinese fusion to Woodside, Queens. We are renowned for our exceptionally warm hospitality, vibrant Himalayan heritage, and delicious, freshly prepared dishes.',
  rating: 5.0,
  reviewCount: 184
};

export const MENU_ITEMS: MenuItem[] = [
  // Weekly Specials
  {
    id: 'weekly-1',
    name: 'Bakpe (Thenduk) Special',
    price: 15.99,
    description: 'Available Mondays 3:00 PM – 8:00 PM only. Freshly hand-pulled flat noodles simmered in a rich, healthy mountain-spiced beef broth with tender beef slices and seasonal greens.',
    category: 'weekly-specials',
    isPopular: true,
    isSpicy: false,
    image: '/menu/bakpe.png'
  },
  
  // Himalayan & Tibetan Specials
  {
    id: 'himalayan-1',
    name: 'Shapta',
    price: 16.99,
    description: 'Thinly sliced tender meat (beef or chicken) stir-fried with ginger, garlic, green chilies, and scallions in a savory traditional sauce.',
    category: 'himalayan-tibetan',
    isPopular: true,
    isSpicy: true,
    image: '/menu/shapta.png'
  },
  {
    id: 'himalayan-2',
    name: 'Gyathuk',
    price: 14.99,
    description: 'Traditional Tibetan-style boiled noodle soup served with mixed vegetables or meat in an aromatic, spiced broth.',
    category: 'himalayan-tibetan',
    isSpicy: false,
    image: '/menu/gyathuk.png'
  },
  {
    id: 'himalayan-3',
    name: 'Mothuk',
    price: 15.49,
    description: 'Comforting soup with fresh vegetable or beef momos (dumplings) swimming in a robust, seasoned vegetable broth with baby bok choy.',
    category: 'himalayan-tibetan',
    isSpicy: false,
    image: '/menu/mothuk.png'
  },
  {
    id: 'himalayan-4',
    name: 'Shabaleb',
    price: 13.99,
    description: 'Deep-fried Tibetan meat pies (3 pieces) with spiced ground meat filling, served with fiery tomato-sesame house chutney.',
    category: 'himalayan-tibetan',
    isPopular: true,
    isSpicy: false,
    image: '/menu/shabaleb.png'
  },
  {
    id: 'himalayan-5',
    name: 'Aloo Dum',
    price: 9.99,
    description: 'Classic Nepalese potato dish slow-cooked in a tangy, hot, and dry tomato gravy infused with cumin, turmeric, and fresh cilantro.',
    category: 'himalayan-tibetan',
    isVegetarian: true,
    isSpicy: true,
    image: '/menu/aloo_dum.png'
  },
  {
    id: 'himalayan-6',
    name: 'Thakali Style Dal Bhat Thali',
    price: 18.99,
    description: 'Our signature Nepalese feast featuring steamed basmati rice, slow-simmered black lentils tempered with jimbu, seasonal vegetable curry (Tarkari), mustard greens (Saag), house-made tangy tomato-sesame pickle (Achar), and a crispy papadum.',
    category: 'himalayan-tibetan',
    isVegetarian: true,
    isPopular: true,
    image: '/plate.webp'
  },

  // Momo (10 Pieces)
  {
    id: 'momo-1',
    name: 'Steamed Chicken Momo',
    price: 12.99,
    description: 'Hand-folded Himalayan dumplings stuffed with seasoned minced chicken, onion, ginger, and garlic. Served with tomato achar.',
    category: 'momo',
    isPopular: true,
    image: '/menu/steamed_chicken_momo.png'
  },
  {
    id: 'momo-2',
    name: 'Fried Veg Momo',
    price: 11.99,
    description: 'Crispy deep-fried momos filled with finely minced mixed cabbage, carrots, paneer, and local Nepali spices.',
    category: 'momo',
    isVegetarian: true,
    image: '/menu/fried_veg_momo.png'
  },
  {
    id: 'momo-3',
    name: 'Kothey Momo (Pan-Fried)',
    price: 13.99,
    description: 'Half-steamed, half-pan-fried chicken or beef momos with a beautiful golden crispy base, offering double the textures.',
    category: 'momo',
    isPopular: true,
    image: '/menu/kothey_momo.png'
  },
  {
    id: 'momo-4',
    name: 'Chilli Momo (Chicken/Beef)',
    price: 14.99,
    description: 'Steamed momos tossed in a blazing hot wok with sweet and spicy garlic-chilli sauce, bell peppers, onions, and scallions.',
    category: 'momo',
    isSpicy: true,
    isPopular: true,
    image: '/menu/chilli_momo.png'
  },

  // Indo-Chinese Entrées
  {
    id: 'indochinese-1',
    name: 'Chicken Manchurian',
    price: 15.99,
    description: 'Golden fried chicken fritters tossed in a tangy, sweet, and slightly spicy soy-chilli gravy with fresh cilantro and green onions.',
    category: 'indo-chinese',
    image: '/menu/chicken_manchurian.png'
  },
  {
    id: 'indochinese-2',
    name: 'Chilli Beef',
    price: 16.99,
    description: 'Crispy stir-fried sliced beef tossed with hot green chilies, bell peppers, onions, ginger, and garlic in a dark soy-glaze.',
    category: 'indo-chinese',
    isSpicy: true,
    isPopular: true,
    image: '/menu/chilli_beef.png'
  },
  {
    id: 'indochinese-3',
    name: 'Paneer Hot & Garlic',
    price: 14.99,
    description: 'Cubes of fresh paneer cheese sautéed with garlic, scallions, and red chillies in our house-made hot garlic paste.',
    category: 'indo-chinese',
    isVegetarian: true,
    isSpicy: true,
    image: '/menu/paneer_garlic.png'
  },
  {
    id: 'indochinese-4',
    name: 'Double Fried Pork Chilli',
    price: 16.49,
    description: 'Twice-cooked tender pork slices, flash-fried and tossed with fiery green chillies, onions, soy sauce, and Himalayan peppercorns.',
    category: 'indo-chinese',
    isSpicy: true,
    image: '/menu/double_fried_pork.png'
  },

  // Noodles & Rice
  {
    id: 'noodles-1',
    name: 'Chicken Hakka Noodles',
    price: 13.99,
    description: 'Classic wok-tossed thin wheat noodles with shredded chicken, cabbage, carrots, bell peppers, and scallions in a light soy seasoning.',
    category: 'noodles-rice',
    image: '/menu/hakka_noodles.png'
  },
  {
    id: 'noodles-2',
    name: 'Chilli Garlic Veg Noodles',
    price: 12.99,
    description: 'Spicy noodles stir-fried with heaps of minced garlic, dry red chillies, and mixed fresh farm vegetables.',
    category: 'noodles-rice',
    isVegetarian: true,
    isSpicy: true,
    image: '/menu/chilli_garlic_noodles.png'
  },
  {
    id: 'noodles-3',
    name: 'Roasted Chilli Pork Fried Rice',
    price: 14.49,
    description: 'Aromatic basmati rice stir-fried with tender pork bits, dark roasted chili oil, spring onions, scrambled egg, and baby peas.',
    category: 'noodles-rice',
    isSpicy: true,
    isPopular: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Fried_rice_with_ham.jpg/640px-Fried_rice_with_ham.jpg'
  },

  // Quick Bites & Street Food
  {
    id: 'quick-1',
    name: 'Pani Puri (10 Pieces)',
    price: 9.99,
    description: 'Crispy hollow semolina puris stuffed with a spiced mash of potatoes and black chickpeas, served with cold, tangy mint-coriander water.',
    category: 'quick-bites',
    isVegetarian: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Pani_Puri_1.jpg/640px-Pani_Puri_1.jpg'
  },
  {
    id: 'quick-2',
    name: 'Laphing (Tibetan Cold Noodles)',
    price: 8.99,
    description: 'Vibrant yellow cold mung-bean jelly rolls seasoned with garlic paste, roasted chili oil, soy sauce, and vinegar. Spicy and refreshing.',
    category: 'quick-bites',
    isVegetarian: true,
    isSpicy: true,
    isPopular: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Liangpi_in_chili_oil.jpg/640px-Liangpi_in_chili_oil.jpg'
  },
  {
    id: 'quick-3',
    name: 'Wai Wai Sadheko',
    price: 7.99,
    description: 'A popular Nepalese street food: crunchy instant Wai Wai noodles crumbled and tossed with raw red onion, tomatoes, fresh coriander, green chillies, lemon juice, and mustard oil.',
    category: 'quick-bites',
    isVegetarian: true,
    isSpicy: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bhel_puri.jpg/640px-Bhel_puri.jpg'
  },
  {
    id: 'quick-4',
    name: 'Pork Sekuwa',
    price: 12.99,
    description: 'Tender pork cubes marinated in a traditional blend of mountain herbs and wood-fire roasted to perfection. Smoky and succulent.',
    category: 'quick-bites',
    isPopular: true,
    image: '/menu/shapta.png'
  },

  // Beverages
  {
    id: 'bev-1',
    name: 'Traditional Sweet Masala Milk Tea',
    price: 3.49,
    description: 'Rich, comforting black tea brewed with fresh milk, ginger, crushed cardamom, cloves, cinnamon, and sugar.',
    category: 'beverages',
    isPopular: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ch/Masala_Chai.JPG/640px-Masala_Chai.JPG'
  },
  {
    id: 'bev-2',
    name: 'Tibetan Butter Tea (Suja)',
    price: 3.99,
    description: 'Unique savory tea made from brick tea, yak butter, and salt, churned together to form a rich, warming brew perfect for high altitudes.',
    category: 'beverages',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Butter_tea.jpg/640px-Butter_tea.jpg'
  },
  {
    id: 'bev-3',
    name: 'Mango Lassi',
    price: 4.99,
    description: 'Creamy yogurt drink blended with sweet Alphonso mango pulp, a touch of cardamom, and simple syrup.',
    category: 'beverages',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mango_Lassi_in_a_glass.jpg/640px-Mango_Lassi_in_a_glass.jpg'
  },
  {
    id: 'bev-4',
    name: 'Green Power Cold Press',
    price: 6.99,
    description: 'Healthy cold-pressed green juice with organic celery, cucumber, green apple, spinach, ginger, and key lime.',
    category: 'beverages',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Green_juice.jpg/640px-Green_juice.jpg'
  }
];

export const THALI_HOTSPOTS: ThaliHotspot[] = [
  {
    id: 'bhat',
    name: 'Steamed Rice',
    nepaliName: 'भात (Bhat)',
    description: 'Fragrant, fluffy long-grain white Basmati rice steamed to perfection. It sits at the absolute center of the plate, acting as the staple foundation to absorb the intricate curries and spicy pickles.',
    benefits: 'Easily digestible carbohydrates to fuel your day, low in fat and allergen-free.',
    angle: 0,
    distance: 0,
    color: '#F9FAF3'
  },
  {
    id: 'dal',
    name: 'Himalayan Lentil Soup',
    nepaliName: 'दाल (Dal)',
    description: 'Slow-cooked yellow lentils seasoned with hand-ground cumin, ginger, and garlic, and tempered with Jimbu—a wild mountain herb hand-picked in the high altitudes of the Rasuwa district.',
    benefits: 'Excellent source of plant-based protein, iron, dietary fiber, and warm soothing comfort.',
    angle: 300,
    distance: 65,
    color: '#ECC94B'
  },
  {
    id: 'tarkari',
    name: 'Spiced Vegetable Curry',
    nepaliName: 'तरकारी (Tarkari)',
    description: 'A robust curry of seasonal potatoes, tender cauliflower florets, and sweet green peas simmered in a golden turmeric, onion, tomato, and ground mustard-seed reduction.',
    benefits: 'Loaded with vital vitamins, minerals, and inflammation-fighting turmeric curcumin.',
    angle: 60,
    distance: 65,
    color: '#D69E2E'
  },
  {
    id: 'saag',
    name: 'Stir-Fried Mustard Greens',
    nepaliName: 'साग (Saag)',
    description: 'Fresh organic dark green mustard leaves quick-sautéed in cold-pressed mustard oil with toasted whole red chilies, fresh garlic slices, and a touch of salt. Earthy and vitamin-rich.',
    benefits: 'Abundant in Vitamin A, K, calcium, and powerful antioxidants to cleanse the palate.',
    angle: 135,
    distance: 65,
    color: '#2F855A'
  },
  {
    id: 'achar',
    name: 'Tomato Sesame Pickle',
    nepaliName: 'अचार (Achar)',
    description: 'A tangy, fiery house condiment prepared from clay-oven roasted tomatoes, toasted nutty sesame seeds, garlic, and a heavy dash of fresh Timmur (Nepalese Sichuan wild pepper) for a gentle citrusy-numb finish.',
    benefits: 'Boosts appetite and digestion with natural enzymes and zesty metabolism-activating spices.',
    angle: 225,
    distance: 65,
    color: '#C53030'
  },
  {
    id: 'papad',
    name: 'Crispy Lentil Flatbread',
    nepaliName: 'पापड (Papad)',
    description: 'Thin, crispy toasted lentil flour wafer dusted with a pinch of black pepper. It provides the essential crunch and structural play to offset the soft rice and comforting gravy.',
    benefits: 'High protein, gluten-free, crispy alternative to traditional wheat breads.',
    angle: 180,
    distance: 85,
    color: '#E2E8F0'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Aarya Sharma',
    rating: 5,
    comment: 'The Thali is incredibly authentic. The Dal is spiced with Jimbu, which I haven\'t tasted anywhere else in New York. The service is exceptionally friendly—the owner came over to check if we needed extra rice!',
    date: '3 days ago',
    source: 'Google Maps'
  },
  {
    id: 'rev-2',
    name: 'Michael K.',
    rating: 5,
    comment: 'Unbelievable Momo! The Chilli Momos have this amazing kick but you can still taste the rich spices inside. Their Tibetan Butter Tea is cozy and highly authentic. Will definitely be a regular here.',
    date: '1 week ago',
    source: 'Google Maps'
  },
  {
    id: 'rev-3',
    name: 'Pema Dolma',
    rating: 5,
    comment: 'Outstanding Shapta and Thenduk! The beef broth is rich and tastes exactly like home in the Himalayas. Woodside has many spots, but Rasuwa Lirung stands out for its freshness and incredible staff.',
    date: '2 weeks ago',
    source: 'Google Maps'
  },
  {
    id: 'rev-4',
    name: 'David S.',
    rating: 5,
    comment: 'Super fast delivery and the food arrived piping hot. The Hakka Noodles and Chilli Beef are spectacular. Best Indo-Chinese in Queens hands down! Highly recommended.',
    date: '3 weeks ago',
    source: 'Google Maps'
  }
];
