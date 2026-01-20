
import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/AuthContext';
import { apiService } from '../services/apiService';
import { Order, OrderStatus } from '../types';

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  useEffect(() => {
    apiService.getOrders().then(setOrders);
  }, []);

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-8">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
        <div className="relative group">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="size-32 rounded-[32px] border-4 border-slate-50 shadow-lg object-cover" 
          />
          <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform">
            <span className="material-symbols-outlined !text-sm">photo_camera</span>
          </button>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900">{user.name}</h1>
          <p className="text-slate-500 font-medium mt-1">{user.email} • {user.role.toUpperCase()}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
            <div className="bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-600">
              Orders: {orders.length}
            </div>
            <div className="bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold text-slate-600">
              Member Since: 2024
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-lg"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest border-b border-slate-50 pb-4">Details</h3>
            
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone</label>
                    <input 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-sm"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Address</label>
                    <textarea 
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 font-bold text-sm h-24"
                    />
                  </div>
                  <button 
                    onClick={handleSave}
                    className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 text-slate-600">
                    <span className="material-symbols-outlined text-slate-300">mail</span>
                    <span className="text-sm font-bold">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600">
                    <span className="material-symbols-outlined text-slate-300">phone</span>
                    <span className="text-sm font-bold">{user.phone || 'No phone provided'}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-600">
                    <span className="material-symbols-outlined text-slate-300">location_on</span>
                    <span className="text-sm font-bold">{user.address || 'No address provided'}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">My Orders</h3>
            </div>
            <div className="divide-y divide-slate-50">
              {orders.length > 0 ? orders.map(order => (
                <div key={order.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="size-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                      <span className="material-symbols-outlined">package_2</span>
                    </div>
                    <div>
                      <p className="font-black text-slate-900">{order.id}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase mt-1">{order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900">${order.amount.toLocaleString()}</p>
                    <span className={`inline-block px-3 py-1 rounded-lg text-[10px] font-black uppercase mt-2 ${
                      order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              )) : (
                <div className="p-20 text-center">
                  <p className="text-slate-400 font-bold">No orders found yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
