import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronRight, Users, BookOpen, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactWidget from '../components/ContactWidget';

const Home = () => {
  return (
    <div className="min-h-screen bg-orange-100 flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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

            <div className="space-y-5 mt-8">
              {/* Stat Block 1 */}
              <div className="flex items-start gap-5 p-5 rounded-2xl bg-white/60 shadow-sm border border-white/80 backdrop-blur-sm transition-all hover:shadow-md hover:bg-white group">
                <div className="bg-black text-white p-3.5 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-1">20,000+ Home Tutors</h3>
                  <p className="text-slate-700 font-medium">Personalized Online & Home Tutoring for Every Student.</p>
                </div>
              </div>

              {/* Stat Block 2 */}
              <div className="flex items-start gap-5 p-5 rounded-2xl bg-white/60 shadow-sm border border-white/80 backdrop-blur-sm transition-all hover:shadow-md hover:bg-white group">
                <div className="bg-black text-white p-3.5 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-1">30+ Subjects Offered</h3>
                  <p className="text-slate-700 font-medium">CBSE, ICSE, IB & State Board Tuitions for School & College.</p>
                </div>
              </div>

              {/* Stat Block 3 */}
              <div className="flex items-start gap-5 p-5 rounded-2xl bg-white/60 shadow-sm border border-white/80 backdrop-blur-sm transition-all hover:shadow-md hover:bg-white group">
                <div className="bg-black text-white p-3.5 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-1">18+ Years’ Experience</h3>
                  <p className="text-slate-700 font-medium">Trusted by Over 200,000 Students</p>
                </div>
              </div>
            </div>

            {/* Student Teacher Interaction Images */}
            <div className="mt-12 flex gap-4 px-2">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80" 
                alt="Student Teacher Interaction" 
                className="w-1/2 h-56 object-cover rounded-2xl shadow-lg border-2 border-white/60"
              />
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80" 
                alt="Personalized Home Tuition" 
                className="w-1/2 h-56 object-cover rounded-2xl shadow-lg border-2 border-white/60 translate-y-6"
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
                  "NIOS Tuitions",
                  "Class VI to VIII Tuitions",
                  "Vedic Maths Tuitions",
                  "Class IX to X Tuitions",
                  "A-Level Tuitions",
                  "Class XI to XII Tuitions",
                  "Abacus & mental arithmetic tuitions"
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
      <ContactWidget />
    </div>
  );
};

export default Home;
