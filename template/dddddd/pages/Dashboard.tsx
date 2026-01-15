
import React, { useEffect, useState } from 'react';
import { ApiService } from '../services/api';
import { Product, Order, Review, Article } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { TRANSLATIONS } from '../constants';

const Dashboard: React.FC = () => {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];
  const [stats, setStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    reviewsCount: 0,
    articlesCount: 0,
    totalSales: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [products, orders, reviews, articles] = await Promise.all([
        ApiService.getProducts(),
        ApiService.getOrders(),
        ApiService.getReviews(),
        ApiService.getArticles()
      ]);

      const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);

      setStats({
        productsCount: products.length,
        ordersCount: orders.length,
        reviewsCount: reviews.length,
        articlesCount: articles.length,
        totalSales
      });
    };
    fetchStats();
  }, []);

  const metricCards = [
    { label: t.total_sales, value: `$${stats.totalSales.toFixed(2)}`, icon: 'payments', color: 'bg-emerald-50 text-emerald-600', trend: '+12.5%' },
    { label: t.total_orders, value: stats.ordersCount, icon: 'shopping_bag', color: 'bg-blue-50 text-blue-600', trend: '+5.2%' },
    { label: t.new_customers, value: '384', icon: 'person_add', color: 'bg-indigo-50 text-indigo-600', trend: '+10.1%' },
    { label: t.conversion, value: '3.42%', icon: 'trending_up', color: 'bg-purple-50 text-purple-600', trend: '-2.4%' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">{t.overview}</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, Alex. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${card.color}`}>
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${card.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {card.trend}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{card.label}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-bold">Recent Orders</h3>
              <button className="text-primary-600 text-sm font-bold hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Order ID</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500">Status</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                    <td className="px-6 py-4 text-sm font-bold">#ORD-7432</td>
                    <td className="px-6 py-4 text-sm">John Cooper</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">Delivered</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-right">$120.50</td>
                  </tr>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/20">
                    <td className="px-6 py-4 text-sm font-bold">#ORD-7433</td>
                    <td className="px-6 py-4 text-sm">Sarah Jenkins</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700">Pending</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-right">$89.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-lg font-bold">Quick Links</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-primary-50 transition-all text-slate-600 hover:text-primary-600">
                    <span className="material-symbols-outlined mb-2">add_box</span>
                    <span className="text-xs font-bold">Add Product</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-primary-50 transition-all text-slate-600 hover:text-primary-600">
                    <span className="material-symbols-outlined mb-2">reviews</span>
                    <span className="text-xs font-bold">Moderate</span>
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
