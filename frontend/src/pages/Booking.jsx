import { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaCalendarAlt, FaMusic, FaCheck } from 'react-icons/fa'
import SEO from '../components/SEO'
import { submitBooking } from '../services/api'

const Booking = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Contact Info
    name: '',
    email: '',
    phone: '',
    // Event Details
    event_type: '',
    event_date: '',
    event_time: '',
    event_duration: '',
    venue_name: '',
    venue_address: '',
    guest_count: '',
    // Budget & Requirements
    budget: '',
    services_needed: '',
    special_requests: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const eventTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'concert', label: 'Concert' },
    { value: 'club', label: 'Club Night' },
    { value: 'private', label: 'Private Party' },
    { value: 'festival', label: 'Festival' },
    { value: 'other', label: 'Other' },
  ]

  const budgetOptions = [
    { value: 'under_500', label: 'Under 500' },
    { value: '500_1000', label: '500 - 1,000' },
    { value: '1000_2000', label: '1,000 - 2,000' },
    { value: '2000_5000', label: '2,000 - 5,000' },
    { value: '5000_plus', label: '5,000+' },
    { value: 'flexible', label: 'Flexible / Discuss' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep = (currentStep) => {
    const newErrors = {}

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    }

    if (currentStep === 2) {
      if (!formData.event_type) newErrors.event_type = 'Event type is required'
      if (!formData.event_date) newErrors.event_date = 'Event date is required'
    }

    if (currentStep === 3) {
      if (!formData.budget) newErrors.budget = 'Budget is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(step)) return

    setLoading(true)
    try {
      // Clean up form data - convert empty strings to null for optional fields
      const cleanedData = {
        ...formData,
        guest_count: formData.guest_count ? parseInt(formData.guest_count, 10) : null,
        event_time: formData.event_time || null,
      }
      await submitBooking(cleanedData)
      setSubmitted(true)
      toast.success('Booking request submitted successfully!')
    } catch (error) {
      console.error('Error submitting booking:', error)
      if (error.response?.data) {
        console.error('Server validation errors:', error.response.data)
      }
      toast.error('Failed to submit booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <>
        <SEO title="Booking Submitted" />
        <section className="pt-32 pb-24 bg-dark-950 min-h-screen">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center card"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <FaCheck className="text-4xl text-green-500" />
              </div>
              <h1 className="text-3xl font-display font-bold text-white mb-4">
                Booking Request Received!
              </h1>
              <p className="text-dark-300 mb-8">
                Thank you for your booking request! We'll review your details and 
                get back to you within 24 hours to confirm availability and discuss 
                your event.
              </p>
              <a href="/" className="btn-primary">
                Return Home
              </a>
            </motion.div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Book Your Event"
        description="Book Lucky Event DJ for your wedding, corporate event, or private party. Get a custom quote today."
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-dark-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
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
            <span className="text-gold font-medium mb-4 block">Ready to Party?</span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Book Your <span className="gradient-text">Event</span>
            </h1>
            <p className="text-xl text-dark-300">
              Fill out the form below and we'll get back to you with a custom quote
            </p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-24 bg-dark-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      step >= num
                        ? 'bg-gold text-dark-900'
                        : 'bg-dark-700 text-dark-400'
                    }`}
                  >
                    {step > num ? <FaCheck /> : num}
                  </div>
                  {num < 3 && (
                    <div
                      className={`w-16 md:w-24 h-1 mx-2 transition-all duration-300 ${
                        step > num ? 'bg-gold' : 'bg-dark-700'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Labels */}
            <div className="flex justify-between mb-8 text-sm">
              <span className={step >= 1 ? 'text-gold' : 'text-dark-500'}>Contact Info</span>
              <span className={step >= 2 ? 'text-gold' : 'text-dark-500'}>Event Details</span>
              <span className={step >= 3 ? 'text-gold' : 'text-dark-500'}>Budget & Extras</span>
            </div>

            <div className="card">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Contact Info */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-display font-bold text-white mb-6">
                      Your Contact Information
                    </h2>

                    <div>
                      <label htmlFor="name" className="label">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="label">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="label">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                          placeholder="+1 (555) 123-4567"
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Event Details */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-display font-bold text-white mb-6">
                      Event Details
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="event_type" className="label">Event Type *</label>
                        <select
                          id="event_type"
                          name="event_type"
                          value={formData.event_type}
                          onChange={handleChange}
                          className={`input-field ${errors.event_type ? 'border-red-500' : ''}`}
                        >
                          <option value="">Select event type</option>
                          {eventTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                        {errors.event_type && <p className="text-red-500 text-sm mt-1">{errors.event_type}</p>}
                      </div>
                      <div>
                        <label htmlFor="event_date" className="label">Event Date *</label>
                        <input
                          type="date"
                          id="event_date"
                          name="event_date"
                          value={formData.event_date}
                          onChange={handleChange}
                          className={`input-field ${errors.event_date ? 'border-red-500' : ''}`}
                        />
                        {errors.event_date && <p className="text-red-500 text-sm mt-1">{errors.event_date}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="event_time" className="label">Event Time</label>
                        <input
                          type="time"
                          id="event_time"
                          name="event_time"
                          value={formData.event_time}
                          onChange={handleChange}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label htmlFor="event_duration" className="label">Duration</label>
                        <input
                          type="text"
                          id="event_duration"
                          name="event_duration"
                          value={formData.event_duration}
                          onChange={handleChange}
                          className="input-field"
                          placeholder="e.g., 4 hours"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="venue_name" className="label">Venue Name</label>
                      <input
                        type="text"
                        id="venue_name"
                        name="venue_name"
                        value={formData.venue_name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g., Grand Ballroom Hotel"
                      />
                    </div>

                    <div>
                      <label htmlFor="venue_address" className="label">Venue Address</label>
                      <textarea
                        id="venue_address"
                        name="venue_address"
                        value={formData.venue_address}
                        onChange={handleChange}
                        rows={2}
                        className="input-field resize-none"
                        placeholder="Full address of the venue"
                      />
                    </div>

                    <div>
                      <label htmlFor="guest_count" className="label">Expected Guest Count</label>
                      <input
                        type="number"
                        id="guest_count"
                        name="guest_count"
                        value={formData.guest_count}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="e.g., 150"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Budget & Extras */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-display font-bold text-white mb-6">
                      Budget & Requirements
                    </h2>

                    <div>
                      <label htmlFor="budget" className="label">Budget Range *</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`input-field ${errors.budget ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select budget range</option>
                        {budgetOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                    </div>

                    <div>
                      <label htmlFor="services_needed" className="label">Services Needed</label>
                      <textarea
                        id="services_needed"
                        name="services_needed"
                        value={formData.services_needed}
                        onChange={handleChange}
                        rows={3}
                        className="input-field resize-none"
                        placeholder="e.g., DJ, sound system, lighting, MC services..."
                      />
                    </div>

                    <div>
                      <label htmlFor="special_requests" className="label">Special Requests</label>
                      <textarea
                        id="special_requests"
                        name="special_requests"
                        value={formData.special_requests}
                        onChange={handleChange}
                        rows={3}
                        className="input-field resize-none"
                        placeholder="Any specific songs, themes, or requirements?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="label">Additional Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="input-field resize-none"
                        placeholder="Anything else you'd like us to know?"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn-secondary"
                    >
                      Previous
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="btn-primary"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary"
                    >
                      {loading ? 'Submitting...' : 'Submit Booking'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Booking
