
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Product } from '../types';
import { CATEGORIES } from '../constants';
import { useAuth } from '../services/AuthContext';

const VendorProductsPage: React.FC = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  useEffect(() => {
    // In a real app, filter by vendorId
    apiService.getProducts().then(all => setProducts(all.filter(p => p.vendorId === 'v1')));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Real CRUD logic here...
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-10 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Product Inventory</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your items and stock levels</p>
        </div>
        <button 
          onClick={() => { setEditingProduct({}); setShowModal(true); }}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Product</th>
              <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Category</th>
              <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Price</th>
              <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Stock</th>
              <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.map(product => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="size-14 rounded-xl object-cover" />
                    <div>
                      <p className="font-black text-slate-900">{product.name}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase">SKU: {product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-600">
                    {product.category}
                  </span>
                </td>
                <td className="px-10 py-6 font-black text-slate-900">${product.price}</td>
                <td className="px-10 py-6">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-sm">{product.stock} units</span>
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${product.stock < 10 ? 'bg-red-500' : 'bg-green-500'}`} 
                        style={{ width: `${Math.min(100, (product.stock / product.totalUnits) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => { setEditingProduct(product); setShowModal(true); }}
                      className="p-2 hover:bg-primary/10 text-primary rounded-xl transition-colors"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-colors"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden">
            <div className="px-10 py-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-900">
                {editingProduct?.id ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={() => setShowModal(false)} className="material-symbols-outlined text-slate-400 hover:text-slate-900">close</button>
            </div>
            <form onSubmit={handleSave} className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Product Name</label>
                  <input required defaultValue={editingProduct?.name} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Category</label>
                  <select defaultValue={editingProduct?.category} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold">
                    {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Price ($)</label>
                  <input required type="number" defaultValue={editingProduct?.price} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Stock</label>
                  <input required type="number" defaultValue={editingProduct?.stock} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">SKU</label>
                  <input required defaultValue={editingProduct?.sku} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" />
                </div>
              </div>
              <button className="w-full bg-primary text-white py-5 rounded-2xl font-black shadow-xl shadow-primary/20 uppercase tracking-widest">
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorProductsPage;
