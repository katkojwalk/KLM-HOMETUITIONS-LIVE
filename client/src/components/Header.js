
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, User, LogOut, Settings, Home, Info, Phone, BookOpen, Shield, Globe, Moon, Sun, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
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
      isScrolled ? 'bg-white/95 dark:bg-brand-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>


      {/* Navigation */}
      <nav className={`px-4 py-3 ${isScrolled ? 'bg-white/95 dark:bg-brand-navy/95' : 'bg-white/80 dark:bg-brand-navy/80 backdrop-blur-sm'}`}>
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between relative min-h-[4rem]">
          {/* Left Section: Menu Button and Tech Solutions */}
          <div className="flex items-center space-x-4 z-50">
            {/* Menu button - Total Left Corner */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-900 text-orange-400 hover:text-white hover:bg-slate-800 hover:shadow-orange-500/20 shadow-lg transition-all flex items-center justify-center border border-slate-800 ring-1 ring-white/5"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="hidden sm:flex items-center space-x-2 text-blue-500">
              <Monitor className="h-5 w-5" />
              <span className="font-bold text-lg tracking-wide">
                Tech Solutions
              </span>
            </div>
          </div>

          {/* Center Text with Logo (Desktop) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-0 hidden sm:flex items-center space-x-3 whitespace-nowrap">
            <Link to="/" className="shrink-0">
              <img src="/images/logo.jpg" alt="Quadra Home Tuitions Logo" className="h-9 w-9 md:h-11 md:w-11 object-contain shadow-sm rounded-lg" />
            </Link>
            <Link to="/">
              <h1 className="text-xl md:text-2xl font-extrabold tracking-tight drop-shadow-sm">
                <span className="text-slate-900">Quadra </span>
                <span className="text-orange-600">Home Tuitions</span>
              </h1>
            </Link>
          </div>
          
          {/* Center Text with Logo (Mobile) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-0 sm:hidden flex items-center space-x-2 whitespace-nowrap">
            <Link to="/" className="shrink-0">
              <img src="/images/logo.jpg" alt="Quadra Home Tuitions Logo" className="h-8 w-8 object-contain shadow-sm rounded-lg" />
            </Link>
            <Link to="/">
              <h1 className="text-base font-extrabold tracking-tight">
                <span className="text-slate-900">Quadra </span>
                <span className="text-orange-600">Tuitions</span>
              </h1>
            </Link>
          </div>

          {/* Right Section: Free Registration */}
          <div className="hidden md:flex items-center z-50">
            <Link 
              to="/register" 
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] hover:from-orange-600 hover:to-orange-700 transition-all text-xs uppercase tracking-wide whitespace-nowrap transform hover:-translate-y-0.5"
            >
              Free Registration for Tutors/Parents
            </Link>
          </div>
        </div>

        {/* Pop Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 top-20 mt-2 w-72 bg-slate-900 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden border border-slate-800 ring-1 ring-white/10 z-50"
            >
              <div className="px-3 py-3 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive(item.path) 
                          ? 'bg-orange-500/10 text-orange-400 font-semibold' 
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive(item.path) ? 'text-orange-500' : 'text-slate-400'}`} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                {/* Theme Toggle */}
                <div className="pt-2 mt-2 border-t border-slate-800">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center space-x-3 px-4 py-3 w-full text-left rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    {isDarkMode ? <Sun className="h-5 w-5 text-orange-400" /> : <Moon className="h-5 w-5 text-slate-400" />}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>

                {/* Language Selector */}
                <div className="pt-2 pb-2 border-t border-b border-slate-800">
                  <div className="px-4 py-2 text-xs uppercase tracking-wider text-slate-500 font-semibold flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>{t('header.language')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 px-4 pb-2">
                    {languages.map((lang) => {
                      const isActive = (i18n.language || 'en').split('-')[0] === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => i18n.changeLanguage(lang.code)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                            isActive 
                              ? 'bg-orange-500 text-white' 
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          {lang.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {isAuthenticated ? (
                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-300 hover:bg-red-500/10 hover:text-red-400"
                      >
                        <Shield className="h-5 w-5 text-red-400" />
                        <span>{t('header.adminPanel')}</span>
                      </Link>
                    )}
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <User className="h-5 w-5 text-slate-400" />
                      <span>{t('header.dashboard')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-300 hover:bg-red-500/10 hover:text-red-400 w-full text-left"
                    >
                      <LogOut className="h-5 w-5 text-red-400" />
                      <span>{t('header.logout')}</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-4 px-2 pb-2">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white text-center block font-semibold transition-colors"
                    >
                      {t('header.login')}
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md text-center block font-bold transition-all"
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

