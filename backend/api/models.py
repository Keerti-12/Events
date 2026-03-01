"""
Models for Lucky Event DJ API

Contains models for:
- Service: DJ and event services offered
- Gallery: Photo and video portfolio
- Testimonial: Customer reviews
- ContactInquiry: Contact form submissions
- BookingRequest: Event booking requests
"""

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from ckeditor.fields import RichTextField


class TimeStampedModel(models.Model):
    """Abstract base model with created and updated timestamps."""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Service(TimeStampedModel):
    """Model for DJ and event services."""
    
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = RichTextField()
    short_description = models.TextField(max_length=300)
    icon = models.CharField(max_length=100, blank=True, help_text="Icon class name (e.g., 'fa-music')")
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    price_range = models.CharField(max_length=100, blank=True, help_text="e.g., '$500 - $2000'")
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'title']
        verbose_name = 'Service'
        verbose_name_plural = 'Services'

    def __str__(self):
        return self.title


class Gallery(TimeStampedModel):
    """Model for photo and video portfolio."""
    
    MEDIA_TYPE_CHOICES = [
        ('image', 'Image'),
        ('video', 'Video'),
    ]
    
    CATEGORY_CHOICES = [
        ('wedding', 'Wedding'),
        ('corporate', 'Corporate Event'),
        ('birthday', 'Birthday Party'),
        ('concert', 'Concert'),
        ('club', 'Club Night'),
        ('private', 'Private Event'),
        ('other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    media_type = models.CharField(max_length=10, choices=MEDIA_TYPE_CHOICES, default='image')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    image = models.ImageField(upload_to='gallery/', blank=True, null=True)
    video_url = models.URLField(blank=True, help_text="YouTube or Vimeo URL for videos")
    thumbnail = models.ImageField(upload_to='gallery/thumbnails/', blank=True, null=True)
    event_date = models.DateField(blank=True, null=True)
    location = models.CharField(max_length=200, blank=True)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-event_date', '-created_at']
        verbose_name = 'Gallery Item'
        verbose_name_plural = 'Gallery'

    def __str__(self):
        return self.title


class Testimonial(TimeStampedModel):
    """Model for customer testimonials/reviews."""
    
    client_name = models.CharField(max_length=100)
    client_title = models.CharField(max_length=100, blank=True, help_text="e.g., 'Bride', 'Event Organizer'")
    client_image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    event_type = models.CharField(max_length=100, blank=True)
    event_date = models.DateField(blank=True, null=True)
    content = models.TextField()
    rating = models.PositiveIntegerField(
        default=5,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-is_featured', 'order', '-created_at']
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'

    def __str__(self):
        return f"{self.client_name} - {self.event_type}"


class ContactInquiry(TimeStampedModel):
    """Model for contact form submissions."""
    
    STATUS_CHOICES = [
        ('new', 'New'),
        ('read', 'Read'),
        ('replied', 'Replied'),
        ('archived', 'Archived'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    admin_notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Inquiry'
        verbose_name_plural = 'Contact Inquiries'

    def __str__(self):
        return f"{self.name} - {self.subject}"


class BookingRequest(TimeStampedModel):
    """Model for event booking requests."""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('contacted', 'Contacted'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    EVENT_TYPE_CHOICES = [
        ('wedding', 'Wedding'),
        ('corporate', 'Corporate Event'),
        ('birthday', 'Birthday Party'),
        ('concert', 'Concert'),
        ('club', 'Club Night'),
        ('private', 'Private Party'),
        ('festival', 'Festival'),
        ('other', 'Other'),
    ]
    
    BUDGET_CHOICES = [
        ('under_500', 'Under $500'),
        ('500_1000', '$500 - $1,000'),
        ('1000_2000', '$1,000 - $2,000'),
        ('2000_5000', '$2,000 - $5,000'),
        ('5000_plus', '$5,000+'),
        ('flexible', 'Flexible / Discuss'),
    ]
    
    # Contact Information
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    
    # Event Details
    event_type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES)
    event_date = models.DateField()
    event_time = models.TimeField(blank=True, null=True)
    event_duration = models.CharField(max_length=50, blank=True, help_text="e.g., '4 hours'")
    venue_name = models.CharField(max_length=200, blank=True)
    venue_address = models.TextField(blank=True)
    guest_count = models.PositiveIntegerField(blank=True, null=True)
    
    # Budget and Requirements
    budget = models.CharField(max_length=20, choices=BUDGET_CHOICES)
    services_needed = models.TextField(blank=True, help_text="Specific services required")
    special_requests = models.TextField(blank=True)
    message = models.TextField(blank=True)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    admin_notes = models.TextField(blank=True)
    quoted_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Booking Request'
        verbose_name_plural = 'Booking Requests'

    def __str__(self):
        return f"{self.name} - {self.event_type} on {self.event_date}"


class SiteSettings(models.Model):
    """Singleton model for site-wide settings."""
    
    site_name = models.CharField(max_length=200, default="Lucky Event DJ")
    tagline = models.CharField(max_length=300, blank=True)
    logo = models.ImageField(upload_to='branding/', blank=True, null=True)
    favicon = models.ImageField(upload_to='branding/', blank=True, null=True)
    
    # Contact Information
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    whatsapp = models.CharField(max_length=20, blank=True)
    address = models.TextField(blank=True)
    
    # Social Media
    facebook_url = models.URLField(blank=True)
    instagram_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    youtube_url = models.URLField(blank=True)
    tiktok_url = models.URLField(blank=True)
    
    # SEO
    meta_description = models.TextField(blank=True)
    meta_keywords = models.CharField(max_length=500, blank=True)
    
    # Google Maps
    google_maps_embed = models.TextField(blank=True, help_text="Google Maps embed iframe code")
    
    class Meta:
        verbose_name = 'Site Settings'
        verbose_name_plural = 'Site Settings'

    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass  # Prevent deletion

    @classmethod
    def get_settings(cls):
        obj, created = cls.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.site_name
