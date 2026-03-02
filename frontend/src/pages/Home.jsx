import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaPlay, FaMusic, FaLightbulb, FaMicrophone, FaArrowRight, FaStar } from 'react-icons/fa'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import TestimonialCard from '../components/TestimonialCard'
import GalleryCard from '../components/GalleryCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { getServices, getGalleryFeatured, getTestimonialsFeatured } from '../services/api'

const Home = () => {
  const [services, setServices] = useState([])
  const [gallery, setGallery] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, galleryRes, testimonialsRes] = await Promise.all([
          getServices(),
          getGalleryFeatured(),
          getTestimonialsFeatured(),
        ])
        // Handle paginated responses (data.results) or direct arrays (data)
        const servicesData = servicesRes.data?.results || servicesRes.data || []
        const galleryData = galleryRes.data?.results || galleryRes.data || []
        const testimonialsData = testimonialsRes.data?.results || testimonialsRes.data || []
        
        setServices(Array.isArray(servicesData) ? servicesData.slice(0, 4) : [])
        setGallery(Array.isArray(galleryData) ? galleryData.slice(0, 6) : [])
        setTestimonials(Array.isArray(testimonialsData) ? testimonialsData.slice(0, 3) : [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const stats = [
    { number: '500+', label: 'Events' },
    { number: '15+', label: 'Years Experience' },
    { number: '100%', label: 'Satisfaction' },
    { number: '50+', label: 'Awards' },
  ]

  const features = [
    { icon: FaMusic, title: 'Premium Sound', description: 'Top-tier audio equipment for crystal-clear sound' },
    { icon: FaLightbulb, title: 'Dynamic Lighting', description: 'Stunning visual effects to elevate your event' },
    { icon: FaMicrophone, title: 'Professional MC', description: 'Expert hosting to keep your guests engaged' },
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

      {/* Features Section */}
      <section className="py-20 bg-dark-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="text-2xl text-gold" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-dark-400 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-dark-950">
        <div className="container-custom">
          <SectionHeader
            title="Our"
            goldText="Services"
            subtitle="From weddings to corporate events, we offer comprehensive DJ and entertainment services tailored to your needs."
          />

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                  <ServiceCard key={service.id} service={service} index={index} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link to="/services" className="btn-secondary">
                  View All Services
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 bg-dark-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold font-medium mb-4 block">About Us</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Over 15 Years of <span className="gradient-text">Musical Excellence</span>
              </h2>
              <p className="text-dark-300 leading-relaxed mb-6">
                Lucky Event DJ has been at the forefront of event entertainment since 2010. 
                Our passion for music combined with cutting-edge technology delivers 
                experiences that leave lasting impressions.
              </p>
              <p className="text-dark-400 leading-relaxed mb-8">
                From intimate weddings to large-scale corporate events, our team of 
                professional DJs brings energy, creativity, and technical expertise 
                to every performance.
              </p>
              <Link to="/about" className="btn-primary">
                Learn More About Us
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1176&q=80"
                  alt="DJ Performance"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-dark-800 border border-dark-700 rounded-xl p-6 shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                    <FaStar className="text-dark-900" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">500+</div>
                    <div className="text-sm text-dark-400">Successful Events</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-24 bg-dark-950">
        <div className="container-custom">
          <SectionHeader
            title="Our"
            goldText="Portfolio"
            subtitle="Take a look at some of our most memorable events and performances."
          />

          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((item, index) => (
                  <GalleryCard key={item.id} item={item} index={index} />
                ))}
              </div>
              <div className="text-center mt-12">
                <Link to="/gallery" className="btn-secondary">
                  View Full Gallery
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-dark-900">
        <div className="container-custom">
          <SectionHeader
            title="What Clients"
            goldText="Say"
            subtitle="Don't just take our word for it. Here's what our clients have to say about their experience."
          />

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Make Your Event <span className="gradient-text">Unforgettable?</span>
            </h2>
            <p className="text-xl text-dark-300 mb-8">
              Let's discuss your vision and create a custom entertainment experience 
              that exceeds your expectations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="btn-primary">
                Book Your Event Now
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

export default Home
