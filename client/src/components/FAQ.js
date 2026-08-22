import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQ_DATA = [
  {
    question: "What is Quadra Home Tuitions and how does it work?",
    answer: "Quadra Home Tuitions is a premier tuition management platform connecting students in Hyderabad and online learners with background-checked, expert 1-on-1 home tutors and online teachers tailored for school classes (I to XII), competitive entrance exams (IIT-JEE, EAMCET, NEET, GRE/GMAT/SAT), and computer science subjects."
  },
  {
    question: "Which areas in Hyderabad do your home tutors cover?",
    answer: "Our verified home tutors provide 1-on-1 home tuitions across all major Hyderabad areas including Gachibowli, Jubilee Hills, Hitech City, Madhapur, Kukatpally, Banjara Hills, Ameerpet, Secunderabad, Dilsukhnagar, and Kondapur."
  },
  {
    question: "What subjects and classes are available for home and online tuition?",
    answer: "We offer complete tuition coverage for Class I-V (All Subjects), Class VI-VIII, Class IX-X (Math, Physics, Chemistry, Biology), Class XI-XII (MPC, BiPC, Commerce), competitive entrance exams (IIT-JEE Mains & Advanced, EAMCET, NEET, GRE, GMAT, SAT), and university Engineering / Computer Science subjects."
  },
  {
    question: "How are tutors verified and selected for students?",
    answer: "Every tutor undergoes thorough academic qualification verification, background checks, subject competency testing, and a demo evaluation before matching with a student to ensure 100% result-oriented performance."
  },
  {
    question: "Are demo classes available before enrolling?",
    answer: "Yes! We offer a free initial demo class for parents and students to assess teaching compatibility and subject understanding before confirming tuition schedules."
  },
  {
    question: "How can parents or students contact Quadra Home Tuitions?",
    answer: "You can reach Quadra Home Tuitions directly by calling +91 83094 27266 or emailing katkojwalk.5@gmail.com. You can also register online through our student & tutor portal."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-slate-900 border-t border-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-orange-500/10 border border-orange-500/20 rounded-full mb-4">
            <HelpCircle className="w-6 h-6 text-orange-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Frequently Asked Questions (AEO & Tuition Info)
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Everything you need to know about our home & online tuition services in Hyderabad.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-slate-800/80 rounded-xl border border-slate-700/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-semibold text-lg text-slate-100 hover:text-orange-400 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{item.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-orange-500 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-700/40"
                    >
                      <div className="p-5 text-slate-300 text-base leading-relaxed bg-slate-900/40">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
