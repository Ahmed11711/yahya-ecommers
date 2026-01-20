
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { apiService } from '../services/apiService';
import { Order, OrderStatus } from '../types';

const data = [
  { name: 'Jan 01', sales: 4000 },
  { name: 'Jan 07', sales: 3000 },
  { name: 'Jan 14', sales: 5000 },
  { name: 'Jan 21', sales: 4500 },
  { name: 'Jan 30', sales: 6500 },
];

const VendorDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    apiService.getVendorStats().then(setStats);
    apiService.getOrders().then(setOrders);
  }, []);

  if (!stats) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Vendor Dashboard</h2>
        <p className="text-slate-500 mt-2">Overview of your shop's performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Sales', value: `$${stats.totalSales.toLocaleString()}`, growth: `+${stats.salesGrowth}%`, sub: 'vs last month', icon: 'payments' },
          { label: 'Total Orders', value: stats.totalOrders.toLocaleString(), growth: `+${stats.ordersGrowth}%`, sub: '32 new today', icon: 'shopping_bag' },
          { label: 'Active Products', value: stats.activeProducts, growth: `+${stats.productsGrowth}%`, sub: '12 added this week', icon: 'inventory_2' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className="bg-green-100 text-green-600 text-xs font-black px-3 py-1 rounded-full">{stat.growth}</span>
            </div>
            <div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-slate-900">{stat.value}</p>
              <p className="text-slate-400 text-xs mt-3 font-medium">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Trends Chart */}
      <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Sales Trends (Last 30 Days)</h3>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-medium">Gross Merchandise Value</span>
              <span className="text-green-600 font-black text-sm">+8.4%</span>
            </div>
          </div>
          <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <button className="px-5 py-2.5 text-sm font-bold rounded-xl hover:bg-white transition-all">1W</button>
            <button className="px-5 py-2.5 text-sm font-bold rounded-xl bg-white shadow-sm">1M</button>
            <button className="px-5 py-2.5 text-sm font-bold rounded-xl hover:bg-white transition-all">3M</button>
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#137fec" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#137fec" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} dy={15} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '16px' }}
                itemStyle={{ fontWeight: 800, color: '#137fec' }}
              />
              <Area type="monotone" dataKey="sales" stroke="#137fec" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-2xl font-black text-slate-900">Recent Orders</h3>
          <button className="text-primary text-sm font-black flex items-center gap-2 hover:underline">
            View all <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Order ID</th>
                <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Customer</th>
                <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Date</th>
                <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Status</th>
                <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-10 py-6 font-black text-slate-900">{order.id}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
                        {order.customerInitials}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{order.customerName}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-sm font-medium text-slate-500">{order.date}</td>
                  <td className="px-10 py-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                      order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-600' :
                      order.status === OrderStatus.SHIPPED ? 'bg-blue-100 text-blue-600' :
                      order.status === OrderStatus.PROCESSING ? 'bg-amber-100 text-amber-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-sm font-black text-slate-900">${order.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
