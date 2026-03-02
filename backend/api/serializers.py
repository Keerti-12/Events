"""
Serializers for Lucky Event DJ API.
"""

from rest_framework import serializers
from .models import Service, Gallery, Testimonial, ContactInquiry, BookingRequest, SiteSettings


class AbsoluteURLImageField(serializers.ImageField):
    """Custom ImageField that returns absolute URLs."""
    
    def to_representation(self, value):
        if not value:
            return None
        
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(value.url)
        return value.url


class ServiceSerializer(serializers.ModelSerializer):
    """Serializer for Service model."""
    image = AbsoluteURLImageField(read_only=True)
    
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'icon', 'image', 'price_range', 'is_featured', 'order',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class ServiceListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for Service list view."""
    image = AbsoluteURLImageField(read_only=True)
    
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'short_description',
            'icon', 'image', 'price_range', 'is_featured', 'order'
        ]


class GallerySerializer(serializers.ModelSerializer):
    """Serializer for Gallery model."""
    image = AbsoluteURLImageField(read_only=True)
    thumbnail = AbsoluteURLImageField(read_only=True)
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    media_type_display = serializers.CharField(source='get_media_type_display', read_only=True)
    
    class Meta:
        model = Gallery
        fields = [
            'id', 'title', 'description', 'media_type', 'media_type_display',
            'category', 'category_display', 'image', 'video_url', 'thumbnail',
            'event_date', 'location', 'is_featured', 'order',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class GalleryListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for Gallery list view."""
    image = AbsoluteURLImageField(read_only=True)
    thumbnail = AbsoluteURLImageField(read_only=True)
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Gallery
        fields = [
            'id', 'title', 'media_type', 'category', 'category_display',
            'image', 'video_url', 'thumbnail', 'is_featured'
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    """Serializer for Testimonial model."""
    client_image = AbsoluteURLImageField(read_only=True)
    
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_title', 'client_image',
            'event_type', 'event_date', 'content', 'rating',
            'is_featured', 'order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class TestimonialListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for Testimonial list view."""
    client_image = AbsoluteURLImageField(read_only=True)
    
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_title', 'client_image',
            'event_type', 'content', 'rating', 'is_featured'
        ]


class ContactInquirySerializer(serializers.ModelSerializer):
    """Serializer for ContactInquiry model - create only."""
    
    class Meta:
        model = ContactInquiry
        fields = ['id', 'name', 'email', 'phone', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
        extra_kwargs = {
            'phone': {'required': False, 'allow_blank': True},
        }


class ContactInquiryAdminSerializer(serializers.ModelSerializer):
    """Full serializer for admin use."""
    
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = ContactInquiry
        fields = '__all__'


class BookingRequestSerializer(serializers.ModelSerializer):
    """Serializer for BookingRequest model - create/view."""
    
    event_type_display = serializers.CharField(source='get_event_type_display', read_only=True)
    budget_display = serializers.CharField(source='get_budget_display', read_only=True)
    
    class Meta:
        model = BookingRequest
        fields = [
            'id', 'name', 'email', 'phone',
            'event_type', 'event_type_display', 'event_date', 'event_time',
            'event_duration', 'venue_name', 'venue_address', 'guest_count',
            'budget', 'budget_display', 'services_needed', 'special_requests',
            'message', 'created_at'
        ]
        read_only_fields = ['id', 'created_at']
        extra_kwargs = {
            'event_time': {'required': False, 'allow_null': True},
            'event_duration': {'required': False, 'allow_blank': True},
            'venue_name': {'required': False, 'allow_blank': True},
            'venue_address': {'required': False, 'allow_blank': True},
            'guest_count': {'required': False, 'allow_null': True},
            'services_needed': {'required': False, 'allow_blank': True},
            'special_requests': {'required': False, 'allow_blank': True},
            'message': {'required': False, 'allow_blank': True},
        }


class BookingRequestAdminSerializer(serializers.ModelSerializer):
    """Full serializer for admin use."""
    
    event_type_display = serializers.CharField(source='get_event_type_display', read_only=True)
    budget_display = serializers.CharField(source='get_budget_display', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = BookingRequest
        fields = '__all__'


class SiteSettingsSerializer(serializers.ModelSerializer):
    """Serializer for SiteSettings model."""
    logo = AbsoluteURLImageField(read_only=True)
    favicon = AbsoluteURLImageField(read_only=True)
    
    class Meta:
        model = SiteSettings
        fields = [
            'site_name', 'tagline', 'logo', 'favicon',
            'email', 'phone', 'whatsapp', 'address',
            'facebook_url', 'instagram_url', 'twitter_url',
            'youtube_url', 'tiktok_url',
            'meta_description', 'meta_keywords', 'google_maps_embed'
        ]
