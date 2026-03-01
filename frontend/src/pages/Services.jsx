import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import ServiceCard from '../components/ServiceCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { getServices } from '../services/api'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices()
        setServices(response.data)
      } catch (error) {
        console.error('Error fetching services:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  // Fallback services if API returns empty
  const defaultServices = [
    {
      id: 1,
      title: 'Wedding DJ',
      slug: 'wedding-dj',
      short_description: 'Make your special day unforgettable with our premium wedding DJ services. Custom playlists, elegant transitions, and romantic ambiance.',
      price_range: '$1,500 - $3,500',
      is_featured: true,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 2,
      title: 'Corporate Events',
      slug: 'corporate-events',
      short_description: 'Professional entertainment for corporate gatherings, product launches, galas, and company celebrations.',
      price_range: '$1,000 - $5,000',
      is_featured: true,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 3,
      title: 'Private Parties',
      slug: 'private-parties',
      short_description: 'Birthday parties, anniversaries, graduation celebrations - we bring the energy and perfect soundtrack.',
      price_range: '$500 - $2,000',
      is_featured: true,
      image: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 4,
      title: 'Club Nights',
      slug: 'club-nights',
      short_description: 'High-energy performances for nightclubs and bars. House, EDM, Hip-Hop, and more genres.',
      price_range: '$800 - $3,000',
      is_featured: false,
      image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 5,
      title: 'Festival DJ',
      slug: 'festival-dj',
      short_description: 'Large-scale festival performances with premium sound systems and lighting production.',
      price_range: '$5,000+',
      is_featured: false,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 6,
      title: 'Sound & Lighting',
      slug: 'sound-lighting',
      short_description: 'Full audio-visual production services including PA systems, LED walls, and intelligent lighting.',
      price_range: '$1,000 - $10,000',
      is_featured: false,
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
  ]

  const displayServices = services.length > 0 ? services : defaultServices

  const packages = [
    {
      name: 'Essential',
      price: '$500',
      description: 'Perfect for small gatherings',
      features: ['4 Hours DJ Service', 'Basic Sound System', 'Wireless Microphone', 'Playlist Consultation'],
      popular: false,
    },
    {
      name: 'Premium',
      price: '$1,500',
      description: 'Our most popular package',
      features: ['6 Hours DJ Service', 'Premium Sound System', 'Dual Microphones', 'Custom Playlist', 'Basic Lighting', 'MC Services'],
      popular: true,
    },
    {
      name: 'Luxury',
      price: '$3,500',
      description: 'The complete experience',
      features: ['8+ Hours DJ Service', 'Premium Sound System', 'Full Lighting Package', 'LED Screens', 'Custom Playlist', 'MC Services', 'Backup Equipment', 'Photo Booth'],
      popular: false,
    },
  ]

  return (
    <>
      <SEO
        title="Services"
        description="Explore our professional DJ services for weddings, corporate events, private parties, and more. Premium sound and lighting packages available."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-dark-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
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
            <span className="text-gold font-medium mb-4 block">Our Services</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Professional DJ <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-dark-300">
              From intimate gatherings to grand celebrations, we have the perfect 
              entertainment solution for your event.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-dark-900">
        <div className="container-custom">
          <SectionHeader
            title="What We"
            goldText="Offer"
            subtitle="Comprehensive DJ and entertainment services tailored to your needs"
          />

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24 bg-dark-950">
        <div className="container-custom">
          <SectionHeader
            title="Our"
            goldText="Packages"
            subtitle="Choose the perfect package for your event"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`card relative ${pkg.popular ? 'border-gold ring-1 ring-gold' : ''}`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-dark-900 text-xs font-bold rounded-full">
                    Most Popular
                  </span>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-white">{pkg.name}</h3>
                  <div className="text-4xl font-bold gradient-text my-4">{pkg.price}</div>
                  <p className="text-dark-400 text-sm">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-dark-300 text-sm">
                      <span className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-gold text-xs">✓</span>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/booking"
                  className={`w-full ${pkg.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Quote Section */}
      <section className="py-24 bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Need a <span className="gradient-text">Custom Package?</span>
            </h2>
            <p className="text-xl text-dark-300 mb-8">
              Every event is unique. Contact us to create a customized entertainment 
              package that perfectly fits your vision and budget.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="btn-primary">
                Request Custom Quote
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Services
