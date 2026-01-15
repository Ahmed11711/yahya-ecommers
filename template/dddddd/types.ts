
export type Language = 'en' | 'ar';

export interface BilingualString {
  en: string;
  ar: string;
}

export enum OrderStatus {
  PENDING = 'Pending',
  UNDER_REVIEW = 'Under Review',
  DRIVERS_ARRIVED = 'Drivers Arrived',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export interface Category {
  id: string;
  name: BilingualString;
  image: string;
}

export interface Product {
  id: string;
  name: BilingualString;
  description: BilingualString;
  price: number;
  mainImage: string;
  additionalImages: string[];
  videoUrl?: string;
  categoryId: string;
  stock: number;
  sku: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  customerEmail: string;
  productId: string;
  rating: number;
  comment: BilingualString;
  reply?: string;
  status: 'approved' | 'pending' | 'hidden';
  createdAt: string;
}

export interface Article {
  id: string;
  title: BilingualString;
  content: BilingualString;
  featuredImage: string;
  videoUrl?: string;
  author: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Settings {
  logo: string;
  favicon: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
  };
  businessName: string;
  supportEmail: string;
  paymentPhoneNumber: string;
  address: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
}
