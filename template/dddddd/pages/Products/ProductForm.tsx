
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../../services/api';
import { Product, Category } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../constants';

const ProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [formData, setFormData] = useState<Partial<Product>>({
    name: { en: '', ar: '' },
    description: { en: '', ar: '' },
    price: 0,
    categoryId: '',
    stock: 0,
    sku: '',
    mainImage: 'https://picsum.photos/seed/new/400/400',
    additionalImages: [],
    videoUrl: ''
  });

  useEffect(() => {
    ApiService.getCategories().then(setCategories);
    if (id) {
      ApiService.getProducts().then(all => {
        const found = all.find(p => p.id === id);
        if (found) setFormData(found);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Product = {
      ...formData as Product,
      id: id || Math.random().toString(36).substr(2, 9),
      createdAt: (formData as Product).createdAt || new Date().toISOString()
    };
    await ApiService.saveProduct(payload);
    navigate('/products');
  };

  const addImage = () => {
    if (!newImageUrl) return;
    setFormData({
      ...formData,
      additionalImages: [...(formData.additionalImages || []), newImageUrl]
    });
    setNewImageUrl('');
  };

  const removeImage = (index: number) => {
    const updated = [...(formData.additionalImages || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, additionalImages: updated });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight">{id ? t.edit_product : t.add_product}</h1>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/products')} className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 transition-colors">
            {t.cancel}
          </button>
          <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-2.5 rounded-lg shadow-lg shadow-primary-500/20 transition-all">
            {t.save}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-primary-600">
              <span className="material-symbols-outlined">info</span> General Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.name_en}</label>
                <input required value={formData.name?.en} onChange={e => setFormData({...formData, name: {...formData.name!, en: e.target.value}})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.name_ar}</label>
                <input required value={formData.name?.ar} dir="rtl" onChange={e => setFormData({...formData, name: {...formData.name!, ar: e.target.value}})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.desc_en}</label>
                <textarea rows={4} value={formData.description?.en} onChange={e => setFormData({...formData, description: {...formData.description!, en: e.target.value}})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.desc_ar}</label>
                <textarea rows={4} dir="rtl" value={formData.description?.ar} onChange={e => setFormData({...formData, description: {...formData.description!, ar: e.target.value}})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
              </div>
            </div>
          </section>

          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-primary-600">
              <span className="material-symbols-outlined">image</span> Media & Gallery
            </h3>
            <div className="space-y-8">
               <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 aspect-square rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 relative group overflow-hidden">
                    <img src={formData.mainImage} className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase">{t.main_image}</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-bold">{t.main_image} URL</label>
                        <input value={formData.mainImage} onChange={e => setFormData({...formData, mainImage: e.target.value})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-bold">{t.video_url}</label>
                        <input value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm" placeholder="https://youtube.com/..." />
                    </div>
                  </div>
               </div>

               <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                  <h4 className="font-bold text-sm mb-4">{t.gallery}</h4>
                  <div className="flex gap-2 mb-4">
                    <input 
                        type="text" 
                        placeholder={t.add_image_url} 
                        value={newImageUrl} 
                        onChange={e => setNewImageUrl(e.target.value)}
                        className="flex-1 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm" 
                    />
                    <button type="button" onClick={addImage} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all hover:bg-slate-800 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">add</span> Add
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {formData.additionalImages?.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group border border-slate-200">
                            <img src={img} className="w-full h-full object-cover" />
                            <button 
                                type="button" 
                                onClick={() => removeImage(idx)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    ))}
                  </div>
               </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-primary-600">Pricing & Organization</h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.price}</label>
                <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.category}</label>
                <select required value={formData.categoryId} onChange={e => setFormData({...formData, categoryId: e.target.value})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800">
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name[language]}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.sku}</label>
                <input required value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.stock}</label>
                <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
