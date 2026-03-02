import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaTiktok, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Book Now', path: '/booking' },
  ]

  const services = [
    'Wedding DJ',
    'Corporate Events',
    'Private Parties',
    'Club Nights',
    'Festival DJ',
    'Sound & Lighting',
  ]

  const socialLinks = [
    { icon: FaFacebookF, url: '#', label: 'Facebook' },
    { icon: FaInstagram, url: '#', label: 'Instagram' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaYoutube, url: '#', label: 'YouTube' },
    { icon: FaTiktok, url: '#', label: 'TikTok' },
  ]

  return (
    <footer className="bg-dark-900 border-t border-dark-800">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-display font-bold gradient-text">
                Lucky Event DJ
              </span>
            </Link>
            <p className="text-dark-400 text-sm leading-relaxed">
              Premium DJ services for weddings, corporate events, and private parties. 
              Creating unforgettable musical experiences since 2010.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-dark-400 hover:bg-gold hover:text-dark-900 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-dark-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-white mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-dark-400">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-semibold text-white mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-gold mt-1 flex-shrink-0" />
                <span className="text-dark-400 text-sm">
                  123 Music Street, Entertainment District<br />
                  Los Angeles, CA 90001
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-gold flex-shrink-0" />
                <a href="tel:+15551234567" className="text-dark-400 hover:text-gold transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-gold flex-shrink-0" />
                <a href="mailto:info@luckyeventdj.com" className="text-dark-400 hover:text-gold transition-colors">
                  info@luckyeventdj.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-dark-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dark-500 text-sm">
              © {currentYear} Lucky Event DJ. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-dark-500 hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-dark-500 hover:text-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
