
import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';

const AllCategoriesPage: React.FC = () => {
  return (
    <div className="space-y-12 py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Browse Categories</h1>
          <p className="text-slate-500 text-lg mt-2 font-medium">Explore our vast collection from top global vendors</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {CATEGORIES.map((cat) => (
          <Link 
            to={`/shop?category=${cat.name.toLowerCase()}`} 
            key={cat.name} 
            className="group relative h-80 rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 group-hover:from-primary/90 transition-all"></div>
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
            />
            <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end text-white">
              <div className="size-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/20">
                <span className="material-symbols-outlined !text-2xl">{cat.icon}</span>
              </div>
              <h3 className="text-2xl font-black mb-2">{cat.name}</h3>
              <p className="text-sm text-slate-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                {cat.description || "Discover premium products in this category."}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                Shop Now <span className="material-symbols-outlined !text-sm">arrow_forward</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCategoriesPage;
