import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { getLocalBusinessSchema } from '../utils/geoSchema';
import { 
  BookOpen, 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  GraduationCap,
  Target,
  Heart,
  Zap,
  CheckCircle,
  TrendingUp,
  Shield,
  Lightbulb
} from 'lucide-react';

const About = () => {
  const localSchema = getLocalBusinessSchema();

  return (
    <div className="min-h-screen pt-20 bg-orange-100">
      <SEO 
        title="About Us | KLM Home Tuitions"
        description="Learn about KLM Home Tuitions, our mission to empower students with personalized 1-on-1 education and expert tutors."
        keywords="about klm home tuitions, trusted home tutors, education services"
        schema={localSchema}
      />
      {/* Hero Section */}
      <section className="w-full bg-slate-900 border-b border-slate-800">
        <img 
          src="/images/web_design_hero.jpg" 
          alt="Premium Web Design & Education Services" 
          className="w-full max-h-[500px] object-cover opacity-90 shadow-2xl" 
        />
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 ring-1 ring-white/5 h-full flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Web Design & Development
              </h2>
              <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                In addition to educational services, we offer professional, fully responsive, and SEO-optimized web solutions tailored to your business needs.
              </p>
              <div className="space-y-4 text-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300"><strong className="text-white">Our Services:</strong> Website Designer, Website Development, Website Portfolio, Website Modification and Changes.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300"><strong className="text-white">Industries:</strong> E-commerce, Real Estate, Educational Institutes, Restaurants, and Beauty Parlour websites.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300"><strong className="text-white">Technology & Features:</strong> Built with React, responsive CRM websites with pipelines.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300"><strong className="text-white">Included:</strong> Full SSL hosting, free domain, and fully SEO optimized.</span>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-slate-300"><strong className="text-white">Contact:</strong> klm7778777@gmail.com</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-full"
            >
              <div className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 ring-1 ring-white/5 h-full flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6 text-orange-500">
                  Programs & Courses Offered
                </h3>
                <ul className="space-y-4 text-slate-300 leading-relaxed text-base md:text-lg">
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-orange-500 mr-3 shrink-0 mt-0.5" />
                    <span><strong className="text-white">School Level:</strong> Classes 1st to 10th all subjects, all boards (SSC, ICSE, CBSE, IGCSE, IB, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-orange-500 mr-3 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Competitive Exams:</strong> EAMCET, IIT-JEE (Adv & Mains), Polytechnic, Engineering Subjects, GMAT, GRE, SAT</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-orange-500 mr-3 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Languages:</strong> French, German, Hindi, Telugu, English, etc.</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-orange-500 mr-3 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Higher Education:</strong> MBBS subjects, Graduation, and Post-graduation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-orange-500 mr-3 shrink-0 mt-0.5" />
                    <span><strong className="text-white">Computer Science:</strong> Python, React, Java, JavaScript, Fullstack, Data Science, AI/ML</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900 border-t border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Why Choose <span className="text-orange-500">KLM HOME TUITIONS?</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              We provide comprehensive educational support with a focus on individual growth and success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700 hover:border-orange-500/50 transition-all group"
            >
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Expert Tutors
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Our tutors are highly qualified professionals with extensive experience in their respective subjects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700 hover:border-orange-500/50 transition-all group"
            >
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all">
                <Target className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Personalized Approach
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Every student receives a customized learning plan tailored to their specific needs and goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-700 hover:border-orange-500/50 transition-all group"
            >
              <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all">
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Proven Results
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Our track record speaks for itself with significant improvements in student performance.
              </p>
            </motion.div>


          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 
