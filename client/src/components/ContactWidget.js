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
      <motion.a
        href={`tel:${phoneNumber}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white p-3.5 rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 transition-colors border-2 border-white"
        title="Call Us"
      >
        <FaPhone className="h-6 w-6" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=Hi%20QUADRA%20HOME%20TUITIONS,%20I%20would%20like%20to%20know%20more.`}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-500 text-white p-3.5 rounded-full shadow-xl flex items-center justify-center hover:bg-green-600 transition-colors border-2 border-white"
        title="WhatsApp Us"
      >
        <FaWhatsapp className="h-7 w-7" />
      </motion.a>
    </div>
  );
};

export default ContactWidget;
