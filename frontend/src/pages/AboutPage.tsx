import React from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Heart, 
  Users, 
  Target,
  Award,
  BarChart3,
  Globe,
  Lightbulb,
  Recycle
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Analysis',
      description: 'Get instant environmental impact scores for every product in your cart with our advanced algorithms.'
    },
    {
      icon: Lightbulb,
      title: 'Smart Suggestions',
      description: 'Discover better alternatives with our AI-powered recommendation engine that learns your preferences.'
    },
    {
      icon: Award,
      title: 'Reward System',
      description: 'Earn EcoPoints for sustainable choices and unlock exclusive discounts and rewards.'
    },
    {
      icon: Recycle,
      title: 'Circular Economy',
      description: 'Support brands and products that contribute to a more sustainable, circular economy.'
    }
  ];

  const values = [
    {
      icon: Globe,
      title: 'Environmental Responsibility',
      description: 'We believe in protecting our planet for future generations through conscious consumption.'
    },
    {
      icon: Heart,
      title: 'Community Impact',
      description: 'Building a community of environmentally conscious shoppers who make a difference together.'
    },
    {
      icon: Users,
      title: 'Accessibility',
      description: 'Making sustainable shopping accessible and affordable for everyone, regardless of background.'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Continuously improving our technology to provide better insights and recommendations.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Products Analyzed' },
    { number: '25%', label: 'Average Carbon Reduction' },
    { number: '100K+', label: 'EcoPoints Earned' },
    { number: '10K+', label: 'Active Users' }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'Lead Developer',
      expertise: 'Full-Stack Development & AI',
      avatar: '👩‍💻'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Sustainability Expert',
      expertise: 'Environmental Science & LCA',
      avatar: '🌱'
    },
    {
      name: 'Emily Johnson',
      role: 'UX Designer',
      expertise: 'User Experience & Design',
      avatar: '🎨'
    },
    {
      name: 'David Kim',
      role: 'Data Scientist',
      expertise: 'Machine Learning & Analytics',
      avatar: '📊'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Leaf className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">EcoTrack</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Empowering consumers to make sustainable shopping decisions through intelligent cart analysis, 
              eco-friendly recommendations, and meaningful rewards for environmental stewardship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                EcoTrack was born from a simple yet powerful idea: what if every shopping decision could 
                contribute to a more sustainable future? We believe that by providing real-time environmental 
                insights and actionable recommendations, we can help millions of consumers make choices that 
                benefit both their lives and our planet.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Built for the Walmart Labs Hackathon, EcoTrack represents the future of retail technology 
                where sustainability and convenience go hand in hand. We're not just tracking products; 
                we're tracking progress toward a greener world.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                  🌱 Carbon Neutral Shopping
                </div>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                  🔄 Circular Economy
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                  🎯 Impact Tracking
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-8"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How EcoTrack Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our innovative platform combines cutting-edge technology with environmental science 
              to deliver actionable insights for sustainable shopping.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at EcoTrack.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-2xl p-8"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind EcoTrack's innovative sustainability platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-green-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Built with Modern Technology</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
              EcoTrack leverages cutting-edge technologies to deliver a seamless, fast, and reliable experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              { name: 'React', logo: '⚛️' },
              { name: 'TypeScript', logo: '🔷' },
              { name: 'Node.js', logo: '🟢' },
              { name: 'MongoDB', logo: '🍃' },
              { name: 'Tailwind CSS', logo: '🎨' },
              { name: 'Chart.js', logo: '📊' }
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <div className="text-3xl mb-3">{tech.logo}</div>
                <div className="font-medium text-gray-900">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Join the Sustainable Shopping Revolution
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Start making a positive environmental impact with every purchase. 
              Your choices matter, and together we can build a more sustainable future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Shopping Smart
              </a>
              <a
                href="mailto:team@ecotrack.com"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
