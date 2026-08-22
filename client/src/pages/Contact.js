import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, User, BookOpen, Globe } from 'lucide-react';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import { getLocalBusinessSchema } from '../utils/geoSchema';

const Contact = () => {
  const localSchema = getLocalBusinessSchema();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Thank you for your message! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 73860 78298',
      link: 'tel:+917386078298'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'klm7778777@gmail.com',
      link: 'mailto:klm7778777@gmail.com'
    },
    {
      icon: Globe,
      title: 'Website',
      details: 'www.klmhometuitions.in',
      link: 'https://www.klmhometuitions.in'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'Hyderabad, Telangana, India',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: 'Mon - Sat: 8:00 AM - 8:00 PM',
      link: '#'
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-orange-100">
      <SEO 
        title="Contact Us & Book a Tutor | KLM Home Tuitions"
        description="Get in touch with KLM Home Tuitions. Call +91 73860 78298 or send an inquiry to book verified home tutors or online classes in Hyderabad."
        keywords="contact home tutor, book home tuition, klm home tuitions contact, hyderabad tuition inquiry"
        schema={localSchema}
      />
      {/* Tech Solutions Hero Section */}
      <section id="tech-solutions" className="bg-slate-900 text-white py-16 border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-4"
          >
            Tech <span className="text-orange-500">Solutions</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-4xl mx-auto space-y-6"
          >
            <p>
              We build modern, responsive, and high-performance websites and applications. 
              Our technology stack includes industry-leading tools, frameworks, and databases:
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'AWS', 'Docker'].map((tech) => (
                <span key={tech} className="px-4 py-2 bg-slate-800 text-orange-400 rounded-full text-sm font-semibold border border-slate-700 shadow-sm hover:bg-slate-700 transition-colors cursor-default">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Contact Info Boxes */}
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 p-6 rounded-2xl text-center shadow-lg border border-slate-800 ring-1 ring-white/5 hover:border-orange-500/50 transition-all group flex flex-col items-center justify-center"
                >
                  <div className="w-14 h-14 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-orange-500/10 transition-all">
                    <Icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {info.title}
                  </h3>
                  <a
                    href={info.link}
                    className="text-slate-400 hover:text-orange-400 transition-colors text-sm break-words leading-relaxed"
                  >
                    {info.details}
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-slate-900 p-8 md:p-10 rounded-2xl shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] border border-slate-800 ring-1 ring-white/5"
            >
              <h3 className="text-3xl font-bold mb-8 text-white text-center">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                      <input
                        {...register('name', {
                          required: 'Name is required',
                          minLength: { value: 2, message: 'Name must be at least 2 characters' },
                        })}
                        type="text"
                        id="name"
                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                      <input
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Please enter a valid email address' },
                        })}
                        type="email"
                        id="email"
                        className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        placeholder="Enter your email"
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: { value: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' },
                      })}
                      type="tel"
                      id="phone"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-300 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      type="text"
                      id="subject"
                      className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-slate-500" />
                    <textarea
                      {...register('message', {
                        required: 'Message is required',
                        minLength: { value: 10, message: 'Message must be at least 10 characters' },
                      })}
                      id="message"
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="spinner mr-2"></div>
                      Sending message...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </div>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 
