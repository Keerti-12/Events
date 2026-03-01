import { motion } from 'framer-motion'

const SectionHeader = ({ 
  title, 
  subtitle, 
  centered = true,
  goldText = '',
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      <h2 className="section-title">
        {title}{' '}
        {goldText && <span className="gradient-text">{goldText}</span>}
      </h2>
      {subtitle && (
        <p className="section-subtitle">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionHeader
