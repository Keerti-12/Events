"""
URL Configuration for Lucky Event DJ API.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from .views import (
    ServiceViewSet,
    GalleryViewSet,
    TestimonialViewSet,
    ContactInquiryCreateView,
    BookingRequestCreateView,
    SiteSettingsView,
    ContactInquiryAdminViewSet,
    BookingRequestAdminViewSet,
)

# Public API router
router = DefaultRouter()
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'gallery', GalleryViewSet, basename='gallery')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')

# Admin API router
admin_router = DefaultRouter()
admin_router.register(r'inquiries', ContactInquiryAdminViewSet, basename='admin-inquiry')
admin_router.register(r'bookings', BookingRequestAdminViewSet, basename='admin-booking')

urlpatterns = [
    # Public API endpoints
    path('', include(router.urls)),
    path('contact/', ContactInquiryCreateView.as_view(), name='contact-create'),
    path('booking/', BookingRequestCreateView.as_view(), name='booking-create'),
    path('settings/', SiteSettingsView.as_view(), name='site-settings'),
    
    # JWT Authentication
    path('auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    # Admin API endpoints
    path('admin/', include(admin_router.urls)),
]
