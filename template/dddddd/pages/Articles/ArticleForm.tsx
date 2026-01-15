
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../../services/api';
import { Article } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../constants';

const ArticleForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  
  const [formData, setFormData] = useState<Partial<Article>>({
    title: { en: '', ar: '' },
    content: { en: '', ar: '' },
    featuredImage: 'https://picsum.photos/seed/article/800/400',
    videoUrl: '',
    author: 'Admin'
  });

  useEffect(() => {
    if (id) {
      ApiService.getArticles().then(all => {
        const found = all.find(a => a.id === id);
        if (found) setFormData(found);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Article = {
      ...formData as Article,
      id: id || Math.random().toString(36).substr(2, 9),
      createdAt: (formData as Article).createdAt || new Date().toISOString()
    };
    await ApiService.saveArticle(payload);
    navigate('/articles');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight">{id ? t.edit_article : t.add_article}</h1>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/articles')} className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 transition-colors">
            {t.cancel}
          </button>
          <button type="submit" className="bg-primary-600 text-white font-bold px-8 py-2.5 rounded-lg shadow-lg shadow-primary-500/20">
            {t.save}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
                <label className="text-sm font-bold">{t.title_en}</label>
                <input required value={formData.title?.en} onChange={e => setFormData({...formData, title: {...formData.title!, en: e.target.value}})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-bold">{t.title_ar}</label>
                <input required dir="rtl" value={formData.title?.ar} onChange={e => setFormData({...formData, title: {...formData.title!, ar: e.target.value}})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-bold">{t.author}</label>
                <input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-bold">{t.video_url}</label>
                <input value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" placeholder="Youtube or Vimeo link" />
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="space-y-6">
            <div className="space-y-1">
                <label className="text-sm font-bold">{t.featured_image} URL</label>
                <div className="flex gap-4 items-center">
                    <img src={formData.featuredImage} className="w-24 h-24 object-cover rounded-lg border" />
                    <input value={formData.featuredImage} onChange={e => setFormData({...formData, featuredImage: e.target.value})} className="flex-1 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
                </div>
            </div>
            
            <div className="space-y-1">
                <label className="text-sm font-bold">{t.content_en}</label>
                <textarea rows={8} required value={formData.content?.en} onChange={e => setFormData({...formData, content: {...formData.content!, en: e.target.value}})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-bold">{t.content_ar}</label>
                <textarea rows={8} required dir="rtl" value={formData.content?.ar} onChange={e => setFormData({...formData, content: {...formData.content!, ar: e.target.value}})} className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800" />
            </div>
          </div>
        </section>
      </div>
    </form>
  );
};

export default ArticleForm;
