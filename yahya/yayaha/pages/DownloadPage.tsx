
import React from 'react';
import { Logo } from '../constants';

const DownloadPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 space-y-20">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">Your Marketplace, <br/><span className="text-primary">Anywhere.</span></h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">
          The ShopMax app is the ultimate way to browse, buy, and manage your installments on the go. Faster performance, instant notifications, and secure biometrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
         <div className="space-y-12">
           <div className="space-y-6">
             <h2 className="text-3xl font-black text-slate-900">Why use the app?</h2>
             <div className="space-y-4">
               {[
                 { title: 'Real-time Tracking', desc: 'Get push notifications for every stage of your global shipment.', icon: 'local_shipping' },
                 { title: 'Instant Financing', desc: 'Apply for installment plans in seconds with our mobile-first workflow.', icon: 'account_balance_wallet' },
                 { title: 'Secure Access', desc: 'Protect your account with FaceID or Fingerprint authentication.', icon: 'fingerprint' },
                 { title: 'Exclusive Deals', desc: 'Early access to flash sales and app-only vendor discounts.', icon: 'loyalty' }
               ].map(feat => (
                 <div key={feat.title} className="flex gap-6 p-6 rounded-3xl hover:bg-white hover:shadow-xl transition-all group border border-transparent hover:border-slate-100">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <span className="material-symbols-outlined">{feat.icon}</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-black text-slate-900">{feat.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{feat.desc}</p>
                    </div>
                 </div>
               ))}
             </div>
           </div>

           <div className="flex flex-wrap gap-4 pt-4">
             <a href="#" className="h-20 px-10 bg-slate-900 rounded-3xl flex items-center gap-4 hover:scale-105 transition-all shadow-2xl">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-12" />
              </a>
              <a href="#" className="h-20 px-10 bg-slate-900 rounded-3xl flex items-center gap-4 hover:scale-105 transition-all shadow-2xl">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-12" />
              </a>
           </div>
         </div>

         <div className="relative">
            <div className="bg-white p-12 rounded-[60px] shadow-2xl border border-slate-100 relative z-10 text-center space-y-10 overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
               <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Scan to Download</h3>
                  <p className="text-sm text-slate-500 font-medium">Point your camera at the QR code below</p>
               </div>
               <div className="size-64 bg-slate-50 mx-auto rounded-3xl flex items-center justify-center border border-slate-200">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://shopmax.com/download" alt="QR Code" className="size-48 opacity-80" />
               </div>
               <div className="pt-6">
                 <Logo />
               </div>
            </div>
            {/* Background Blur */}
            <div className="absolute -top-10 -right-10 size-64 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute -bottom-10 -left-10 size-64 bg-primary/10 rounded-full blur-[100px] -z-10"></div>
         </div>
      </div>
    </div>
  );
};

export default DownloadPage;
