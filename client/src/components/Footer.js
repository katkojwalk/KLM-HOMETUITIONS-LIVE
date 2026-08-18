import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  Globe
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Register', path: '/register' },
    { name: 'Login', path: '/login' },
  ];

  const services = [
    'Home Tutoring',
    'Online Classes',
    'Exam Preparation',
    'Subject Specialization',
    'Personalized Learning',
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: '+91 83094 27266',
      link: 'tel:+918309427266'
    },
    {
      icon: Mail,
      text: 'katkojwalk.5@gmail.com',
      link: 'mailto:katkojwalk.5@gmail.com'
    },
    {
      icon: Globe,
      text: 'www.quadrahometuitions.in',
      link: 'https://www.quadrahometuitions.in'
    },
    {
      icon: MapPin,
      text: 'Hyderabad, Telangana, India',
      link: '#'
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <BookOpen className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-medium font-serif uppercase tracking-wider">Quadra Home Tuitions</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Empowering students with quality education and personalized learning experiences. 
              We are committed to academic excellence and student success.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-normal uppercase tracking-wider mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-serif font-normal uppercase tracking-wider mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-serif font-normal uppercase tracking-wider mb-6">Contact Info</h3>
            <div className="space-y-4">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.link}
                    className="flex items-center space-x-3 text-gray-300 hover:text-primary-400 transition-colors duration-200"
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span>{contact.text}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} QUADRA HOME TUITIONS. All rights reserved.
            </div>
            <p className="text-gray-400 text-sm flex items-center justify-center md:justify-end gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-current" /> 
              <span>by KATKOJWAL KRISHNA M.SC</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
