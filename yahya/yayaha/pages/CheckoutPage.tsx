
import React, { useState } from 'react';

const CheckoutPage: React.FC = () => {
  const [step, setStep] = useState(2); // Starting at verification as per mockup

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 pt-8">
      {/* Page Heading */}
      <div>
        <h1 className="text-5xl font-black text-slate-900 mb-3 tracking-tight">Complete Your Application</h1>
        <p className="text-slate-500 text-lg font-medium">Please provide your details accurately to ensure a quick approval process.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-10">
          {/* Timeline Stepper */}
          <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between relative px-4">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 -z-0"></div>
              <div className={`absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 -z-0 transition-all duration-500`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}></div>
              
              {[
                { label: 'Personal Info', icon: 'person', st: 1 },
                { label: 'Verification', icon: 'fingerprint', st: 2 },
                { label: 'Agreement', icon: 'contract', st: 3 }
              ].map(s => (
                <div key={s.st} className="flex flex-col items-center gap-3 relative z-10 bg-white px-4">
                  <div className={`size-14 rounded-full flex items-center justify-center transition-all ${
                    s.st < step ? 'bg-green-100 text-green-600' : 
                    s.st === step ? 'bg-primary text-white ring-8 ring-primary/10 shadow-lg' : 
                    'bg-slate-100 text-slate-400'
                  }`}>
                    <span className="material-symbols-outlined !text-2xl">{s.st < step ? 'check' : s.icon}</span>
                  </div>
                  <span className={`text-sm font-black uppercase tracking-widest ${s.st === step ? 'text-primary' : 'text-slate-400'}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="space-y-10">
            {/* Identity Verification */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-10 border-b border-slate-50 bg-slate-50/30">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary !text-3xl">badge</span>
                  Identity & Financial Verification
                </h3>
              </div>
              <div className="p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Document Type</label>
                    <select className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-6 py-4 font-bold text-slate-900 focus:ring-primary focus:border-primary">
                      <option>National ID Card</option>
                      <option>Passport</option>
                      <option>Driver's License</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">ID Number</label>
                    <input 
                      className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-6 py-4 font-bold placeholder:text-slate-300 focus:ring-primary focus:border-primary" 
                      placeholder="e.g. 123-456-789" 
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Upload ID Document (Front & Back)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all cursor-pointer bg-slate-50/20 group">
                      <span className="material-symbols-outlined text-slate-300 !text-5xl group-hover:text-primary transition-colors">add_photo_alternate</span>
                      <p className="text-sm font-black text-slate-500 group-hover:text-slate-800 uppercase tracking-widest">Front of ID</p>
                    </div>
                    <div className="border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all cursor-pointer bg-slate-50/20 group">
                      <span className="material-symbols-outlined text-slate-300 !text-5xl group-hover:text-primary transition-colors">add_photo_alternate</span>
                      <p className="text-sm font-black text-slate-500 group-hover:text-slate-800 uppercase tracking-widest">Back of ID</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Details */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-10 border-b border-slate-50 bg-slate-50/30">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary !text-3xl">account_balance_wallet</span>
                  Financial Details
                </h3>
              </div>
              <div className="p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Employment Status</label>
                    <select className="w-full rounded-2xl border-slate-200 bg-slate-50/50 px-6 py-4 font-bold text-slate-900 focus:ring-primary focus:border-primary">
                      <option>Full-time Employed</option>
                      <option>Self-Employed</option>
                      <option>Freelancer</option>
                      <option>Retired</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Monthly Net Income (USD)</label>
                    <div className="relative">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input 
                        className="w-full pl-10 pr-6 py-4 rounded-2xl border-slate-200 bg-slate-50/50 font-bold focus:ring-primary focus:border-primary" 
                        placeholder="5,000" 
                        type="number"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-primary/5 border border-primary/10 rounded-3xl flex items-start gap-5">
                  <span className="material-symbols-outlined text-primary !text-2xl mt-1">info</span>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    Higher income levels may qualify you for lower interest rates and faster approval. All data is kept strictly confidential and protected by 256-bit encryption.
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                className="px-10 py-5 rounded-2xl border-2 border-slate-100 font-black text-slate-500 hover:bg-slate-50 transition-all uppercase tracking-widest text-sm"
              >
                Back
              </button>
              <button 
                onClick={() => setStep(prev => Math.min(3, prev + 1))}
                className="bg-primary hover:bg-primary-600 text-white px-12 py-5 rounded-2xl font-black shadow-2xl shadow-primary/30 transition-all flex items-center gap-3 uppercase tracking-widest text-sm"
              >
                Continue
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Plan Summary Sidebar */}
        <div className="lg:col-span-4 sticky top-24 space-y-8">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Plan Summary</h3>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex items-center gap-5">
                <div className="size-20 rounded-2xl bg-slate-100 overflow-hidden shadow-sm flex-shrink-0">
                  <img src="https://picsum.photos/seed/mac/200/200" alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Apple Official</p>
                  <p className="text-sm font-black text-slate-900 leading-snug">MacBook Pro 16" - M3 Ultra 64GB Silver</p>
                </div>
              </div>

              <div className="space-y-5 border-t border-slate-50 pt-8">
                {[
                  { l: 'Order Total', v: '$2,499.00', color: 'text-slate-900' },
                  { l: 'Down Payment (20%)', v: '-$499.80', color: 'text-slate-900' },
                  { l: 'Interest Rate', v: '0% APR', color: 'text-green-500' },
                ].map(item => (
                  <div key={item.l} className="flex justify-between text-sm font-bold">
                    <span className="text-slate-400">{item.l}</span>
                    <span className={item.color}>{item.v}</span>
                  </div>
                ))}
                
                <div className="h-px bg-slate-50"></div>

                <div className="flex justify-between items-end bg-primary/5 p-6 rounded-3xl border border-primary/10">
                  <div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-1">Monthly Cost</span>
                    <span className="text-3xl font-black text-primary leading-none">$172.50</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-widest">Duration</span>
                    <span className="text-sm font-black text-slate-900">12 Months</span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-900 p-6 rounded-3xl shadow-lg">
                  <span className="text-sm font-black text-white uppercase tracking-widest">Total Cost</span>
                  <span className="text-xl font-black text-white">$2,499.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl flex items-center gap-4">
            <div className="bg-primary text-white p-3 rounded-2xl shadow-lg">
              <span className="material-symbols-outlined !text-2xl">shield</span>
            </div>
            <p className="text-xs text-primary font-black uppercase tracking-widest leading-relaxed">Your application is protected by enterprise-grade 256-bit encryption.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
