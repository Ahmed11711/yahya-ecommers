
import React, { useEffect, useState } from 'react';
import { ApiService } from '../../services/api';
import { Order, OrderStatus, Product } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../constants';

const OrderList: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<OrderStatus | 'All'>('All');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchAll = async () => {
    const [o, p] = await Promise.all([ApiService.getOrders(), ApiService.getProducts()]);
    setOrders(o);
    setProducts(p);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      const updatedOrder = { ...order, status: newStatus };
      await ApiService.updateOrder(updatedOrder);
      fetchAll();
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'bg-green-100 text-green-700';
      case OrderStatus.PENDING: return 'bg-amber-100 text-amber-700';
      case OrderStatus.DRIVERS_ARRIVED: return 'bg-purple-100 text-purple-700';
      case OrderStatus.SHIPPED: return 'bg-blue-100 text-blue-700';
      case OrderStatus.CANCELLED: return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  const toggleExpand = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  const getProductName = (id: string) => {
    return products.find(p => p.id === id)?.name[language] || 'Product Not Found';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tight">{t.orders}</h1>
          <p className="text-slate-500">Managing {orders.length} store transactions</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {['All', ...Object.values(OrderStatus)].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  filter === s ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {s === OrderStatus.DRIVERS_ARRIVED ? t.drivers_arrived : s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 w-10"></th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">{t.customer}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">{t.date}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-center">{t.status}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">{t.total}</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(order => (
                <React.Fragment key={order.id}>
                  <tr className={`hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-colors ${expandedOrder === order.id ? 'bg-slate-50 dark:bg-slate-800/20' : ''}`}>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleExpand(order.id)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
                        <span className="material-symbols-outlined text-slate-400">
                          {expandedOrder === order.id ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary-600">{order.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{order.customerName}</p>
                      <p className="text-xs text-slate-500">{order.customerPhone}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${getStatusColor(order.status)}`}>
                        {order.status === OrderStatus.DRIVERS_ARRIVED ? t.drivers_arrived : order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-right">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className="text-xs font-bold bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary-500/20 py-1.5"
                      >
                        {Object.values(OrderStatus).map(st => (
                          <option key={st} value={st}>{st === OrderStatus.DRIVERS_ARRIVED ? t.drivers_arrived : st}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  
                  {expandedOrder === order.id && (
                    <tr>
                      <td colSpan={7} className="px-8 py-6 bg-slate-50/50 dark:bg-slate-900/50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-top-2 duration-300">
                          <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">local_shipping</span> {t.shipping_address}
                            </h4>
                            <p className="text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                              {order.shippingAddress}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">list_alt</span> {t.order_items}
                            </h4>
                            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
                              <table className="w-full text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-400 text-[10px] font-bold uppercase">
                                  <tr>
                                    <th className="px-4 py-2 text-left">Item</th>
                                    <th className="px-4 py-2 text-center">{t.qty}</th>
                                    <th className="px-4 py-2 text-right">{t.price}</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                                  {order.items.map((item, idx) => (
                                    <tr key={idx}>
                                      <td className="px-4 py-2 font-medium">{getProductName(item.productId)}</td>
                                      <td className="px-4 py-2 text-center">{item.quantity}</td>
                                      <td className="px-4 py-2 text-right">${item.price.toFixed(2)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot className="bg-slate-50 dark:bg-slate-900/50 font-bold">
                                  <tr>
                                    <td colSpan={2} className="px-4 py-2 text-right uppercase text-[10px]">{t.total}</td>
                                    <td className="px-4 py-2 text-right text-primary-600">${order.totalAmount.toFixed(2)}</td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filtered.length === 0 && (
                <tr>
                   <td colSpan={7} className="px-6 py-20 text-center text-slate-400 italic">No orders found matching this filter.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
