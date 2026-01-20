
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../constants';
import { useAuth } from '../services/AuthContext';
import { useCart } from '../services/CartContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const isVendor = user?.role === 'vendor';

  const navLinks = isVendor ? [
    { name: 'Dashboard', path: '/vendor', icon: 'dashboard' },
    { name: 'Inventory', path: '/vendor/products', icon: 'inventory_2' },
    { name: 'Sales', path: '/vendor/orders', icon: 'shopping_cart' },
  ] : [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Shop', path: '/shop', icon: 'shopping_bag' },
    { name: 'Categories', path: '/categories', icon: 'grid_view' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 lg:px-8 h-20 flex items-center justify-between gap-8">
          <Link to="/">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-black uppercase tracking-widest transition-all hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-slate-500'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate(isVendor ? '/vendor' : '/profile')}
                  className="flex items-center gap-3 p-1.5 pr-4 bg-slate-50 hover:bg-slate-100 rounded-[20px] transition-all border border-slate-100"
                >
                  <img src={user.avatar} className="size-9 rounded-[14px] object-cover" alt="User" />
                  <div className="text-left hidden sm:block">
                    <p className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">{user.role}</p>
                    <p className="text-xs font-black text-slate-900 leading-none">{user.name}</p>
                  </div>
                </button>
                <button 
                  onClick={() => { logout(); navigate('/auth'); }}
                  className="size-11 flex items-center justify-center bg-red-50 text-red-500 rounded-[14px] hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  title="Logout"
                >
                  <span className="material-symbols-outlined">logout</span>
                </button>
              </div>
            ) : (
              <Link to="/auth" className="bg-slate-900 text-white text-xs font-black uppercase tracking-widest h-12 px-8 rounded-2xl hover:bg-primary transition-all shadow-lg">
                Sign In
              </Link>
            )}
            
            {!isVendor && (
              <Link to="/cart" className="relative flex items-center justify-center h-12 px-6 bg-primary text-white rounded-2xl gap-3 text-sm font-black hover:bg-primary-600 transition-all shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black shadow-lg animate-bounce">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 py-6">
        {children}
      </main>

      <footer className="bg-slate-950 text-white pt-24 pb-12 rounded-t-[60px] mt-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <div className="brightness-0 invert opacity-100"><Logo /></div>
              <p className="text-slate-400 text-base leading-relaxed font-medium">The world's first multi-vendor marketplace with integrated smart financing.</p>
            </div>
            <div>
                <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.3em]">Explore</h4>
                <ul className="space-y-4 text-slate-400 font-bold">
                  <li><Link to="/shop" className="hover:text-primary transition-colors">Best Sellers</Link></li>
                  <li><Link to="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
                  <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                  <li><Link to="/articles" className="hover:text-primary transition-colors">Stories</Link></li>
                  <li><Link to="/download" className="hover:text-primary transition-colors">Download App</Link></li>
                </ul>
              </div>
            {['Vendors', 'Support'].map((title, idx) => (
              <div key={title}>
                <h4 className="font-black text-white mb-8 uppercase text-xs tracking-[0.3em]">{title}</h4>
                <ul className="space-y-4 text-slate-400 font-bold">
                  {idx === 0 && ['Open Store', 'Seller Hub', 'Fulfillment'].map(item => <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>)}
                  {idx === 1 && ['Help Center', 'Shipping', 'Returns'].map(item => <li key={item}><a href="#" className="hover:text-primary transition-colors">{item}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-500">
            <p>© 2024 ShopMax Marketplace. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
