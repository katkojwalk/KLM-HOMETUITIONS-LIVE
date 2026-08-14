
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, LogOut, Settings, Home, Info, Phone, BookOpen, Shield, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'te', name: 'Telugu' },
    { code: 'hi', name: 'Hindi' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
  ];
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-scrolling images for header
  
    const headerImages = [
    'https://images.unsplash.com/photo-1523240798132-9c4c3c2c0c8c?auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2022&q=80',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2071&q=80',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=2070&q=80'
  
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: t('header.home'), path: '/', icon: Home },
    { name: t('header.about'), path: '/about', icon: Info },
    { name: t('header.contact'), path: '/contact', icon: Phone },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      {/* Auto-scrolling image carousel - Only show on Home page */}
      {location.pathname === '/' && (
        <div className="relative h-[200px] overflow-hidden">
          <div className="flex image-carousel" style={{ width: `${headerImages.length * 100}%`, height: '100%' }}>
            {headerImages.map((image, index) => (
              <div
                key={index}
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height:'100%',
                  width: `${100 / headerImages.length}%`
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-shadow-lg">
              QUADRA HOME TUITIONS
            </h1>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`px-4 py-3 ${isScrolled ? 'bg-white/95' : 'bg-white/80 backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold gradient-text">{t('header.brand')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary-50 hover:text-primary-600 ${
                    isActive(item.path) ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Language Selector Desktop */}
            <div className="relative">
              <button 
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-1 p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
                title={t('header.language')}
              >
                <Globe className="h-5 w-5" />
                <span className="hidden lg:inline">
                  {languages.find(l => l.code === (i18n.language || 'en').split('-')[0])?.name || 'English'}
                </span>
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100"
                  >
                    {languages.map((lang) => {
                      const isActive = (i18n.language || 'en').split('-')[0] === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => {
                            i18n.changeLanguage(lang.code);
                            setIsLangMenuOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-primary-50 transition-colors ${isActive ? 'text-primary-600 font-medium bg-primary-50/50' : 'text-gray-700'}`}
                        >
                          {lang.name}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 hover:text-red-600 text-gray-700"
                  >
                    <Shield className="h-4 w-4" />
                    <span>{t('header.admin')}</span>
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary-50 hover:text-primary-600 text-gray-700"
                >
                  <User className="h-4 w-4" />
                  <span>{t('header.dashboard')}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 hover:text-red-600 text-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t('header.logout')}</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="btn-outline"
                >
                  {t('header.login')}
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  {t('header.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="px-4 py-2 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                        isActive(item.path) ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                {/* Language Selector Mobile */}
                <div className="pt-2 pb-2 border-t border-b border-gray-100">
                  <div className="px-3 py-2 text-sm text-gray-500 font-medium flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>{t('header.language')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 px-3 pb-2">
                    {languages.map((lang) => {
                      const isActive = (i18n.language || 'en').split('-')[0] === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => i18n.changeLanguage(lang.code)}
                          className={`px-3 py-1 text-sm rounded-full transition-colors ${isActive ? 'bg-primary-100 text-primary-700 font-medium' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          {lang.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {isAuthenticated ? (
                  <div className="space-y-2 pt-2 border-t">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        <Shield className="h-4 w-4" />
                        <span>{t('header.adminPanel')}</span>
                      </Link>
                    )}
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      <User className="h-4 w-4" />
                      <span>{t('header.dashboard')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-gray-700 hover:bg-red-50 hover:text-red-600 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('header.logout')}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2 border-t">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-outline w-full text-center"
                    >
                      {t('header.login')}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn-primary w-full text-center"
                    >
                      {t('header.register')}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header; 
