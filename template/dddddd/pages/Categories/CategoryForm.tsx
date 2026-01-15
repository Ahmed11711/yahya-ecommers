
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../../services/api';
import { Category } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../constants';

const CategoryForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  
  const [formData, setFormData] = useState<Partial<Category>>({
    name: { en: '', ar: '' },
    image: 'https://picsum.photos/seed/cat-placeholder/400/400'
  });

  useEffect(() => {
    if (id) {
      ApiService.getCategories().then(all => {
        const found = all.find(c => c.id === id);
        if (found) setFormData(found);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Category = {
      ...formData as Category,
      id: id || Math.random().toString(36).substr(2, 5)
    };
    await ApiService.saveCategory(payload);
    navigate('/categories');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight">{id ? t.edit_category : t.add_category}</h1>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/categories')} className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 transition-colors">
            {t.cancel}
          </button>
          <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-2.5 rounded-lg shadow-lg shadow-primary-500/20 transition-all">
            {t.save}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2 text-primary-600">
                <span className="material-symbols-outlined">info</span> {t.branding}
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.name_en}</label>
                <input 
                  required 
                  value={formData.name?.en} 
                  onChange={e => setFormData({...formData, name: { ...formData.name!, en: e.target.value }})} 
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary-500" 
                  placeholder="e.g. Footwear"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.name_ar}</label>
                <input 
                  required 
                  dir="rtl"
                  value={formData.name?.ar} 
                  onChange={e => setFormData({...formData, name: { ...formData.name!, ar: e.target.value }})} 
                  className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary-500 text-right" 
                  placeholder="مثال: الأحذية"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-primary-600">
                <span className="material-symbols-outlined">image</span> {t.category_image}
            </h3>
            <div className="aspect-square rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 dark:bg-slate-800 overflow-hidden relative group">
                <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                {!formData.image && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-4xl mb-2">add_photo_alternate</span>
                        <span className="text-xs font-bold uppercase">No Image</span>
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <label className="text-xs font-bold uppercase text-slate-400">{t.image_url}</label>
                <input 
                    type="text"
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    placeholder="https://..."
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm"
                />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div className="flex gap-3 items-start">
              <span className="material-symbols-outlined text-amber-500 mt-0.5">info</span>
              <div>
                  <h4 className="text-sm font-bold">Category Information</h4>
                  <p className="text-xs text-slate-500 mt-1">
                      Categories are used to filter products on the customer-facing storefront. Ensure both English and Arabic names are accurate as they will be displayed directly to users.
                  </p>
              </div>
          </div>
      </div>
    </form>
  );
};

export default CategoryForm;
