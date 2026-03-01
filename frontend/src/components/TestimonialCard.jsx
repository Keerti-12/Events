import { motion } from 'framer-motion'
import { FaStar, FaQuoteLeft } from 'react-icons/fa'

const TestimonialCard = ({ testimonial, index = 0 }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`${i < rating ? 'text-gold' : 'text-dark-600'}`}
      />
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card relative"
    >
      {/* Quote Icon */}
      <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-gold/10" />

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {renderStars(testimonial.rating)}
      </div>

      {/* Content */}
      <p className="text-dark-300 leading-relaxed mb-6 italic">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        {testimonial.client_image ? (
          <img
            src={testimonial.client_image}
            alt={testimonial.client_name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gold"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
            <span className="text-gold font-semibold">
              {testimonial.client_name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <h4 className="font-semibold text-white">
            {testimonial.client_name}
          </h4>
          {testimonial.client_title && (
            <p className="text-sm text-gold">
              {testimonial.client_title}
            </p>
          )}
          {testimonial.event_type && (
            <p className="text-xs text-dark-500">
              {testimonial.event_type}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default TestimonialCard
