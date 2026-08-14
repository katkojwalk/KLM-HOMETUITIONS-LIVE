import React from 'react';
import { motion } from 'framer-motion';
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
  CheckCircle,
  TrendingUp,
  Shield,
  Lightbulb
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for academic excellence in everything we do'
    },
    {
      icon: Heart,
      title: 'Care',
      description: 'We care deeply about each student\'s success and well-being'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Building trust through transparency and reliability'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Using innovative teaching methods for better learning'
    }
  ];

  const achievements = [
    { number: '500+', label: 'Students Enrolled' },
    { number: '50+', label: 'Expert Tutors' },
    { number: '95%', label: 'Success Rate' },
    { number: '10+', label: 'Years Experience' },
    { number: '1000+', label: 'Hours Taught' },
    { number: '25+', label: 'Subjects Covered' }
  ];

  const team = [
    {
      name: 'KATKOJWAL KRISHNA M.SC',
      role: 'Director & Founder',
      description: 'Leading the vision of quality education and student success',
      image: '/images/director.jpg'
    }
  ];

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            About QUADRA HOME TUITIONS
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Empowering students with quality education and personalized learning experiences since 2013
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                QUADRA HOME TUITIONS was founded with a simple yet powerful vision: to provide 
                exceptional educational support to students who need personalized attention to 
                excel in their academic journey.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                What started as a small initiative has grown into a trusted educational 
                institution, serving hundreds of students across various subjects and grade levels. 
                Our commitment to quality education and student success remains unwavering.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">Personalized learning plans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">Qualified and experienced tutors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">Flexible scheduling options</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="text-gray-700">Proven track record of success</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-100 to-purple-100 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  To provide exceptional educational support through qualified tutors, 
                  innovative teaching methods, and personalized learning plans that 
                  help students excel academically and build confidence in their abilities.
                </p>
                <h4 className="text-xl font-semibold mb-4 text-gray-800">
                  Our Vision
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  To be the leading provider of personalized home tutoring services, 
                  recognized for our commitment to academic excellence and student success.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape our approach to education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
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
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Leadership
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Dedicated professionals committed to your educational success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-1 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-semibold mb-4">
                      {member.role}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
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
              Our Achievements
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-white"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {achievement.number}
                </div>
                <div className="text-sm opacity-90">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
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
              Why Choose QUADRA HOME TUITIONS?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive educational support with a focus on individual growth and success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Expert Tutors
              </h3>
              <p className="text-gray-600">
                Our tutors are highly qualified professionals with extensive experience in their respective subjects.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Personalized Approach
              </h3>
              <p className="text-gray-600">
                Every student receives a customized learning plan tailored to their specific needs and goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Proven Results
              </h3>
              <p className="text-gray-600">
                Our track record speaks for itself with significant improvements in student performance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Flexible Scheduling
              </h3>
              <p className="text-gray-600">
                We offer convenient timing options to fit your busy schedule and lifestyle.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Quality Assurance
              </h3>
              <p className="text-gray-600">
                We maintain high standards of education quality and continuously monitor student progress.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Modern Methods
              </h3>
              <p className="text-gray-600">
                We use innovative teaching techniques and technology to enhance the learning experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 