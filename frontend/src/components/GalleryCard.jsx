import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlay, FaTimes } from 'react-icons/fa'

const GalleryCard = ({ item, index = 0 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getVideoId = (url) => {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/)
    return match ? match[1] : null
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image/Thumbnail */}
        <img
          src={item.thumbnail || item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {item.media_type === 'video' ? (
            <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center">
              <FaPlay className="text-dark-900 text-xl ml-1" />
            </div>
          ) : (
            <div className="text-center p-4">
              <h4 className="text-white font-semibold mb-1">{item.title}</h4>
              <p className="text-gold text-sm">{item.category_display}</p>
            </div>
          )}
        </div>

        {/* Featured Badge */}
        {item.is_featured && (
          <span className="absolute top-3 left-3 px-2 py-1 bg-gold text-dark-900 text-xs font-semibold rounded">
            Featured
          </span>
        )}

        {/* Video Icon */}
        {item.media_type === 'video' && (
          <span className="absolute top-3 right-3 w-8 h-8 bg-dark-900/80 rounded-full flex items-center justify-center">
            <FaPlay className="text-gold text-xs" />
          </span>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/95"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-12 right-0 text-white hover:text-gold transition-colors"
              >
                <FaTimes size={24} />
              </button>

              {/* Content */}
              {item.media_type === 'video' && item.video_url ? (
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${getVideoId(item.video_url)}?autoplay=1`}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                />
              )}

              {/* Caption */}
              <div className="mt-4 text-center">
                <h4 className="text-xl font-semibold text-white">{item.title}</h4>
                {item.description && (
                  <p className="text-dark-400 mt-2">{item.description}</p>
                )}
                {item.location && (
                  <p className="text-gold text-sm mt-2">{item.location}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default GalleryCard
