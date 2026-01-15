
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TRANSLATIONS } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const { language, setLanguage } = useLanguage();
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  
  const [email, setEmail] = useState('admin@nexus.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onLogin();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6 ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary-600 text-white shadow-xl shadow-primary-500/30 mb-6">
            <span className="material-symbols-outlined text-4xl">storefront</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{t.welcome_back}</h1>
          <p className="text-slate-500 mt-2">Nexus E-Commerce Administration Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.email}</label>
            <div className="relative">
              <span className={`material-symbols-outlined absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`}>mail</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full ${isRtl ? 'pr-10' : 'pl-10'} py-3 rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-800 focus:ring-primary-500 focus:border-primary-500`}
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.password}</label>
              <button type="button" className="text-xs font-bold text-primary-600 hover:underline">{t.forgot_password}</button>
            </div>
            <div className="relative">
              <span className={`material-symbols-outlined absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`}>lock</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full ${isRtl ? 'pr-10' : 'pl-10'} py-3 rounded-xl border-slate-200 dark:border-slate-800 dark:bg-slate-800 focus:ring-primary-500 focus:border-primary-500`}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="rounded text-primary-600 focus:ring-primary-500" />
            <label htmlFor="remember" className="text-sm text-slate-500">{t.remember_me}</label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-black py-4 rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5"
          >
            {t.sign_in}
          </button>
        </form>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="text-xs font-bold text-slate-500 hover:text-primary-600 uppercase border-b border-transparent hover:border-primary-600 transition-all"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
