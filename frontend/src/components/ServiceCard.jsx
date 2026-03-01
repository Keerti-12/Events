import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ServiceCard = ({ service, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group card hover:transform hover:-translate-y-2 transition-all duration-300"
    >
      {/* Image */}
      {service.image && (
        <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
          {service.is_featured && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-gold text-dark-900 text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
        </div>
      )}

      {/* Icon */}
      {service.icon && !service.image && (
        <div className="w-16 h-16 mb-6 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
          <span className="text-3xl text-gold">{service.icon}</span>
        </div>
      )}

      {/* Content */}
      <h3 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-gold transition-colors">
        {service.title}
      </h3>
      <p className="text-dark-400 text-sm leading-relaxed mb-4">
        {service.short_description}
      </p>

      {/* Price Range */}
      {service.price_range && (
        <p className="text-gold font-semibold mb-4">
          {service.price_range}
        </p>
      )}

      {/* Link */}
      <Link
        to={`/services#${service.slug}`}
        className="inline-flex items-center text-gold text-sm font-medium group-hover:underline"
      >
        Learn More
        <svg
          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </motion.div>
  )
}

export default ServiceCard
