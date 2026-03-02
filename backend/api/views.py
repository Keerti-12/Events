"""
Views for Lucky Event DJ API.
"""

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework import viewsets, generics, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend

from .models import Service, Gallery, Testimonial, ContactInquiry, BookingRequest, SiteSettings
from .serializers import (
    ServiceSerializer, ServiceListSerializer,
    GallerySerializer, GalleryListSerializer,
    TestimonialSerializer, TestimonialListSerializer,
    ContactInquirySerializer, ContactInquiryAdminSerializer,
    BookingRequestSerializer, BookingRequestAdminSerializer,
    SiteSettingsSerializer,
)


class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing services.
    
    list: Get all active services
    retrieve: Get a specific service by ID or slug
    featured: Get featured services only
    """
    queryset = Service.objects.filter(is_active=True)
    permission_classes = [AllowAny]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['order', 'title', 'created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return ServiceListSerializer
        return ServiceSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured services only."""
        featured = self.queryset.filter(is_featured=True)
        serializer = ServiceListSerializer(featured, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def debug(self, request):
        """Debug endpoint to check all services."""
        all_services = Service.objects.all()
        active_services = Service.objects.filter(is_active=True)
        return Response({
            'total_count': all_services.count(),
            'active_count': active_services.count(),
            'all_services': [
                {'id': s.id, 'title': s.title, 'is_active': s.is_active}
                for s in all_services
            ]
        })


class GalleryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing gallery items.
    
    list: Get all active gallery items (paginated)
    retrieve: Get a specific gallery item
    featured: Get featured gallery items
    by_category: Filter by category
    """
    queryset = Gallery.objects.filter(is_active=True)
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'media_type', 'is_featured']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['event_date', 'order', 'created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return GalleryListSerializer
        return GallerySerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured gallery items only."""
        featured = self.queryset.filter(is_featured=True)[:8]
        serializer = GalleryListSerializer(featured, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Get available categories with counts."""
        categories = []
        for code, name in Gallery.CATEGORY_CHOICES:
            count = self.queryset.filter(category=code).count()
            if count > 0:
                categories.append({'code': code, 'name': name, 'count': count})
        return Response(categories)


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing testimonials.
    
    list: Get all active testimonials
    retrieve: Get a specific testimonial
    featured: Get featured testimonials
    """
    queryset = Testimonial.objects.filter(is_active=True)
    permission_classes = [AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['order', 'rating', 'created_at']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return TestimonialListSerializer
        return TestimonialSerializer
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured testimonials only."""
        featured = self.queryset.filter(is_featured=True)[:6]
        serializer = TestimonialListSerializer(featured, many=True)
        return Response(serializer.data)


class ContactInquiryCreateView(generics.CreateAPIView):
    """
    API endpoint for submitting contact inquiries.
    
    POST: Submit a new contact inquiry
    """
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        inquiry = serializer.save()
        # Send email notification to admin
        self._send_admin_notification(inquiry)
    
    def _send_admin_notification(self, inquiry):
        """Send email notification to admin about new contact inquiry."""
        try:
            subject = f"New Contact Inquiry: {inquiry.subject}"
            message = f"""
New contact inquiry received:

Name: {inquiry.name}
Email: {inquiry.email}
Phone: {inquiry.phone or 'Not provided'}
Subject: {inquiry.subject}

Message:
{inquiry.message}

---
Received at: {inquiry.created_at}
            """
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=True,
            )
        except Exception as e:
            # Log error but don't fail the request
            print(f"Failed to send email notification: {e}")


class BookingRequestCreateView(generics.CreateAPIView):
    """
    API endpoint for submitting booking requests.
    
    POST: Submit a new booking request
    """
    queryset = BookingRequest.objects.all()
    serializer_class = BookingRequestSerializer
    permission_classes = [AllowAny]
    
    def perform_create(self, serializer):
        booking = serializer.save()
        # Send email notification to admin
        self._send_admin_notification(booking)
    
    def _send_admin_notification(self, booking):
        """Send email notification to admin about new booking request."""
        try:
            subject = f"New Booking Request: {booking.get_event_type_display()} on {booking.event_date}"
            message = f"""
New booking request received:

CLIENT INFORMATION:
Name: {booking.name}
Email: {booking.email}
Phone: {booking.phone}

EVENT DETAILS:
Type: {booking.get_event_type_display()}
Date: {booking.event_date}
Time: {booking.event_time or 'Not specified'}
Duration: {booking.event_duration or 'Not specified'}
Venue: {booking.venue_name or 'Not specified'}
Address: {booking.venue_address or 'Not specified'}
Guest Count: {booking.guest_count or 'Not specified'}

BUDGET & REQUIREMENTS:
Budget: {booking.get_budget_display()}
Services Needed: {booking.services_needed or 'Not specified'}
Special Requests: {booking.special_requests or 'None'}

Additional Message:
{booking.message or 'None'}

---
Received at: {booking.created_at}
            """
            send_mail(
                subject=subject,
                message=message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ADMIN_EMAIL],
                fail_silently=True,
            )
        except Exception as e:
            # Log error but don't fail the request
            print(f"Failed to send email notification: {e}")


class SiteSettingsView(APIView):
    """
    API endpoint for retrieving site settings.
    
    GET: Get site-wide settings (contact info, social links, etc.)
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        settings = SiteSettings.get_settings()
        serializer = SiteSettingsSerializer(settings)
        return Response(serializer.data)


# Admin ViewSets (protected)
class ContactInquiryAdminViewSet(viewsets.ModelViewSet):
    """Admin ViewSet for managing contact inquiries."""
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquiryAdminSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status']
    search_fields = ['name', 'email', 'subject', 'message']
    ordering_fields = ['created_at', 'status']


class BookingRequestAdminViewSet(viewsets.ModelViewSet):
    """Admin ViewSet for managing booking requests."""
    queryset = BookingRequest.objects.all()
    serializer_class = BookingRequestAdminSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'event_type', 'budget']
    search_fields = ['name', 'email', 'phone', 'venue_name']
    ordering_fields = ['created_at', 'event_date', 'status']
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get booking statistics."""
        from django.db.models import Count
        stats = {
            'total': self.queryset.count(),
            'pending': self.queryset.filter(status='pending').count(),
            'confirmed': self.queryset.filter(status='confirmed').count(),
            'by_event_type': list(
                self.queryset.values('event_type').annotate(count=Count('id'))
            ),
        }
        return Response(stats)
