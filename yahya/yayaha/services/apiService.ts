
import { Product, Order, OrderStatus, PaymentMethod, InstallmentPlan, Vendor, Article, Review } from '../types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Smartphone Pro Max 512GB Platinum',
    sku: 'SM-512-PT',
    category: 'Electronics',
    price: 1199,
    originalPrice: 1349,
    stock: 124,
    totalUnits: 150,
    status: 'Active',
    image: 'https://picsum.photos/seed/phone1/600/600',
    vendorId: 'v1',
    vendorName: 'TechHub Official',
    isInstallmentEligible: true,
    rating: 4.9,
    reviewsCount: 1248,
    country: 'US'
  },
  {
    id: 'p2',
    name: 'Mirrorless 4K Pro Camera Kit',
    sku: 'CAM-4K-PRO',
    category: 'Electronics',
    price: 2450,
    stock: 45,
    totalUnits: 100,
    status: 'Active',
    image: 'https://picsum.photos/seed/cam1/600/600',
    vendorId: 'v1',
    vendorName: 'TechHub Official',
    isInstallmentEligible: true,
    rating: 4.8,
    reviewsCount: 542,
    country: 'US'
  },
  {
    id: 'p3',
    name: 'Ergonomic Mesh Office Chair',
    sku: 'OFF-CH-01',
    category: 'Home',
    price: 349,
    originalPrice: 499,
    stock: 8,
    totalUnits: 80,
    status: 'Active',
    image: 'https://picsum.photos/seed/chair/600/600',
    vendorId: 'v2',
    vendorName: 'Luxe Living',
    isInstallmentEligible: false,
    rating: 4.7,
    reviewsCount: 231,
    country: 'UK'
  },
  {
    id: 'p4',
    name: 'Wireless Noise Cancelling Headphones',
    sku: 'AUD-HD-99',
    category: 'Electronics',
    price: 299,
    stock: 0,
    totalUnits: 200,
    status: 'Out of Stock',
    image: 'https://picsum.photos/seed/audio/600/600',
    vendorId: 'v4',
    vendorName: 'Audio Master',
    isInstallmentEligible: true,
    rating: 4.9,
    reviewsCount: 3892,
    country: 'EG'
  },
  {
    id: 'p5',
    name: 'Premium Leather Jacket',
    sku: 'FASH-LJ-02',
    category: 'Fashion',
    price: 180,
    stock: 25,
    totalUnits: 50,
    status: 'Active',
    image: 'https://picsum.photos/seed/jacket/600/600',
    vendorId: 'v3',
    vendorName: 'Fashionista',
    isInstallmentEligible: true,
    rating: 4.6,
    reviewsCount: 112,
    country: 'SA'
  },
  {
    id: 'p6',
    name: 'Smart Robotic Vacuum',
    sku: 'HOME-RV-500',
    category: 'Home',
    price: 450,
    stock: 12,
    totalUnits: 30,
    status: 'Active',
    image: 'https://picsum.photos/seed/vacuum/600/600',
    vendorId: 'v2',
    vendorName: 'Luxe Living',
    isInstallmentEligible: true,
    rating: 4.4,
    reviewsCount: 88,
    country: 'UK'
  }
];

const MOCK_ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'Top 10 Tech Trends in 2024',
    excerpt: 'Explore the technologies that are shaping the future of global commerce.',
    content: 'Long content here...',
    author: 'Tech Guru',
    date: 'Jan 15, 2024',
    image: 'https://picsum.photos/seed/techblog/800/400',
    category: 'Technology'
  },
  {
    id: 'a2',
    title: 'How Installments are Changing Shopping',
    excerpt: 'Buy Now Pay Later is no longer just a trend, it is a necessity.',
    content: 'Long content here...',
    author: 'Finance Expert',
    date: 'Jan 10, 2024',
    image: 'https://picsum.photos/seed/finance/800/400',
    category: 'Shopping'
  },
  {
    id: 'a3',
    title: 'Eco-Friendly Living: Start with Your Home',
    excerpt: 'Simple changes in your home can lead to a sustainable lifestyle.',
    content: 'Long content here...',
    author: 'Eco Warrior',
    date: 'Jan 05, 2024',
    image: 'https://picsum.photos/seed/eco/800/400',
    category: 'Lifestyle'
  }
];

const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Alice Smith',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    rating: 5,
    comment: 'ShopMax has the best installment plans! I got my new camera without any hassle.',
    date: '2 days ago'
  },
  {
    id: 'r2',
    userName: 'Mark Johnson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mark',
    rating: 4,
    comment: 'Great global vendors, but shipping to my region took a bit longer than expected.',
    date: '1 week ago'
  },
  {
    id: 'r3',
    userName: 'Sofia Rodriguez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    rating: 5,
    comment: 'The support team is amazing. They helped me with my verification process in minutes.',
    date: '3 weeks ago'
  }
];

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  vendorId?: string;
  country?: string;
}

export const apiService = {
  getProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    await sleep(400);
    let filtered = [...MOCK_PRODUCTS];

    if (filters) {
      if (filters.category) {
        filtered = filtered.filter(p => p.category.toLowerCase() === filters.category?.toLowerCase());
      }
      if (filters.minPrice !== undefined) {
        filtered = filtered.filter(p => p.price >= (filters.minPrice || 0));
      }
      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(p => p.price <= (filters.maxPrice || Infinity));
      }
      if (filters.vendorId) {
        filtered = filtered.filter(p => p.vendorId === filters.vendorId);
      }
      if (filters.country) {
        filtered = filtered.filter(p => p.country === filters.country);
      }
    }

    return filtered;
  },

  getOrders: async (): Promise<Order[]> => {
    await sleep(500);
    return [
      { id: '#ORD-7721', customerName: 'John Cooper', customerInitials: 'JC', date: 'Oct 24, 2023', status: OrderStatus.PROCESSING, paymentMethod: PaymentMethod.INSTALLMENTS, amount: 1250 },
      { id: '#ORD-7719', customerName: 'Sarah Jenkins', customerInitials: 'SJ', date: 'Oct 23, 2023', status: OrderStatus.SHIPPED, paymentMethod: PaymentMethod.FULL, amount: 420 },
      { id: '#ORD-7718', customerName: 'Robert Fox', customerInitials: 'RF', date: 'Oct 23, 2023', status: OrderStatus.PENDING, paymentMethod: PaymentMethod.INSTALLMENTS, amount: 2100 },
      { id: '#ORD-7715', customerName: 'Jane Doe', customerInitials: 'JD', date: 'Oct 22, 2023', status: OrderStatus.DELIVERED, paymentMethod: PaymentMethod.FULL, amount: 89 },
    ];
  },

  getArticles: async (): Promise<Article[]> => {
    await sleep(300);
    return MOCK_ARTICLES;
  },

  getReviews: async (): Promise<Review[]> => {
    await sleep(300);
    return MOCK_REVIEWS;
  },

  getVendorStats: async () => {
    await sleep(200);
    return {
      totalSales: 42500,
      totalOrders: 1284,
      activeProducts: 456,
      salesGrowth: 12.5,
      ordersGrowth: 5.2,
      productsGrowth: 2.1,
      gmvGrowth: 8.4
    };
  }
};
