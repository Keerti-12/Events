import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = '',
  description = 'Lucky Event DJ - Premium DJ services for weddings, corporate events, and private parties. Professional sound, lighting, and entertainment.',
  keywords = 'DJ, event DJ, wedding DJ, party DJ, corporate events, music entertainment',
  image = '/og-image.jpg',
  url = '',
}) => {
  const siteTitle = 'Lucky Event DJ'
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {url && <meta property="og:url" content={url} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Lucky Event DJ" />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}

export default SEO
