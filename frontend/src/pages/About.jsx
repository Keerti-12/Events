import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaMusic, FaAward, FaUsers, FaHeart, FaCheck } from 'react-icons/fa'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'

const About = () => {
  const milestones = [
    { year: '2010', title: 'Founded', description: 'Lucky Event DJ was established with a vision to revolutionize event entertainment.' },
    { year: '2013', title: 'First Major Award', description: 'Received our first "Best DJ Service" award from the Event Industry Association.' },
    { year: '2016', title: 'Expansion', description: 'Expanded our services to include full event production and lighting.' },
    { year: '2019', title: '500+ Events', description: 'Celebrated our 500th successful event milestone.' },
    { year: '2023', title: 'Industry Leader', description: 'Recognized as a premier DJ service in the region.' },
  ]

  const values = [
    { icon: FaMusic, title: 'Musical Excellence', description: 'We curate the perfect playlist for every unique event.' },
    { icon: FaAward, title: 'Professionalism', description: 'Punctual, prepared, and polished at every performance.' },
    { icon: FaUsers, title: 'Client Focus', description: 'Your vision is our priority. We listen and deliver.' },
    { icon: FaHeart, title: 'Passion', description: 'We love what we do, and it shows in every event.' },
  ]

  const team = [
    {
      name: 'DJ Lucky',
      role: 'Founder & Lead DJ',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: '15+ years of experience. Specializes in weddings and luxury events.',
    },
    {
      name: 'Maya Rodriguez',
      role: 'Event Coordinator',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Expert in event planning and client relations.',
    },
    {
      name: 'Alex Chen',
      role: 'Sound Engineer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      bio: 'Audio specialist ensuring crystal-clear sound quality.',
    },
  ]

  const whyChooseUs = [
    'Over 15 years of professional experience',
    'State-of-the-art sound and lighting equipment',
    'Customized playlists for every event',
    'Professional and friendly team',
    'Backup equipment on-site',
    'Competitive and transparent pricing',
    '100% satisfaction guarantee',
    'Available 24/7 for consultations',
  ]

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Lucky Event DJ - Over 15 years of creating unforgettable musical experiences for weddings, corporate events, and private parties."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-dark-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/90 to-dark-950" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-gold font-medium mb-4 block">About Us</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Our Story & <span className="gradient-text">Mission</span>
            </h1>
            <p className="text-xl text-dark-300">
              Creating unforgettable musical experiences since 2010
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-dark-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                The <span className="gradient-text">Lucky Event DJ</span> Story
              </h2>
              <div className="space-y-4 text-dark-300">
                <p>
                  What started as a passion project in 2010 has grown into one of the most 
                  sought-after DJ services in the region. Our founder, DJ Lucky, combined 
                  his love for music with a commitment to exceptional service.
                </p>
                <p>
                  Over the years, we've had the privilege of being part of countless 
                  celebrations—from intimate wedding ceremonies to grand corporate galas. 
                  Each event has taught us something new and fueled our dedication to perfection.
                </p>
                <p>
                  Today, Lucky Event DJ is more than a DJ service. We're a team of passionate 
                  professionals committed to making your event truly memorable through the 
                  power of music and entertainment.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="DJ Setup"
                className="rounded-xl w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Club Event"
                className="rounded-xl w-full h-48 object-cover mt-8"
              />
              <img
                src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Concert"
                className="rounded-xl w-full h-48 object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="Wedding DJ"
                className="rounded-xl w-full h-48 object-cover mt-8"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-dark-950">
        <div className="container-custom">
          <SectionHeader
            title="Our Core"
            goldText="Values"
            subtitle="The principles that guide everything we do"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gold/10 flex items-center justify-center">
                  <value.icon className="text-2xl text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-dark-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-dark-900">
        <div className="container-custom">
          <SectionHeader
            title="Our"
            goldText="Journey"
            subtitle="Key milestones in our story"
          />

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-dark-700" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } mb-12`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <span className="text-gold font-bold text-xl">{milestone.year}</span>
                  <h3 className="text-lg font-semibold text-white mt-1">{milestone.title}</h3>
                  <p className="text-dark-400 text-sm mt-2">{milestone.description}</p>
                </div>
                
                {/* Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gold rounded-full border-4 border-dark-900" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-dark-950">
        <div className="container-custom">
          <SectionHeader
            title="Meet Our"
            goldText="Team"
            subtitle="The passionate professionals behind every successful event"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gold">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-gold text-sm mb-4">{member.role}</p>
                <p className="text-dark-400 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-dark-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Why Choose <span className="gradient-text">Lucky Event DJ?</span>
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <FaCheck className="text-gold text-xs" />
                    </div>
                    <span className="text-dark-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1574007557239-acf6863bc375?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="DJ Equipment"
                className="rounded-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Ready to Work with <span className="gradient-text">Us?</span>
            </h2>
            <p className="text-xl text-dark-300 mb-8">
              Let's create something amazing together. Contact us to discuss your upcoming event.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="btn-primary">
                Book Your Event
              </Link>
              <Link to="/contact" className="btn-secondary">
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default About
