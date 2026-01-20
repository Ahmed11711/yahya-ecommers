
import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">Empowering <br/><span className="text-primary">Global Commerce.</span></h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
          ShopMax is the world's first multi-vendor marketplace designed to bridge the gap between global brands and local shoppers through innovative financing and seamless logistics.
        </p>
        <div className="aspect-[21/9] rounded-[60px] overflow-hidden shadow-2xl">
          <img src="https://picsum.photos/seed/office/1600/700" alt="Our Office" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="bg-white p-12 rounded-[50px] border border-slate-100 shadow-sm space-y-6">
          <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <span className="material-symbols-outlined !text-3xl">rocket_launch</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900">Our Mission</h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            To provide every individual access to the world's finest products through flexible payment solutions and a trusted network of global vendors.
          </p>
        </div>
        <div className="bg-slate-900 p-12 rounded-[50px] shadow-2xl space-y-6 text-white">
          <div className="size-16 bg-white/10 rounded-2xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined !text-3xl">visibility</span>
          </div>
          <h2 className="text-3xl font-black">Our Vision</h2>
          <p className="text-slate-300 font-medium leading-relaxed">
            To become the leading ecosystem where global borders disappear, and trade happens effortlessly for everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Our Core Values</h2>
          <p className="text-slate-500 mt-2 font-medium">The pillars that define who we are</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Customer First', desc: 'Every decision we make starts and ends with the customer experience.', icon: 'group' },
            { title: 'Transparency', desc: 'Honest pricing, clear terms, and verified vendors you can trust.', icon: 'policy' },
            { title: 'Innovation', desc: 'Constantly evolving our platform to make shopping smarter and easier.', icon: 'lightbulb' },
            { title: 'Inclusivity', desc: 'Bringing global markets to every corner of the world, regardless of location.', icon: 'public' },
            { title: 'Excellence', desc: 'We settle for nothing less than the best in logistics and support.', icon: 'verified' },
            { title: 'Security', desc: 'Protecting your data and transactions with the latest technology.', icon: 'security' },
          ].map((val) => (
            <div key={val.title} className="bg-white p-10 rounded-[40px] border border-slate-100 hover:border-primary/20 transition-all hover:shadow-xl group">
              <div className="size-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined">{val.icon}</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">{val.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
