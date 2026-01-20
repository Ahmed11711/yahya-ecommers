
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { apiService, ProductFilters } from '../services/apiService';
import { Product } from '../types';
import { CATEGORIES, VENDORS_MOCK } from '../constants';
import { useCart } from '../services/CartContext';

const ListingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Filter states
  const categoryFilter = searchParams.get('category') || '';
  const vendorFilter = searchParams.get('vendor') || '';
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  useEffect(() => {
    const filters: ProductFilters = {
      category: categoryFilter || undefined,
      vendorId: vendorFilter || undefined,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    };

    setLoading(true);
    apiService.getProducts(filters).then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, [categoryFilter, vendorFilter, priceRange]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    setPriceRange(prev => ({ ...prev, [type]: parseInt(e.target.value) || 0 }));
  };

  const updateSearchParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 py-8">
      {/* Filter Sidebar */}
      <aside className="lg:col-span-3 space-y-10">
        <div className="sticky top-24 space-y-10">
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Filters</h2>
            <div className="h-1 w-10 bg-primary rounded-full"></div>
          </div>

          {/* Category Filter */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Category</h4>
            <div className="space-y-2">
              <button 
                onClick={() => updateSearchParam('category', '')}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${!categoryFilter ? 'bg-primary text-white shadow-lg' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                All Categories
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat.name}
                  onClick={() => updateSearchParam('category', cat.name.toLowerCase())}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${categoryFilter === cat.name.toLowerCase() ? 'bg-primary text-white shadow-lg' : 'hover:bg-slate-100 text-slate-600'}`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Vendor Filter */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Vendor</h4>
            <div className="space-y-2">
              <button 
                onClick={() => updateSearchParam('vendor', '')}
                className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${!vendorFilter ? 'bg-primary text-white shadow-lg' : 'hover:bg-slate-100 text-slate-600'}`}
              >
                All Vendors
              </button>
              {VENDORS_MOCK.map(vendor => (
                <button 
                  key={vendor.id}
                  onClick={() => updateSearchParam('vendor', vendor.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold transition-all ${vendorFilter === vendor.id ? 'bg-primary text-white shadow-lg' : 'hover:bg-slate-100 text-slate-600'}`}
                >
                  {vendor.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-6">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Price Range</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400">Min ($)</span>
                <input 
                  type="number" 
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange(e, 'min')}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-2 font-bold text-sm focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400">Max ($)</span>
                <input 
                  type="number" 
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange(e, 'max')}
                  className="w-full bg-slate-100 border-none rounded-xl px-4 py-2 font-bold text-sm focus:ring-primary"
                />
              </div>
            </div>
            <input 
              type="range" 
              min="0" 
              max="5000" 
              value={priceRange.max}
              onChange={(e) => handlePriceChange(e, 'max')}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>
      </aside>

      {/* Main Product Grid */}
      <main className="lg:col-span-9 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-black text-slate-900">
            {categoryFilter ? categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1) : 'All Products'}
            <span className="text-slate-400 text-lg ml-3 font-medium">({products.length} found)</span>
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-500">Sort by:</span>
            <select className="bg-white border-slate-200 rounded-xl px-4 py-2 text-sm font-bold focus:ring-primary focus:border-primary">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-[32px] h-[450px]"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col">
                <div className="relative aspect-square bg-slate-50 overflow-hidden">
                  <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isInstallmentEligible && (
                      <span className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase shadow-sm tracking-widest">Installments</span>
                    )}
                  </div>
                  <div className="absolute top-4 right-4 px-2 py-1 bg-white/80 backdrop-blur-md rounded-lg text-[10px] font-black uppercase text-slate-600 shadow-sm border border-white/20">
                    {product.country}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{product.vendorName}</p>
                  <h3 className="font-bold text-slate-900 line-clamp-2 mb-4 group-hover:text-primary transition-colors text-lg leading-snug">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-6 mt-auto">
                    <span className="text-2xl font-black text-primary">${product.price.toLocaleString()}</span>
                    {product.originalPrice && <span className="text-sm text-slate-400 line-through font-medium">${product.originalPrice.toLocaleString()}</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="h-12 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary-600 transition-all active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined !text-xl">shopping_cart</span>
                      Add
                    </button>
                    <button className="h-12 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98]">
                      <span className="material-symbols-outlined !text-xl">visibility</span>
                      View
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-20 flex flex-col items-center justify-center text-center space-y-6 border border-slate-100">
            <div className="size-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
              <span className="material-symbols-outlined !text-6xl">search_off</span>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900">No products found</h3>
              <p className="text-slate-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
            </div>
            <button 
              onClick={() => {
                setSearchParams({});
                setPriceRange({ min: 0, max: 5000 });
              }}
              className="px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-600 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ListingPage;
