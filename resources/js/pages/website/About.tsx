import Layout from './Layout';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import {
  Building2, ShieldCheck, Users2, Wrench, ArrowRight, CheckCircle2, BriefcaseBusiness,
  Lightbulb, Globe, TrendingUp, Construction, ClipboardList, Truck
} from 'lucide-react';

const About = () => {
  return (
    <Layout title="About Us | Resteel">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-white pb-20 pt-35 px-4 text-center">
        <h1 className="text-4xl md:text-6xl leading-tight font-bold mb-4">Redefining Steel Construction</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-slate-300">
          At Resteel, we give second-hand steel constructions a powerful second life — with sustainability, scale, and precision.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <Button variant="outline" asChild className="border-white text-text-orange-500 hover:text-orange-600 px-6 py-4 rounded-xl">
            <Link href="/shop" className='text-orange-500' >Browse Structures</Link>
          </Button>
          <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 rounded-xl">
            <Link href="/contact">Let’s Work Together <ArrowRight className=" h-4 w-4" /></Link>
          </Button>
        
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* <h2 className="text-3xl font-bold mb-4 text-gray-800">Who We Are</h2> */}
           <h2 className="mt-4 text-4xl md:text-5xl font-bold text-charcoal mb-4">Who<span className="text-[var(--primary)]"> We Are</span></h2>
          <p className="text-lg text-gray-600 mb-6">
            Resteel is a trusted European leader in sustainable steel construction. We help companies rethink infrastructure using reclaimed, premium-grade materials — without compromising on strength, safety, or style.
          </p>
          <div className="text-sm text-gray-400 italic">Founded in 1985 · Headquartered in Helmond, Netherlands</div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto text-center">
          {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Our Mission</h2> */}
           <h2 className="mt-4 text-4xl md:text-5xl font-bold text-charcoal mb-4">Our<span className="text-[var(--primary)]"> Mission</span></h2>

          <p className="text-lg text-gray-600 mb-12">
            We transform used steel structures into cost-efficient, environmentally responsible building solutions. From agriculture to logistics, we serve businesses of all sizes across Europe.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            {[
              { icon: CheckCircle2, title: 'Integrity', desc: 'Clear communication, fair pricing, and long-term customer trust.' },
              { icon: BriefcaseBusiness, title: 'Expertise', desc: '20+ years of experience in dismantling and reassembling steel structures.' },
              { icon: Lightbulb, title: 'Innovation', desc: 'Modern engineering applied to reclaimed materials for a greener future.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 text-slate-600 rounded-xl">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* <h2 className="text-3xl font-bold text-gray-800 mb-12">What We Offer</h2> */}
           <h2 className="mt-4 text-4xl md:text-5xl font-bold text-charcoal mb-4">What We<span className="text-[var(--primary)]"> Offer</span></h2>
             <p className="text-lg text-gray-600 mb-12">More than just buying and selling — we help move, manage, and optimize every structure</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: 'Steel Halls', desc: 'Pre-owned halls for industrial and agricultural use.' },
              { icon: Wrench, title: 'Assembly Services', desc: 'Complete dismantling, transport, and reassembly.' },
              { icon: Users2, title: 'Project Guidance', desc: 'Consultation on layout, logistics, and feasibility.' },
              { icon: ShieldCheck, title: 'Certified Steel', desc: 'Compliance-backed quality and safety assurance.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-slate-50 p-6 rounded-xl shadow hover:shadow-md transition">
                <div className="mb-4 p-3 bg-white text-slate-700 rounded-lg inline-block">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-1">{title}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Footprint */}
      {/* <section className="py-20 bg-slate-100 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Across Borders</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Our structures stand in more than 25 countries — from farms in Finland to factories in France. No project is too far or too complex.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-orange-600 font-bold text-xl">
            <div>🇳🇱 Netherlands</div>
            <div>🇩🇪 Germany</div>
            <div>🇫🇷 France</div>
            <div>🇳🇴 Norway</div>
          </div>
        </div>
      </section> */}

      {/* Sustainability Stats */}
      {/* <section className="py-20 bg-slate-900 text-white px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Environmental Impact</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { value: '12,000+ tons', label: 'Steel Reused' },
              { value: '9,500 tons', label: 'CO₂ Prevented' },
              { value: '120+ ha', label: 'Land Reclaimed' }
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-bold text-orange-400">{value}</div>
                <div className="text-sm text-slate-300 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Stats Section */}
      <section className="py-20  bg-slate-50 px-4  text-center">
          {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">Across Borders</h2> */}
           <h2 className="mt-4 text-4xl md:text-5xl font-bold text-charcoal mb-4">Across<span className="text-[var(--primary)]"> Borders</span></h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Our structures stand in more than 25 countries — from farms in Finland to factories in France. No project is too far or too complex.
          </p>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
          {[
            { label: 'Years Experience', value: '20+', icon: TrendingUp },
            { label: 'Countries Served', value: '25+', icon: Globe },
            { label: 'Projects Delivered', value: '500+', icon: Construction },
            { label: 'Max Hall Size', value: '60,000 m²', icon: ClipboardList },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label}>
              {/* <div className="flex justify-center mb-2">
                <Icon className="text-orange-500 w-6 h-6" />
              </div> */}
              <div className="text-4xl font-bold  text-[var(--primary)]">{value}</div>
              <div className="text-gray-600 mt-1 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>
 
 

      {/* Final CTA */}
      <section className="bg-gradient-to-tr from-slate-100 to-slate-100 text-slate-800 py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let’s Build Something Sustainable</h2>
        <p className="text-slate-800 max-w-xl mx-auto mb-6">
          Whether it’s an agricultural shed or a 60,000 m² steel hall — we’ve got the materials, the team, and the track record.
        </p>
        <Button asChild className="bg-white text-orange-500 hover:text-white hover:bg-orange-500 border border-orange-500  font-semibold px-6 py-3 rounded-xl">
          <Link href="/contact">Get In Touch</Link>
        </Button>
      </section>
    </Layout>
  );
};

export default About;
