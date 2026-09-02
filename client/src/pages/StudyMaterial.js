import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, BookOpen, CheckCircle, Award, Zap, FileText, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const StudyMaterial = () => {
  const pdfUrl = "/downloads/Partial_Fractions_Master_Handbook.pdf";

  const features = [
    "20 High-Speed Shortcuts (Cover-Up, Heaviside Derivative, Taylor Shift, Infinity Limits)",
    "160+ Rigorously Solved Questions across 5 progressive levels",
    "25 JEE Main Questions with 15–30s Shortcuts & Mistake Warnings",
    "20 JEE Advanced Problems with 🥇 Best / 🥈 Alternative / 🐢 Slow Method Ratings",
    "25 TS & AP EAMCET Speed Drills (Target: 15–40 seconds)",
    "10 Must-Memorize Identities with Mnemonics & 1-line proofs",
    "30 Common Student Traps (Side-by-side ❌ Wrong vs ✅ Correct comparisons)",
    "1-Page Last-Minute Revision Cheat Sheet + 7-Day Mastery Plan"
  ];

  const sectionsList = [
    { num: "01", title: "Complete Concept Foundation", desc: "Proper vs Improper, Synthetic & Term-Matching division tricks." },
    { num: "02", title: "All Standard Forms & Templates", desc: "Forms A to F covering distinct, repeated, and irreducible quadratics." },
    { num: "03", title: "The 20 Fastest Shortcuts", desc: "Heaviside cover-up, residues, complex roots, even power symmetry." },
    { num: "04", title: "High-Yield Identities", desc: "Top 10 instant-recall identities for JEE & EAMCET." },
    { num: "05", title: "Special Shortcuts & Advanced", desc: "Generalized Heaviside P(a)/Q'(a), palindromic fractions & series." },
    { num: "06", title: "JEE Main Speed Lab", desc: "25 high-frequency questions with ⚡ 15-second shortcut solutions." },
    { num: "07", title: "JEE Advanced Level", desc: "20 deep problems with key observations and method comparisons." },
    { num: "08", title: "TS / AP EAMCET Drills", desc: "25 rapid-fire MCQs designed for 15–30s mental solving." },
    { num: "09", title: "Question Type Decision Tree", desc: "Instant 3-second problem recognition flowchart." },
    { num: "10", title: "30 Common Student Traps", desc: "Side-by-side error immunization guide." },
    { num: "11", title: "1-Page Last Minute Sheet", desc: "Ultra-dense 5-minute pre-exam revision summary." },
    { num: "12", title: "Master Lookup Table", desc: "5-column matrix: Type | First Try | Fastest Method | Formula." },
    { num: "13", title: "Progressive Practice (75 Qs)", desc: "5 difficulty levels with comprehensive Answer Key & Hints." },
    { num: "14", title: "40 Speed-Training Challenges", desc: "20 Flash (≤30s) + 20 Speed (≤60s) mental drills." },
    { num: "15", title: "Previous-Year Pattern Analysis", desc: "15+ years exam frequency analysis and high/low priority guide." },
    { num: "16", title: "Master Sheet & 7-Day Plan", desc: "Complete Shortcut Master Sheet + Day-by-Day Mastery Plan." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-navy pt-24 pb-16 transition-colors duration-300">
      <SEO 
        title="Free Study Materials & Shortcut Handbooks | JEE Main, Advanced & EAMCET"
        description="Download free comprehensive Mathematics study material and shortcut handbooks for JEE Main, JEE Advanced, TS EAMCET, and AP EAMCET by expert faculty."
        keywords="partial fractions shortcut, eamcet mathematics shortcuts, jee main math pdf, free study material hyderabad, klm home tuitions study material"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-bold text-xs uppercase tracking-wider mb-4 border border-orange-200 dark:border-orange-800">
            <Award className="w-4 h-4" />
            <span>KLM Specialized Exam Cracker Series</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Free Study Material & <span className="text-orange-600">Shortcut Handbooks</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Authored by Senior Mathematics Faculty with 15+ years of experience training Top 100 rankers in <strong>JEE Main, JEE Advanced, TS EAMCET, and AP EAMCET</strong>.
          </p>
        </div>

        {/* Featured Material Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-16 ring-1 ring-black/5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            
            {/* Left Col: Info */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold">JEE Main</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-bold">JEE Advanced</span>
                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold">TS & AP EAMCET</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
                  PARTIAL FRACTIONS
                </h2>
                <h3 className="text-lg font-bold text-orange-600 mb-4">
                  The Complete Shortcut, Pattern Recognition & Speed-Solving Master Handbook
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  Engineered specifically to transform a 2-minute textbook algebra question into a <strong>15–45 second mental calculation</strong> using proven shortcut methods, decision trees, and high-frequency previous-year patterns.
                </p>

                {/* Badges / Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                    <div className="text-xl font-black text-orange-600">67</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pages</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                    <div className="text-xl font-black text-blue-600">160+</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Solved Qs</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                    <div className="text-xl font-black text-emerald-600">20</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Shortcuts</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl text-center border border-slate-100 dark:border-slate-800">
                    <div className="text-xl font-black text-purple-600">30</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Traps Guide</div>
                  </div>
                </div>

                {/* Key Features Bullet List */}
                <div className="space-y-2 mb-8">
                  {features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={pdfUrl}
                  download="KLM_Partial_Fractions_Master_Handbook.pdf"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all text-sm uppercase tracking-wide transform hover:-translate-y-0.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free PDF (2.8 MB)</span>
                </a>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-xl transition-all text-sm uppercase tracking-wide border border-slate-200 dark:border-slate-700"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview in Browser</span>
                </a>
              </div>
            </div>

            {/* Right Col: PDF Preview Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-2xl bg-white dark:bg-slate-950 group">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title="PDF Preview"
                  className="w-full h-[450px] sm:h-[500px] border-none"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent p-4 flex items-center justify-between text-white">
                  <div className="text-xs font-semibold">
                    <span>Includes 7-Day Mastery Plan</span>
                  </div>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-bold"
                  >
                    <span>Full Screen</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Curriculum & Sections Breakdown */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
              Inside the 67-Page Handbook
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Structured into 16 high-yield chapters covering theory, shortcuts, decision flowcharts, and 160+ worked questions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectionsList.map((sec) => (
              <div 
                key={sec.num}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-orange-500/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-orange-600 px-2.5 py-1 bg-orange-50 dark:bg-orange-950/50 rounded-lg border border-orange-200 dark:border-orange-900">
                    Section {sec.num}
                  </span>
                  <BookOpen className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1.5 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {sec.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section for Home Tuitions */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-700 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-1.5 text-orange-400 font-bold text-xs uppercase tracking-wider mb-3">
              <Star className="w-4 h-4 fill-current" />
              <span>Personalized Coaching & 1-on-1 Mentorship</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">
              Want 1-on-1 Guidance for JEE & EAMCET?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-8 leading-relaxed">
              Book expert verified home tutors across Hyderabad or join our live interactive online classes. 100% result-oriented preparation with guaranteed concept clarity.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg transition-all text-sm uppercase tracking-wide transform hover:-translate-y-0.5"
              >
                Book a Verified Tutor
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all text-sm uppercase tracking-wide border border-slate-600"
              >
                Contact Us (+91 73860 78298)
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudyMaterial;
