"""
URL configuration for Lucky Event DJ project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


def api_root(request):
    """Root endpoint with interactive API information."""
    html = '''
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lucky Event DJ API</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #0a0f1a 0%, #1a1f2e 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
            }
            .container {
                text-align: center;
                padding: 3rem;
                max-width: 600px;
            }
            .logo {
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            h1 {
                font-size: 2.5rem;
                background: linear-gradient(135deg, #D4AF37, #F4E5B2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 0.5rem;
            }
            .version {
                color: #D4AF37;
                font-size: 1rem;
                margin-bottom: 2rem;
            }
            .status {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(34, 197, 94, 0.2);
                color: #22c55e;
                padding: 0.5rem 1rem;
                border-radius: 9999px;
                font-size: 0.9rem;
                margin-bottom: 2.5rem;
            }
            .status-dot {
                width: 8px;
                height: 8px;
                background: #22c55e;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            .endpoints {
                display: grid;
                gap: 1rem;
                margin-bottom: 2rem;
            }
            .endpoint {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 12px;
                padding: 1rem 1.5rem;
                text-decoration: none;
                color: #fff;
                transition: all 0.3s ease;
            }
            .endpoint:hover {
                background: rgba(212, 175, 55, 0.1);
                border-color: #D4AF37;
                transform: translateX(5px);
            }
            .endpoint-info {
                text-align: left;
            }
            .endpoint-name {
                font-weight: 600;
                font-size: 1.1rem;
                color: #D4AF37;
            }
            .endpoint-desc {
                font-size: 0.85rem;
                color: #94a3b8;
                margin-top: 0.25rem;
            }
            .endpoint-arrow {
                color: #D4AF37;
                font-size: 1.5rem;
            }
            .footer {
                color: #64748b;
                font-size: 0.85rem;
            }
            .footer a {
                color: #D4AF37;
                text-decoration: none;
            }
            .footer a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">🎧</div>
            <h1>Lucky Event DJ</h1>
            <p class="version">API v1.0.0</p>
            <div class="status">
                <span class="status-dot"></span>
                Server Running
            </div>
            
            <div class="endpoints">
                <a href="/admin/" class="endpoint">
                    <div class="endpoint-info">
                        <div class="endpoint-name">🔐 Admin Dashboard</div>
                        <div class="endpoint-desc">Manage services, bookings, and content</div>
                    </div>
                    <span class="endpoint-arrow">→</span>
                </a>
                
                <a href="/api/" class="endpoint">
                    <div class="endpoint-info">
                        <div class="endpoint-name">📡 API Endpoints</div>
                        <div class="endpoint-desc">Browse REST API resources</div>
                    </div>
                    <span class="endpoint-arrow">→</span>
                </a>
                
                <a href="/api/docs/" class="endpoint">
                    <div class="endpoint-info">
                        <div class="endpoint-name">📚 API Documentation</div>
                        <div class="endpoint-desc">Interactive Swagger UI</div>
                    </div>
                    <span class="endpoint-arrow">→</span>
                </a>
                
                <a href="/api/services/" class="endpoint">
                    <div class="endpoint-info">
                        <div class="endpoint-name">🎵 Services</div>
                        <div class="endpoint-desc">DJ packages and offerings</div>
                    </div>
                    <span class="endpoint-arrow">→</span>
                </a>
                
                <a href="/api/gallery/" class="endpoint">
                    <div class="endpoint-info">
                        <div class="endpoint-name">📸 Gallery</div>
                        <div class="endpoint-desc">Event photos and media</div>
                    </div>
                    <span class="endpoint-arrow">→</span>
                </a>
                
                <a href="/api/testimonials/" class="endpoint">
                    <div class="endpoint-info">
                        <div class="endpoint-name">⭐ Testimonials</div>
                        <div class="endpoint-desc">Client reviews and feedback</div>
                    </div>
                    <span class="endpoint-arrow">→</span>
                </a>
            </div>
            
            <p class="footer">
                Frontend: <a href="http://localhost:5173" target="_blank">localhost:5173</a>
            </p>
        </div>
    </body>
    </html>
    '''
    return HttpResponse(html)


urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    
    # CKEditor URLs
    path('ckeditor/', include('ckeditor_uploader.urls')),
    
    # API Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Customize admin site
admin.site.site_header = "Lucky Event DJ Admin"
admin.site.site_title = "Lucky Event DJ"
admin.site.index_title = "Welcome to Lucky Event DJ Administration"
