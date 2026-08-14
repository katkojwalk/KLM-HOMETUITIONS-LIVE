import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
  Trophy,
  Quote
} from 'lucide-react';
import ContactWidget from '../components/ContactWidget';

const Home = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: BookOpen,
      title: t('home.feat1Title'),
      description: t('home.feat1Desc')
    },
    {
      icon: Users,
      title: t('home.feat2Title'),
      description: t('home.feat2Desc')
    },
    {
      icon: Award,
      title: t('home.feat3Title'),
      description: t('home.feat3Desc')
    },
    {
      icon: Clock,
      title: t('home.feat4Title'),
      description: t('home.feat4Desc')
    }
  ];

  const stats = [
    { number: '500+', label: t('home.stat1Label') },
    { number: '50+', label: t('home.stat2Label') },
    { number: '95%', label: t('home.stat3Label') },
    { number: '10+', label: t('home.stat4Label') }
  ];

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-shadow-lg"
          >
            {t('home.heroTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-shadow"
          >
            {t('home.heroSubtitle')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register" className="btn-primary text-lg px-8 py-3">
              {t('home.getStartedBtn')}
            </Link>
            <Link to="/about" className="btn-outline text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600">
              {t('home.learnMoreBtn')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              {t('home.aboutTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('home.aboutDesc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {t('home.missionTitle')}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('home.missionDesc')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">{t('home.missionPoint1')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">{t('home.missionPoint2')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">{t('home.missionPoint3')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">{t('home.missionPoint4')}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-50 to-purple-50 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {t('home.directorTitle')}
              </h3>
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <GraduationCap className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">
                  K. VINAY KRISHNA M.SC
                </h4>
                <p className="text-primary-600 font-medium">{t('home.directorRole')}</p>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {t('home.directorDesc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
              {t('home.whyTitle')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('home.whySubtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6 text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {t('home.successTitle')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-primary-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-xl mb-8 text-white/90">
              {t('home.ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-3 bg-white text-primary-600 hover:bg-gray-100">
                {t('home.registerBtn')}
              </Link>
              <Link to="/contact" className="btn-outline text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary-600">
                {t('home.contactBtn')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <ContactWidget />
    </div>
  );
};

export default Home; 