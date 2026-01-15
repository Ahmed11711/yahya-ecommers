
import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import { Settings } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { TRANSLATIONS } from '../constants';

const SettingsPage: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    ApiService.getSettings().then(setSettings);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (settings) {
        await ApiService.updateSettings(settings);
        // Force refresh theme variables locally
        applyTheme(settings.theme.primaryColor, settings.theme.secondaryColor);
        alert('Settings saved!');
    }
  };

  const applyTheme = (primary: string, secondary: string) => {
    const root = document.documentElement;
    
    // Simple shade generator helper
    const getShades = (hex: string) => {
        return {
            '50': hex + '10', // 10% opacity
            '100': hex + '20',
            '200': hex + '40',
            '300': hex + '60',
            '400': hex + '90',
            '500': hex,
            '600': hex + 'cc',
            '700': hex + 'b3',
            '800': hex + '99',
            '900': hex + '80',
        }
    };

    const pShades = getShades(primary);
    Object.entries(pShades).forEach(([weight, val]) => {
        root.style.setProperty(`--primary-${weight}`, val);
    });

    const sShades = getShades(secondary);
    Object.entries(sShades).forEach(([weight, val]) => {
        root.style.setProperty(`--secondary-${weight}`, val);
    });
  };

  if (!settings) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-black tracking-tight">{t.settings}</h1>
        <button onClick={handleSave} className="bg-primary-600 text-white font-bold px-8 py-2.5 rounded-lg shadow-lg shadow-primary-500/20 hover:bg-primary-700 transition-all">
            {t.save}
        </button>
      </div>

      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-600">palette</span> Theme & Colors
            </h2>
            <p className="text-sm text-slate-500 mt-1">Customize the primary branding colors for your entire dashboard.</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700">
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Primary Brand Color</p>
                        <p className="text-xs text-slate-500">Used for buttons, links, and active states.</p>
                    </div>
                    <div className="relative">
                        <input 
                            type="color" 
                            value={settings.theme.primaryColor}
                            onChange={(e) => setSettings({
                                ...settings, 
                                theme: { ...settings.theme, primaryColor: e.target.value }
                            })}
                            className="w-12 h-12 rounded-lg border-none bg-transparent cursor-pointer"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700">
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Secondary Color</p>
                        <p className="text-xs text-slate-500">Used for accents and less prominent elements.</p>
                    </div>
                    <div className="relative">
                        <input 
                            type="color" 
                            value={settings.theme.secondaryColor}
                            onChange={(e) => setSettings({
                                ...settings, 
                                theme: { ...settings.theme, secondaryColor: e.target.value }
                            })}
                            className="w-12 h-12 rounded-lg border-none bg-transparent cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Preview Components</p>
                <div className="space-y-3">
                    <button className="w-full bg-primary-600 text-white font-bold py-2 rounded-lg shadow-md shadow-primary-500/20">
                        Primary Button
                    </button>
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined text-primary-600">check_circle</span>
                        <span className="text-sm font-medium text-primary-700">Active status indicator</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500" style={{ width: '65%' }}></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-600">image</span> {t.branding}
            </h2>
        </div>
        <div className="p-6 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 dark:bg-slate-800 overflow-hidden">
                <img src={settings.logo} className="w-24 h-24 object-contain" />
            </div>
            <div className="flex-1 space-y-4 w-full">
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-slate-400">Logo URL</label>
                    <input 
                        value={settings.logo} 
                        onChange={e => setSettings({...settings, logo: e.target.value})}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                    />
                </div>
                <div className="flex gap-4">
                    <button className="bg-primary-50 text-primary-600 text-xs font-bold px-6 py-2 rounded-lg hover:bg-primary-100 transition-colors">Upload New Logo</button>
                </div>
            </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-600">share</span> {t.social_media}
            </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(settings.socialLinks).map(([platform, value]) => (
                <div key={platform} className="space-y-1">
                    <label className="text-sm font-bold capitalize">{platform}</label>
                    <input 
                        value={value} 
                        onChange={e => setSettings({...settings, socialLinks: {...settings.socialLinks, [platform]: e.target.value}})}
                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                    />
                </div>
            ))}
        </div>
      </section>

      <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-600">info</span> {t.store_info}
            </h2>
        </div>
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="text-sm font-bold">Business Name</label>
                    <input value={settings.businessName} onChange={e => setSettings({...settings, businessName: e.target.value})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-bold">Support Email</label>
                    <input value={settings.supportEmail} onChange={e => setSettings({...settings, supportEmail: e.target.value})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
                </div>
            </div>

            <div className="space-y-1 p-4 bg-primary-50 dark:bg-primary-900/10 rounded-xl border border-primary-100 dark:border-primary-900/30">
                <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-primary-600 text-sm">payments</span>
                    <label className="text-sm font-bold text-primary-900 dark:text-primary-100">{t.payment_number}</label>
                </div>
                <input 
                    type="text"
                    placeholder="+964..."
                    value={settings.paymentPhoneNumber} 
                    onChange={e => setSettings({...settings, paymentPhoneNumber: e.target.value})} 
                    className="w-full rounded-lg border-primary-200 dark:border-primary-800 dark:bg-slate-800 focus:ring-primary-500" 
                />
                <p className="text-[10px] text-primary-600/70 mt-1 font-medium italic">Used for mobile wallet payments (ZainCash, Instapay, etc.)</p>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-bold">Address</label>
                <textarea rows={3} value={settings.address} onChange={e => setSettings({...settings, address: e.target.value})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
            </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
