
export enum OrderStatus {
  PENDING = 'Pending',
  PROCESSING = 'Processing',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled'
}

export enum PaymentMethod {
  FULL = 'Full Payment',
  INSTALLMENTS = 'Installments'
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  originalPrice?: number;
  stock: number;
  totalUnits: number;
  status: 'Active' | 'Draft' | 'Out of Stock';
  image: string;
  vendorId: string;
  vendorName: string;
  isInstallmentEligible: boolean;
  rating: number;
  reviewsCount: number;
  country: string;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  rating: number;
  isVerified: boolean;
  followers: string;
  positiveFeedback: string;
  memberSince: string;
  location: string;
  country: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerInitials: string;
  date: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  amount: number;
}

export interface InstallmentPlan {
  id: string;
  productName: string;
  productImage: string;
  vendorName: string;
  currentInstallment: number;
  totalInstallments: number;
  monthlyAmount: number;
  nextPaymentDate: string;
  isPaid: boolean;
  progress: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  productName?: string;
}
