import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPlay, FaArrowRight } from 'react-icons/fa'
import SEO from '../components/SEO'

const Home = () => {
  const stats = [
    { number: '500+', label: 'Events' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Satisfaction' },
    { number: '50+', label: 'Awards' },
  ]

  return (
    <>
      <SEO />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-bg">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
          }}
        />
        
        {/* Content */}
        <div className="container-custom relative z-10 pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 bg-gold/20 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
                Premium Event Entertainment
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6">
                Creating <span className="gradient-text">Unforgettable</span> Musical Experiences
              </h1>
              <p className="text-xl text-dark-300 mb-8 max-w-2xl">
                From intimate gatherings to grand celebrations, we bring the perfect blend of 
                music, energy, and entertainment to make your event truly memorable.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/booking" className="btn-primary">
                  Book Your Event
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link to="/gallery" className="btn-secondary">
                  <FaPlay className="mr-2" />
                  View Our Work
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-dark-700/50"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-dark-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-gold rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>
    </>
  )
}

export default Home
