
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiService } from '../../services/api';
import { Review, Product } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { TRANSLATIONS } from '../../constants';

const ReviewList: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = TRANSLATIONS[language];
  const isRtl = language === 'ar';
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  const fetchAll = async () => {
    const [r, p] = await Promise.all([ApiService.getReviews(), ApiService.getProducts()]);
    setReviews(r);
    setProducts(p);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleStatusChange = async (id: string, status: Review['status']) => {
    const review = reviews.find(r => r.id === id);
    if (review) {
      await ApiService.updateReview({ ...review, status });
      fetchAll();
    }
  };

  const handleReply = async (id: string) => {
    const review = reviews.find(r => r.id === id);
    if (review && replyText[id]) {
      await ApiService.updateReview({ ...review, reply: replyText[id] });
      setReplyText({ ...replyText, [id]: '' });
      fetchAll();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete review?')) {
      await ApiService.deleteReview(id);
      fetchAll();
    }
  };

  const getProductName = (id: string) => {
    return products.find(p => p.id === id)?.name[language] || 'Unknown Product';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">{t.reviews}</h1>
          <p className="text-slate-500">Customer feedback and ratings management</p>
        </div>
        <Link to="/reviews/new" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg shadow-lg shadow-primary-500/20 flex items-center gap-2 transition-all">
          <span className="material-symbols-outlined">add</span>
          <span>{t.add_review}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col md:flex-row">
            <div className="p-6 flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{review.customerName}</h4>
                  <p className="text-xs text-slate-400">{review.customerEmail}</p>
                  <p className="text-sm text-primary-600 font-medium">on {getProductName(review.productId)}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-sm ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}>star</span>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-lg bg-slate-50 dark:bg-slate-800 italic text-slate-700 dark:text-slate-300 ${isRtl ? 'text-right' : 'text-left'}`}>
                "{review.comment[language] || review.comment.en || review.comment.ar}"
              </div>

              {review.reply && (
                <div className={`${isRtl ? 'pr-6 border-r-2' : 'pl-6 border-l-2'} border-primary-100 py-2`}>
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Store Reply:</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{review.reply}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                <button 
                    onClick={() => handleStatusChange(review.id, 'approved')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${review.status === 'approved' ? 'bg-green-600 text-white' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
                >
                    {t.approve}
                </button>
                <button 
                    onClick={() => handleStatusChange(review.id, 'hidden')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${review.status === 'hidden' ? 'bg-slate-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                >
                    {t.hide}
                </button>
                <Link to={`/reviews/edit/${review.id}`} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">edit</span> {t.view}
                </Link>
                <button 
                    onClick={() => handleDelete(review.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                >
                    {t.delete}
                </button>
              </div>
            </div>

            <div className={`p-6 bg-slate-50 dark:bg-slate-800/50 md:w-80 border-t md:border-t-0 ${isRtl ? 'md:border-r' : 'md:border-l'} border-slate-200 dark:border-slate-800`}>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-2">{t.reply}</label>
                <textarea 
                    value={replyText[review.id] || ''}
                    onChange={e => setReplyText({...replyText, [review.id]: e.target.value})}
                    className="w-full rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-sm mb-3"
                    rows={3}
                    placeholder="Type your response..."
                />
                <button 
                    onClick={() => handleReply(review.id)}
                    className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
                >
                    Post Reply
                </button>
            </div>
          </div>
        ))}

        {reviews.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300 text-slate-400">
                No reviews found.
            </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
