import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactWidget from '../components/ContactWidget';
import SEO from '../components/SEO';
import FAQ, { FAQ_DATA } from '../components/FAQ';
import { getLocalBusinessSchema, getFaqSchema } from '../utils/geoSchema';

const Home = () => {
  const localSchema = getLocalBusinessSchema();
  const faqSchema = getFaqSchema(FAQ_DATA);

  const hyderabadAreas = [
    "Gachibowli", "Jubilee Hills", "Hitech City", "Madhapur", 
    "Kukatpally", "Banjara Hills", "Secunderabad", "Ameerpet", 
    "Dilsukhnagar", "Kondapur"
  ];

  return (
    <div className="min-h-screen bg-orange-100 flex flex-col pt-20">
      <SEO 
        title="Best Home Tuitions in Hyderabad & Online Classes"
        description="Excellent 100% result-oriented home and online tuitions with guaranteed success rate and affordable prices across Hyderabad. Book verified tutors today."
        keywords="home tuitions hyderabad, private tutor hyderabad, online tuitions, math home tutor, science tutor, quadra home tuitions"
        schema={[localSchema, faqSchema]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Half - Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12 py-12"
          >
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 mb-4 whitespace-nowrap overflow-hidden text-ellipsis">
                Best Home Tuitions in Hyderabad
              </h1>
              <div className="text-lg text-orange-600 font-bold font-serif tracking-wide flex items-start gap-2">
                <CheckCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Excellent 100% Result oriented home/online tuitions, Guaranteed Success rate with affordable prices.
                </p>
              </div>
            </div>

            {/* Website Design Promo Banner */}
            <div className="mt-8 px-2">
              <Link to="/contact" className="block relative group overflow-hidden rounded-2xl shadow-xl border-2 border-orange-200">
                <img 
                  src="/images/web_design_hero.jpg" 
                  alt="Website Designer" 
                  className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/70 transition-colors flex flex-col items-center justify-center text-center p-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-wide">Looking for a Website Designer?</h3>
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full font-black text-lg md:text-xl shadow-lg border border-orange-400 mb-3 transform group-hover:scale-105 transition-transform">
                    200/- per month with hosting
                  </div>
                  <div className="mt-1 flex items-center justify-center bg-white text-orange-600 font-bold px-4 py-1.5 rounded-full shadow-md text-sm hover:bg-orange-50 transition-colors">
                    Click Here <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            </div>

            <div className="mt-12 flex gap-4 px-2">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" 
                alt="Student Teacher Interaction" 
                className="w-1/2 h-64 object-cover rounded-2xl shadow-lg border-2 border-white/60"
              />
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80" 
                alt="Personalized Home Tuition" 
                className="w-1/2 h-64 object-cover rounded-2xl shadow-lg border-2 border-white/60 translate-y-6"
              />
            </div>
          </motion.div>

          {/* Right Half */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full relative lg:pl-10 mt-12 lg:mt-0"
          >
            <div className="bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] border border-slate-800 ring-1 ring-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
                Choose the Right Tuitions for you?
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Class I to V Tuitions",
                  "EAMCET",
                  "Class VI to VIII Tuitions",
                  "IITJEE ADV,MAINS",
                  "Class IX to X Tuitions",
                  "GRE/GMAT/SAT",
                  "Class XI to XII Tuitions",
                  "ENGG /COMPUTER SUBJECTS"
                ].map((item, idx) => (
                  <Link to="/register" key={idx} className="flex items-center p-3 bg-slate-800/80 rounded-lg hover:bg-slate-800 hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-orange-500/50 group">
                    <ChevronRight className="w-4 h-4 mr-2 shrink-0 text-orange-500 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">{item}</span>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col space-y-4">
                <Link to="/register" className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center transform hover:-translate-y-0.5">
                  Connect with Tutors
                </Link>
                
                <div className="text-center text-sm text-slate-400 pt-2">
                  Are you a tutor looking for a job? <Link to="/register" className="text-orange-400 font-bold hover:text-orange-300 transition-colors">Click here</Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Local Coverage Section for GEO & Local Search */}
      <section className="py-12 bg-white/70 border-t border-orange-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3 text-orange-600 font-bold">
            <MapPin className="w-5 h-5" />
            <span>Hyderabad & Telangana Service Coverage</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Home Tuition Coverage Areas</h3>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {hyderabadAreas.map((area, idx) => (
              <span key={idx} className="px-4 py-1.5 bg-slate-900 text-orange-400 font-semibold text-sm rounded-full shadow-sm">
                Tuition in {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* AEO FAQ Section */}
      <FAQ />

      <ContactWidget />
    </div>
  );
};

export default Home;
