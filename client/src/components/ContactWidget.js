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
        animate={{ 
          scale: [1, 1.15, 1],
          boxShadow: [
            "0px 0px 0px 0px rgba(37, 99, 235, 0)",
            "0px 0px 20px 10px rgba(37, 99, 235, 0.6)",
            "0px 0px 0px 0px rgba(37, 99, 235, 0)"
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-600 text-white p-3.5 rounded-full shadow-xl flex items-center justify-center hover:bg-blue-700 transition-colors border-2 border-white"
        title="Call Us"
      >
        <motion.div
          animate={{ rotate: [0, -15, 15, -15, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        >
          <FaPhone className="h-6 w-6" />
        </motion.div>
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=Hi%20QUADRA%20HOME%20TUITIONS,%20I%20would%20like%20to%20know%20more.`}
        target="_blank"
        rel="noopener noreferrer"
        animate={{ 
          scale: [1, 1.15, 1],
          boxShadow: [
            "0px 0px 0px 0px rgba(34, 197, 94, 0)",
            "0px 0px 20px 10px rgba(34, 197, 94, 0.6)",
            "0px 0px 0px 0px rgba(34, 197, 94, 0)"
          ]
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="bg-green-500 text-white p-3.5 rounded-full shadow-xl flex items-center justify-center hover:bg-green-600 transition-colors border-2 border-white"
        title="WhatsApp Us"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        >
          <FaWhatsapp className="h-7 w-7" />
        </motion.div>
      </motion.a>
    </div>
  );
};

export default ContactWidget;
