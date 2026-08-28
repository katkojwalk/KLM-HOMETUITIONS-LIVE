import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const MapSection = () => {
  return (
    <section className="py-16 bg-white/70 border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-3 text-orange-600 font-bold">
            <MapPin className="w-5 h-5" />
            <span>Our Location</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Find Us in Hyderabad
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Visit us or connect with us for personalized home tuition services across Hyderabad and Telangana.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-slate-900 rounded-2xl shadow-lg border border-slate-800 ring-1 ring-white/5 overflow-hidden"
          >
            <iframe
              title="KLM Home Tuitions Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.31698858818!2d78.26761546288!3d17.412608637488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[300px] md:h-[400px]"
            />
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              {
                icon: MapPin,
                title: 'Address',
                detail: 'Hyderabad, Telangana, India',
                link: 'https://maps.google.com/?q=Hyderabad,Telangana,India'
              },
              {
                icon: Phone,
                title: 'Phone',
                detail: '+91 73860 78298',
                link: 'tel:+917386078298'
              },
              {
                icon: Mail,
                title: 'Email',
                detail: 'klm7778777@gmail.com',
                link: 'mailto:klm7778777@gmail.com'
              },
              {
                icon: Clock,
                title: 'Working Hours',
                detail: 'Mon - Sat: 8:00 AM - 8:00 PM',
                link: '#'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.link}
                  target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 bg-slate-900 p-5 rounded-2xl shadow-lg border border-slate-800 ring-1 ring-white/5 hover:border-orange-500/50 transition-all group"
                >
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500/10 transition-all shrink-0">
                    <Icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.detail}</p>
                  </div>
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
