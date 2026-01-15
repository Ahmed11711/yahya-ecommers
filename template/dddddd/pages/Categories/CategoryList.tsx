
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../../services/api';
import { Category } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../constants';

const CategoryList: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');

  const fetchCategories = async () => {
    const data = await ApiService.getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (confirm('Are you sure you want to delete this category?')) {
        await ApiService.deleteCategory(id);
        fetchCategories();
      }
    } catch (err: any) {
      alert(err.message || "Failed to delete category");
    }
  };

  const filtered = categories.filter(c => 
    c.name.en.toLowerCase().includes(search.toLowerCase()) || 
    c.name.ar.includes(search)
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">{t.categories}</h1>
          <p className="text-slate-500">Organize your store products into groups</p>
        </div>
        <Link to="/categories/new" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-primary-500/20 flex items-center gap-2 transition-all">
          <span className="material-symbols-outlined">add_circle</span>
          <span>{t.add_category}</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="relative max-w-md">
            <span className={`material-symbols-outlined absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`}>search</span>
            <input
              type="text"
              placeholder={t.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full ${isRtl ? 'pr-10' : 'pl-10'} pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 outline-none`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">{t.view}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">{t.name_en}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">{t.name_ar}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(cat => (
                <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <img src={cat.image || 'https://via.placeholder.com/40'} className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200" alt="" />
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">{cat.name.en}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white" dir="rtl">{cat.name.ar}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/categories/edit/${cat.id}`} className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </Link>
                      <button onClick={() => handleDelete(cat.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">No categories found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
