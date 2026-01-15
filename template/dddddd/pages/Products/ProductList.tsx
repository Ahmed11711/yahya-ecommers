
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiService } from '../../services/api';
import { Product, Category } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../constants';

const ProductList: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');

  const fetchAll = async () => {
    const [p, c] = await Promise.all([ApiService.getProducts(), ApiService.getCategories()]);
    setProducts(p);
    setCategories(c);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await ApiService.deleteProduct(id);
      fetchAll();
    }
  };

  const filtered = products.filter(p => 
    p.name.en.toLowerCase().includes(search.toLowerCase()) || 
    p.name.ar.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">{t.products}</h1>
          <p className="text-slate-500">{filtered.length} products found in inventory</p>
        </div>
        <Link to="/products/new" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-primary-500/20 flex items-center gap-2 transition-all">
          <span className="material-symbols-outlined">add</span>
          <span>{t.add_product}</span>
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
              className={`w-full ${isRtl ? 'pr-10' : 'pl-10'} pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20`}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Product</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Stock</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={product.mainImage} className="w-12 h-12 rounded-lg object-cover bg-slate-100" />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{language === 'ar' ? product.name.ar : product.name.en}</p>
                        <p className="text-xs text-slate-500">SKU: {product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {categories.find(c => c.id === product.categoryId)?.name[language] || 'General'}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-primary-600">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`font-bold ${product.stock < 10 ? 'text-red-500' : 'text-slate-600'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link to={`/products/edit/${product.id}`} className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                      </Link>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
