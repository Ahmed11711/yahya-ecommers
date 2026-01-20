
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../services/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 py-20">
        <div className="size-32 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
          <span className="material-symbols-outlined !text-7xl">shopping_cart_off</span>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900">Your cart is empty</h2>
          <p className="text-slate-500 mt-2 font-medium">Looks like you haven't added anything yet.</p>
        </div>
        <Link to="/shop" className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all uppercase tracking-widest text-sm">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 space-y-12">
      <div>
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Your Shopping Cart</h1>
        <p className="text-slate-500 mt-2 font-medium">You have {totalItems} items in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-8 group">
              <div className="size-24 rounded-2xl bg-slate-50 overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.vendorName}</p>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight truncate">{item.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-primary">${(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-xs font-bold text-slate-400">${item.price.toLocaleString()} each</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-4 bg-slate-50 p-1 rounded-xl">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="size-8 flex items-center justify-center bg-white rounded-lg text-slate-400 hover:text-primary hover:shadow-sm transition-all"
                    >
                      <span className="material-symbols-outlined !text-lg">remove</span>
                    </button>
                    <span className="text-sm font-black text-slate-900 w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="size-8 flex items-center justify-center bg-white rounded-lg text-slate-400 hover:text-primary hover:shadow-sm transition-all"
                    >
                      <span className="material-symbols-outlined !text-lg">add</span>
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-bold text-sm transition-colors"
                  >
                    <span className="material-symbols-outlined !text-lg">delete</span>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button 
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm hover:translate-x-[-4px] transition-transform"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Order Summary</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-slate-900">${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400">Estimated Shipping</span>
                  <span className="text-green-500 uppercase tracking-widest text-[10px]">Free</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400">Tax</span>
                  <span className="text-slate-900">$0.00</span>
                </div>
              </div>

              <div className="h-px bg-slate-50"></div>

              <div className="flex justify-between items-center py-4">
                <span className="text-lg font-black text-slate-900 uppercase tracking-widest">Total</span>
                <span className="text-3xl font-black text-primary">${totalPrice.toLocaleString()}</span>
              </div>

              <div className="space-y-3 pt-4">
                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-xl uppercase tracking-widest text-sm"
                >
                  Checkout Now
                  <span className="material-symbols-outlined">payments</span>
                </button>
                <div className="flex items-center justify-center gap-2 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <span className="material-symbols-outlined text-primary !text-xl">credit_score</span>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest">Installment plans available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <span className="material-symbols-outlined text-slate-400 !text-2xl">verified</span>
            <p className="text-xs text-slate-500 font-medium">Safe & Secure checkout experience powered by ShopMax Global.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
