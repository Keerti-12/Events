import { Helmet } from 'react-helmet-async'

const SEO = ({
  title = '',
  description = 'Lucky Event DJ & Decoration - Premium DJ services and event decoration for weddings, corporate events, and private parties. Professional sound, lighting, and stunning décor.',
  keywords = 'DJ, event DJ, wedding DJ, party DJ, corporate events, event decoration, wedding decoration, party decoration, event planning, music entertainment, event styling',
  image = '/og-image.jpg',
  url = '',
}) => {
  const siteTitle = 'Lucky Event DJ & Decoration'
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
      <meta name="author" content="Lucky Event DJ & Decoration" />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}

export default SEO
