import React from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactWidget = () => {
  // Replace these with your actual contact numbers
  const phoneNumber = '+917386078298'; 
  const whatsappNumber = '917386078298'; 

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-4">
      {/* Phone Button */}
      <div className="relative group">
        {/* Pulsing background effect */}
        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
        <motion.a
          href={`tel:${phoneNumber}`}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative bg-blue-600 text-white p-3.5 rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 transition-colors border-2 border-white z-10"
          title="Call Us"
        >
          <motion.div
            animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          >
            <FaPhone className="h-6 w-6" />
          </motion.div>
        </motion.a>
      </div>

      {/* WhatsApp Button */}
      <div className="relative group">
        {/* Pulsing background effect */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }}></div>
        <motion.a
          href={`https://wa.me/${whatsappNumber}?text=Hi%20QUADRA%20HOME%20TUITIONS,%20I%20would%20like%20to%20know%20more.`}
          target="_blank"
          rel="noopener noreferrer"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative bg-green-500 text-white p-3.5 rounded-full shadow-xl flex items-center justify-center hover:bg-green-600 transition-colors border-2 border-white z-10"
          title="WhatsApp Us"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <FaWhatsapp className="h-7 w-7" />
          </motion.div>
        </motion.a>
      </div>
    </div>
  );
};

export default ContactWidget;
