import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import SectionHeader from '../components/SectionHeader'
import GalleryCard from '../components/GalleryCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { getGallery, getGalleryCategories } from '../services/api'

const Gallery = () => {
  const [gallery, setGallery] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getGalleryCategories()
        // Handle paginated responses (data.results) or direct arrays (data)
        const categoriesData = response.data?.results || response.data || []
        const categoriesArray = Array.isArray(categoriesData) ? categoriesData : []
        setCategories([{ code: 'all', name: 'All', count: 0 }, ...categoriesArray])
      } catch (error) {
        console.error('Error fetching categories:', error)
        // Use default categories
        setCategories([
          { code: 'all', name: 'All' },
          { code: 'wedding', name: 'Wedding' },
          { code: 'corporate', name: 'Corporate' },
          { code: 'birthday', name: 'Birthday' },
          { code: 'club', name: 'Club Night' },
        ])
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true)
      try {
        const params = { page }
        if (activeCategory !== 'all') {
          params.category = activeCategory
        }
        const response = await getGallery(params)
        // Handle paginated responses (data.results) or direct arrays (data)
        const galleryData = response.data?.results || response.data || []
        const galleryArray = Array.isArray(galleryData) ? galleryData : []
        
        if (page === 1) {
          setGallery(galleryArray)
        } else {
          setGallery(prev => [...prev, ...galleryArray])
        }
        
        setHasMore(response.data?.next !== null && response.data?.next !== undefined)
      } catch (error) {
        console.error('Error fetching gallery:', error)
        // Use default gallery items
        setGallery(defaultGallery)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [activeCategory, page])

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setPage(1)
  }

  const loadMore = () => {
    setPage(prev => prev + 1)
  }

  // Default gallery items
  const defaultGallery = [
    {
      id: 1,
      title: 'Summer Wedding',
      description: 'Beautiful outdoor wedding ceremony',
      media_type: 'image',
      category: 'wedding',
      category_display: 'Wedding',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_featured: true,
    },
    {
      id: 2,
      title: 'Corporate Gala',
      description: 'Annual company celebration',
      media_type: 'image',
      category: 'corporate',
      category_display: 'Corporate Event',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_featured: false,
    },
    {
      id: 3,
      title: 'Club Night',
      description: 'Weekend party at downtown club',
      media_type: 'image',
      category: 'club',
      category_display: 'Club Night',
      image: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_featured: true,
    },
    {
      id: 4,
      title: 'Birthday Bash',
      description: '30th birthday celebration',
      media_type: 'image',
      category: 'birthday',
      category_display: 'Birthday Party',
      image: 'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_featured: false,
    },
    {
      id: 5,
      title: 'Garden Wedding',
      description: 'Romantic garden reception',
      media_type: 'image',
      category: 'wedding',
      category_display: 'Wedding',
      image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_featured: true,
    },
    {
      id: 6,
      title: 'Product Launch',
      description: 'Tech company product unveiling',
      media_type: 'image',
      category: 'corporate',
      category_display: 'Corporate Event',
      image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_featured: false,
    },
    {
      id: 7,
      title: 'EDM Night',
      description: 'Electronic music showcase',
      media_type: 'video',
      category: 'club',
      category_display: 'Club Night',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      is_featured: false,
    },
    {
      id: 8,
      title: 'Sweet 16',
      description: 'Sweet sixteen celebration',
      media_type: 'image',
      category: 'birthday',
      category_display: 'Birthday Party',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_featured: false,
    },
    {
      id: 9,
      title: 'Beach Wedding',
      description: 'Sunset ceremony on the beach',
      media_type: 'image',
      category: 'wedding',
      category_display: 'Wedding',
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_featured: false,
    },
  ]

  const displayGallery = gallery.length > 0 ? gallery : defaultGallery
  const filteredGallery = activeCategory === 'all' 
    ? displayGallery 
    : displayGallery.filter(item => item.category === activeCategory)

  return (
    <>
      <SEO
        title="Gallery"
        description="Browse our portfolio of weddings, corporate events, private parties, and more. See the magic we create at every event."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-dark-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
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
            <span className="text-gold font-medium mb-4 block">Our Portfolio</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Event <span className="gradient-text">Gallery</span>
            </h1>
            <p className="text-xl text-dark-300">
              A showcase of our most memorable events and performances
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-dark-900">
        <div className="container-custom">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.code}
                onClick={() => handleCategoryChange(category.code)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.code
                    ? 'bg-gold text-dark-900'
                    : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading && page === 1 ? (
            <LoadingSpinner />
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredGallery.map((item, index) => (
                  <GalleryCard key={item.id} item={item} index={index} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && gallery.length > 0 && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="btn-secondary"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}

              {/* Empty State */}
              {filteredGallery.length === 0 && !loading && (
                <div className="text-center py-16">
                  <p className="text-dark-400 text-lg">No items found in this category.</p>
                </div>
              )}
            </>
          )}
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
              Want Your Event in <span className="gradient-text">Our Gallery?</span>
            </h2>
            <p className="text-xl text-dark-300 mb-8">
              Let us create an unforgettable experience for your next event.
            </p>
            <a href="/booking" className="btn-primary">
              Book Your Event
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Gallery
