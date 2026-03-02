# 🎧 Lucky Event DJ

A modern, full-stack DJ event management website built with **Django REST Framework** and **React + Vite**. Features a premium dark theme with gold accents, responsive design, and deployment-ready configuration.

![Dark Theme](https://img.shields.io/badge/Theme-Dark%20%2B%20Gold-D4AF37)
![Django](https://img.shields.io/badge/Django-4.2+-092E20?logo=django)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)

## ✨ Features

### Frontend
- 🎨 **Premium Dark + Gold Theme** - Cinematic DJ vibe
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Fast Loading** - Vite build with lazy loading
- 🎭 **Smooth Animations** - Framer Motion powered
- 📝 **Contact & Booking Forms** - With validation
- 🖼️ **Gallery with Lightbox** - Filterable by category
- 💬 **WhatsApp Integration** - Floating chat button
- 🔍 **SEO Optimized** - Meta tags with react-helmet

### Backend
- 🔐 **JWT Authentication** - Secure admin access
- 📡 **RESTful API** - Django REST Framework
- 🖼️ **Image Optimization** - Pillow integration
- ✉️ **Email Notifications** - Contact & booking alerts
- 📊 **Admin Dashboard** - Rich text editor, status badges
- 🔄 **CORS Ready** - Cross-origin support

## 📁 Project Structure

```
lucky-event-dj/
├── backend/
│   ├── api/                    # Django app
│   │   ├── models.py          # Database models
│   │   ├── serializers.py     # DRF serializers
│   │   ├── views.py           # API viewsets
│   │   ├── urls.py            # API routes
│   │   └── admin.py           # Admin configuration
│   ├── luckyevent/            # Django project
│   │   ├── settings.py        # Project settings
│   │   ├── urls.py            # Root URLs
│   │   └── wsgi.py            # WSGI entry
│   ├── media/                 # Uploaded files
│   ├── static/                # Static assets
│   ├── requirements.txt       # Python dependencies
│   ├── Dockerfile             # Production container
│   ├── Procfile              # Heroku/Railway
│   └── render.yaml           # Render deployment
│
├── frontend/
│   ├── public/                # Static public files
│   ├── src/
│   │   ├── assets/           # Images, fonts
│   │   ├── components/       # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── GalleryCard.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   └── ...
│   │   ├── hooks/            # Custom hooks
│   │   ├── pages/            # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Booking.jsx
│   │   ├── services/         # API services
│   │   ├── App.jsx           # Root component
│   │   └── main.jsx          # Entry point
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── vercel.json           # Vercel deployment
│   └── netlify.toml          # Netlify deployment
│
└── docker-compose.yml         # Local development
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (or use SQLite for development)

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment
copy .env.example .env  # Windows
# cp .env.example .env  # macOS/Linux

# Edit .env with your settings
# Set USE_SQLITE=True for quick development

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Configure environment  
copy .env.example .env  # Windows
# cp .env.example .env  # macOS/Linux

# Start development server
npm run dev
```

### Using Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🔑 Environment Variables

### Backend (.env)

```env
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (PostgreSQL)
DATABASE_URL=postgres://user:pass@localhost:5432/luckyevent
# Or use SQLite
USE_SQLITE=True

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Email (SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=Lucky Event DJ <noreply@luckyeventdj.com>
ADMIN_EMAIL=admin@luckyeventdj.com

# Media Storage (Cloudinary)
CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>
CLOUDINARY_MEDIA_TAG=luckyevent
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000/api
VITE_WHATSAPP_NUMBER=15551234567
```

## 📡 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services/` | List all services |
| GET | `/api/services/featured/` | Featured services |
| GET | `/api/gallery/` | Gallery images |
| GET | `/api/gallery/categories/` | Gallery categories |
| GET | `/api/testimonials/` | Approved testimonials |
| POST | `/api/contact/` | Submit contact form |
| POST | `/api/booking/` | Submit booking request |
| GET | `/api/settings/` | Site settings |

### Admin Endpoints (JWT Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/token/` | Get JWT tokens |
| POST | `/api/token/refresh/` | Refresh access token |
| GET | `/api/admin/inquiries/` | List contact inquiries |
| GET | `/api/admin/bookings/` | List booking requests |

## 🎨 Theme Customization

Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  gold: {
    DEFAULT: '#D4AF37',
    light: '#F4E5B2',
    dark: '#B8860B',
  },
  dark: {
    DEFAULT: '#0a0f1a',
    secondary: '#0f172a',
    card: '#1e293b',
  }
}
```

## 🚢 Deployment

### Backend on Render

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Configure environment variables
5. Deploy!

Or use the `render.yaml` blueprint for one-click deployment.

### Frontend on Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Frontend on Netlify

1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

## 📋 Admin Dashboard

Access the Django admin at `/admin/` with your superuser credentials.

Features:
- 📸 Image preview in list views
- 🏷️ Status badges (colored indicators)
- ✏️ Rich text editing with CKEditor
- 📧 Email notification settings
- 🔍 Search and filtering

## 🧪 Development Commands

```bash
# Backend
python manage.py makemigrations  # Create migrations
python manage.py migrate         # Apply migrations
python manage.py collectstatic   # Collect static files
python manage.py test            # Run tests

# Frontend
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎯 Adding Sample Data

```python
# In Django shell: python manage.py shell

from api.models import Service, Gallery, Testimonial

# Create services
Service.objects.create(
    name="Wedding DJ",
    description="Complete wedding entertainment",
    price=1500.00,
    is_featured=True
)

# Create gallery items
Gallery.objects.create(
    title="Beach Wedding",
    category="weddings",
    is_featured=True
)

# Create testimonials
Testimonial.objects.create(
    client_name="John Doe",
    event_type="Wedding",
    content="Amazing DJ! Made our night unforgettable!",
    rating=5,
    is_approved=True
)
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

Built with ❤️ for DJs who rock the party! 🎉
