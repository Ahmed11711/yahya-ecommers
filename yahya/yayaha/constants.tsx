
import React from 'react';

export const CATEGORIES = [
  { name: 'Electronics', image: 'https://picsum.photos/seed/elec/400/400', icon: 'smartphone', description: 'Gadgets, phones, and high-tech gear' },
  { name: 'Fashion', image: 'https://picsum.photos/seed/fashion/400/400', icon: 'checkroom', description: 'Latest trends in apparel and accessories' },
  { name: 'Home', image: 'https://picsum.photos/seed/home/400/400', icon: 'home', description: 'Furniture, decor, and smart home tools' },
  { name: 'Beauty', image: 'https://picsum.photos/seed/beauty/400/400', icon: 'content_cut', description: 'Skincare, makeup, and personal care' },
  { name: 'Sports', image: 'https://picsum.photos/seed/sports/400/400', icon: 'sports_basketball', description: 'Gear for athletes and fitness enthusiasts' },
  { name: 'Toys', image: 'https://picsum.photos/seed/toys/400/400', icon: 'videogame_asset', description: 'Fun for all ages and collectibles' },
  { name: 'Books', image: 'https://picsum.photos/seed/books/400/400', icon: 'menu_book', description: 'Literature, educational, and bestsellers' },
  { name: 'Automotive', image: 'https://picsum.photos/seed/car/400/400', icon: 'directions_car', description: 'Car parts and accessories' },
];

export const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
];

export const VENDORS_MOCK = [
  { id: 'v1', name: 'TechHub Official', rating: 4.9, isVerified: true, logo: 'https://picsum.photos/seed/tech/100/100', country: 'US' },
  { id: 'v2', name: 'Luxe Living', rating: 4.8, isVerified: true, logo: 'https://picsum.photos/seed/luxe/100/100', country: 'UK' },
  { id: 'v3', name: 'Fashionista', rating: 4.7, isVerified: true, logo: 'https://picsum.photos/seed/fashion/100/100', country: 'FR' },
  { id: 'v4', name: 'Green Grocer', rating: 4.9, isVerified: true, logo: 'https://picsum.photos/seed/green/100/100', country: 'EG' },
];

export const Logo: React.FC = () => (
  <div className="flex items-center gap-2 text-primary font-bold text-2xl tracking-tight">
    <span className="material-symbols-outlined text-3xl">shopping_basket</span>
    <span>ShopMax</span>
  </div>
);
