
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Product } from '../types';
import { useCart } from '../services/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    apiService.getProducts().then(all => {
      const p = all.find(item => item.id === id) || all[0];
      setProduct(p);
      setLoading(false);
    });
  }, [id]);

  if (loading || !product) {
    return <div className="h-screen flex items-center justify-center">Loading product...</div>;
  }

  const thumbnails = [
    product.image,
    'https://picsum.photos/seed/alt1/600/600',
    'https://picsum.photos/seed/alt2/600/600',
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <Link to={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-slate-900 font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/3] bg-white rounded-[40px] overflow-hidden border border-slate-200 flex items-center justify-center p-12 shadow-sm group">
            <img 
              src={thumbnails[selectedImage]} 
              alt={product.name} 
              className="max-h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" 
            />
          </div>
          <div className="flex gap-4">
            {thumbnails.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-24 h-24 rounded-2xl overflow-hidden bg-white p-2 cursor-pointer transition-all ${selectedImage === idx ? 'border-2 border-primary shadow-lg ring-4 ring-primary/10' : 'border border-slate-200 hover:border-primary/50'}`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <a href="#" className="text-primary font-bold hover:underline flex items-center gap-1.5 mb-3">
              {product.vendorName}
              <span className="material-symbols-outlined text-[16px] text-blue-500 filled-icon">verified</span>
            </a>
            <h1 className="text-4xl font-black text-slate-900 leading-tight mb-4">{product.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className={`material-symbols-outlined text-xl ${star <= Math.floor(product.rating) ? 'text-amber-400 filled-icon' : 'text-slate-200'}`}>star</span>
                ))}
                <span className="text-sm font-bold text-slate-600 ml-2">{product.rating} ({product.reviewsCount} reviews)</span>
              </div>
              <div className="h-4 w-px bg-slate-200"></div>
              <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                <span className="size-2 rounded-full bg-green-600"></span>
                In Stock
              </span>
            </div>
          </div>

          <div className="py-8 border-y border-slate-100">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-5xl font-black text-slate-900">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-slate-400 line-through font-medium">${product.originalPrice.toLocaleString()}</span>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-black text-xs uppercase tracking-wider">Save 18%</span>
                </>
              )}
            </div>
            <p className="text-sm text-slate-500">Free shipping & 30-day money-back guarantee.</p>
          </div>

          {/* Installment Plan Widget */}
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-8xl">account_balance_wallet</span>
            </div>
            <div className="relative z-10">
              <span className="text-xs font-black text-primary uppercase tracking-widest mb-2 block">Smart Finance</span>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Pay as low as ${(product.price / 12).toFixed(2)}/mo</h3>
              <p className="text-sm text-slate-600 mb-8 leading-relaxed max-w-sm">Spread the cost over 12 months with 0% interest for eligible buyers.</p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-primary text-white font-black py-5 rounded-2xl hover:bg-primary-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                  Add to Cart
                </button>
                <Link to="/checkout" className="w-full bg-white border border-slate-200 font-bold py-5 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined">assignment</span>
                  Apply for Installments
                </Link>
              </div>
              <p className="text-[10px] text-center text-slate-500 mt-6 font-medium">Subject to credit approval. Terms apply. Provided by ShopMax Financing.</p>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
              <div className="leading-tight">
                <p className="text-sm font-black">2 Year Warranty</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
              <div className="leading-tight">
                <p className="text-sm font-black">Express Delivery</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Arrives tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs / Description omitted for brevity, keeping same logic */}
    </div>
  );
};

export default ProductDetailPage;
