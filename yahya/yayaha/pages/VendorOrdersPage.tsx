
import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Order, OrderStatus } from '../types';

const VendorOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    apiService.getOrders().then(setOrders);
  }, []);

  return (
    <div className="space-y-10 py-8">
      <div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Sales Orders</h1>
        <p className="text-slate-500 mt-2 font-medium">Fulfill and track your customer orders</p>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Order ID</th>
              <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Customer</th>
              <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Date</th>
              <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Status</th>
              <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Total</th>
              <th className="px-10 py-5 text-slate-400 text-xs font-black uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-10 py-6 font-black text-slate-900">{order.id}</td>
                <td className="px-10 py-6">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs">
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
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-10 py-6 font-black text-slate-900">${order.amount.toLocaleString()}</td>
                <td className="px-10 py-6">
                  <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all">
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorOrdersPage;
