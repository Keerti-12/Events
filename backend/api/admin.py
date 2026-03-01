"""
Django Admin Configuration for Lucky Event DJ.
Fully customized admin panel with image upload support and rich text.
"""

from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from .models import Service, Gallery, Testimonial, ContactInquiry, BookingRequest, SiteSettings


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    """Admin configuration for Service model."""
    
    list_display = ['title', 'slug', 'price_range', 'is_featured', 'is_active', 'order', 'image_preview']
    list_filter = ['is_featured', 'is_active', 'created_at']
    list_editable = ['is_featured', 'is_active', 'order']
    search_fields = ['title', 'description', 'short_description']
    prepopulated_fields = {'slug': ('title',)}
    ordering = ['order', 'title']
    readonly_fields = ['image_preview_large', 'created_at', 'updated_at']
    
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'short_description', 'description')
        }),
        ('Media', {
            'fields': ('icon', 'image', 'image_preview_large')
        }),
        ('Pricing & Display', {
            'fields': ('price_range', 'is_featured', 'is_active', 'order')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover; border-radius:4px;" />', obj.image.url)
        return "-"
    image_preview.short_description = 'Preview'
    
    def image_preview_large(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="200" style="border-radius:8px;" />', obj.image.url)
        return "No image uploaded"
    image_preview_large.short_description = 'Image Preview'


@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    """Admin configuration for Gallery model."""
    
    list_display = ['title', 'media_type', 'category', 'event_date', 'is_featured', 'is_active', 'thumbnail_preview']
    list_filter = ['media_type', 'category', 'is_featured', 'is_active', 'event_date']
    list_editable = ['is_featured', 'is_active']
    search_fields = ['title', 'description', 'location']
    date_hierarchy = 'event_date'
    ordering = ['-event_date', 'order']
    readonly_fields = ['image_preview_large', 'created_at', 'updated_at']
    
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'media_type', 'category')
        }),
        ('Media Files', {
            'fields': ('image', 'video_url', 'thumbnail', 'image_preview_large')
        }),
        ('Event Details', {
            'fields': ('event_date', 'location')
        }),
        ('Display Settings', {
            'fields': ('is_featured', 'is_active', 'order')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def thumbnail_preview(self, obj):
        img = obj.thumbnail or obj.image
        if img:
            return format_html('<img src="{}" width="60" height="40" style="object-fit: cover; border-radius:4px;" />', img.url)
        return "-"
    thumbnail_preview.short_description = 'Preview'
    
    def image_preview_large(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="300" style="border-radius:8px;" />', obj.image.url)
        return "No image uploaded"
    image_preview_large.short_description = 'Image Preview'


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    """Admin configuration for Testimonial model."""
    
    list_display = ['client_name', 'client_title', 'event_type', 'rating_stars', 'is_featured', 'is_active', 'client_preview']
    list_filter = ['rating', 'is_featured', 'is_active', 'event_date']
    list_editable = ['is_featured', 'is_active']
    search_fields = ['client_name', 'client_title', 'event_type', 'content']
    ordering = ['-is_featured', 'order', '-created_at']
    readonly_fields = ['client_image_preview', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Client Information', {
            'fields': ('client_name', 'client_title', 'client_image', 'client_image_preview')
        }),
        ('Event Details', {
            'fields': ('event_type', 'event_date')
        }),
        ('Review', {
            'fields': ('content', 'rating')
        }),
        ('Display Settings', {
            'fields': ('is_featured', 'is_active', 'order')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def rating_stars(self, obj):
        stars = '★' * obj.rating + '☆' * (5 - obj.rating)
        return format_html('<span style="color: #FFD700; font-size: 16px;">{}</span>', stars)
    rating_stars.short_description = 'Rating'
    
    def client_preview(self, obj):
        if obj.client_image:
            return format_html('<img src="{}" width="40" height="40" style="object-fit: cover; border-radius:50%;" />', obj.client_image.url)
        return "-"
    client_preview.short_description = 'Photo'
    
    def client_image_preview(self, obj):
        if obj.client_image:
            return format_html('<img src="{}" width="100" height="100" style="object-fit: cover; border-radius:50%;" />', obj.client_image.url)
        return "No image uploaded"
    client_image_preview.short_description = 'Client Photo Preview'


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    """Admin configuration for ContactInquiry model."""
    
    list_display = ['name', 'email', 'subject', 'status', 'status_badge', 'created_at']
    list_filter = ['status', 'created_at']
    list_editable = ['status']
    search_fields = ['name', 'email', 'subject', 'message']
    date_hierarchy = 'created_at'
    readonly_fields = ['name', 'email', 'phone', 'subject', 'message', 'created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Inquiry Details', {
            'fields': ('subject', 'message')
        }),
        ('Status & Notes', {
            'fields': ('status', 'admin_notes')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def status_badge(self, obj):
        colors = {
            'new': '#28a745',
            'read': '#17a2b8',
            'replied': '#6c757d',
            'archived': '#343a40',
        }
        color = colors.get(obj.status, '#6c757d')
        return format_html(
            '<span style="background: {}; color: white; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{}</span>',
            color, obj.get_status_display()
        )
    status_badge.short_description = 'Status'
    
    def has_add_permission(self, request):
        return False  # Inquiries are only created via API


@admin.register(BookingRequest)
class BookingRequestAdmin(admin.ModelAdmin):
    """Admin configuration for BookingRequest model."""
    
    list_display = ['name', 'event_type', 'event_date', 'budget', 'status', 'status_badge', 'created_at']
    list_filter = ['status', 'event_type', 'budget', 'event_date', 'created_at']
    list_editable = ['status']
    search_fields = ['name', 'email', 'phone', 'venue_name', 'message']
    date_hierarchy = 'event_date'
    readonly_fields = ['name', 'email', 'phone', 'event_type', 'event_date', 'event_time', 
                       'event_duration', 'venue_name', 'venue_address', 'guest_count',
                       'budget', 'services_needed', 'special_requests', 'message', 
                       'created_at', 'updated_at']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Client Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Event Details', {
            'fields': ('event_type', 'event_date', 'event_time', 'event_duration', 
                      'venue_name', 'venue_address', 'guest_count')
        }),
        ('Budget & Requirements', {
            'fields': ('budget', 'services_needed', 'special_requests', 'message')
        }),
        ('Status & Admin', {
            'fields': ('status', 'admin_notes', 'quoted_price')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def status_badge(self, obj):
        colors = {
            'pending': '#ffc107',
            'contacted': '#17a2b8',
            'confirmed': '#28a745',
            'cancelled': '#dc3545',
            'completed': '#6c757d',
        }
        color = colors.get(obj.status, '#6c757d')
        text_color = 'black' if obj.status == 'pending' else 'white'
        return format_html(
            '<span style="background: {}; color: {}; padding: 3px 10px; border-radius: 12px; font-size: 11px;">{}</span>',
            color, text_color, obj.get_status_display()
        )
    status_badge.short_description = 'Status'
    
    def has_add_permission(self, request):
        return False  # Bookings are only created via API


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    """Admin configuration for SiteSettings singleton model."""
    
    list_display = ['site_name', 'email', 'phone']
    readonly_fields = ['logo_preview', 'favicon_preview']
    
    fieldsets = (
        ('Site Identity', {
            'fields': ('site_name', 'tagline', 'logo', 'logo_preview', 'favicon', 'favicon_preview')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone', 'whatsapp', 'address')
        }),
        ('Social Media', {
            'fields': ('facebook_url', 'instagram_url', 'twitter_url', 'youtube_url', 'tiktok_url')
        }),
        ('SEO Settings', {
            'fields': ('meta_description', 'meta_keywords')
        }),
        ('Integrations', {
            'fields': ('google_maps_embed',)
        }),
    )
    
    def logo_preview(self, obj):
        if obj.logo:
            return format_html('<img src="{}" height="60" />', obj.logo.url)
        return "No logo uploaded"
    logo_preview.short_description = 'Logo Preview'
    
    def favicon_preview(self, obj):
        if obj.favicon:
            return format_html('<img src="{}" height="32" />', obj.favicon.url)
        return "No favicon uploaded"
    favicon_preview.short_description = 'Favicon Preview'
    
    def has_add_permission(self, request):
        # Only allow one instance
        return not SiteSettings.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        return False
