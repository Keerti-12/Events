# Media/Image Loading Fix - Implementation Notes

## Changes Made

### 1. **Absolute URLs for Images** ✅
- Created `AbsoluteURLImageField` in serializers to return full URLs instead of relative paths
- Updated all image fields in serializers (Service, Gallery, Testimonial, SiteSettings)
- Added request context to ViewSets to generate absolute URLs

**Result**: API now returns full image URLs like `https://your-backend.onrender.com/media/services/image.jpg`

### 2. **Production Media Serving** ✅
- Enabled media file serving in production (not just DEBUG mode)
- Configured Django to serve `/media/` files even when deployed

**Result**: Images are now accessible from the backend in production

### 3. **Cloudinary Integration (Optional)** ✅
- Added Cloudinary packages to requirements.txt
- Configured optional Cloudinary storage in settings
- Updated documentation with setup instructions

## ⚠️ Critical: Render Storage Limitation

**Render's free tier uses ephemeral storage** - this means:
- ✅ You can upload images via Django admin
- ❌ **Images are DELETED on every deploy or server restart**
- ⏰ **This is temporary storage only**

### Solutions

#### Option 1: Use Cloudinary (Recommended for Production)
1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier: 25GB storage)
2. Get your `CLOUDINARY_URL` from dashboard (format: `cloudinary://api_key:api_secret@cloud_name`)
3. Add to Render environment variables:
   - Key: `CLOUDINARY_URL`
   - Value: `cloudinary://your_key:your_secret@your_cloud_name`
4. Redeploy backend on Render
5. Re-upload images via Django admin (they'll now go to Cloudinary)

#### Option 2: Use AWS S3 or Compatible Service
- Requires additional setup with `django-storages`
- Not included in current implementation

#### Option 3: Accept Temporary Storage (Testing Only)
- Images work until next deploy
- Need to re-upload after each deployment
- **NOT suitable for production**

## Next Steps

### 1. Deploy Changes
```bash
git add .
git commit -m "Fix image serving with absolute URLs and production media support"
git push
```

### 2. Verify on Render
- Wait for auto-deploy to complete
- Check deployment logs for any errors

### 3. Test Image URLs
Open these endpoints in browser:
- `https://your-backend.onrender.com/api/services/` - Check if `image` field has full URL
- `https://your-backend.onrender.com/api/gallery/` - Check gallery images
- Click an image URL directly - should load the image

### 4. Add Images via Admin
1. Go to `https://your-backend.onrender.com/admin/`
2. Login with superuser credentials
3. Add/edit a Service or Gallery item
4. Upload an image
5. Save
6. Check frontend - image should now display

### 5. Setup Cloudinary (Recommended)
- Follow "Option 1" above to configure persistent storage
- This prevents images from being lost on redeploys

## Troubleshooting

### Images still not loading?
1. **Check CORS**: Ensure `CORS_ALLOWED_ORIGINS` on Render includes your Vercel domain
2. **Check API response**: Open browser DevTools → Network → Check if image URLs are absolute
3. **Check image exists**: Click the image URL directly in browser
4. **Check frontend env**: Ensure `VITE_API_URL` on Vercel points to correct backend URL

### Images disappear after deploy?
- This is expected without Cloudinary
- Implement Cloudinary (see Option 1 above)

### CORS errors on images?
- Media files should inherit CORS settings
- Verify backend CORS configuration in settings.py

## Files Modified
- `backend/api/serializers.py` - Added AbsoluteURLImageField
- `backend/api/views.py` - Added request context to ViewSets
- `backend/luckyevent/urls.py` - Enabled media serving in production
- `backend/luckyevent/settings.py` - Added Cloudinary configuration
- `backend/requirements.txt` - Added Cloudinary packages
- `DEPLOYMENT.md` - Updated with media storage notes
