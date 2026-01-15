
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../../services/api';
import { Article } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../constants';

const ArticleList: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchAll = async () => {
    const data = await ApiService.getArticles();
    setArticles(data);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Delete article?')) {
      await ApiService.deleteArticle(id);
      fetchAll();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight">{t.articles}</h1>
          <p className="text-slate-500">Manage blog posts and news content</p>
        </div>
        <Link to="/articles/new" className="bg-primary-600 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-primary-500/20 flex items-center gap-2">
          <span className="material-symbols-outlined">add</span>
          <span>{t.add_article}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <div key={article.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group">
            <div className="aspect-video relative overflow-hidden">
                <img src={article.featuredImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/articles/edit/${article.id}`} className="p-2 bg-white rounded-full text-slate-900 shadow-lg">
                        <span className="material-symbols-outlined text-sm">edit</span>
                    </Link>
                    <button onClick={() => handleDelete(article.id)} className="p-2 bg-white rounded-full text-red-600 shadow-lg">
                        <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                </div>
            </div>
            <div className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">{article.author}</span>
                    <span className="text-xs text-slate-400">{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="font-bold text-lg leading-tight line-clamp-2">
                    {language === 'ar' ? article.title.ar : article.title.en}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-3">
                    {language === 'ar' ? article.content.ar : article.content.en}
                </p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <Link to={`/articles/edit/${article.id}`} className="text-primary-600 text-xs font-bold flex items-center gap-1 hover:underline uppercase">
                        {t.edit_article} <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                </div>
            </div>
          </div>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
            No articles found. Click "Add Article" to get started.
        </div>
      )}
    </div>
  );
};

export default ArticleList;
