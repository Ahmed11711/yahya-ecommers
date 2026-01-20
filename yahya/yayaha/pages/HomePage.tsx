
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Product, Article, Review } from '../types';
import { CATEGORIES, VENDORS_MOCK, COUNTRIES } from '../constants';
import { useCart } from '../services/CartContext';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('All');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const filters = selectedCountry !== 'All' ? { country: selectedCountry } : undefined;
    setLoading(true);
    Promise.all([
      apiService.getProducts(filters),
      apiService.getArticles(),
      apiService.getReviews()
    ]).then(([p, a, r]) => {
      setProducts(p);
      setArticles(a);
      setReviews(r);
      setLoading(false);
    });
  }, [selectedCountry]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative h-[650px] rounded-[60px] overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent z-10"></div>
        <img 
          src="https://picsum.photos/seed/marketplace/1600/800" 
          alt="Hero Banner" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-10 md:px-24 text-white max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-primary/20 backdrop-blur-md border border-primary/30 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em]">Global Marketplace</span>
            <div className="h-px w-12 bg-white/20"></div>
          </div>
          <h2 className="text-6xl md:text-8xl font-black leading-[1] mb-8 tracking-tighter">The World <br/>at Your Door.</h2>
          <p className="text-xl text-slate-300 mb-12 font-medium leading-relaxed max-w-xl">Shop from verified global vendors with local payment methods and flexible installments.</p>
          
          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={() => navigate('/shop')}
              className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-2xl shadow-primary/40 flex items-center gap-3"
            >
              Start Shopping
              <span className="material-symbols-outlined">rocket_launch</span>
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('top-vendors');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/20 transition-all flex items-center gap-3"
            >
              Browse Vendors
              <span className="material-symbols-outlined">storefront</span>
            </button>
          </div>
        </div>
      </section>

      {/* Category Selection */}
      <section>
        <div className="flex items-end justify-between mb-12 px-2">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Shop by Category</h2>
            <p className="text-slate-500 mt-2 font-medium">Find exactly what you need from our curated collections</p>
          </div>
          <Link to="/categories" className="bg-slate-100 h-12 px-8 rounded-2xl font-black text-sm text-slate-800 hover:bg-slate-200 transition-all flex items-center gap-2">
            Explore All <span className="material-symbols-outlined !text-lg">grid_view</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {CATEGORIES.slice(0, 6).map(cat => (
            <Link to={`/shop?category=${cat.name.toLowerCase()}`} key={cat.name} className="group cursor-pointer flex flex-col items-center gap-5">
              <div className="w-full aspect-square rounded-[32px] bg-white shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden transition-all group-hover:shadow-2xl group-hover:border-primary/20 group-hover:-translate-y-2">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <p className="font-black text-slate-900 group-hover:text-primary transition-colors text-lg tracking-tight">{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* About Us Teaser */}
      <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
        <div className="relative aspect-square rounded-[60px] overflow-hidden shadow-2xl">
          <img src="https://picsum.photos/seed/aboutteaser/1000/1000" alt="About ShopMax" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
        </div>
        <div className="space-y-8">
          <div className="inline-block bg-primary/10 text-primary px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">About Our Vision</div>
          <h2 className="text-5xl font-black text-slate-900 leading-[1.1]">Bridging Borders <br/>Through Seamless <br/>Commerce.</h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
            ShopMax isn't just a store; it's a global infrastructure designed to empower shoppers everywhere. We combine logistics, trust, and flexible payments to redefine how the world shops.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/about" className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:bg-primary transition-all uppercase tracking-widest text-sm">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Top Vendors Section */}
      <section id="top-vendors" className="bg-white rounded-[60px] p-12 lg:p-16 border border-slate-100 shadow-sm scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Top Verified Vendors</h2>
            <p className="text-slate-500 mt-2 font-medium">Connect with global retailers and boutique brands directly</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {VENDORS_MOCK.map((vendor) => (
            <Link 
              key={vendor.id} 
              to={`/shop?vendor=${vendor.id}`}
              className="group p-8 rounded-[40px] bg-slate-50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all duration-500"
            >
              <div className="size-24 bg-white rounded-[24px] shadow-sm p-5 mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                <img src={vendor.logo} alt={vendor.name} className="max-w-full max-h-full object-contain rounded-lg" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors">{vendor.name}</h4>
                  <span className="material-symbols-outlined text-blue-500 !text-lg filled-icon">verified</span>
                </div>
                <div className="flex items-center gap-4 text-sm font-bold text-slate-500">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined !text-sm text-amber-400 filled-icon">star</span>
                    <span>{vendor.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{COUNTRIES.find(c => c.code === vendor.country)?.flag}</span>
                    <span className="uppercase tracking-widest text-[10px]">{vendor.country}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Products with Country Filter */}
      <section>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Best Sellers</h2>
            <p className="text-slate-500 mt-2 font-medium">Hand-picked premium quality products from across the globe</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-2xl overflow-x-auto no-scrollbar">
            <button 
              onClick={() => setSelectedCountry('All')}
              className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${selectedCountry === 'All' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Global
            </button>
            {COUNTRIES.map(country => (
              <button 
                key={country.code}
                onClick={() => setSelectedCountry(country.code)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${selectedCountry === country.code ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <span>{country.flag}</span>
                <span>{country.code}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="absolute bottom-5 right-5 size-14 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center text-slate-900 hover:bg-primary hover:text-white transition-all shadow-xl"
                >
                  <span className="material-symbols-outlined !text-3xl">add_shopping_cart</span>
                </button>
              </div>
              <div className="p-8 space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.vendorName}</p>
                <h3 className="font-bold text-slate-900 line-clamp-2 h-12 text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-slate-900">${product.price.toLocaleString()}</span>
                  {product.isInstallmentEligible && <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-1 rounded-md uppercase tracking-widest">Installments</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Install App Section */}
      <section className="bg-primary rounded-[60px] overflow-hidden p-12 lg:p-24 relative">
        <div className="absolute top-0 right-0 w-full h-full bg-slate-950/10 pointer-events-none"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 text-white text-center lg:text-left">
            <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">Mobile Experience</div>
            <h2 className="text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter">The Entire World <br/>in Your Pocket.</h2>
            <p className="text-primary-100 text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Download the ShopMax app for a faster, smoother experience. Get real-time order tracking, app-exclusive installment deals, and AR product previews.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a href="#" className="h-16 px-8 bg-slate-900 rounded-2xl flex items-center gap-4 hover:bg-slate-800 transition-all shadow-2xl">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
              </a>
              <a href="#" className="h-16 px-8 bg-slate-900 rounded-2xl flex items-center gap-4 hover:bg-slate-800 transition-all shadow-2xl">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
              </a>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-3xl font-black">4.9/5</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary-200">App Rating</p>
              </div>
              <div className="w-px h-8 bg-white/10"></div>
              <div className="text-center">
                <p className="text-3xl font-black">10M+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary-200">Downloads</p>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center">
             <div className="relative z-20 animate-bounce-slow">
               <img src="https://picsum.photos/seed/appmock/600/1000" alt="App Mockup" className="w-[320px] rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[8px] border-slate-900" />
             </div>
             {/* Decorative Elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-white/20 rounded-full blur-[100px] -z-10"></div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-slate-50 rounded-[60px] p-12 lg:p-24 space-y-16">
        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Voices of Our Community</h2>
          <p className="text-slate-500 mt-2 font-medium">Join millions who trust ShopMax for their global purchases</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-6 flex flex-col">
              <div className="flex items-center gap-1 text-amber-400">
                {Array(review.rating).fill(0).map((_, i) => (
                  <span key={i} className="material-symbols-outlined !text-xl filled-icon">star</span>
                ))}
              </div>
              <p className="text-slate-600 font-medium italic leading-relaxed flex-1">"{review.comment}"</p>
              <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                <img src={review.userAvatar} alt={review.userName} className="size-12 rounded-full border-2 border-slate-50 shadow-sm" />
                <div>
                  <p className="font-black text-slate-900 text-sm">{review.userName}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section>
        <div className="flex items-end justify-between mb-12 px-2">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">The ShopMax Blog</h2>
            <p className="text-slate-500 mt-2 font-medium">Insights into global trade, finance, and trends</p>
          </div>
          <Link to="/articles" className="text-primary font-black flex items-center gap-2 hover:underline">
            Read All Stories <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {articles.map((article) => (
            <Link to="/articles" key={article.id} className="group flex flex-col space-y-6">
              <div className="aspect-[4/3] rounded-[40px] overflow-hidden shadow-lg">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase text-primary tracking-widest bg-primary/10 px-3 py-1 rounded-full">{article.category}</span>
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">{article.title}</h3>
                <p className="text-slate-500 font-medium line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Global Shipping Promo */}
      <section className="bg-slate-950 rounded-[60px] p-12 lg:p-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[120px] rounded-full translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">Trusted by Millions of <br/><span className="text-primary">Global Shoppers.</span></h2>
            <p className="text-slate-400 text-xl font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">Every vendor on ShopMax goes through a rigorous verification process. Shop with confidence knowing your purchase is protected.</p>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
              {VENDORS_MOCK.map((v, i) => (
                <div key={v.id} className={`bg-white/5 backdrop-blur-md p-8 rounded-[40px] border border-white/10 hover:border-primary/50 transition-all group ${i % 2 !== 0 ? 'translate-y-8' : ''}`}>
                  <div className="size-16 bg-white rounded-2xl p-3 mb-4">
                    <img src={v.logo} alt={v.name} className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-black text-white group-hover:text-primary transition-colors">{v.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
