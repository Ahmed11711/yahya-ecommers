
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../../services/api';
import { Review, Product } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../constants';

const ReviewForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Partial<Review>>({
    customerName: '',
    customerEmail: '',
    rating: 5,
    productId: '',
    comment: { en: '', ar: '' },
    status: 'pending',
    createdAt: new Date().toISOString()
  });

  useEffect(() => {
    ApiService.getProducts().then(setProducts);
    if (id) {
      ApiService.getReviews().then(all => {
        const found = all.find(r => r.id === id);
        if (found) setFormData(found);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Review = {
      ...formData as Review,
      id: id || Math.random().toString(36).substr(2, 9),
      createdAt: (formData as Review).createdAt || new Date().toISOString()
    };
    await ApiService.saveReview(payload);
    navigate('/reviews');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight">{id ? t.edit_review : t.add_review}</h1>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/reviews')} className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 transition-colors">
            {t.cancel}
          </button>
          <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-2.5 rounded-lg shadow-lg shadow-primary-500/20 transition-all">
            {t.save}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.customer_name}</label>
              <input required value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.customer_email}</label>
              <input required type="email" value={formData.customerEmail} onChange={e => setFormData({...formData, customerEmail: e.target.value})} className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.select_product}</label>
              <select required value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})} className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                <option value="">Choose product...</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name[language]}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.stars}</label>
              <div className="flex items-center gap-4 mt-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button 
                    key={star} 
                    type="button" 
                    onClick={() => setFormData({...formData, rating: star})}
                    className={`material-symbols-outlined text-2xl transition-all ${star <= (formData.rating || 0) ? 'text-amber-400 fill-amber-400 scale-110' : 'text-slate-300'}`}
                  >
                    star
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.desc_en}</label>
              <textarea rows={4} required value={formData.comment?.en} onChange={e => setFormData({...formData, comment: {...formData.comment!, en: e.target.value}})} className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.desc_ar}</label>
              <textarea rows={4} required dir="rtl" value={formData.comment?.ar} onChange={e => setFormData({...formData, comment: {...formData.comment!, ar: e.target.value}})} className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
             <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.status}</label>
                <div className="flex gap-4">
                  {['pending', 'approved', 'hidden'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData({...formData, status: status as any})}
                      className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${formData.status === status ? 'bg-primary-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
             </div>
          </div>
        </section>
      </div>
    </form>
  );
};

export default ReviewForm;
