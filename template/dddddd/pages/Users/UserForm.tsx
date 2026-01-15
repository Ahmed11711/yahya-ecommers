
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../../services/api';
import { User } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../constants';

const UserForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'Editor',
    status: 'active',
    createdAt: new Date().toISOString()
  });

  useEffect(() => {
    if (id) {
      ApiService.getUsers().then(all => {
        const found = all.find(u => u.id === id);
        if (found) setFormData(found);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: User = {
      ...formData as User,
      id: id || Math.random().toString(36).substr(2, 9),
      createdAt: (formData as User).createdAt || new Date().toISOString()
    };
    await ApiService.saveUser(payload);
    navigate('/users');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black tracking-tight">{id ? t.edit_user : t.add_user}</h1>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/users')} className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-50 transition-colors">
            {t.cancel}
          </button>
          <button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-2.5 rounded-lg shadow-lg shadow-primary-500/20 transition-all">
            {t.save}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.user_name}</label>
            <input 
              required 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800" 
              placeholder="e.g. John Doe"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.email}</label>
            <input 
              required 
              type="email" 
              value={formData.email} 
              onChange={e => setFormData({...formData, email: e.target.value})} 
              className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800" 
              placeholder="name@nexus.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.role}</label>
              <select 
                required 
                value={formData.role} 
                onChange={e => setFormData({...formData, role: e.target.value as any})} 
                className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="Admin">{t.admin}</option>
                <option value="Editor">{t.editor}</option>
                <option value="Viewer">{t.viewer}</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t.status}</label>
              <div className="flex gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, status: 'active'})}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${formData.status === 'active' ? 'bg-green-600 text-white shadow-lg shadow-green-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                >
                  {t.active}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, status: 'inactive'})}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${formData.status === 'inactive' ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}
                >
                  {t.inactive}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
