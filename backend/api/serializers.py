"""
Serializers for Lucky Event DJ API.
"""

from rest_framework import serializers
from django.conf import settings
from .models import Service, Gallery, Testimonial, ContactInquiry, BookingRequest, SiteSettings


class ServiceSerializer(serializers.ModelSerializer):
    """Serializer for Service model."""
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'description', 'short_description',
            'icon', 'image', 'price_range', 'is_featured', 'order',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class ServiceListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for Service list view."""
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = Service
        fields = [
            'id', 'title', 'slug', 'short_description',
            'icon', 'image', 'price_range', 'is_featured', 'order'
        ]
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class GallerySerializer(serializers.ModelSerializer):
    """Serializer for Gallery model."""
    image = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()
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
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                image_url = obj.image.url if obj.image.url.startswith('/') else f'{settings.MEDIA_URL}{obj.image.url}'
                return request.build_absolute_uri(image_url)
            return obj.image.url if obj.image.url.startswith('/') else f'{settings.MEDIA_URL}{obj.image.url}'
        return None
    
    def get_thumbnail(self, obj):
        if obj.thumbnail:
            request = self.context.get('request')
            if request:
                thumb_url = obj.thumbnail.url if obj.thumbnail.url.startswith('/') else f'{settings.MEDIA_URL}{obj.thumbnail.url}'
                return request.build_absolute_uri(thumb_url)
            return obj.thumbnail.url if obj.thumbnail.url.startswith('/') else f'{settings.MEDIA_URL}{obj.thumbnail.url}'
        return None


class GalleryListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for Gallery list view."""
    image = serializers.SerializerMethodField()
    thumbnail = serializers.SerializerMethodField()
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Gallery
        fields = [
            'id', 'title', 'media_type', 'category', 'category_display',
            'image', 'video_url', 'thumbnail', 'is_featured'
        ]
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                image_url = obj.image.url if obj.image.url.startswith('/') else f'{settings.MEDIA_URL}{obj.image.url}'
                return request.build_absolute_uri(image_url)
            return obj.image.url if obj.image.url.startswith('/') else f'{settings.MEDIA_URL}{obj.image.url}'
        return None
    
    def get_thumbnail(self, obj):
        if obj.thumbnail:
            request = self.context.get('request')
            if request:
                thumb_url = obj.thumbnail.url if obj.thumbnail.url.startswith('/') else f'{settings.MEDIA_URL}{obj.thumbnail.url}'
                return request.build_absolute_uri(thumb_url)
            return obj.thumbnail.url if obj.thumbnail.url.startswith('/') else f'{settings.MEDIA_URL}{obj.thumbnail.url}'
        return None


class TestimonialSerializer(serializers.ModelSerializer):
    """Serializer for Testimonial model."""
    client_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_title', 'client_image',
            'event_type', 'event_date', 'content', 'rating',
            'is_featured', 'order', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_client_image(self, obj):
        if obj.client_image:
            request = self.context.get('request')
            if request:
                image_url = obj.client_image.url if obj.client_image.url.startswith('/') else f'{settings.MEDIA_URL}{obj.client_image.url}'
                return request.build_absolute_uri(image_url)
            return obj.client_image.url if obj.client_image.url.startswith('/') else f'{settings.MEDIA_URL}{obj.client_image.url}'
        return None


class TestimonialListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for Testimonial list view."""
    client_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Testimonial
        fields = [
            'id', 'client_name', 'client_title', 'client_image',
            'event_type', 'content', 'rating', 'is_featured'
        ]
    
    def get_client_image(self, obj):
        if obj.client_image:
            request = self.context.get('request')
            if request:
                image_url = obj.client_image.url if obj.client_image.url.startswith('/') else f'{settings.MEDIA_URL}{obj.client_image.url}'
                return request.build_absolute_uri(image_url)
            return obj.client_image.url if obj.client_image.url.startswith('/') else f'{settings.MEDIA_URL}{obj.client_image.url}'
        return None


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
    logo = serializers.SerializerMethodField()
    favicon = serializers.SerializerMethodField()
    
    class Meta:
        model = SiteSettings
        fields = [
            'site_name', 'tagline', 'logo', 'favicon',
            'email', 'phone', 'whatsapp', 'address',
            'facebook_url', 'instagram_url', 'twitter_url',
            'youtube_url', 'tiktok_url',
            'meta_description', 'meta_keywords', 'google_maps_embed'
        ]
    
    def get_logo(self, obj):
        if obj.logo:
            request = self.context.get('request')
            if request:
                logo_url = obj.logo.url if obj.logo.url.startswith('/') else f'{settings.MEDIA_URL}{obj.logo.url}'
                return request.build_absolute_uri(logo_url)
            return obj.logo.url if obj.logo.url.startswith('/') else f'{settings.MEDIA_URL}{obj.logo.url}'
        return None
    
    def get_favicon(self, obj):
        if obj.favicon:
            request = self.context.get('request')
            if request:
                favicon_url = obj.favicon.url if obj.favicon.url.startswith('/') else f'{settings.MEDIA_URL}{obj.favicon.url}'
                return request.build_absolute_uri(favicon_url)
            return obj.favicon.url if obj.favicon.url.startswith('/') else f'{settings.MEDIA_URL}{obj.favicon.url}'
        return None
