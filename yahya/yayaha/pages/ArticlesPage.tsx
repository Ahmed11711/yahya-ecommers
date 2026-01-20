
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Article } from '../types';

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getArticles().then(data => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Our Stories & Insights</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Stay updated with the latest trends in global commerce and lifestyle.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-[50px] h-96"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles.map((article) => (
            <article key={article.id} className="group flex flex-col space-y-6 cursor-pointer">
              <div className="aspect-[16/9] rounded-[50px] overflow-hidden shadow-lg border border-slate-100">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="space-y-4 px-4">
                <div className="flex items-center gap-4">
                  <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{article.category}</span>
                  <span className="text-xs font-bold text-slate-400">{article.date}</span>
                </div>
                <h2 className="text-3xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight">{article.title}</h2>
                <p className="text-slate-500 font-medium leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="size-10 rounded-full bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${article.author}`} alt={article.author} />
                  </div>
                  <span className="text-sm font-black text-slate-900">By {article.author}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
