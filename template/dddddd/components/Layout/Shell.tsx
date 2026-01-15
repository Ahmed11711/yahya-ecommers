
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../constants';

interface ShellProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

const Shell: React.FC<ShellProps> = ({ children, onLogout }) => {
  const { language, setLanguage } = useLanguage();
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const navItems = [
    { label: t.dashboard, icon: 'dashboard', path: '/' },
    { label: t.products, icon: 'inventory_2', path: '/products' },
    { label: t.categories, icon: 'category', path: '/categories' },
    { label: t.orders, icon: 'shopping_cart', path: '/orders' },
    { label: t.reviews, icon: 'rate_review', path: '/reviews' },
    { label: t.articles, icon: 'article', path: '/articles' },
    { label: t.users, icon: 'group', path: '/users' },
    { label: t.settings, icon: 'settings', path: '/settings' },
  ];

  return (
    <div className={`flex min-h-screen ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Sidebar - Desktop */}
      <aside className={`hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 text-primary-600">
            <span className="material-symbols-outlined text-3xl">storefront</span>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Nexus Admin</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
                }`
              }
            >
              <span className={`material-symbols-outlined ${isRtl ? 'ml-0' : 'mr-0'}`}>{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold uppercase text-xs">
              {language}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Alex Rivera</p>
              <p className="text-xs text-slate-500 truncate">Administrator</p>
            </div>
            <button onClick={onLogout} className="text-slate-400 hover:text-red-500 transition-colors">
              <span className="material-symbols-outlined">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark min-w-0">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <span className={`material-symbols-outlined absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`}>search</span>
              <input
                type="text"
                placeholder={t.search}
                className={`w-full ${isRtl ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 outline-none`}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors uppercase"
            >
              {language === 'en' ? 'Arabic' : 'English'}
            </button>

            <button className="relative p-2 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>

            <button className="lg:hidden p-2 text-slate-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className={`absolute top-0 bottom-0 ${isRtl ? 'right-0' : 'left-0'} w-72 bg-white dark:bg-slate-900 shadow-2xl flex flex-col`}>
             <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xl font-bold tracking-tight">Nexus Admin</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="material-symbols-outlined">close</span>
                </button>
             </div>
             <nav className="flex-1 px-4 py-6 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? 'bg-primary-50 text-primary-600 font-bold' : 'text-slate-600 font-medium'}`
                        }
                    >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="text-sm font-bold">{item.label}</span>
                    </NavLink>
                ))}
                <button onClick={() => { setIsMobileMenuOpen(false); onLogout?.(); }} className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 font-bold w-full text-left">
                  <span className="material-symbols-outlined">logout</span>
                  <span className="text-sm">{t.logout}</span>
                </button>
             </nav>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Shell;
