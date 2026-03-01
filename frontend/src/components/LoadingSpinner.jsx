import { motion } from 'framer-motion'

const LoadingSpinner = ({ fullScreen = false, size = 'default' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-12 h-12',
    large: 'w-16 h-16',
  }

  const spinner = (
    <motion.div
      className={`${sizeClasses[size]} border-4 border-dark-700 border-t-gold rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-950">
        <div className="text-center">
          {spinner}
          <p className="mt-4 text-dark-400 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  )
}

export default LoadingSpinner
